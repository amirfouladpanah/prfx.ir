import { Link } from "react-router";
import { PRODUCTS } from "../data/products";
import HorizontalScroll from "../components/HorizontalScroll";

const FA = "'Vazirmatn', system-ui, sans-serif";

const bestsellers  = PRODUCTS.filter((p) => p.isBestseller);
const newest       = PRODUCTS.filter((p) => p.isNew);
const discounted   = PRODUCTS.filter((p) => !!p.discount);
const autumn       = PRODUCTS.filter((p) => p.isAutumn);

/* ─── Animated scroll indicator ─── */
function ScrollIndicator({ onScroll }: { onScroll: () => void }) {
  return (
    <div onClick={onScroll} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer">
      <p className="text-xs tracking-[0.25em] uppercase" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>اسکرول</p>
      {/* Mouse outline with animated dot */}
      <div
        className="w-6 h-10 rounded-full border-2 flex justify-center pt-1.5"
        style={{ borderColor: "var(--fg-dimmer)" }}
      >
        <span
          className="w-1 h-2 rounded-full"
          style={{
            backgroundColor: "var(--gold)",
            animation: "scrollDot 1.8s cubic-bezier(0.45,0,0.55,1) infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          60%  { transform: translateY(14px); opacity: 0.3; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Hero ─── */
function Hero() {
  function scrollToFeatures() {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "var(--bg-card2)" }}>
      {/* Autumn perfume image — perfume bottle on a boot (warm amber tones) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=1800&h=1000&fit=crop&auto=format')",
          opacity: 0.38,
        }}
      />
      {/* Warm amber colour grade overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(100,50,10,0.45) 0%, transparent 60%, rgba(0,0,0,0.2) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, var(--overlay) 0%, transparent 45%, var(--bg) 100%)" }}
      />

      <div dir="rtl" className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ fontFamily: FA, color: "var(--gold)" }}>
          مجموعه جدید — پاییز ۱۴۰۵
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: FA, color: "var(--fg)" }}>
          هنرِ{" "}
          <em className="not-italic" style={{ color: "var(--gold)" }}>عطر</em>
        </h1>
        <p className="text-base md:text-lg font-light leading-loose mb-10 max-w-xl mx-auto" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
          مواد نادر. ترکیب‌های ماندگار. هر عطر تصویری از یک احساس است، ساخته شده برای کسانی که زبان بوی خوش را می‌فهمند.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="px-8 py-3.5 text-sm font-bold transition-colors duration-200"
            style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold-hover)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold)")}
          >
            مشاهده مجموعه
          </Link>
          <Link
            to="/about"
            className="px-8 py-3.5 text-sm border transition-colors duration-200"
            style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-muted)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
          >
            داستان ما
          </Link>
        </div>
      </div>

      <ScrollIndicator onScroll={scrollToFeatures} />
    </section>
  );
}

/* ─── Autumn Banner ─── */
function AutumnBanner() {
  return (
    <section dir="rtl" className="overflow-hidden mx-4 sm:mx-6 my-8 max-w-7xl md:mx-auto rounded-sm">
      <div
        className="relative h-72 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=1400&h=600&fit=crop&auto=format')",
          backgroundColor: "var(--bg-card2)",
        }}
      >
        {/* Warm amber overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(100,55,10,0.7) 0%, rgba(10,8,5,0.85) 60%)" }} />

        <div className="absolute inset-0 flex flex-col items-end justify-center px-10 md:px-16 text-right">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: FA, color: "var(--gold)" }}>
            ویژه پاییز ۱۴۰۵
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight max-w-md" style={{ fontFamily: FA, color: "var(--fg)" }}>
            بهترین‌های پاییز،<br />
            <em className="not-italic" style={{ color: "var(--gold)" }}>برای روح‌های جسور</em>
          </h2>
          <p className="text-sm md:text-base leading-relaxed max-w-sm mb-6" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
            پاییز فصل گرما در سرماست. عطرهایی که ما برایت انتخاب کرده‌ایم از دل برگ‌های طلایی، چوب صندل و دود گرم الهام گرفته‌اند—عطری برای هر روز که می‌خواهی به یاد بمانی.
          </p>
          <div className="flex gap-3">
            <Link
              to="/shop"
              className="px-6 py-3 text-sm font-bold transition-colors duration-200"
              style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold-hover)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--gold)")}
            >
              خرید اکنون
            </Link>
            <Link
              to="/shop"
              className="px-6 py-3 text-sm font-semibold border transition-colors duration-200"
              style={{ fontFamily: FA, borderColor: "rgba(201,168,76,0.5)", color: "var(--fg-muted)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.5)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
            >
              تا ۳۰٪ تخفیف ویژه
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Feature strip ─── */
function Features() {
  const items = [
    { icon: "🚚", title: "ارسال رایگان", sub: "برای خرید بالای ۵۰۰ هزار تومان" },
    { icon: "🔒", title: "پرداخت امن", sub: "درگاه مستقیم بانکی" },
    { icon: "↩️", title: "بازگشت ۷ روزه", sub: "بدون سوال، بدون دردسر" },
    { icon: "🎁", title: "بسته‌بندی هدیه", sub: "رایگان به همراه هر سفارش" },
  ];
  return (
    <section id="features" dir="rtl" className="border-y py-8 transition-colors" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.title} className="flex flex-col items-center text-center gap-2">
            <span className="text-3xl">{it.icon}</span>
            <p className="text-sm font-semibold" style={{ fontFamily: FA, color: "var(--fg)" }}>{it.title}</p>
            <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HorizontalScroll title="پرفروش‌ترین‌ها" subtitle="محبوب‌ترین عطرهای ما" products={bestsellers} />
      <div className="h-px max-w-7xl mx-auto mx-6" style={{ backgroundColor: "var(--border)" }} />
      <HorizontalScroll title="جدیدترین‌ها" subtitle="تازه به مجموعه اضافه شد" products={newest} />
      <AutumnBanner />
      <HorizontalScroll title="تخفیف ویژه" subtitle="فرصت محدود — عجله کنید" products={discounted} />
      <div className="h-px max-w-7xl mx-auto mx-6" style={{ backgroundColor: "var(--border)" }} />
      <HorizontalScroll title="پیشنهاد پاییز" subtitle="ترکیب‌هایی که پاییز را کامل می‌کنند" products={autumn} />
    </>
  );
}
