<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('products', function (Blueprint $t) {
            $t->id(); $t->string('sku')->unique(); $t->string('name'); $t->string('subtitle')->nullable();
            $t->string('brand'); $t->unsignedBigInteger('category_id')->nullable(); $t->decimal('price', 15, 2); $t->decimal('original_price', 15, 2)->nullable();
            $t->unsignedTinyInteger('discount')->nullable(); $t->string('notes')->nullable(); $t->string('image')->nullable();
            $t->string('tag')->nullable(); $t->enum('gender',['مردانه','زنانه','یونیسکس']); $t->boolean('is_new')->default(false);
            $t->boolean('is_bestseller')->default(false); $t->boolean('is_autumn')->default(false); $t->string('family')->nullable();
            $t->json('season')->nullable(); $t->string('concentration')->nullable(); $t->text('description')->nullable(); $t->json('pyramid')->nullable();
            $t->decimal('rating',3,2)->default(0); $t->unsignedInteger('rating_count')->default(0); $t->unsignedInteger('stock')->default(0); $t->timestamps();
            $t->index(['brand','gender','family']);
        });
        Schema::create('product_images', fn(Blueprint $t) => $t->id()->foreignId('product_id')->constrained()->cascadeOnDelete()->string('url')->string('alt')->nullable()->unsignedInteger('sort_order')->default(0));
        Schema::create('product_variants', function(Blueprint $t){ $t->id(); $t->foreignId('product_id')->constrained()->cascadeOnDelete(); $t->unsignedInteger('volume_ml'); $t->decimal('price',15,2); $t->decimal('original_price',15,2)->nullable(); $t->unsignedTinyInteger('discount')->nullable(); $t->unsignedInteger('stock')->default(0); $t->unique(['product_id','volume_ml']); });
        Schema::create('addresses', function(Blueprint $t){ $t->id(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->string('label')->nullable(); $t->string('receiver'); $t->string('phone',20); $t->string('province'); $t->string('city'); $t->string('postal_code',20); $t->text('address'); $t->boolean('is_default')->default(false); $t->timestamps(); });
        Schema::create('orders', function(Blueprint $t){ $t->id(); $t->foreignId('user_id')->nullable()->constrained()->nullOnDelete(); $t->string('tracking_code')->unique(); $t->string('status')->default('pending'); $t->string('shipping_method'); $t->decimal('subtotal',15,2); $t->decimal('discount',15,2)->default(0); $t->decimal('shipping_cost',15,2)->default(0); $t->decimal('total',15,2); $t->string('receiver'); $t->string('phone',20); $t->string('province'); $t->string('city'); $t->string('postal_code',20); $t->text('address'); $t->text('note')->nullable(); $t->timestamp('paid_at')->nullable(); $t->timestamps(); $t->index(['user_id','status']); });
        Schema::create('order_items', function(Blueprint $t){ $t->id(); $t->foreignId('order_id')->constrained()->cascadeOnDelete(); $t->foreignId('product_id')->constrained()->restrictOnDelete(); $t->unsignedInteger('volume_ml'); $t->string('product_name'); $t->decimal('unit_price',15,2); $t->unsignedInteger('quantity'); $t->decimal('line_total',15,2); });
        Schema::create('reviews', function(Blueprint $t){ $t->id(); $t->foreignId('product_id')->constrained()->cascadeOnDelete(); $t->foreignId('user_id')->constrained()->cascadeOnDelete(); $t->unsignedTinyInteger('rating'); $t->text('body')->nullable(); $t->string('status')->default('pending'); $t->timestamps(); $t->unique(['product_id','user_id']); });
    }
    public function down(): void { foreach(['reviews','order_items','orders','addresses','product_variants','product_images','products'] as $t) Schema::dropIfExists($t); }
};
