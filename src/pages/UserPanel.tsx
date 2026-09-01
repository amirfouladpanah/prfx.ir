import { useState } from "react";
import { Navigate, Link } from "react-router";
import { useApp } from "../context/AppContext";

const FA = "'Vazirmatn', system-ui, sans-serif";

type Section = "orders" | "addresses" | "account" | "logout";

const MOCK_ORDERS = [
  {
    id: "PX-104522", date: "۱۵ مهر ۱۴۰۵", status: "تحویل داده شده", statusColor: "#5cb85c",
    total: 13600000, totalLabel: "۱۳٫۶۰۰٫۰۰۰",
    address: "تهران، خیابان ولیعصر، پلاک ۱۸۴، واحد ۵",
    receiver: "علی محمدی", phone: "09121234567",
    items: [
      { name: "نویر ابسولو", vol: "35 ml", qty: 1, price: "۶٫۸۰۰٫۰۰۰" },
      { name: "ریواژ", vol: "25 ml", qty: 2, price: "۵٫۰۰۰٫۰۰۰" },
    ],
    shipping: "پست پیشتاز", trackingCode: "1234567890",
  },
  {
    id: "PX-098711", date: "۳ مهر ۱۴۰۵", status: "در حال ارسال", statusColor: "#f0ad4e",
    total: 5740000, totalLabel: "۵٫۷۴۰٫۰۰۰",
    address: "اصفهان، خیابان چهارباغ، پلاک ۴۵",
    receiver: "علی محمدی", phone: "09121234567",
    items: [
      { name: "سابل دوره", vol: "35 ml", qty: 1, price: "۵٫۷۴۰٫۰۰۰" },
    ],
    shipping: "تیپاکس", trackingCode: "TK-8874421",
  },
];

type Address = { id: number; label: string; full: string; receiver: string; phone: string };
const DEFAULT_ADDRESSES: Address[] = [
  { id: 1, label: "خانه", full: "تهران، خیابان ولیعصر، پلاک ۱۸۴، واحد ۵، کد پستی: ۱۴۳۱۸۷۴۵۶۲", receiver: "علی محمدی", phone: "09121234567" },
  { id: 2, label: "محل کار", full: "تهران، میدان آرژانتین، خیابان احمد قصیر، پلاک ۲۳، طبقه ۴، کد پستی: ۱۵۱۴۷۴۵۶۷۸", receiver: "علی محمدی", phone: "09121234567" },
];

function OrderCard({ order, onOpen }: { order: typeof MOCK_ORDERS[0]; onOpen: () => void }) {
  return (
    <div className="p-5 border rounded-sm cursor-pointer transition-all" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
      onClick={onOpen}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="text-right">
          <p className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>سفارش {order.id}</p>
          <p className="text-xs mt-0.5" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{order.date}</p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ fontFamily: FA, backgroundColor: `${order.statusColor}20`, color: order.statusColor }}>
          {order.status}
        </span>
      </div>
      <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border)" }}>
        <p className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>{order.totalLabel} تومان</p>
        <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{order.items.length} محصول</p>
      </div>
    </div>
  );
}

