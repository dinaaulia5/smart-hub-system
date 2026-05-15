<?php

namespace App\Enums;

enum MessageType: string
{
    case CREATED = 'Successfully added';
    case UPDATED = 'Successfully updated';
    case DELETE = 'Successfully deleted';
    case ERROR = "There is an error";


    public function message(string $entity = '', ?string $error = null)
    {
        if ($this == MessageType::ERROR && $error) {
            return "{$this->value} {$error}";
        }

        return "{$this->value}{$entity}";
    }
}
