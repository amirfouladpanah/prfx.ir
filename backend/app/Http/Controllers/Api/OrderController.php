<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->orders()->with('items.product')->latest()->paginate(10);
    }

    public function show(Request $request, Order $order)
    {
        abort_unless((int) $order->user_id === (int) $request->user()->id, 403);
        return $order->load('items.product');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'integer', 'exists:products,id'],
            'items.*.volume_ml' => ['required', 'integer', 'min:1'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:50'],
            'shipping_method' => ['required', 'in:post,tipax'],
            'receiver' => ['required', 'string', 'max:120'],
            'phone' => ['required', 'regex:/^09\d{9}$/'],
            'province' => ['required', 'string', 'max:100'],
            'city' => ['required', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:20'],
            'address' => ['required', 'string', 'max:2000'],
            'note' => ['nullable', 'string', 'max:1000'],
        ]);

        return DB::transaction(function () use ($data, $request) {
            $subtotal = 0;
            $rows = [];

            foreach ($data['items'] as $item) {
                $variant = ProductVariant::query()
                    ->where('product_id', $item['product_id'])
                    ->where('volume_ml', $item['volume_ml'])
                    ->with('product:id,name')
                    ->lockForUpdate()
                    ->first();

                if (! $variant) {
                    throw ValidationException::withMessages([
                        'items' => ['حجم انتخاب‌شده برای این محصول وجود ندارد.'],
                    ]);
                }

                if ($variant->stock < $item['quantity']) {
                    throw ValidationException::withMessages([
                        'items' => ["موجودی {$variant->product->name} کافی نیست."],
                    ]);
                }

                $lineTotal = (float) $variant->price * $item['quantity'];
                $subtotal += $lineTotal;
                $rows[] = [$variant, $item['quantity'], $lineTotal];
                $variant->decrement('stock', $item['quantity']);
            }

            $shippingCost = $subtotal >= 5000000
                ? 0
                : ($data['shipping_method'] === 'post' ? 120000 : 0);

            $order = $request->user()->orders()->create([
                'tracking_code' => $this->uniqueTrackingCode(),
                'status' => 'pending',
                'shipping_method' => $data['shipping_method'],
                'subtotal' => $subtotal,
                'discount' => 0,
                'shipping_cost' => $shippingCost,
                'total' => $subtotal + $shippingCost,
                'receiver' => $data['receiver'],
                'phone' => $data['phone'],
                'province' => $data['province'],
                'city' => $data['city'],
                'postal_code' => $data['postal_code'],
                'address' => $data['address'],
                'note' => $data['note'] ?? null,
            ]);

            foreach ($rows as [$variant, $quantity, $lineTotal]) {
                $order->items()->create([
                    'product_id' => $variant->product_id,
                    'volume_ml' => $variant->volume_ml,
                    'product_name' => $variant->product->name,
                    'unit_price' => $variant->price,
                    'quantity' => $quantity,
                    'line_total' => $lineTotal,
                ]);
            }

            return response()->json($order->load('items.product'), 201);
        });
    }

    private function uniqueTrackingCode(): string
    {
        do {
            $code = 'PX-' . random_int(100000, 999999);
        } while (Order::where('tracking_code', $code)->exists());

        return $code;
    }
}
