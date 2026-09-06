<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Product extends Model {
 protected $guarded=[]; protected $casts=['season'=>'array','pyramid'=>'array','is_new'=>'boolean','is_bestseller'=>'boolean','is_autumn'=>'boolean'];
 public function variants(): HasMany { return $this->hasMany(ProductVariant::class); }
 public function images(): HasMany { return $this->hasMany(ProductImage::class)->orderBy('sort_order'); }
 public function reviews(): HasMany { return $this->hasMany(Review::class); }
}
