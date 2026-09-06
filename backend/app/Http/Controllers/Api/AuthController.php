<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller; use App\Models\User; use Illuminate\Http\Request; use Illuminate\Support\Facades\Cache;
class AuthController extends Controller {
 public function sendOtp(Request $r){$d=$r->validate(['phone'=>['required','regex:/^09\d{9}$/']]); $otp=(string)random_int(10000,99999); Cache::put('otp:'.$d['phone'],hash('sha256',$otp),now()->addMinutes(2)); return response()->json(['message'=>'کد تأیید ارسال شد','debug_otp'=>app()->isLocal()?$otp:null]);}
 public function verifyOtp(Request $r){$d=$r->validate(['phone'=>['required','regex:/^09\d{9}$/'],'otp'=>'required|digits:5']); abort_unless(hash_equals((string)Cache::get('otp:'.$d['phone']),hash('sha256',$d['otp'])),422,'کد تأیید نامعتبر است'); $u=User::firstOrCreate(['phone'=>$d['phone']],['name'=>'کاربر '.substr($d['phone'],-4)]); Cache::forget('otp:'.$d['phone']); return ['token'=>$u->createToken('web')->plainTextToken,'user'=>$u]; }
 public function me(Request $r){return $r->user();} public function logout(Request $r){$r->user()->currentAccessToken()?->delete(); return ['message'=>'خروج انجام شد'];}
}
