<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ActivityLog extends Model
{
    protected $table = 'activity_logs';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'user_id',
        'description',
        'loggable_id',
        'loggable_type',
        'ip_address',
        'browser',
        'os',
        'user_agent'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeSorting($query, array $sorts)
    {
        $field = $sorts['field'] ?? 'created_at';
        $direction = $sorts['direction'] ?? 'desc';

        $allowedFields = [
            'description',
            'browser',
            'os',
            'created_at',
        ];

        if (!in_array($field, $allowedFields)) {
            $field = 'created_at';
        }

        if (!in_array($direction, ['asc', 'desc'])) {
            $direction = 'desc';
        }

        $query->orderBy($field, $direction);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {

            $query->where(function ($query) use ($search) {

                $query->where('description', 'like', '%' . $search . '%')
                    ->orWhere('browser', 'like', '%' . $search . '%')
                    ->orWhere('os', 'like', '%' . $search . '%')
                    ->orWhereHas('user', function ($query) use ($search) {
                        $query->where('name', 'like', '%' . $search . '%')
                            ->orWhere('email', 'like', '%' . $search . '%');
                    });
            });
        });
    }
}
