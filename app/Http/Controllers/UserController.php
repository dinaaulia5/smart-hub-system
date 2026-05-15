<?php

namespace App\Http\Controllers;

use App\Helpers\ActivityLogger;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;
use Throwable;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'name', 'email', 'role', 'created_at'])
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

    public function create(): Response
    {
        return inertia('Users/Create', [
            'pageSettings' => fn() => [
                'title' => 'Tambah Pengguna',
                'subtitle' => 'Tambahkan pengguna baru ke dalam sistem',
                'method' => 'POST',
                'action' => route('user.store'),
            ],

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Pengguna',
                    'href' => route('user.index'),
                ],
                [
                    'label' => 'Tambah Pengguna',
                ],
            ],

            'roles' => fn() => [
                [
                    'label' => 'Admin',
                    'value' => 'admin',
                ],
                [
                    'label' => 'User',
                    'value' => 'user',
                ],
            ],
        ]);
    }

    public function store(UserRequest $request): RedirectResponse
    {
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
                'password' => Hash::make($request->password),
            ]);

            ActivityLogger::log(
                Auth::user()->name . ' created user data',
                $user
            );

            return to_route('user.index')
                ->with('success', 'Pengguna berhasil ditambahkan');
        } catch (Throwable $e) {
            return to_route('user.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit(User $user): Response
    {
        return inertia('Users/Edit', [
            'pageSettings' => fn() => [
                'title' => 'Edit Pengguna',
                'subtitle' => 'Perbarui data pengguna yang terdaftar',
                'method' => 'PUT',
                'action' => route('user.update', $user),
            ],

            'user' => fn() => $user,

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Pengguna',
                    'href' => route('user.index'),
                ],
                [
                    'label' => 'Edit Pengguna',
                ],
            ],

            'roles' => fn() => [
                [
                    'label' => 'Admin',
                    'value' => 'admin',
                ],
                [
                    'label' => 'User',
                    'value' => 'user',
                ],
            ],
        ]);
    }

    public function update(UserRequest $request, User $user): RedirectResponse
    {
        try {
            $data = [
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
            ];

            if ($request->filled('password')) {
                $data['password'] = Hash::make($request->password);
            }

            $user->update($data);

            ActivityLogger::log(
                Auth::user()->name . ' updated user data',
                $user
            );

            return to_route('user.index')
                ->with('success', 'Pengguna berhasil diperbarui');
        } catch (Throwable $e) {
            return to_route('user.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy(User $user): RedirectResponse
    {
        try {
            ActivityLogger::log(
                Auth::user()->name . ' deleted user data',
                $user
            );

            $user->delete();

            return to_route('user.index')
                ->with('success', 'Pengguna berhasil dihapus');
        } catch (Throwable $e) {
            return to_route('user.index')
                ->with('error', $e->getMessage());
        }
    }
}
