<?php

namespace App\Enums;

enum BudgetType: string
{
    case INCOME = 'Income';
    case SAVING = 'Saving and Invesment';
    case DEBT = 'Debt Installment';
    case BILL = 'Bill';
    case SHOPING = 'Shoping';

    public static function options(array $exclude = []): array
    {
        return collect(self::cases())
            ->filter(fn($item) => !in_array($item->name, $exclude))
            ->map(fn($item) => [
                'value' => $item->value,
                'label' => $item->label
            ])->values()->toArray();
    }
}
