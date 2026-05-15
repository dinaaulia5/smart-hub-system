<?php

namespace App\Enums;

enum LiabilityType: string
{
    case SHORTTERMDEBT = 'Short Term Debt';
    case MIDTERMDEBT = 'Mid Term Debt';
    case LONGTERMDEBT = 'Long Term Debt';

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
