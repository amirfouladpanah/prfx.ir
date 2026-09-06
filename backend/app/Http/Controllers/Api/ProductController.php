<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()
            ->with(['variants', 'images'])
            ->withCount(['reviews as approved_reviews_count' => fn ($q) => $q->where('status', 'approved')]);

        if ($request->filled('search')) {
            $search = trim((string) $request->input('search'));
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('brand', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        foreach (['brand', 'gender', 'family'] as $field) {
            if ($request->filled($field)) {
                $values = is_array($request->input($field)) ? $request->input($field) : [$request->input($field)];
                $query->whereIn($field, $values);
            }
        }

        if ($request->filled('season')) $query->whereJsonContains('season', $request->input('season'));
        if ($request->filled('min_price') && is_numeric($request->input('min_price'))) $query->where('price', '>=', (float) $request->input('min_price'));
        if ($request->filled('max_price') && is_numeric($request->input('max_price'))) $query->where('price', '<=', (float) $request->input('max_price'));

        match ($request->input('sort')) {
            'asc' => $query->orderBy('price'),
            'desc' => $query->orderByDesc('price'),
            'newest' => $query->orderByDesc('is_new')->orderByDesc('created_at'),
            default => $query->latest('id'),
        };

        return $query->paginate(min(max($request->integer('per_page', 12), 1), 50));
    }

    public function show(Product $product)
    {
        return response()->json($product->load([
            'variants',
            'images',
            'reviews' => fn ($q) => $q->where('status', 'approved')->with('user:id,name'),
        ]));
    }
}