function OrderDetail({ order, onBack }: { order: typeof MOCK_ORDERS[0]; onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-2 text-sm mb-6 transition-colors" style={{ fontFamily: FA, color: "var(--gold)" }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        بازگشت به لیست سفارش‌ها
      </button>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>سفارش {order.id}</h2>
        <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ fontFamily: FA, backgroundColor: `${order.statusColor}20`, color: order.statusColor }}>{order.status}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { title: "اطلاعات ارسال", rows: [["گیرنده", order.receiver], ["تلفن", order.phone], ["آدرس", order.address], ["روش ارسال", order.shipping], ["کد رهگیری", order.trackingCode]] },
          { title: "اطلاعات مالی", rows: [["تاریخ سفارش", order.date], ["مجموع کالا", order.totalLabel + " تومان"], ["هزینه ارسال", "رایگان"], ["جمع نهایی", order.totalLabel + " تومان"]] },
        ].map((block) => (
          <div key={block.title} className="p-5 border rounded-sm" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <h3 className="text-sm font-bold mb-3 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>{block.title}</h3>
            {block.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 text-xs border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                <span style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{k}</span>
                <span className="text-right max-w-[60%]" style={{ fontFamily: FA, color: "var(--fg)" }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="p-5 border rounded-sm" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <h3 className="text-sm font-bold mb-3 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>محصولات</h3>
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b last:border-b-0 text-right" style={{ borderColor: "var(--border)" }}>
            <div>
              <p className="text-sm font-semibold" style={{ fontFamily: FA, color: "var(--fg)" }}>{item.name}</p>
              <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{item.vol} · تعداد: {item.qty}</p>
            </div>
            <p className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>{item.price} تومان</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressSection() {
  const [addresses, setAddresses] = useState<Address[]>(DEFAULT_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "", full: "", receiver: "", phone: "" });

  function addAddress() {
    if (!newAddr.full || !newAddr.receiver) return;
    setAddresses((prev) => [...prev, { id: Date.now(), ...newAddr }]);
    setNewAddr({ label: "", full: "", receiver: "", phone: "" });
    setShowForm(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>آدرس‌ها</h2>
        <button onClick={() => setShowForm(!showForm)} className="text-sm px-4 py-2 border transition-colors" style={{ fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--gold) 8%, transparent)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >+ آدرس جدید</button>
      </div>

      {showForm && (
        <div className="p-5 border rounded-sm mb-4" style={{ borderColor: "var(--gold)", backgroundColor: "var(--bg-card)" }}>
          <h3 className="text-sm font-bold mb-4 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>افزودن آدرس</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { placeholder: "عنوان (مثلاً خانه، محل کار)", key: "label" },
              { placeholder: "نام گیرنده", key: "receiver" },
              { placeholder: "شماره تماس", key: "phone" },
              { placeholder: "آدرس کامل", key: "full" },
            ].map((f) => (
              <input key={f.key} dir="rtl" placeholder={f.placeholder}
                value={(newAddr as Record<string, string>)[f.key]}
                onChange={(e) => setNewAddr((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className={`px-3 py-2.5 text-sm border outline-none rounded-sm ${f.key === "full" ? "sm:col-span-2" : ""}`}
                style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={addAddress} className="px-5 py-2 text-sm font-bold" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>ذخیره</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm border" style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-dim)" }}>انصراف</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="p-5 border rounded-sm" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <div className="flex items-start justify-between gap-3">
              <div className="text-right flex-1">
                <span className="text-xs font-bold px-2.5 py-0.5 mb-2 inline-block" style={{ fontFamily: FA, backgroundColor: "color-mix(in srgb, var(--gold) 12%, transparent)", color: "var(--gold)" }}>{addr.label}</span>
                <p className="text-sm leading-relaxed" style={{ fontFamily: FA, color: "var(--fg)" }}>{addr.full}</p>
                <p className="text-xs mt-1" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{addr.receiver} · {addr.phone}</p>
              </div>
              <button onClick={() => setAddresses((prev) => prev.filter((a) => a.id !== addr.id))}
                className="w-8 h-8 flex items-center justify-center border transition-colors shrink-0"
                style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#e05555"; (e.currentTarget as HTMLElement).style.color = "#e05555"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4h8v2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UserPanel() {
  const { isLoggedIn, logout } = useApp();
  const [section, setSection] = useState<Section>("orders");
  const [selectedOrder, setSelectedOrder] = useState<typeof MOCK_ORDERS[0] | null>(null);
  const [accountForm, setAccountForm] = useState({ name: "علی محمدی", phone: "09121234567", email: "ali@example.com" });
  const [saved, setSaved] = useState(false);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const navItems: { key: Section; label: string; icon: React.ReactNode }[] = [
    { key: "orders", label: "سفارش‌ها", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" strokeLinecap="round" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg> },
    { key: "addresses", label: "آدرس‌ها", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg> },
    { key: "account", label: "اطلاعات حساب", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" /><circle cx="12" cy="7" r="4" /></svg> },
    { key: "logout", label: "خروج از حساب", icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" /><polyline points="16 17 21 12 16 7" strokeLinecap="round" strokeLinejoin="round" /><line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" /></svg> },
  ];

  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>پنل کاربری</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* User avatar */}
          <div className="p-4 border rounded-sm text-center mb-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-bold" style={{ backgroundColor: "color-mix(in srgb, var(--gold) 15%, transparent)", color: "var(--gold)" }}>
              {accountForm.name[0]}
            </div>
            <p className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>{accountForm.name}</p>
            <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{accountForm.phone}</p>
          </div>

          <nav className="border rounded-sm overflow-hidden" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            {navItems.map((item, i) => (
              <button key={item.key}
                onClick={() => {
                  if (item.key === "logout") { logout(); return; }
                  setSection(item.key);
                  setSelectedOrder(null);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm text-right transition-all ${i < navItems.length - 1 ? "border-b" : ""}`}
                style={{
                  fontFamily: FA,
                  borderColor: "var(--border)",
                  color: section === item.key ? "var(--gold)" : item.key === "logout" ? "#e05555" : "var(--fg-muted)",
                  backgroundColor: section === item.key ? "color-mix(in srgb, var(--gold) 8%, transparent)" : "transparent",
                }}
                onMouseEnter={(e) => { if (section !== item.key) (e.currentTarget as HTMLElement).style.backgroundColor = "var(--bg-muted)"; }}
                onMouseLeave={(e) => { if (section !== item.key) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
              >
                <span style={{ color: section === item.key ? "var(--gold)" : item.key === "logout" ? "#e05555" : "var(--fg-dim)" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="md:col-span-3">
          {/* Orders */}
          {section === "orders" && !selectedOrder && (
            <div>
              <h2 className="text-xl font-bold mb-5 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>سفارش‌های من</h2>
              {MOCK_ORDERS.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-5xl mb-4">📦</p>
                  <p className="text-base" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>هنوز سفارشی ثبت نکرده‌اید</p>
                  <Link to="/shop" className="inline-block mt-4 px-5 py-2.5 text-sm font-bold" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>شروع خرید</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {MOCK_ORDERS.map((order) => <OrderCard key={order.id} order={order} onOpen={() => setSelectedOrder(order)} />)}
                </div>
              )}
            </div>
          )}

          {section === "orders" && selectedOrder && (
            <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
          )}

          {section === "addresses" && <AddressSection />}

          {section === "account" && (
            <div>
              <h2 className="text-xl font-bold mb-5 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>اطلاعات حساب</h2>
              <div className="p-6 border rounded-sm" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "نام و نام خانوادگی", key: "name", type: "text" },
                    { label: "شماره موبایل", key: "phone", type: "tel" },
                    { label: "آدرس ایمیل", key: "email", type: "email" },
                  ].map((f) => (
                    <div key={f.key} className={f.key === "email" ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-semibold mb-1.5 text-right" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{f.label}</label>
                      <input dir="rtl" type={f.type} value={(accountForm as Record<string, string>)[f.key]}
                        onChange={(e) => setAccountForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full px-3 py-2.5 text-sm border outline-none rounded-sm"
                        style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                  className="mt-5 px-8 py-2.5 text-sm font-bold transition-colors"
                  style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--gold-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--gold)")}
                >
                  {saved ? "✓ ذخیره شد" : "ذخیره تغییرات"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
