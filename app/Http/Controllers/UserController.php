<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select([
                'id',
                'name',
                'email',
                'role',
                'created_at',
            ])
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Users/Index', [
            'pageSettings' => fn() => [
                'title' => 'Data Pengguna',
                'subtitle' => 'Kelola data pengguna yang terdaftar pada sistem',
                'banner' => [
                    'title' => 'Pengguna',
                    'subtitle' => 'Pantau data pengguna yang memiliki akses ke Smart Hub',
                ],
            ],

            'users' => fn() => UserResource::collection($users)->additional([
                'meta' => [
                    'has_pages' => $users->hasPages(),
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
                    'label' => 'Pengguna',
                ],
            ],

            'count' => fn() => [
                'countUser' => User::query()->count(),
                'countUserToday' => User::query()
                    ->whereDate('created_at', now()->toDateString())
                    ->count(),
            ],
        ]);
    }
}
