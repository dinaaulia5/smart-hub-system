<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Booking extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'start_time',
        'end_time',
        'check_in_at',
        'status'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(BookingItem::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereHas('user', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%');
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
            'start_time',
            'end_time',
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
