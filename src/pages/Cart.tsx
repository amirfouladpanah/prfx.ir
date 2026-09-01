import { useState } from "react";
import { Link } from "react-router";
import { useApp } from "../context/AppContext";

const FA = "'Vazirmatn', system-ui, sans-serif";

type Step = "cart" | "checkout" | "confirm";

type ShippingType = "tipax" | "post";

type FormData = {
  name: string; phone: string;
  province: string; city: string; postal: string;
  address: string; note: string;
  shipping: ShippingType;
};

const PROVINCES = [
  "آذربایجان شرقی","آذربایجان غربی","اردبیل","اصفهان","البرز","ایلام","بوشهر","تهران",
  "چهارمحال و بختیاری","خراسان جنوبی","خراسان رضوی","خراسان شمالی","خوزستان","زنجان",
  "سمنان","سیستان و بلوچستان","فارس","قزوین","قم","کردستان","کرمان","کرمانشاه",
  "کهگیلویه و بویراحمد","گلستان","گیلان","لرستان","مازندران","مرکزی","هرمزگان","همدان","یزد",
];

const FREE_SHIPPING_THRESHOLD = 5000000;
const POST_COST = 120000;

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-semibold mb-1.5" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{children}</label>;
}

function StyledInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input dir="rtl"
      className="w-full px-3 py-2.5 text-sm border outline-none transition-colors rounded-sm"
      style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
      onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      {...props}
    />
  );
}

function StyledSelect({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select dir="rtl"
      className="w-full px-3 py-2.5 text-sm border outline-none transition-colors rounded-sm"
      style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
      onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      {...props}
    >
      {children}
    </select>
  );
}

function StyledTextarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea dir="rtl"
      className="w-full px-3 py-2.5 text-sm border outline-none transition-colors rounded-sm resize-none"
      style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
      onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      rows={3}
      {...props}
    />
  );
}

