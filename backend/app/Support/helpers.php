<?php

if (! function_exists('toman')) {
    function toman(int|float $amount): string
    {
        return number_format((float) $amount, 0, '.', '٬') . ' تومان';
    }
}
