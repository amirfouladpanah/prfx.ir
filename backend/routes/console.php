<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('prfx:health', function () {
    $this->info('PRFX Laravel application is running.');
})->purpose('Check the PRFX application');
