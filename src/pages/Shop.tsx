import { useState, useMemo } from "react";
import { PRODUCTS } from "../data/products";
import { ProductCardGrid } from "../components/ProductCard";

const FA = "'Vazirmatn', system-ui, sans-serif";

const PAGE_SIZE = 12;

const BRANDS   = [...new Set(PRODUCTS.map((p) => p.brand))];
const FAMILIES = [...new Set(PRODUCTS.map((p) => p.family))];
const SEASONS  = ["پاییز", "زمستان", "بهار", "تابستان"];
const GENDERS  = ["مردانه", "زنانه", "یونیسکس"];
const VOLUMES  = [25, 35, 100];

const SORTS = [
  { label: "پیش‌فرض", value: "default" },
  { label: "ارزان‌ترین", value: "asc" },
  { label: "گران‌ترین", value: "desc" },
  { label: "تخفیف‌دار", value: "discount" },
  { label: "جدیدترین", value: "newest" },
];

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));

type Filters = {
  brands: string[];
  families: string[];
  seasons: string[];
  genders: string[];
  volumes: number[];
  minPrice: number;
  maxPrice: number;
};

const DEFAULT_FILTERS: Filters = {
  brands: [], families: [], seasons: [], genders: [], volumes: [],
  minPrice: 0, maxPrice: MAX_PRICE,
};

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center justify-between gap-2 py-1.5 cursor-pointer group">
      <span className="text-sm group-hover:text-[color:var(--fg)] transition-colors" style={{ fontFamily: FA, color: checked ? "var(--fg)" : "var(--fg-dim)" }}>{label}</span>
      <div className="w-4 h-4 border flex items-center justify-center shrink-0 transition-all"
        style={{ borderColor: checked ? "var(--gold)" : "var(--border)", backgroundColor: checked ? "var(--gold)" : "transparent" }}
        onClick={onChange}
      >
        {checked && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--gold-text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </div>
    </label>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-wider mb-2 mt-4 first:mt-0" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{children}</p>;
}

function FilterPanel({ filters, setFilters, onClose }: { filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>>; onClose?: () => void }) {
  function resetFilters() { setFilters(DEFAULT_FILTERS); }
  const activeCount = filters.brands.length + filters.families.length + filters.seasons.length + filters.genders.length + filters.volumes.length + (filters.minPrice > 0 || filters.maxPrice < MAX_PRICE ? 1 : 0);

  return (
    <div className="text-right" dir="rtl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>فیلترها</span>
          {activeCount > 0 && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ fontFamily: FA, backgroundColor: "color-mix(in srgb, var(--gold) 15%, transparent)", color: "var(--gold)" }}>{activeCount}</span>}
        </div>
        <div className="flex items-center gap-3">
          {activeCount > 0 && <button onClick={resetFilters} className="text-xs transition-colors" style={{ fontFamily: FA, color: "var(--gold)" }}>حذف فیلترها</button>}
          {onClose && <button onClick={onClose} className="w-7 h-7 flex items-center justify-center" style={{ color: "var(--fg-dim)" }}><svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" /></svg></button>}
        </div>
      </div>

      {/* Price */}
      <SectionTitle>قیمت (تومان)</SectionTitle>
      <div className="flex gap-2 items-center mb-1">
        <input type="number" dir="ltr" placeholder="حداقل" value={filters.minPrice || ""}
          onChange={(e) => setFilters((f) => ({ ...f, minPrice: Number(e.target.value) || 0 }))}
          className="w-full px-2 py-1.5 text-xs border outline-none rounded-sm"
          style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <span className="text-xs shrink-0" style={{ color: "var(--fg-dim)" }}>تا</span>
        <input type="number" dir="ltr" placeholder="حداکثر" value={filters.maxPrice < MAX_PRICE ? filters.maxPrice : ""}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) || MAX_PRICE }))}
          className="w-full px-2 py-1.5 text-xs border outline-none rounded-sm"
          style={{ fontFamily: FA, backgroundColor: "var(--bg-muted)", borderColor: "var(--border)", color: "var(--fg)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      {/* Gender */}
      <SectionTitle>مناسب برای</SectionTitle>
      {GENDERS.map((g) => <CheckRow key={g} label={g} checked={filters.genders.includes(g)} onChange={() => setFilters((f) => ({ ...f, genders: toggle(f.genders, g) }))} />)}

      {/* Volume */}
      <SectionTitle>حجم</SectionTitle>
      {VOLUMES.map((v) => <CheckRow key={v} label={`${v} ml`} checked={filters.volumes.includes(v)} onChange={() => setFilters((f) => ({ ...f, volumes: toggle(f.volumes, v) }))} />)}

      {/* Brands */}
      <SectionTitle>برند</SectionTitle>
      {BRANDS.map((b) => <CheckRow key={b} label={b} checked={filters.brands.includes(b)} onChange={() => setFilters((f) => ({ ...f, brands: toggle(f.brands, b) }))} />)}

      {/* Family */}
      <SectionTitle>خانواده بویایی</SectionTitle>
      {FAMILIES.map((f) => <CheckRow key={f} label={f} checked={filters.families.includes(f)} onChange={() => setFilters((flt) => ({ ...flt, families: toggle(flt.families, f) }))} />)}

      {/* Season */}
      <SectionTitle>فصل</SectionTitle>
      {SEASONS.map((s) => <CheckRow key={s} label={s} checked={filters.seasons.includes(s)} onChange={() => setFilters((f) => ({ ...f, seasons: toggle(f.seasons, s) }))} />)}
    </div>
  );
}

