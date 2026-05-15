<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EquipmentRequest;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EquipmentController extends Controller
{

    public function index(Request $request)
    {
        try {
            $query = Equipment::query();

            if ($request->has('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->has('brand')) {
                $query->where('brand', 'like', '%' . $request->brand . '%');
            }

            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            if ($request->has('min_stock')) {
                $query->where('stock', '>=', $request->min_stock);
            }

            $equipments = $query->get();

            if ($equipments->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Data equipment tidak ditemukan',
                    'data' => []
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Data equipment berhasil diambil',
                'data' => $equipments
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data equipment',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function store(EquipmentRequest $request)
    {
        try {
            $equipment = Equipment::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Equipment berhasil ditambahkan',
                'data' => $equipment
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan equipment',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function show(Equipment $equipment)
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Detail equipment berhasil diambil',
                'data' => $equipment
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil detail equipment',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function update(EquipmentRequest $request, Equipment $equipment)
    {
        try {
            $equipment->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Equipment berhasil diupdate',
                'data' => $equipment
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengupdate equipment',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy(Equipment $equipment)
    {
        try {
            $equipment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Equipment berhasil dihapus'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus equipment',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
