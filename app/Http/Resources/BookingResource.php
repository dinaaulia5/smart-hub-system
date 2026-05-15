<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'user' => [
                'id' => $this->user?->id,
                'name' => $this->user?->name,
            ],

            'items' => $this->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'type' => class_basename($item->bookable_type),

                    'bookable' => [
                        'id' => $item->bookable?->id,
                        'name' => $item->bookable?->name,
                    ],
                ];
            }),

            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'check_in_at' => $this->check_in_at,
            'status' => $this->status,
            'created_at' => $this->created_at?->format('Y-m-d'),
        ];
    }
}
