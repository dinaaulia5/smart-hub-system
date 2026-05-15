<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
