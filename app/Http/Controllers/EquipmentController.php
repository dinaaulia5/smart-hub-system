<?php

namespace App\Http\Controllers;

use App\Http\Requests\EquipmentRequest;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Equipment::query();

            if ($request->filled('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            $equipments = $query->get();

            return Inertia::render('Equipment/Index', [
                'success' => true,
                'message' => $equipments->isEmpty()
                    ? 'Data tidak ditemukan'
                    : 'Data berhasil diambil',
                'data' => $equipments
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Equipment/Index', [
                'success' => false,
                'message' => 'Terjadi kesalahan',
                'data' => [],
                'error' => config('app.debug') ? $e->getMessage() : null
            ]);
        }
    }


    public function create()
    {
        //
    }




    public function store(EquipmentRequest $request)
    {
        try {
            Equipment::create($request->validated());

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


    public function edit(Equipment $equipment)
    {
        //
    }


    public function update(EquipmentRequest $request, Equipment $equipment)
    {
        try {
            $equipment->update($request->validated());

            return redirect()->route('equipment.index')
                ->with('success', 'Data berhasil diupdate');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal update data');
        }
    }


    public function destroy(Equipment $equipment)
    {
        try {
            $equipment->delete();

            return redirect()->route('equipment.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus data');
        }
    }
}