export default function Shop() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (filters.brands.length)   list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.families.length) list = list.filter((p) => filters.families.includes(p.family));
    if (filters.seasons.length)  list = list.filter((p) => p.season.some((s) => filters.seasons.includes(s)));
    if (filters.genders.length)  list = list.filter((p) => filters.genders.includes(p.gender));
    if (filters.volumes.length)  list = list.filter((p) => p.volumes.some((v) => filters.volumes.includes(v.ml)));
    list = list.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (sort === "discount") list = list.filter((p) => !!p.discount);
    if (sort === "asc")      list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc")     list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "newest")   list = [...list].filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
    return list;
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSortChange(val: string) { setSort(val); setPage(1); }
  function handleFilterChange(fn: React.SetStateAction<Filters>) {
    setFilters(fn);
    setPage(1);
  }

  const activeFilterCount = filters.brands.length + filters.families.length + filters.seasons.length + filters.genders.length + filters.volumes.length + (filters.minPrice > 0 || filters.maxPrice < MAX_PRICE ? 1 : 0);

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-6 pt-28 pb-20">
      {/* Title */}
      <div className="text-right mb-6">
        <p className="text-xs tracking-wide mb-1" style={{ fontFamily: FA, color: "var(--gold)" }}>همه محصولات</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>فروشگاه</h1>
      </div>

      {/* Sort bar — always visible at top */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
        <p className="text-sm" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>{filtered.length}</span> محصول
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>مرتب‌سازی:</span>
          {SORTS.map((s) => (
            <button key={s.value} onClick={() => handleSortChange(s.value)}
              className="text-xs px-3 py-1.5 border transition-all duration-150"
              style={{ fontFamily: FA, borderColor: sort === s.value ? "var(--gold)" : "var(--border)", color: sort === s.value ? "var(--gold)" : "var(--fg-dim)", backgroundColor: sort === s.value ? "color-mix(in srgb, var(--gold) 10%, transparent)" : "transparent" }}
            >{s.label}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 border rounded-sm p-4" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <FilterPanel filters={filters} setFilters={handleFilterChange} />
          </div>
        </aside>

        {/* Product grid + pagination */}
        <div className="flex-1 min-w-0">
          {paged.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-base mb-4" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>محصولی با این فیلترها یافت نشد</p>
              <button onClick={() => { setFilters(DEFAULT_FILTERS); setPage(1); }}
                className="text-sm px-5 py-2 border" style={{ fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)" }}>
                حذف همه فیلترها
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paged.map((p) => <ProductCardGrid key={p.id} product={p} />)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                    className="w-9 h-9 border flex items-center justify-center transition-colors disabled:opacity-30"
                    style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
                    onMouseEnter={(e) => { if (!e.currentTarget.disabled) (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; }}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button key={n} onClick={() => setPage(n)}
                      className="w-9 h-9 border text-sm font-bold transition-all"
                      style={{ fontFamily: FA, borderColor: page === n ? "var(--gold)" : "var(--border)", color: page === n ? "var(--gold)" : "var(--fg-dim)", backgroundColor: page === n ? "color-mix(in srgb, var(--gold) 10%, transparent)" : "transparent" }}
                    >{n}</button>
                  ))}
                  <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
                    className="w-9 h-9 border flex items-center justify-center transition-colors disabled:opacity-30"
                    style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
                    onMouseEnter={(e) => { if (!e.currentTarget.disabled) (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; }}
                    onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile/Tablet filter FAB */}
      <button className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-xl border font-bold text-sm transition-all"
        style={{ fontFamily: FA, backgroundColor: "var(--bg-card)", borderColor: "var(--gold)", color: "var(--gold)", boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
        onClick={() => setMobileFilterOpen(true)}
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" /></svg>
        فیلترها {activeFilterCount > 0 && <span className="w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold" style={{ backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>{activeFilterCount}</span>}
      </button>

      {/* Mobile filter overlay */}
      {mobileFilterOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-80 max-w-full overflow-y-auto p-6" style={{ backgroundColor: "var(--bg-card)", borderLeft: "1px solid var(--border)" }}>
            <FilterPanel filters={filters} setFilters={handleFilterChange} onClose={() => setMobileFilterOpen(false)} />
            <button onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-6 py-3 text-sm font-bold"
              style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}
            >اعمال فیلترها</button>
          </div>
        </>
      )}
    </div>
  );
}
