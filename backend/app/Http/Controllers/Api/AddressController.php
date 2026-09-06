<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    public function index(Request $request) { return $request->user()->addresses()->latest()->get(); }

    public function store(Request $request)
    {
        $data = $request->validate([
            'label' => ['nullable','string','max:50'],
            'receiver' => ['required','string','max:120'],
            'phone' => ['required','regex:/^09\d{9}$/'],
            'province' => ['required','string','max:100'],
            'city' => ['required','string','max:100'],
            'postal_code' => ['required','string','max:20'],
            'address' => ['required','string','max:2000'],
            'is_default' => ['sometimes','boolean'],
        ]);
        if (($data['is_default'] ?? false) === true) $request->user()->addresses()->update(['is_default' => false]);
        if ($request->user()->addresses()->count() === 0) $data['is_default'] = true;
        return response()->json($request->user()->addresses()->create($data), 201);
    }

    public function update(Request $request, int $address)
    {
        $model = $request->user()->addresses()->findOrFail($address);
        $data = $request->validate([
            'label' => ['nullable','string','max:50'], 'receiver' => ['required','string','max:120'],
            'phone' => ['required','regex:/^09\d{9}$/'], 'province' => ['required','string','max:100'],
            'city' => ['required','string','max:100'], 'postal_code' => ['required','string','max:20'],
            'address' => ['required','string','max:2000'], 'is_default' => ['sometimes','boolean'],
        ]);
        if (($data['is_default'] ?? false) === true) $request->user()->addresses()->whereKeyNot($model->id)->update(['is_default' => false]);
        return response()->json(tap($model)->update($data) ? $model->fresh() : $model);
    }

    public function destroy(Request $request, int $address)
    {
        $model = $request->user()->addresses()->findOrFail($address);
        $wasDefault = $model->is_default;
        $model->delete();
        if ($wasDefault) $request->user()->addresses()->latest('id')->limit(1)->update(['is_default' => true]);
        return response()->noContent();
    }
}
