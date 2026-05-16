<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('users', UserController::class)->only(['index']);
    Route::resource('equipment', EquipmentController::class);
    Route::resource('room', RoomController::class);
    Route::resource('booking', BookingController::class);
    Route::resource('user', UserController::class);
    Route::get('activity-log', [ActivityLogController::class, 'index'])->name('activity-log.index');
});

require __DIR__ . '/auth.php';
