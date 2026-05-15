<?php

// if (!file_exists('flashMessage')) {
//     function flashMessage($message, $type = 'success'): void
//     {
//         session()->flash('message', $message);
//         session()->flash('type', $type);
//     }
// }



if (!function_exists('flashMessage')) {
    function flashMessage($message, $type = 'success'): void
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}
