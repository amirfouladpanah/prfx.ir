<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{AuthController,ProductController,OrderController};
Route::prefix('auth')->group(function(){Route::post('otp/send',[AuthController::class,'sendOtp']);Route::post('otp/verify',[AuthController::class,'verifyOtp']);});
Route::get('products',[ProductController::class,'index']); Route::get('products/{product}',[ProductController::class,'show']);
Route::middleware('auth:sanctum')->group(function(){Route::get('me',[AuthController::class,'me']);Route::post('auth/logout',[AuthController::class,'logout']);Route::get('orders',[OrderController::class,'index']);Route::get('orders/{order}',[OrderController::class,'show']);Route::post('orders',[OrderController::class,'store']);});
