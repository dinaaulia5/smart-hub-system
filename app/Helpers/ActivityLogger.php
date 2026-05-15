<?php


namespace App\Helpers;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;


class ActivityLogger
{
    public static function log($description, $model = null)
    {
        $request = request();

        return ActivityLog::create([
            'id' => Str::uuid(),
            'user_id' => $model?->user_id ?? Auth::id(),
            'description' => $description,
            'loggable_id' => $model?->id,
            'loggable_type' => $model ? get_class($model) : null,
            'ip_address' => $request->ip(),
            'browser' => self::getBrowser($request->userAgent()),
            'os' => self::getOS($request->userAgent()),
            'user_agent' => $request->userAgent() ?? 'Unknown',
        ]);
    }

    private static function getBrowser($userAgent)
    {
        if (!$userAgent) return 'Unknown';
        if (str_contains($userAgent, 'Chrome')) return 'Chrome';
        if (str_contains($userAgent, 'Firefox')) return 'Firefox';
        if (str_contains($userAgent, 'Safari') && !str_contains($userAgent, 'Chrome')) return 'Safari';
        return 'Unknown';
    }

    private static function getOS($userAgent)
    {
        if (!$userAgent) return 'Unknown';
        if (str_contains($userAgent, 'Windows')) return 'Windows';
        if (str_contains($userAgent, 'Linux')) return 'Linux';
        if (str_contains($userAgent, 'Android')) return 'Android';
        if (str_contains($userAgent, 'iPhone') || str_contains($userAgent, 'iPad')) return 'iOS';
        return 'Unknown';
    }
}
