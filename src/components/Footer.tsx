import { Link } from "react-router";
import brandIcon from "../imports/icon-prfx.png";

const FA = "'Vazirmatn', system-ui, sans-serif";

const NAV = [
  { fa: "فروشگاه", href: "/shop" },
  { fa: "درباره ما", href: "/about" },
  { fa: "مجله", href: "/journal" },
  { fa: "تماس", href: "/contact" },
];

const SUPPORT = [
  { fa: "ارسال", href: "/shipping" },
  { fa: "مرجوعی", href: "/returns" },
  { fa: "سوالات متداول", href: "/faq" },
  { fa: "حریم خصوصی", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer dir="rtl" className="mt-20 border-t transition-colors" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="md:col-span-2 text-right">
          <div className="flex items-center gap-3 mb-4">
            <img src={brandIcon} alt="پرفیوم ایکس" className="h-10 w-auto" />
            <span className="text-xl font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>پرفیوم ایکس</span>
          </div>
          <p className="text-sm leading-loose max-w-xs mb-6" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
            عطرهای لوکس با الهام از مواد نادر و خاطرات ماندگار. ساخته شده با عشق از سال ۱۳۶۶ برای کسانی که زبان بوی خوش را می‌فهمند.
          </p>
          {/* Enamad placeholder */}
          <div className="inline-flex flex-col items-center gap-1">
            <div
              className="w-16 h-20 rounded border flex items-center justify-center text-xs font-bold"
              style={{ borderColor: "var(--border)", color: "var(--fg-dimmer)", backgroundColor: "var(--bg-muted)" }}
              title="نماد اعتماد الکترونیکی"
            >
              <div className="text-center leading-tight" style={{ fontFamily: FA }}>
                <div style={{ color: "var(--gold)", fontSize: 18 }}>★</div>
                <div>اینماد</div>
              </div>
            </div>
            <p className="text-[10px]" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>نماد اعتماد</p>
          </div>
        </div>

        {/* Nav */}
        <div className="text-right">
          <p className="text-xs font-semibold mb-4 tracking-wide" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>راهنمایی</p>
          <ul className="space-y-3">
            {NAV.map((l) => (
              <li key={l.fa}>
                <Link to={l.href} className="text-sm transition-colors" style={{ fontFamily: FA, color: "var(--fg-dim)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--gold)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fg-dim)")}
                >{l.fa}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="text-right">
          <p className="text-xs font-semibold mb-4 tracking-wide" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>پشتیبانی</p>
          <ul className="space-y-3">
            {SUPPORT.map((l) => (
              <li key={l.fa}>
                <Link to={l.href} className="text-sm transition-colors" style={{ fontFamily: FA, color: "var(--fg-dim)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--gold)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fg-dim)")}
                >{l.fa}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs mb-2" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>تماس با ما</p>
            <p className="text-sm" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>021-88001234</p>
            <p className="text-sm mt-1" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>info@perfumex.ir</p>
          </div>
        </div>
      </div>

      <div className="border-t px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>© ۱۴۰۵ پرفیوم ایکس. کلیه حقوق محفوظ است.</p>
        <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>طراحی و توسعه با ❤️ در ایران</p>
      </div>
    </footer>
  );
}
