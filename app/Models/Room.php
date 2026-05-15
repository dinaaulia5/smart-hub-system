<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasUuids;

    protected $fillable = ['name', 'code', 'capacity', 'location', 'status'];

    public function bookingItems()
    {
        return $this->morphMany(BookingItem::class, 'bookable');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('code', 'like', '%' . $search . '%')
                    ->orWhere('location', 'like', '%' . $search . '%');
            });
        });

        $query->when($filters['status'] ?? null, function ($query, $status) {
            $query->where('status', $status);
        });
    }

    public function scopeSorting($query, array $sorts)
    {
        $field = $sorts['field'] ?? 'created_at';
        $direction = $sorts['direction'] ?? 'desc';

        $allowedFields = [
            'name',
            'code',
            'capacity',
            'location',
            'status',
            'created_at',
        ];

        if (! in_array($field, $allowedFields)) {
            $field = 'created_at';
        }

        if (! in_array($direction, ['asc', 'desc'])) {
            $direction = 'desc';
        }

        $query->orderBy($field, $direction);
    }
}
