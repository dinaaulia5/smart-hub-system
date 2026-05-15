<?php

namespace App\Enums;

enum AssetType: string
{
    case CASH = 'Cash';
    case PERSONAL = 'Personal';
    case SHORTTERM = 'Short Term Investment';
    case MIDTERM = 'Mid Term Investment';
    case LONGTERM = 'Long Term Investment';

    public static function option(array $exclude = []): array
    {
        return collect(self::cases())
            ->filter(fn($item) => !in_array($item->name, $exclude))
            ->map(fn($item) => [
                'value' => $item->value,
                'label' => $item->label
            ])
            ->values()
            ->toArray();
    }
}
