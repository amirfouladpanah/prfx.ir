<?php

use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;

Route::get('/', [StoreController::class, 'home'])->name('home');
Route::get('/shop', [StoreController::class, 'shop'])->name('shop');
Route::get('/product/{product}', [StoreController::class, 'product'])->name('product');
Route::get('/cart', [StoreController::class, 'cart'])->name('cart');
Route::get('/login', [StoreController::class, 'login'])->name('login');
Route::get('/account', [StoreController::class, 'account'])->name('account');
