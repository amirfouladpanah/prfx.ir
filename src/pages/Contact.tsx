import { useState } from "react";

const FA = "'Vazirmatn', system-ui, sans-serif";

function Input({ label, as: As = "input", ...props }: { label: string; as?: "input" | "textarea" } & (React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>)) {
  const cls = "w-full px-4 py-3 text-sm border outline-none transition-colors rounded-sm";
  const style = { fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" };
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{label}</label>
      {As === "textarea"
        ? <textarea dir="rtl" rows={4} className={cls} style={style} onFocus={(e) => (e.target.style.borderColor = "var(--gold)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        : <input dir="rtl" className={cls} style={style} onFocus={(e) => (e.target.style.borderColor = "var(--gold)")} onBlur={(e) => (e.target.style.borderColor = "var(--border)")} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      }
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div dir="rtl" className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <div className="text-right mb-12">
        <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>در تماس باشید</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>تماس با ما</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Info */}
        <div className="lg:col-span-2 space-y-6">
          {[
            { icon: "📍", title: "آدرس", desc: "تهران، خیابان ولیعصر، پلاک ۱۲۴۵، طبقه دوم" },
            { icon: "📞", title: "تلفن", desc: "021-88001234\n021-88001235" },
            { icon: "✉️", title: "ایمیل", desc: "info@perfumex.ir\nsupport@perfumex.ir" },
            { icon: "🕐", title: "ساعت کار", desc: "شنبه تا چهارشنبه: ۹ تا ۱۸\nپنجشنبه: ۹ تا ۱۳" },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 text-right">
              <span className="text-2xl mt-1">{item.icon}</span>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ fontFamily: FA, color: "var(--fg)" }}>{item.title}</p>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-3 border rounded-sm p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center gap-4">
              <span className="text-5xl">✅</span>
              <h2 className="text-xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>پیام شما دریافت شد!</h2>
              <p className="text-sm" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>ما در اسرع وقت با شما تماس خواهیم گرفت.</p>
              <button onClick={() => setSent(false)} className="text-sm" style={{ fontFamily: FA, color: "var(--gold)" }}>ارسال پیام دیگر</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-right mb-2" style={{ fontFamily: FA, color: "var(--fg)" }}>فرم تماس</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="نام و نام خانوادگی" placeholder="علی محمدی" />
                <Input label="شماره موبایل" type="tel" placeholder="09123456789" />
              </div>
              <Input label="آدرس ایمیل" type="email" placeholder="example@email.com" />
              <Input label="موضوع" placeholder="موضوع پیام خود را بنویسید..." />
              <Input label="پیام" as="textarea" placeholder="پیام خود را اینجا بنویسید..." />
              <button onClick={() => setSent(true)} className="w-full py-3 text-sm font-bold transition-colors" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--gold-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
              >ارسال پیام</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
