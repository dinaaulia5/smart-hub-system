<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookingResource;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Response;

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
}
