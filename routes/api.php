<?php

use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\RoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1/main')->group(function () {
    Route::apiResource('equipment', EquipmentController::class);
    Route::apiResource('room', RoomController::class);
});
