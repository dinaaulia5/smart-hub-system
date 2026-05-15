<?php

namespace App\Console\Commands;

use App\Helpers\ActivityLogger;
use App\Models\Booking;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ExpireBookingCommand extends Command
{
    protected $signature = 'booking:expire';
    protected $description = 'Auto reject expired bookings';

    public function handle()
    {
        $expiredBookings = Booking::where('status', 'pending')
            ->where('start_time', '<', now()->subMinutes(15))
            ->get();

        foreach ($expiredBookings as $booking) {

            DB::transaction(function () use ($booking) {

                // kembalikan stok / status item
                foreach ($booking->items as $item) {

                    if ($item->bookable_type === \App\Models\Equipment::class) {
                        $item->bookable->increment('stock', $item->quantity);
                    } else {
                        $item->bookable->update(['status' => 'available']);
                    }
                }

                $booking->update([
                    'status' => 'rejected'
                ]);

                ActivityLogger::log(
                    "Sistem: Booking #{$booking->id} auto rejected (15 menit)",
                    $booking
                );
            });
        }

        $this->info('Expired bookings processed successfully');
    }
}
