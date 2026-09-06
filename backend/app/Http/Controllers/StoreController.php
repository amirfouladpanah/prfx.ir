<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\View\View;

class StoreController extends Controller
{
    public function home(): View
    {
        return view('store', [
            'page' => 'home',
            'products' => Product::with('variants')->latest()->take(8)->get(),
        ]);
    }

    public function shop(): View
    {
        return view('store', [
            'page' => 'shop',
            'products' => Product::with('variants')->latest()->paginate(24),
        ]);
    }

    public function product(Product $product): View
    {
        $product->load(['variants', 'images', 'reviews' => fn ($q) => $q->where('status', 'approved')->latest()]);
        return view('store', ['page' => 'product', 'product' => $product]);
    }

    public function cart(): View { return view('store', ['page' => 'cart']); }
    public function login(): View { return view('store', ['page' => 'login']); }
    public function account(): View { return view('store', ['page' => 'account']); }
}
