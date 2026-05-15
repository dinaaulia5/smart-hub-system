<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'code', 'capacity', 'location', 'status'];

    public function bookings()
    {
        return $this->morphMany(BookingItem::class, 'bookable');
    }
}
