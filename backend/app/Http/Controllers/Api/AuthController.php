<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function sendOtp(Request $request)
    {
        $data = $request->validate(['phone' => ['required', 'regex:/^09\d{9}$/']]);
        $key = 'otp-send:' . $data['phone'];
        $count = (int) Cache::get($key, 0);
        if ($count >= 3) {
            throw ValidationException::withMessages(['phone' => ['تعداد درخواست‌ها زیاد است؛ چند دقیقه بعد دوباره تلاش کنید.']]);
        }
        Cache::put($key, $count + 1, now()->addMinutes(1));
        $otp = (string) random_int(10000, 99999);
        Cache::put('otp:' . $data['phone'], hash('sha256', $otp), now()->addMinutes(2));
        $response = ['message' => 'کد تأیید ارسال شد.'];
        if (app()->isLocal()) $response['debug_otp'] = $otp;
        return response()->json($response);
    }

    public function verifyOtp(Request $request)
    {
        $data = $request->validate([
            'phone' => ['required', 'regex:/^09\d{9}$/'],
            'otp' => ['required', 'digits:5'],
        ]);
        $stored = Cache::get('otp:' . $data['phone']);
        if (! $stored || ! hash_equals((string) $stored, hash('sha256', $data['otp']))) {
            throw ValidationException::withMessages(['otp' => ['کد تأیید نامعتبر یا منقضی شده است.']]);
        }
        $user = User::firstOrCreate(
            ['phone' => $data['phone']],
            ['name' => 'کاربر ' . substr($data['phone'], -4)]
        );
        Cache::forget('otp:' . $data['phone']);
        return response()->json(['token' => $user->createToken('web')->plainTextToken, 'user' => $user]);
    }

    public function me(Request $request) { return response()->json($request->user()); }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();
        return response()->json(['message' => 'خروج انجام شد.']);
    }
}
