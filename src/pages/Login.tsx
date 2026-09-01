import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useApp } from "../context/AppContext";
import brandIcon from "../imports/icon-prfx.png";

const FA = "'Vazirmatn', system-ui, sans-serif";

export default function Login() {
  const { login, isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([null, null, null, null, null]);

  useEffect(() => {
    if (isLoggedIn) navigate("/dashboard", { replace: true });
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  function sendOtp() {
    if (phone.length < 11) return;
    setPhase("otp");
    setOtp(["", "", "", "", ""]);
    setTimer(30);
    setTimeout(() => otpInputs.current[0]?.focus(), 120);
  }

  function handleOtpChange(i: number, val: string) {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    if (digit && i < 4) otpInputs.current[i + 1]?.focus();
    if (next.every((d) => d)) setTimeout(() => confirm(next), 300);
  }

  function handleOtpKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpInputs.current[i - 1]?.focus();
  }

  function confirm(digits = otp) {
    if (digits.join("").length < 5) return;
    login();
    navigate("/dashboard", { replace: true });
  }

  const cardStyle = { borderColor: "var(--border)", backgroundColor: "var(--bg-card)" };
  const inputStyle = { fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" };

  if (phase === "phone") return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/"><img src={brandIcon} alt="پرفیوم ایکس" className="h-12 mx-auto mb-2" /></Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>ورود به پرفیوم ایکس</h1>
          <p className="text-sm mt-2" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>شماره موبایل خود را وارد کنید</p>
        </div>

        <div className="border rounded-sm p-8" style={cardStyle}>
          <label className="block text-xs font-semibold mb-1.5 text-right" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>شماره موبایل</label>
          <input dir="ltr" type="tel" placeholder="09123456789" value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
            onKeyDown={(e) => e.key === "Enter" && sendOtp()}
            className="w-full px-4 py-3 text-center text-lg tracking-widest border outline-none transition-colors rounded-sm"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            autoFocus
          />
          <button onClick={sendOtp} disabled={phone.length < 11}
            className="w-full mt-4 py-3 text-sm font-bold transition-colors disabled:opacity-40"
            style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--gold-hover)"; }}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
          >دریافت کد تأیید</button>

          <p className="text-[11px] text-center mt-4" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>
            با ورود، <Link to="/privacy" className="underline" style={{ color: "var(--gold)" }}>شرایط استفاده</Link> را می‌پذیرید.
          </p>
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>← بازگشت به خانه</Link>
        </div>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link to="/"><img src={brandIcon} alt="پرفیوم ایکس" className="h-12 mx-auto mb-2" /></Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>تأیید شماره موبایل</h1>
          <p className="text-sm mt-2" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
            کد ۵ رقمی ارسال شده به <span dir="ltr" className="font-bold" style={{ color: "var(--fg)" }}>{phone}</span> را وارد کنید
          </p>
        </div>

        <div className="border rounded-sm p-8" style={cardStyle}>
          <div className="flex gap-3 justify-center mb-6" dir="ltr">
            {otp.map((digit, i) => (
              <input key={i}
                ref={(el) => { otpInputs.current[i] = el; }}
                type="tel" inputMode="numeric" maxLength={1} value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="w-12 h-14 text-center text-2xl font-bold border outline-none transition-all rounded-sm"
                style={{
                  fontFamily: FA,
                  backgroundColor: "var(--bg-muted)",
                  borderColor: digit ? "var(--gold)" : "var(--border)",
                  color: "var(--fg)",
                  boxShadow: digit ? "0 0 0 1px var(--gold)" : "none",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = digit ? "var(--gold)" : "var(--border)")}
              />
            ))}
          </div>

          <button onClick={() => confirm()} disabled={otp.join("").length < 5}
            className="w-full py-3 text-sm font-bold transition-colors disabled:opacity-40"
            style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
            onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--gold-hover)"; }}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
          >تأیید و ورود به حساب</button>

          <div className="flex items-center justify-between mt-4 text-xs">
            <button onClick={() => { setPhase("phone"); setOtp(["","","","",""]); }}
              style={{ fontFamily: FA, color: "var(--fg-dim)" }}>ویرایش شماره</button>
            {timer > 0 ? (
              <span style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>
                ارسال مجدد تا {timer} ثانیه دیگر
              </span>
            ) : (
              <button onClick={() => setTimer(30)} className="font-semibold" style={{ fontFamily: FA, color: "var(--gold)" }}>
                ارسال مجدد کد
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