export default function Cart() {
  const { cartItems, addToCart, removeOneFromCart, removeAllFromCart, clearCart, cartTotal, cartOriginalTotal, cartDiscount } = useApp();
  const [step, setStep] = useState<Step>("cart");
  const [confirmCode] = useState(() => `PX-${Math.floor(Math.random() * 900000 + 100000)}`);
  const [form, setForm] = useState<FormData>({
    name: "", phone: "", province: "تهران", city: "", postal: "", address: "", note: "", shipping: "post",
  });

  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : (form.shipping === "post" ? POST_COST : 0);
  const total = cartTotal + shippingCost;

  function handleField<K extends keyof FormData>(k: K, v: FormData[K]) { setForm((f) => ({ ...f, [k]: v })); }

  function handleOrder() { setStep("confirm"); clearCart(); }

  if (step === "confirm") return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center px-6 pt-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6" style={{ backgroundColor: "color-mix(in srgb, var(--gold) 15%, transparent)" }}>
          <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--gold)" }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" /><path d="m9 11 3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: FA, color: "var(--fg)" }}>سفارش شما ثبت شد!</h1>
        <p className="text-sm leading-loose mb-2" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
          کد پیگیری: <strong style={{ color: "var(--gold)" }}>{confirmCode}</strong>
        </p>
        <p className="text-sm leading-loose mb-8" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
          آدرس ارسال: <strong style={{ color: "var(--fg)" }}>{form.province}، {form.city}، {form.address}</strong>
        </p>
        <Link to="/" className="inline-block px-6 py-3 text-sm font-bold" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );

  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      <h1 className="text-3xl font-bold mb-2 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>
        {step === "cart" ? "سبد خرید" : "تکمیل خرید"}
      </h1>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-10 text-xs" style={{ fontFamily: FA }}>
        {(["cart", "checkout"] as const).map((s, i) => {
          const labels: Record<string, string> = { cart: "سبد خرید", checkout: "اطلاعات ارسال" };
          const active = step === s;
          const done = step === "checkout" && s === "cart";
          return (
            <div key={s} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: active || done ? "var(--gold)" : "var(--bg-muted)", color: active || done ? "var(--gold-text)" : "var(--fg-dim)" }}>
                {done ? "✓" : i + 1}
              </div>
              <span style={{ color: active ? "var(--fg)" : "var(--fg-dim)" }}>{labels[s]}</span>
              {i < 1 && <div className="w-8 h-px" style={{ backgroundColor: "var(--border)" }} />}
            </div>
          );
        })}
      </div>

      {cartItems.length === 0 && step === "cart" ? (
        <div className="text-center py-20 flex flex-col items-center gap-4">
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" style={{ color: "var(--fg-dimmer)" }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          <p className="text-lg" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>سبد خرید شما خالی است</p>
          <Link to="/shop" className="px-6 py-2.5 text-sm font-bold" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>ادامه خرید</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2">

            {step === "cart" && (
              <div className="border rounded-sm overflow-hidden" style={{ borderColor: "var(--border)" }}>
                {cartItems.map((item, idx) => {
                  const lineTotal = item.price * item.qty;
                  const lineOriginal = (item.originalPrice ?? item.price) * item.qty;
                  return (
                    <div key={`${item.product.id}-${item.volumeMl}`}
                      className={`flex items-center gap-4 p-4 ${idx < cartItems.length - 1 ? "border-b" : ""}`}
                      style={{ borderColor: "var(--border)" }}
                    >
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-20 object-cover rounded shrink-0" />
                      <div className="flex-1 text-right">
                        <p className="font-semibold" style={{ fontFamily: FA, color: "var(--fg)" }}>{item.product.name}</p>
                        <p className="text-xs mt-0.5" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{item.product.concentration} · {item.volumeMl} ml</p>
                        {item.discount && <p className="text-xs mt-0.5 font-semibold" style={{ fontFamily: FA, color: "#e05555" }}>تخفیف {item.discount}٪</p>}
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => { const vol = item.product.volumes.find((v) => v.ml === item.volumeMl); if (vol) addToCart(item.product, vol); }}
                            className="w-7 h-7 border flex items-center justify-center text-base transition-colors"
                            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                          >+</button>
                          <span className="text-sm font-bold w-6 text-center" style={{ fontFamily: FA, color: "var(--fg)" }}>{item.qty}</span>
                          <button onClick={() => removeOneFromCart(item.product.id, item.volumeMl)}
                            className="w-7 h-7 border flex items-center justify-center text-base transition-colors"
                            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                          >−</button>
                        </div>
                      </div>
                      <div className="text-left shrink-0">
                        <p className="font-bold text-sm" style={{ fontFamily: FA, color: "var(--gold)" }}>{lineTotal.toLocaleString("fa-IR")}</p>
                        {item.originalPrice && lineOriginal !== lineTotal && (
                          <p className="text-xs line-through" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>{lineOriginal.toLocaleString("fa-IR")}</p>
                        )}
                        <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>تومان</p>
                        <button onClick={() => removeAllFromCart(item.product.id, item.volumeMl)} className="mt-2 text-xs transition-colors"
                          style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#e05555")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-dimmer)")}
                        >حذف</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {step === "checkout" && (
              <div className="border rounded-sm p-6" style={{ borderColor: "var(--border)" }}>
                <h2 className="text-lg font-bold mb-6 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>اطلاعات گیرنده</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>نام و نام خانوادگی *</Label>
                    <StyledInput placeholder="علی محمدی" value={form.name} onChange={(e) => handleField("name", e.target.value)} />
                  </div>
                  <div>
                    <Label>شماره موبایل *</Label>
                    <StyledInput type="tel" placeholder="09123456789" value={form.phone} onChange={(e) => handleField("phone", e.target.value)} />
                  </div>
                  <div>
                    <Label>استان *</Label>
                    <StyledSelect value={form.province} onChange={(e) => handleField("province", e.target.value)}>
                      {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                    </StyledSelect>
                  </div>
                  <div>
                    <Label>شهر *</Label>
                    <StyledInput placeholder="نام شهر" value={form.city} onChange={(e) => handleField("city", e.target.value)} />
                  </div>
                  <div>
                    <Label>کد پستی *</Label>
                    <StyledInput placeholder="۱۲۳۴۵۶۷۸۹۰" value={form.postal} onChange={(e) => handleField("postal", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>آدرس کامل *</Label>
                    <StyledInput placeholder="خیابان، کوچه، پلاک، واحد..." value={form.address} onChange={(e) => handleField("address", e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>یادداشت (اختیاری)</Label>
                    <StyledTextarea placeholder="توضیحات یا خواسته خاص برای تحویل..." value={form.note} onChange={(e) => handleField("note", e.target.value)} />
                  </div>
                </div>

                <h2 className="text-lg font-bold mt-8 mb-4 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>نوع ارسال</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {([
                    { value: "tipax" as ShippingType, label: "ارسال با تیپاکس", cost: "هزینه پس کرایه", icon: "🚛" },
                    { value: "post"  as ShippingType, label: "ارسال با پست",    cost: cartTotal >= FREE_SHIPPING_THRESHOLD ? "رایگان" : `${POST_COST.toLocaleString("fa-IR")} تومان`, icon: "📮" },
                  ]).map((opt) => (
                    <label key={opt.value}
                      className="flex items-center gap-3 p-4 border rounded-sm cursor-pointer transition-all"
                      style={{ borderColor: form.shipping === opt.value ? "var(--gold)" : "var(--border)", backgroundColor: form.shipping === opt.value ? "color-mix(in srgb, var(--gold) 8%, transparent)" : "transparent" }}
                    >
                      <input type="radio" name="shipping" value={opt.value} checked={form.shipping === opt.value} onChange={() => handleField("shipping", opt.value)} className="accent-[var(--gold)]" />
                      <span className="text-xl">{opt.icon}</span>
                      <div className="text-right flex-1">
                        <p className="text-sm font-semibold" style={{ fontFamily: FA, color: "var(--fg)" }}>{opt.label}</p>
                        <p className="text-xs font-bold" style={{ fontFamily: FA, color: opt.cost === "رایگان" ? "#5cb85c" : "var(--gold)" }}>{opt.cost}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs mt-3 text-right" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
                  🎁 با خرید بالای <strong style={{ color: "var(--gold)" }}>۵ میلیون تومان</strong>، ارسال با پست رایگان است.
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-sm p-5 sticky top-24" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
              <h2 className="text-base font-bold mb-4 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>خلاصه سفارش</h2>

              <ul className="divide-y mb-4" style={{ borderColor: "var(--border)" }}>
                {cartItems.map((item) => (
                  <li key={`${item.product.id}-${item.volumeMl}`} className="py-2" style={{ borderColor: "var(--border)" }}>
                    <div className="flex justify-between items-start gap-2 text-sm">
                      <span style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{item.product.name} × {item.qty}</span>
                      <div className="text-left shrink-0">
                        <p style={{ fontFamily: FA, color: "var(--fg)" }}>{(item.price * item.qty).toLocaleString("fa-IR")}</p>
                        {item.originalPrice && (
                          <p className="text-xs line-through" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>
                            {((item.originalPrice) * item.qty).toLocaleString("fa-IR")}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 pt-3 border-t text-sm" style={{ borderColor: "var(--border)" }}>
                <div className="flex justify-between">
                  <span style={{ fontFamily: FA, color: "var(--fg-muted)" }}>جمع کالاها</span>
                  <span style={{ fontFamily: FA, color: "var(--fg)" }}>{cartOriginalTotal.toLocaleString("fa-IR")}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between">
                    <span style={{ fontFamily: FA, color: "#e05555" }}>تخفیف</span>
                    <span className="font-semibold" style={{ fontFamily: FA, color: "#e05555" }}>−{cartDiscount.toLocaleString("fa-IR")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ fontFamily: FA, color: "var(--fg-muted)" }}>هزینه ارسال</span>
                  <span style={{ fontFamily: FA, color: shippingCost === 0 ? "#5cb85c" : "var(--fg)" }}>
                    {form.shipping === "tipax" ? "پس کرایه" : shippingCost === 0 ? "رایگان" : shippingCost.toLocaleString("fa-IR")}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between rounded-sm px-2 py-1" style={{ backgroundColor: "color-mix(in srgb, #5cb85c 10%, transparent)" }}>
                    <span style={{ fontFamily: FA, color: "#5cb85c", fontSize: "0.72rem" }}>صرفه‌جویی شما</span>
                    <span className="font-bold" style={{ fontFamily: FA, color: "#5cb85c", fontSize: "0.72rem" }}>{cartDiscount.toLocaleString("fa-IR")} تومان</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t text-base" style={{ borderColor: "var(--border)" }}>
                  <span style={{ fontFamily: FA, color: "var(--fg)" }}>جمع نهایی</span>
                  <span style={{ fontFamily: FA, color: "var(--gold)" }}>{total.toLocaleString("fa-IR")} تومان</span>
                </div>
              </div>

              {step === "cart" && (
                <button onClick={() => setStep("checkout")} className="w-full mt-5 py-3 text-sm font-bold transition-colors"
                  style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--gold-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
                >ادامه — تکمیل اطلاعات</button>
              )}
              {step === "checkout" && (
                <>
                  <button onClick={handleOrder}
                    disabled={!form.name || !form.phone || !form.address || !form.postal || !form.city}
                    className="w-full mt-5 py-3 text-sm font-bold transition-colors disabled:opacity-40"
                    style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
                    onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--gold-hover)"; }}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
                  >ثبت سفارش نهایی</button>
                  <button onClick={() => setStep("cart")} className="w-full mt-2 py-2.5 text-xs transition-colors"
                    style={{ fontFamily: FA, color: "var(--fg-dim)", border: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  >بازگشت به سبد خرید</button>
                </>
              )}

              <p className="text-[10px] text-center mt-3" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>پرداخت امن · رمزگذاری SSL</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
