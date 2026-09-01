import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { PRODUCTS } from "../data/products";
import brandIcon from "../imports/icon-prfx.png";

const FA = "'Vazirmatn', system-ui, sans-serif";

const NAV_LINKS = [
  { fa: "فروشگاه", href: "/shop" },
  { fa: "درباره ما", href: "/about" },
  { fa: "مجله", href: "/journal" },
  { fa: "تماس", href: "/contact" },
];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  const handler = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) cb();
  };
  const attach = () => document.addEventListener("mousedown", handler);
  const detach = () => document.removeEventListener("mousedown", handler);
  return { attach, detach };
}

export default function Navbar() {
  const { isDark, toggleDark, cartItems, cartCount, addToCart, removeOneFromCart, isLoggedIn } = useApp();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // simple click-outside via onBlur on backdrop
  const searchResults = query.trim()
    ? PRODUCTS.filter((p) => p.name.includes(query) || p.subtitle.includes(query) || p.notes.includes(query))
    : [];

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);


  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  const panelClass = "absolute top-full mt-2 z-50 border shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden";

  return (
    <header dir="rtl" className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-nav)", backdropFilter: "blur(14px)" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={brandIcon} alt="پرفیوم ایکس" className="h-9 w-auto" />
          <span className="text-lg font-bold hidden sm:block" style={{ fontFamily: FA, color: "var(--gold)" }}>پرفیوم ایکس</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link key={l.fa} to={l.href} className="text-sm transition-colors duration-200" style={{ fontFamily: FA, color: "var(--fg-muted)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--fg)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fg-muted)")}
            >
              {l.fa}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-2">

          {/* Dark/Light */}
          <button onClick={toggleDark} aria-label={isDark ? "حالت روشن" : "حالت تیره"} className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110" style={{ color: "var(--fg-muted)" }}>
            {isDark ? (
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" strokeLinecap="round" /><line x1="12" y1="21" x2="12" y2="23" strokeLinecap="round" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" strokeLinecap="round" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" strokeLinecap="round" />
                <line x1="1" y1="12" x2="3" y2="12" strokeLinecap="round" /><line x1="21" y1="12" x2="23" y2="12" strokeLinecap="round" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" strokeLinecap="round" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Login / Dashboard */}
          <Link to={isLoggedIn ? "/dashboard" : "/login"} aria-label="حساب کاربری" className="w-9 h-9 flex items-center justify-center transition-colors" style={{ color: isLoggedIn ? "var(--gold)" : "var(--fg-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gold)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isLoggedIn ? "var(--gold)" : "var(--fg-muted)")}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          {/* Search */}
          <div ref={searchRef} className="relative">
            <button onClick={() => { setSearchOpen((v) => !v); setCartOpen(false); }} aria-label="جستجو" className="w-9 h-9 flex items-center justify-center transition-colors" style={{ color: searchOpen ? "var(--gold)" : "var(--fg-muted)" }}>
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" /></svg>
            </button>

            {searchOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSearchOpen(false)} />
                <div className={`${panelClass} left-0 w-80 z-50`} style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <form onSubmit={handleSearchSubmit} className="p-3 border-b" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ backgroundColor: "var(--bg-muted)" }}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: "var(--fg-dim)", flexShrink: 0 }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" /></svg>
                      <input autoFocus dir="rtl" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جستجوی عطر..." className="flex-1 bg-transparent outline-none text-sm" style={{ fontFamily: FA, color: "var(--fg)" }} />
                      {query && <button type="button" onClick={() => setQuery("")} style={{ color: "var(--fg-dim)" }}><svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /></svg></button>}
                    </div>
                  </form>
                  {query.trim() === "" && <p className="px-4 py-5 text-center text-sm" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>نام عطر یا ترکیبات را وارد کنید</p>}
                  {query.trim() !== "" && searchResults.length === 0 && <p className="px-4 py-5 text-center text-sm" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>نتیجه‌ای یافت نشد</p>}
                  {searchResults.length > 0 && (
                    <ul dir="rtl" className="max-h-64 overflow-y-auto">
                      {searchResults.map((p) => (
                        <li key={p.id} className="flex items-center gap-3 px-4 py-3 cursor-pointer border-b transition-colors" style={{ borderColor: "var(--border)" }}
                          onClick={() => { setSearchOpen(false); setQuery(""); }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-muted)")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <img src={p.image} alt={p.name} className="w-10 h-12 object-cover rounded shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate" style={{ fontFamily: FA, color: "var(--fg)" }}>{p.name}</p>
                            <p className="text-xs" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{p.subtitle}</p>
                          </div>
                          <span className="text-xs font-bold shrink-0" style={{ fontFamily: FA, color: "var(--gold)" }}>{p.priceLabel}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {query.trim() && (
                    <button onClick={() => { navigate(`/search?q=${encodeURIComponent(query.trim())}`); setSearchOpen(false); setQuery(""); }} className="w-full py-2.5 text-xs border-t transition-colors" style={{ fontFamily: FA, color: "var(--gold)", borderColor: "var(--border)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-muted)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      مشاهده همه نتایج برای «{query}»
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Cart */}
          <div ref={cartRef} className="relative">
            <button onClick={() => { setCartOpen((v) => !v); setSearchOpen(false); }} aria-label="سبد خرید" className="w-9 h-9 flex items-center justify-center relative transition-colors" style={{ color: cartOpen ? "var(--gold)" : "var(--fg-muted)" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
              {cartCount > 0 && <span className="absolute -top-1 -left-1 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--gold)", color: "var(--gold-text)", fontFamily: FA }}>{cartCount}</span>}
            </button>

            {cartOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setCartOpen(false)} />
                <div className={`${panelClass} left-0 w-96 z-50`} style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}>
                  <div dir="rtl" className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                    <span className="font-semibold text-sm" style={{ fontFamily: FA, color: "var(--fg)" }}>سبد خرید ({cartCount} محصول)</span>
                    {cartItems.length > 0 && <Link to="/cart" onClick={() => setCartOpen(false)} className="text-xs" style={{ fontFamily: FA, color: "var(--gold)" }}>مشاهده سبد</Link>}
                  </div>

                  {cartItems.length === 0 ? (
                    <div dir="rtl" className="flex flex-col items-center py-10 gap-3">
                      <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24" style={{ color: "var(--fg-dimmer)" }}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                      <p className="text-sm" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>سبد خرید شما خالی است</p>
                    </div>
                  ) : (
                    <>
                      <ul dir="rtl" className="max-h-64 overflow-y-auto divide-y" style={{ borderColor: "var(--border)" }}>
                        {cartItems.map((item) => (
                          <li key={`${item.product.id}-${item.volumeMl}`} className="flex items-center gap-3 px-4 py-3">
                            <img src={item.product.image} alt={item.product.name} className="w-10 h-12 object-cover rounded shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold truncate" style={{ fontFamily: FA, color: "var(--fg)" }}>{item.product.name}</p>
                              <p className="text-xs mt-0.5" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{item.volumeMl} ml</p>
                              <div className="flex items-center gap-2 mt-1">
                                <button onClick={() => { const vol = item.product.volumes.find((v) => v.ml === item.volumeMl); if (vol) addToCart(item.product, vol); }} className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: "var(--bg-muted)", color: "var(--fg-muted)" }}>+</button>
                                <span className="text-xs" style={{ fontFamily: FA, color: "var(--fg)" }}>{item.qty}</span>
                                <button onClick={() => removeOneFromCart(item.product.id, item.volumeMl)} className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: "var(--bg-muted)", color: "var(--fg-muted)" }}>−</button>
                              </div>
                            </div>
                            <span className="text-xs font-bold shrink-0" style={{ fontFamily: FA, color: "var(--gold)" }}>{(item.price * item.qty).toLocaleString("fa-IR")}</span>
                          </li>
                        ))}
                      </ul>
                      <div dir="rtl" className="px-4 py-3 border-t" style={{ borderColor: "var(--border)" }}>
                        <div className="flex justify-between mb-3">
                          <span className="text-sm" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>جمع کل</span>
                          <span className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>{total.toLocaleString("fa-IR")} تومان</span>
                        </div>
                        <Link to="/cart" onClick={() => setCartOpen(false)} className="block w-full py-2.5 text-center text-sm font-bold transition-colors" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>
                          ادامه خرید
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden w-9 h-9 flex items-center justify-center" onClick={() => setMenuOpen((v) => !v)} aria-label="منو" style={{ color: "var(--fg-muted)" }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              {menuOpen ? <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div dir="rtl" className="md:hidden border-t px-6 py-4 flex flex-col gap-4 text-right" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-nav)" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.fa} to={l.href} className="text-sm" style={{ fontFamily: FA, color: "var(--fg-muted)" }} onClick={() => setMenuOpen(false)}>{l.fa}</Link>
          ))}
          <Link to="/login" className="text-sm" style={{ fontFamily: FA, color: "var(--gold)" }} onClick={() => setMenuOpen(false)}>ورود / ثبت‌نام</Link>
        </div>
      )}
    </header>
  );
}
