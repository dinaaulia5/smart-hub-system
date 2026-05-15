<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class BookingItem extends Model
{
    use HasUuids;

    protected $fillable = ['booking_id', 'bookable_id', 'bookable_type', 'quantity'];

    public function bookable(): MorphTo
    {
        return $this->morphTo();
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }
}
