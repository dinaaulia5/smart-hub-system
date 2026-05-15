<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|uuid|exists:users,id',

            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',

            'items' => 'required|array|min:1',

            'items.*.type' => 'required|in:room,equipment',
            'items.*.id' => 'required|uuid',
            'items.*.quantity' => 'nullable|integer|min:1',
        ];
    }
}
