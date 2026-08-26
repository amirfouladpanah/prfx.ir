import { useState } from "react";
import { Link } from "react-router";
import brandIcon from "../imports/icon-prfx.png";

const FA = "'Vazirmatn', system-ui, sans-serif";

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{label}</label>
      <input
        dir="rtl"
        className="w-full px-4 py-3 text-sm border outline-none transition-colors rounded-sm"
        style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
        onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        {...props}
      />
    </div>
  );
}

export default function Login() {
  const [tab, setTab]         = useState<"login" | "register">("login");
  const [email, setEmail]     = useState("");
  const [password, setPass]   = useState("");
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [done, setDone]       = useState(false);

  if (done) return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--bg)" }}>
      <div className="text-center">
        <img src={brandIcon} alt="پرفیوم ایکس" className="h-14 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: FA, color: "var(--fg)" }}>
          {tab === "login" ? "خوش آمدید!" : "ثبت‌نام موفق!"}
        </h2>
        <p className="text-sm mb-6" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
          {tab === "login" ? "با موفقیت وارد حساب خود شدید." : "حساب شما ایجاد شد. اکنون می‌توانید خرید کنید."}
        </p>
        <Link to="/" className="inline-block px-6 py-3 text-sm font-bold" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>بازگشت به خانه</Link>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/"><img src={brandIcon} alt="پرفیوم ایکس" className="h-12 mx-auto mb-2" /></Link>
          <h1 className="text-2xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>پرفیوم ایکس</h1>
        </div>

        {/* Card */}
        <div className="border rounded-sm p-8" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          {/* Tabs */}
          <div className="flex mb-6 border-b" style={{ borderColor: "var(--border)" }}>
            {(["login", "register"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className="flex-1 pb-3 text-sm font-semibold transition-all border-b-2 -mb-px"
                style={{ fontFamily: FA, borderColor: tab === t ? "var(--gold)" : "transparent", color: tab === t ? "var(--gold)" : "var(--fg-dim)" }}
              >
                {t === "login" ? "ورود" : "ثبت‌نام"}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {tab === "register" && (
              <>
                <Input label="نام و نام خانوادگی" placeholder="علی محمدی" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="شماره موبایل" type="tel" placeholder="09123456789" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </>
            )}
            <Input label="آدرس ایمیل" type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input label="رمز عبور" type="password" placeholder="••••••••" value={password} onChange={(e) => setPass(e.target.value)} />

            {tab === "login" && (
              <div className="text-left">
                <a href="#" className="text-xs" style={{ fontFamily: FA, color: "var(--gold)" }}>فراموشی رمز عبور؟</a>
              </div>
            )}

            <button
              onClick={() => setDone(true)}
              disabled={!email || !password || (tab === "register" && !name)}
              className="w-full py-3 text-sm font-bold transition-colors mt-2 disabled:opacity-40"
              style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
              onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--gold-hover)"; }}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
            >
              {tab === "login" ? "ورود به حساب" : "ایجاد حساب"}
            </button>

            {tab === "login" && (
              <>
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
                  <span className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>یا</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
                </div>
                <button className="w-full py-3 text-sm border transition-colors" style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  ورود با شماره موبایل (OTP)
                </button>
              </>
            )}
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
          {tab === "login" ? "حساب ندارید؟ " : "حساب دارید؟ "}
          <button onClick={() => setTab(tab === "login" ? "register" : "login")} className="font-semibold" style={{ color: "var(--gold)" }}>
            {tab === "login" ? "ثبت‌نام کنید" : "وارد شوید"}
          </button>
        </p>
      </div>
    </div>
  );
}
