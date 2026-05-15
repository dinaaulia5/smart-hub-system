<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookingResource;
use App\Helpers\ActivityLogger;
use App\Http\Requests\BookingRequest;
use App\Models\Booking;
use App\Models\BookingItem;
use App\Models\Equipment;
use App\Models\Room;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Throwable;

class BookingController extends Controller
{
    public function index(): Response
    {
        $bookings = Booking::query()
            ->with([
                'user:id,name',
                'items.bookable',
            ])
            ->select([
                'id',
                'user_id',
                'start_time',
                'end_time',
                'check_in_at',
                'status',
                'created_at',
            ])
            ->filter(request()->only([
                'search',
                'status',
            ]))
            ->sorting(request()->only([
                'field',
                'direction',
            ]))
            ->latest()
            ->paginate(request()->load ?? 10);

        return inertia('Bookings/Index', [
            'pageSettings' => fn() => [
                'title' => 'Data Booking',
                'subtitle' => 'Kelola data peminjaman ruangan dan peralatan',
                'banner' => [
                    'title' => 'Booking',
                    'subtitle' => 'Pantau jadwal peminjaman dan status check-in',
                ],
            ],

            'bookings' => fn() => BookingResource::collection($bookings)->additional([
                'meta' => [
                    'has_pages' => $bookings->hasPages(),
                ],
            ]),

            'state' => fn() => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'status' => request()->status ?? '',
                'load' => request()->load ?? 10,
            ],

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Booking',
                ],
            ],

