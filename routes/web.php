<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\RoomController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::resource('equipment', EquipmentController::class);
    Route::resource('room', RoomController::class);
});


require __DIR__ . '/auth.php';
