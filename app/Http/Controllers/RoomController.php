<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomRequest;
use App\Http\Resources\RoomResource;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Throwable;

class RoomController extends Controller
{
    public function index(): Response
    {
        $rooms = Room::query()
            ->select([
                'id',
                'name',
                'code',
                'capacity',
                'location',
                'status',
                'created_at',
            ])
            ->filter(request()->only(['search', 'status']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Rooms/Index', [
            'pageSettings' => fn() => [
                'title' => 'Data Ruangan',
                'subtitle' => 'Kelola data ruangan yang tersedia untuk peminjaman',
                'banner' => [
                    'title' => 'Ruangan',
                    'subtitle' => 'Pantau kapasitas, lokasi, dan status ruangan',
                ],
            ],

            'rooms' => fn() => RoomResource::collection($rooms)->additional([
                'meta' => [
                    'has_pages' => $rooms->hasPages(),
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
                    'label' => 'Ruangan',
                ],
            ],

            'count' => fn() => [
                'countRoom' => Room::query()->count(),
                'countAvailable' => Room::query()->where('status', 'available')->count(),
                'countNotAvailable' => Room::query()->where('status', 'not_available')->count(),
                'countCapacity' => Room::query()->sum('capacity'),
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Rooms/Create', [
            'pageSettings' => fn() => [
                'title' => 'Tambah Data Ruangan',
                'subtitle' => 'Tambahkan data ruangan untuk kebutuhan peminjaman',
                'method' => 'POST',
                'action' => route('room.store'),
            ],

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Ruangan',
                    'href' => route('room.index'),
                ],
                [
                    'label' => 'Tambah Ruangan',
                ],
            ],

            'statuses' => fn() => [
                [
                    'label' => 'Available',
                    'value' => 'available',
                ],
                [
                    'label' => 'Not Available',
                    'value' => 'not_available',
                ],
            ],
        ]);
    }

    public function store(RoomRequest $request): RedirectResponse
    {
        try {
            Room::create($request->validated());

            return to_route('room.index')
                ->with('success', 'Ruangan berhasil ditambahkan');
        } catch (Throwable $e) {
            return to_route('room.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit(Room $room): Response
    {
        return inertia('Rooms/Edit', [
            'pageSettings' => fn() => [
                'title' => 'Perbarui Data Ruangan',
                'subtitle' => 'Perbarui data ruangan sesuai kondisi terbaru',
                'method' => 'PUT',
                'action' => route('room.update', $room),
            ],

            'room' => fn() => $room,

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Ruangan',
                    'href' => route('room.index'),
                ],
                [
                    'label' => 'Perbarui Ruangan',
                ],
            ],

            'statuses' => fn() => [
                [
                    'label' => 'Available',
                    'value' => 'available',
                ],
                [
                    'label' => 'Not Available',
                    'value' => 'not_available',
                ],
            ],
        ]);
    }

    public function update(RoomRequest $request, Room $room): RedirectResponse
    {
        try {
            $room->update($request->validated());

            return to_route('room.index')
                ->with('success', 'Ruangan berhasil diperbarui');
        } catch (Throwable $e) {
            return to_route('room.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy(Room $room): RedirectResponse
    {
        try {
            $room->delete();

            return to_route('room.index')
                ->with('success', 'Ruangan berhasil dihapus');
        } catch (Throwable $e) {
            return to_route('room.index')
                ->with('error', $e->getMessage());
        }
    }
}
