import { useState } from "react";
import { Link, useParams, Navigate } from "react-router";
import { PRODUCTS } from "../data/products";
import type { VolumeOption } from "../data/products";
import { useApp } from "../context/AppContext";
import tomFordImg from "../imports/tom-ford-tuscan-leather.png";

const FA = "'Vazirmatn', system-ui, sans-serif";

const MOCK_REVIEWS = [
  { id:1, name:"علی رضایی", date:"۱۵ مهر ۱۴۰۵", rating:5, text:"عطر فوق‌العاده‌ای است. ماندگاری بالایی دارد و هرجا که می‌روم همه از بوی عطرم می‌پرسند. قطعاً دوباره سفارش می‌دهم.", helpful:14, verified:true },
  { id:2, name:"مریم کاظمی", date:"۸ مهر ۱۴۰۵", rating:4, text:"رایحه بسیار زیباست ولی ماندگاریش کمی کمتر از چیزی بود که انتظار داشتم. با این حال کیفیت بسته‌بندی عالی است.", helpful:7, verified:true },
  { id:3, name:"حسن محمدی", date:"۲ مهر ۱۴۰۵", rating:5, text:"بهترین خریدم از پرفیوم ایکس! ارسال سریع بود و محصول دقیقاً همان چیزی بود که در عکس دیدم. ممنون از تیم خوب شما.", helpful:21, verified:false },
  { id:4, name:"سارا احمدی", date:"۲۵ شهریور ۱۴۰۵", rating:4, text:"عطر خوبی است. رایحه‌اش برای پاییز کاملاً مناسب است. قیمتش هم منصفانه است.", helpful:5, verified:true },
];

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "var(--gold)" : "none"} stroke="var(--gold)" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function RatingBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div className="flex items-center gap-2 text-xs" dir="rtl">
      <span className="w-8 shrink-0" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{label}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--bg-muted)" }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: "var(--gold)" }} />
      </div>
      <span className="w-8 text-left shrink-0" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{pct}٪</span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const { addToCart } = useApp();

  const [mainImg, setMainImg] = useState(0);
  const [selectedVol, setSelectedVol] = useState<VolumeOption>(product?.volumes[1] ?? product?.volumes[0] ?? { ml: 35, price: 0, priceLabel: "۰" });
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [newReview, setNewReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  // Use tom-ford image for product 1 as hero gallery image
  const galleryImgs = product.id === 1
    ? [tomFordImg, ...(product.images ?? [product.image])]
    : (product.images ?? [product.image, product.image, product.image, product.image]);

  const avgRating = product.rating;
  const ratingDist = [
    { label: "★★★★★", pct: 62 },
    { label: "★★★★", pct: 22 },
    { label: "★★★", pct: 9 },
    { label: "★★", pct: 4 },
    { label: "★", pct: 3 },
  ];

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(product!, selectedVol);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div dir="rtl" className="pt-20 pb-20" style={{ backgroundColor: "var(--bg)" }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
        <Link to="/" className="hover:text-[var(--gold)] transition-colors">خانه</Link>
        <span>›</span>
        <Link to="/shop" className="hover:text-[var(--gold)] transition-colors">فروشگاه</Link>
        <span>›</span>
        <span style={{ color: "var(--fg)" }}>{product.name}</span>
      </div>

      {/* ─── Top Section ─── */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-sm" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", aspectRatio: "4/3" }}>
            <img src={galleryImgs[mainImg]} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {galleryImgs.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)} className="shrink-0 w-16 h-16 overflow-hidden rounded-sm border-2 transition-all"
                style={{ borderColor: mainImg === i ? "var(--gold)" : "var(--border)" }}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5 text-right">
          <div>
            <p className="text-sm font-semibold mb-1" style={{ fontFamily: FA, color: "var(--gold)" }}>{product.brand}</p>
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: FA, color: "var(--fg)" }}>{product.name}</h1>
            <p className="text-sm mb-3" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{product.subtitle} · {product.concentration}</p>
            <div className="flex items-center gap-3">
              <Stars rating={avgRating} />
              <span className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>{avgRating}</span>
              <span className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>({product.ratingCount.toLocaleString("fa-IR")} نظر)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs py-2 border-y" style={{ borderColor: "var(--border)", fontFamily: FA }}>
            <span style={{ color: "var(--fg-dim)" }}>کد کالا:</span>
            <span style={{ color: "var(--fg)" }}>{product.sku}</span>
            <span className="mr-auto text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              موجود در انبار
            </span>
          </div>

          {/* Volume selector */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>انتخاب حجم:</p>
            <div className="flex gap-2 flex-wrap">
              {product.volumes.map((v) => (
                <button key={v.ml} onClick={() => setSelectedVol(v)}
                  className="px-4 py-2 border transition-all duration-200 text-sm"
                  style={{ fontFamily: FA, borderColor: selectedVol.ml === v.ml ? "var(--gold)" : "var(--border)", color: selectedVol.ml === v.ml ? "var(--gold)" : "var(--fg-dim)", backgroundColor: selectedVol.ml === v.ml ? "color-mix(in srgb, var(--gold) 10%, transparent)" : "transparent" }}
                >
                  {v.ml} ml
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>
              {selectedVol.priceLabel} <span className="text-base font-normal" style={{ color: "var(--fg-dim)" }}>تومان</span>
            </span>
            {selectedVol.originalPriceLabel && (
              <>
                <span className="text-lg line-through" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>{selectedVol.originalPriceLabel}</span>
                <span className="text-sm font-bold px-2 py-0.5 rounded" style={{ fontFamily: FA, backgroundColor: "#e0555520", color: "#e05555" }}>
                  {selectedVol.discount}٪ تخفیف
                </span>
              </>
            )}
          </div>

          {/* Qty + Add to cart */}
          <div className="flex gap-3 items-center">
            <div className="flex items-center border" style={{ borderColor: "var(--border)" }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-10 flex items-center justify-center transition-colors" style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}>−</button>
              <span className="w-10 text-center text-sm font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-10 flex items-center justify-center transition-colors" style={{ color: "var(--fg-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-muted)")}>+</button>
            </div>
            <button onClick={handleAdd} className="flex-1 py-3 font-bold text-sm transition-colors"
              style={{ fontFamily: FA, backgroundColor: added ? "var(--gold-hover)" : "var(--gold)", color: "var(--gold-text)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--gold-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
            >
              {added ? "✓ به سبد خرید اضافه شد" : "افزودن به سبد خرید"}
            </button>
            <button className="w-11 h-11 flex items-center justify-center border transition-colors" style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor="#e07fa0"; (e.currentTarget as HTMLElement).style.color="#e07fa0"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--fg-dim)"; }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
            {[
              { label: "جنسیت", value: product.gender },
              { label: "خانواده بویایی", value: product.family },
              { label: "فصل مناسب", value: product.season.join("، ") },
              { label: "ماندگاری", value: "۶ تا ۸ ساعت" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <p className="text-[10px]" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{s.label}</p>
                <p className="text-xs font-semibold" style={{ fontFamily: FA, color: "var(--fg)" }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3 pt-2">
            {["ارسال سریع", "ضمانت اصالت کالا", "۷ روز مرجوعی", "پرداخت امن"].map((b) => (
              <span key={b} className="text-[11px] px-3 py-1 border rounded-full" style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-dim)" }}>✓ {b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Video placeholder ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="relative overflow-hidden rounded-sm" style={{ backgroundColor: "var(--bg-card2)", aspectRatio: "16/7", border: "1px solid var(--border)" }}>
          <img src="https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=1200&h=525&fit=crop&auto=format" alt="ویدئو" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110" style={{ backgroundColor: "var(--gold)" }}>
              <svg width="24" height="24" fill="var(--gold-text)" viewBox="0 0 24 24"><path d="M5 3l14 9-14 9V3z" /></svg>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-sm" style={{ fontFamily: FA, color: "rgba(255,255,255,0.8)" }}>
            معرفی {product.name} — پرفیوم ایکس
          </div>
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
          {([
            { key: "desc", label: "توضیحات و مشخصات" },
            { key: "specs", label: "هرم بویایی" },
            { key: "reviews", label: `نظرات (${product.ratingCount.toLocaleString("fa-IR")})` },
          ] as const).map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key)} className="px-6 py-3 text-sm font-semibold border-b-2 -mb-px transition-all"
              style={{ fontFamily: FA, borderColor: activeTab === t.key ? "var(--gold)" : "transparent", color: activeTab === t.key ? "var(--gold)" : "var(--fg-dim)" }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Tab: Description + Specs ─── */}
      {activeTab === "desc" && (
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          <div className="lg:col-span-2 space-y-10">
            {[
              { title: "معرفی عطر", body: product.description },
              { title: "طریقه مصرف", body: "برای بهترین نتیجه، عطر را روی نقاط ضربان مانند مچ دست، گردن و پشت گوش بزنید. از مالیدن مچ‌ها به هم خودداری کنید تا مولکول‌های عطر آسیب نبینند. قبل از پوشیدن لباس اسپری کنید تا رنگ لباس تغییر نکند." },
              { title: "تشخیص محصول اصل", body: "محصولات پرفیوم ایکس دارای هولوگرام اختصاصی، شماره سریال یکتا و بسته‌بندی استاندارد هستند. برای تشخیص اصل، کد روی جعبه را از اپلیکیشن ما اسکن کنید. هرگونه تفاوت در بسته‌بندی یا رایحه را به پشتیبانی گزارش دهید." },
            ].map((s) => (
              <div key={s.title} className="text-right">
                <h2 className="text-xl font-bold mb-4" style={{ fontFamily: FA, color: "var(--fg)" }}>{s.title}</h2>
                <p className="text-sm leading-loose" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{s.body}</p>
              </div>
            ))}

            {/* Specs table */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>مشخصات محصول</h2>
              <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["برند", product.brand],
                    ["نام", product.name],
                    ["نوع", product.subtitle],
                    ["خانواده بویایی", product.family],
                    ["مناسب برای", product.gender],
                    ["فصل", product.season.join("، ")],
                    ["ماندگاری", "۶ تا ۸ ساعت"],
                    ["کد کالا", product.sku],
                  ].map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td className="py-3 pr-4 text-right w-40 font-semibold" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{k}</td>
                      <td className="py-3 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price note */}
            <div className="p-4 border-r-4 rounded-sm text-right" style={{ borderColor: "var(--gold)", backgroundColor: "color-mix(in srgb, var(--gold) 8%, transparent)" }}>
              <p className="text-xs font-semibold mb-1" style={{ fontFamily: FA, color: "var(--gold)" }}>قیمت مصرف‌کننده</p>
              <p className="text-sm leading-loose" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
                قیمت‌های نمایش داده شده قیمت نهایی برای مصرف‌کننده هستند و شامل مالیات بر ارزش افزوده می‌شوند. هیچ هزینه پنهانی وجود ندارد.
              </p>
            </div>
          </div>

          {/* Sidebar with notes + purchase notes */}
          <div className="space-y-6">
            <div className="p-5 border rounded-sm text-right" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
              <h3 className="text-base font-bold mb-4" style={{ fontFamily: FA, color: "var(--fg)" }}>نکات مهم خرید</h3>
              <ul className="space-y-2">
                {["محصول ۱۰۰٪ اصل و با گواهی اصالت", "بسته‌بندی هدیه رایگان", "ارسال سریع ۱ تا ۳ روزه", "امکان مرجوعی در ۷ روز", "پشتیبانی ۲۴ ساعته"].map((n) => (
                  <li key={n} className="flex items-center gap-2 text-sm" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
                    <span style={{ color: "var(--gold)" }}>✓</span>{n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ─── Tab: Scent pyramid ─── */}
      {activeTab === "specs" && (
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "نت‌های اولیه (سر)", notes: product.pyramid.top, icon: "⬆️", delay: "0s" },
              { title: "نت‌های میانی (قلب)", notes: product.pyramid.heart, icon: "❤️", delay: "0.1s" },
              { title: "نت‌های پایه (دنباله)", notes: product.pyramid.base, icon: "⬇️", delay: "0.2s" },
            ].map((layer) => (
              <div key={layer.title} className="p-6 border rounded-sm text-center" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
                <span className="text-3xl mb-3 block">{layer.icon}</span>
                <h3 className="text-sm font-bold mb-4" style={{ fontFamily: FA, color: "var(--fg)" }}>{layer.title}</h3>
                <ul className="space-y-2">
                  {layer.notes.map((n) => (
                    <li key={n} className="text-sm px-3 py-1 rounded-full inline-block mr-1 mb-1" style={{ fontFamily: FA, color: "var(--gold)", backgroundColor: "color-mix(in srgb, var(--gold) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--gold) 30%, transparent)" }}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Large comparison image */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { src: product.images?.[0] ?? product.image, label: "۳۵ میلی‌لیتر" },
              { src: product.images?.[2] ?? product.image, label: "۱۰۰ میلی‌لیتر" },
            ].map((img) => (
              <div key={img.label} className="relative overflow-hidden rounded-sm" style={{ backgroundColor: "var(--bg-card)" }}>
                <img src={img.src} alt={img.label} className="w-full h-64 object-cover" />
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="text-xs px-3 py-1 rounded" style={{ fontFamily: FA, backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Tab: Reviews ─── */}
      {activeTab === "reviews" && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Rating summary */}
            <div className="text-center p-6 border rounded-sm" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
              <p className="text-5xl font-bold mb-2" style={{ fontFamily: FA, color: "var(--fg)" }}>{avgRating}</p>
              <Stars rating={avgRating} size={20} />
              <p className="text-xs mt-2" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{product.ratingCount.toLocaleString("fa-IR")} نظر</p>
            </div>
            {/* Rating bars */}
            <div className="md:col-span-2 flex flex-col justify-center gap-2">
              {ratingDist.map((r) => <RatingBar key={r.label} label={r.label} pct={r.pct} />)}
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-5 mb-8">
            {MOCK_REVIEWS.map((r) => (
              <div key={r.id} className="p-5 border rounded-sm text-right" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: "var(--bg-muted)", color: "var(--gold)" }}>{r.name[0]}</div>
                    <div className="text-right">
                      <p className="text-sm font-semibold" style={{ fontFamily: FA, color: "var(--fg)" }}>{r.name}</p>
                      <div className="flex items-center gap-2">
                        <Stars rating={r.rating} size={11} />
                        {r.verified && <span className="text-[10px] text-green-500" style={{ fontFamily: FA }}>خریدار تأیید شده</span>}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>{r.date}</span>
                </div>
                <p className="text-sm leading-loose" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{r.text}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                  <span className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>مفید بود؟</span>
                  <button className="text-xs px-3 py-1 border transition-colors" style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-dim)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >👍 بله ({r.helpful})</button>
                  <button className="text-xs px-3 py-1 border transition-colors" style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-dim)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border)")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >💬 پاسخ</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add review */}
          {!showReviewForm ? (
            <button onClick={() => setShowReviewForm(true)} className="w-full py-3 border transition-colors text-sm font-semibold" style={{ fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--gold) 8%, transparent)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >+ ثبت دیدگاه جدید</button>
          ) : (
            <div className="p-5 border rounded-sm" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
              <h3 className="text-base font-bold mb-4 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>ثبت دیدگاه</h3>
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <button key={s} className="text-2xl transition-transform hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </button>
                ))}
              </div>
              <textarea dir="rtl" rows={4} value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="دیدگاه خود را بنویسید..." className="w-full px-4 py-3 text-sm border rounded-sm outline-none mb-3"
                style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }} />
              <div className="flex gap-2">
                <button className="px-6 py-2.5 text-sm font-bold" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
                  onClick={() => setShowReviewForm(false)}>ثبت دیدگاه</button>
                <button className="px-4 py-2.5 text-sm border" style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-dim)" }}
                  onClick={() => setShowReviewForm(false)}>انصراف</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
