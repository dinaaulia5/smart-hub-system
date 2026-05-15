<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Helpers\ActivityLogger;
use App\Http\Requests\EquipmentRequest;
use App\Http\Resources\EquipmentResource;
use App\Models\Equipment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

class EquipmentController extends Controller
{
    public function index(): Response
    {
        $equipments = Equipment::query()
            ->select([
                'id',
                'name',
                'brand',
                'stock',
                'status',
                'created_at',
            ])
            ->filter(request()->only(['search', 'status']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Equipments/Index', [
            'pageSettings' => fn() => [
                'title' => 'Data Equipment',
                'subtitle' => 'Kelola data inventaris peralatan studio',
                'banner' => [
                    'title' => 'Equipment',
                    'subtitle' => 'Pantau stok, brand, dan status peralatan yang tersedia',
                ],
            ],

            'equipments' => fn() => EquipmentResource::collection($equipments)->additional([
                'meta' => [
                    'has_pages' => $equipments->hasPages(),
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
                    'label' => 'Equipment',
                ],
            ],

            'count' => fn() => [
                'countEquipment' => Equipment::query()->count(),
                'countAvailable' => Equipment::query()->where('status', 'available')->count(),
                'countBorrowed' => Equipment::query()->where('status', 'borrowed')->count(),
                'countMaintenance' => Equipment::query()->where('status', 'maintenance')->count(),
                'countStock' => Equipment::query()->sum('stock'),
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Equipments/Create', [
            'pageSettings' => fn() => [
                'title' => 'Tambah Data Equipment',
                'subtitle' => 'Kelola inventaris peralatan studio untuk mendukung aktivitas peminjaman dan operasional',
                'method' => 'POST',
                'action' => route('equipment.store'),
            ],

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Equipment',
                    'href' => route('equipment.index'),
                ],
                [
                    'label' => 'Tambah Equipment',
                ],
            ],

            'statuses' => fn() => [
                [
                    'label' => 'Available',
                    'value' => 'available',
                ],
                [
                    'label' => 'Borrowed',
                    'value' => 'borrowed',
                ],
                [
                    'label' => 'Maintenance',
                    'value' => 'maintenance',
                ],
            ],
        ]);
    }
    public function store(EquipmentRequest $request)
    {
        try {
            $equipment = Equipment::create($request->validated());

            ActivityLogger::log(
                Auth::user()->name . ' Creted equipment data',
                $equipment
            );

            return redirect()->route('equipment.index')
                ->with('success', 'Data berhasil ditambahkan');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menambahkan data');
        }
    }
    public function show(Equipment $equipment)
    {
        //
    }

    public function edit(Equipment $equipment): Response
    {
        return inertia('Equipments/Edit', [
            'pageSettings' => fn() => [
                'title' => 'Perbarui Data Equipment',
                'subtitle' => 'Perbarui data inventaris peralatan studio sesuai kondisi terbaru',
                'method' => 'PUT',
                'action' => route('equipment.update', $equipment),
            ],

            'equipment' => fn() => $equipment,

            'items' => fn() => [
                [
                    'label' => 'Smart Hub',
                    'href' => route('dashboard'),
                ],
                [
                    'label' => 'Equipment',
                    'href' => route('equipment.index'),
                ],
                [
                    'label' => 'Perbarui Equipment',
                ],
            ],

            'statuses' => fn() => [
                [
                    'label' => 'Available',
                    'value' => 'available',
                ],
                [
                    'label' => 'Borrowed',
                    'value' => 'borrowed',
                ],
                [
                    'label' => 'Maintenance',
                    'value' => 'maintenance',
                ],
            ],
        ]);
    }
    public function update(Equipment $equipment, EquipmentRequest $request): RedirectResponse
    {
        try {
            $equipment->update([
                'name' => $request->name,
                'brand' => $request->brand,
                'stock' => $request->stock,
                'status' => $request->status,
            ]);

            flashMessage(MessageType::UPDATED->message('Equipment'));

            ActivityLogger::log(
                Auth::user()->name . ' updated room data',
                $equipment
            );


            return to_route('equipment.index');
        } catch (Throwable $e) {
            flashMessage(
                MessageType::ERROR->message(error: $e->getMessage()),
                'error'
            );

            return to_route('equipment.index');
        }
    }


    public function destroy(Equipment $equipment)
    {
        try {
            $equipment->delete();

            ActivityLogger::log(
                Auth::user()->name . ' delete equipment data',
                $equipment
            );


            return redirect()->route('equipment.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus data');
        }
    }
}