            'count' => fn() => [
                'countBooking' => Booking::query()->count(),

                'countPending' => Booking::query()
                    ->where('status', 'pending')
                    ->count(),

                'countApproved' => Booking::query()
                    ->where('status', 'approved')
                    ->count(),

                'countCheckIn' => Booking::query()
                    ->whereNotNull('check_in_at')
                    ->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Bookings/Create', [
            'pageSettings' => fn() => [
                'title' => 'Tambah Data Booking',
                'subtitle' => 'Buat data peminjaman ruangan dan peralatan',
                'method' => 'POST',
                'action' => route('booking.store'),
            ],

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Booking',
                    'href' => route('booking.index'),
                ],
                [
                    'label' => 'Tambah Booking',
                ],
            ],

            'users' => fn() => User::query()
                ->select(['id', 'name', 'email'])
                ->orderBy('name')
                ->get(),

            'rooms' => fn() => Room::query()
                ->select(['id', 'name', 'code', 'status'])
                ->where('status', 'available')
                ->orderBy('name')
                ->get(),

            'equipments' => fn() => Equipment::query()
                ->select(['id', 'name', 'brand', 'stock', 'status'])
                ->where('status', 'available')
                ->where('stock', '>', 0)
                ->orderBy('name')
                ->get(),
        ]);
    }

    public function store(BookingRequest $request): RedirectResponse
    {
        $data = $request->validated();

        DB::beginTransaction();

        try {
            $booking = Booking::create([
                'user_id' => $data['user_id'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
                'status' => 'pending',
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
                                        ->orWhereBetween('end_time', [$data['start_time'], $data['end_time']])
                                        ->orWhere(function ($q) use ($data) {
                                            $q->where('start_time', '<=', $data['start_time'])
                                                ->where('end_time', '>=', $data['end_time']);
                                        });
                                });
                        })
                        ->exists();

                    if ($isBooked) {
                        throw new \Exception("Ruangan {$resource->name} sudah dipesan pada jadwal tersebut.");
                    }

                    if ($resource->status === 'not_available') {
                        throw new \Exception("Ruangan {$resource->name} sedang tidak tersedia.");
                    }

                    $resource->update([
                        'status' => 'not_available',
                    ]);
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

            ActivityLogger::log(
                Auth::user()->name . ' created a new booking reservation from web',
                $booking
            );

            DB::commit();

            return to_route('booking.index')
                ->with('success', 'Booking berhasil dibuat');
        } catch (Throwable $e) {
            DB::rollBack();

            return to_route('booking.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit(Booking $booking): Response
    {
        $booking->load([
            'items.bookable',
            'user:id,name,email',
        ]);

        return inertia('Bookings/Edit', [
            'pageSettings' => fn() => [
                'title' => 'Edit Booking',
                'subtitle' => 'Perbarui data booking ruangan dan equipment',
                'method' => 'PUT',
                'action' => route('booking.update', $booking),
            ],

            'booking' => fn() => [
                'id' => $booking->id,
                'user_id' => $booking->user_id,
                'start_time' => $booking->start_time?->format('Y-m-d\TH:i'),
                'end_time' => $booking->end_time?->format('Y-m-d\TH:i'),
                'status' => $booking->status,

                'items' => $booking->items->map(function ($item) {

                    return [
                        'id' => $item->bookable_id,
                        'type' => class_basename($item->bookable_type) === 'Room'
                            ? 'room'
                            : 'equipment',
                        'quantity' => $item->quantity,
                    ];
                }),
            ],

            'users' => fn() => User::query()
                ->select(['id', 'name', 'email'])
                ->orderBy('name')
                ->get(),

            'rooms' => fn() => Room::query()
                ->select(['id', 'name', 'code', 'status'])
                ->orderBy('name')
                ->get(),

            'equipments' => fn() => Equipment::query()
                ->select(['id', 'name', 'brand', 'stock', 'status'])
                ->orderBy('name')
                ->get(),

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Booking',
                    'href' => route('booking.index'),
                ],
                [
                    'label' => 'Edit Booking',
                ],
            ],
        ]);
    }

    public function update(BookingRequest $request, Booking $booking): RedirectResponse
    {

        $data = $request->validated();

        DB::beginTransaction();

        try {

            foreach ($booking->items as $oldItem) {

                // ROOM
                if ($oldItem->bookable_type === Room::class) {

                    Room::where('id', $oldItem->bookable_id)
                        ->update([
                            'status' => 'available',
                        ]);
                }

                if ($oldItem->bookable_type === Equipment::class) {

                    Equipment::where('id', $oldItem->bookable_id)
                        ->increment('stock', $oldItem->quantity);
                }
            }

            $booking->items()->delete();

            $booking->update([
                'user_id' => $data['user_id'],
                'start_time' => $data['start_time'],
                'end_time' => $data['end_time'],
            ]);



            foreach ($data['items'] as $item) {

                $isRoom = $item['type'] === 'room';

                $type = $isRoom
                    ? Room::class
                    : Equipment::class;

                $resource = $type::findOrFail($item['id']);

                $qty = $item['quantity'] ?? 1;

                // ROOM
                if ($isRoom) {

                    if ($resource->status === 'not_available') {
                        throw new \Exception(
                            "Ruangan {$resource->name} sedang tidak tersedia."
                        );
                    }

                    $resource->update([
                        'status' => 'not_available',
                    ]);
                }

                // EQUIPMENT
                else {

                    if ($resource->stock < $qty) {
                        throw new \Exception(
                            "Stok alat {$resource->name} tidak mencukupi."
                        );
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

            ActivityLogger::log(
                Auth::user()->name . ' updated booking reservation',
                $booking
            );


            DB::commit();

            return to_route('booking.index')
                ->with('success', 'Booking berhasil diperbarui');
        } catch (Throwable $e) {

            DB::rollBack();

            return back()->with(
                'error',
                $e->getMessage()
            );
        }
    }

    public function destroy(Booking $booking): RedirectResponse
    {
        DB::beginTransaction();

        try {

            $booking->load('items');

            foreach ($booking->items as $item) {

                // ROOM
                if ($item->bookable_type === Room::class) {

                    Room::where('id', $item->bookable_id)
                        ->update([
                            'status' => 'available',
                        ]);
                }

                if ($item->bookable_type === Equipment::class) {

                    Equipment::where('id', $item->bookable_id)
                        ->increment('stock', $item->quantity);
                }
            }

            $booking->items()->delete();

            ActivityLogger::log(
                Auth::user()->name . ' deleted booking reservation',
                $booking
            );

            $booking->delete();

            DB::commit();

            return to_route('booking.index')
                ->with('success', 'Booking berhasil dihapus');
        } catch (Throwable $e) {

            DB::rollBack();

            return back()->with(
                'error',
                $e->getMessage()
            );
        }
    }
}
