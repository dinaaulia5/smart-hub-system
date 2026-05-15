<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Room::query();

            // filtering
            if ($request->filled('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            $rooms = $query->get();

            return response()->json([
                'success' => true,
                'message' => $rooms->isEmpty()
                    ? 'Data tidak ditemukan'
                    : 'Data berhasil diambil',
                'data' => $rooms
            ], Response::HTTP_ACCEPTED);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(RoomRequest $request)
    {
        try {
            $room = Room::create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil ditambahkan',
                'data' => $room
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menambahkan data'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Room $room)
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Detail data',
                'data' => $room
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Data tidak ditemukan'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function update(RoomRequest $request, Room $room)
    {
        try {
            $room->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Data berhasil diupdate',
                'data' => $room
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal update data'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Room $room)
    {
        try {
            $room->delete();

            return response()->json([
                'success' => true,
                'message' => 'Ruangan berhasil dihapus'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus data Ruangan',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
