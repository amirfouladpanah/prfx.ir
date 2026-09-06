<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable; use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable { use HasApiTokens; protected $guarded=[]; protected $hidden=['remember_token']; public function orders(){return $this->hasMany(Order::class);} public function addresses(){return $this->hasMany(Address::class);} public function reviews(){return $this->hasMany(Review::class);} }
