<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Booking;
use App\Models\Equipment;
use App\Models\Room;
use App\Models\User;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return inertia('Dashboard', [
            'pageSettings' => fn() => [
                'title' => 'Dashboard',
                'subtitle' => 'Ringkasan data Smart Hub Management System',
                'banner' => [
                    'title' => 'Smart Hub',
                    'subtitle' => 'Kelola ruangan, inventaris, dan peminjaman secara terintegrasi',
                ],
            ],
            'bookingSummary' => fn() => [
                'pending' => Booking::with('user:id,name')
                    ->where('status', 'pending')
                    ->latest()
                    ->limit(5)
                    ->get(['id', 'user_id', 'start_time', 'end_time', 'status', 'check_in_at']),

                'active' => Booking::with('user:id,name')
                    ->where('status', 'active')
                    ->latest()
                    ->limit(5)
                    ->get(['id', 'user_id', 'start_time', 'end_time', 'status', 'check_in_at']),

                'rejected' => Booking::with('user:id,name')
                    ->where('status', 'rejected')
                    ->latest()
                    ->limit(5)
                    ->get(['id', 'user_id', 'start_time', 'end_time', 'status', 'check_in_at']),

                'checkedIn' => Booking::with('user:id,name')
                    ->whereNotNull('check_in_at')
                    ->latest()
                    ->limit(5)
                    ->get(['id', 'user_id', 'start_time', 'end_time', 'status', 'check_in_at']),
            ],

            'count' => fn() => [
                'countUser' => User::query()->count(),

                'countRoom' => Room::query()->count(),
                'countRoomAvailable' => Room::query()
                    ->where('status', 'available')
                    ->count(),

                'countEquipment' => Equipment::query()->count(),
                'countEquipmentAvailable' => Equipment::query()
                    ->where('status', 'available')
                    ->count(),

                'countBooking' => Booking::query()->count(),
                'countBookingPending' => Booking::query()
                    ->where('status', 'pending')
                    ->count(),
                'countBookingApproved' => Booking::query()
                    ->where('status', 'approved')
                    ->count(),
                'countBookingCheckIn' => Booking::query()
                    ->whereNotNull('check_in_at')
                    ->count(),
                'countPending' => Booking::where('status', 'pending')->count(),
                'countActive' => Booking::where('status', 'active')->count(),
                'countRejected' => Booking::where('status', 'rejected')->count(),
                'countCheckedIn' => Booking::whereNotNull('check_in_at')->count(),
            ],


            'activityLogs' => fn() => ActivityLog::query()
                ->with('user:id,name')
                ->latest()
                ->limit(10)
                ->get([
                    'id',
                    'user_id',
                    'description',
                    'loggable_type',
                    'ip_address',
                    'browser',
                    'os',
                    'created_at',
                ]),
        ]);
    }
}
