<?php

namespace App\Enums;

enum PaymentType: string
{
    case CASH = 'Kash';
    case DEBIT = 'Debit';
    case CREDIT = 'Credit';
    case EWALLET = 'E-wallet';

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
