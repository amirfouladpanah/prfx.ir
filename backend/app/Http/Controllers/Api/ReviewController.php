<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $data = $request->validate(['rating' => ['required','integer','min:1','max:5'], 'body' => ['nullable','string','max:2000']]);
        $review = Review::updateOrCreate(
            ['product_id' => $product->id, 'user_id' => $request->user()->id],
            ['rating' => $data['rating'], 'body' => $data['body'] ?? null, 'status' => 'pending']
        );
        return response()->json($review, 201);
    }

    public function destroy(Request $request, Review $review)
    {
        abort_unless((int) $review->user_id === (int) $request->user()->id, 403);
        $review->delete();
        return response()->noContent();
    }
}
