<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityLogResource;

use App\Models\ActivityLog;
use Inertia\Response;

class ActivityLogController extends Controller
{
    public function index(): Response
    {
        $activityLogs = ActivityLog::query()
            ->with('user:id,name,email')
            ->select([
                'id',
                'user_id',
                'description',
                'browser',
                'os',
                'ip_address',
                'created_at',
            ])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('ActivityLogs/Index', [
            'pageSettings' => fn() => [
                'title' => 'Activity Log',
                'subtitle' => 'Kelola seluruh aktivitas pengguna pada sistem',
                'banner' => [
                    'title' => 'Activity Log',
                    'subtitle' => 'Pantau aktivitas admin dan user pada Smart Hub',
                ],
            ],

            'activityLogs' => fn() => ActivityLogResource::collection($activityLogs)->additional([
                'meta' => [
                    'has_pages' => $activityLogs->hasPages(),
                ],
            ]),

            'state' => fn() => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Activity Log',
                ],
            ],

            'count' => fn() => [
                'countLog' => ActivityLog::query()->count(),

                'countLogToday' => ActivityLog::query()
                    ->whereDate('created_at', now()->toDateString())
                    ->count(),
            ],
        ]);
    }
}
