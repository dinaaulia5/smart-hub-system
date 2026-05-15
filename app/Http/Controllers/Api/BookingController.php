<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ActivityLogger;
use App\Http\Controllers\Controller;
use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\Equipment;
use App\Models\Room;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class BookingController extends Controller
{
    public function store(BookingRequest $request)
    {
        $data = $request->validated();

        DB::beginTransaction();

        try {
            $booking = Booking::create([
                'user_id' => $data['user_id'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
                'status' => 'pending'
            ]);

            foreach ($data['items'] as $item) {
                $isRoom = $item['type'] === 'room';
                $type = $isRoom ? Room::class : Equipment::class;
                $resource = $type::findOrFail($item['id']);
                $qty = $item['quantity'] ?? 1;

                if ($isRoom) {
                    $isBooked = BookingItem::where('bookable_id', $item['id'])
                        ->where('bookable_type', Room::class)
                        ->whereHas('booking', function ($query) use ($data) {
                            $query->whereIn('status', ['pending', 'active'])
                                ->where(function ($q) use ($data) {
                                    $q->whereBetween('start_time', [$data['start_time'], $data['end_time']])
                                        ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']]);
                                });
                        })->exists();

                    if ($isBooked) {
                        throw new \Exception("Ruangan {$resource->name} sudah dipesan pada jadwal tersebut.");
                    }
                } else {
                    if ($resource->stock < $qty) {
                        throw new \Exception("Stok alat {$resource->name} tidak mencukupi.");
                    }
                    $resource->decrement('stock', $qty);
                }

                BookingItem::create([
                    'booking_id' => $booking->id,
                    'bookable_id' => $item['id'],
                    'bookable_type' => $type,
                    'quantity' => $qty,
                ]);
            }


            ActivityLogger::log('User created a new booking reservation', $booking);
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Booking berhasil dibuat',
                'data' => $booking->load('items.bookable')
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function checkIn($id)
    {
        return DB::transaction(function () use ($id) {

            $booking = Booking::with('items.bookable')->findOrFail($id);

            $now = Carbon::now('Asia/Jakarta');
            $startTime = Carbon::parse($booking->start_time, 'Asia/Jakarta');
            $deadline = $startTime->copy()->addMinutes(15);

            if ($now->lt($startTime)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Belum waktunya check-in',
                    'debug' => [
                        'now' => $now,
                        'start_time' => $startTime
                    ]
                ], 422);
            }

            if ($now->gt($deadline)) {
                $this->rejectBooking($booking);

                return response()->json([
                    'success' => false,
                    'message' => 'Terlambat lebih dari 15 menit, booking dibatalkan',
                    'debug' => [
                        'now' => $now,
                        'deadline' => $deadline
                    ]
                ], 422);
            }

            if ($booking->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Status booking tidak valid untuk check-in'
                ], 400);
            }

            $booking->update([
                'status' => 'active',
                'check_in_at' => $now
            ]);

            ActivityLogger::log("User check-in berhasil", $booking);

            return response()->json([
                'success' => true,
                'message' => 'Check-in berhasil!',
                'data' => $booking->fresh('items.bookable')
            ]);
        });
    }

    private function rejectBooking(Booking $booking)
    {
        foreach ($booking->items as $item) {
            if ($item->bookable_type === Equipment::class) {
                $item->bookable->increment('stock', $item->quantity);
            } else {
                $item->bookable->update(['status' => 'available']);
            }
        }

        $booking->update(['status' => 'rejected']);

        ActivityLogger::log("Booking #{$booking->id} otomatis direject karena keterlambatan", $booking);
    }
}
