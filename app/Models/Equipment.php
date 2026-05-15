<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasUuids;

    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = ['name', 'brand', 'stock'];
    protected $table = 'equipments';

    public function bookingItems()
    {
        return $this->morphMany(BookingItem::class, 'bookable');
    }
}
