<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\EquipmentController;
use App\Http\Controllers\Api\RoomController;
use Illuminate\Support\Facades\Route;



Route::prefix('v1/main')->group(function () {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::apiResource('equipment', EquipmentController::class);
        Route::apiResource('room', RoomController::class);
        Route::apiResource('booking', BookingController::class);
    });

    Route::middleware('auth:sanctum')->post('/booking/{id}/check-in', [BookingController::class, 'checkIn']);
});
