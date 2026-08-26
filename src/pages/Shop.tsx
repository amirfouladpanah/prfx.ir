import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { ProductCardGrid } from "../components/ProductCard";

const FA = "'Vazirmatn', system-ui, sans-serif";

const TYPES   = ["همه", "ادو پرفیوم", "ادو کلن", "اکسترا پرفیوم", "ادو توالت"];
const GENDERS = ["همه", "مردانه", "زنانه", "یونیسکس"];
const SORTS   = [
  { label: "پیش‌فرض", value: "default" },
  { label: "ارزان‌ترین", value: "asc" },
  { label: "گران‌ترین", value: "desc" },
  { label: "تخفیف‌دار", value: "discount" },
];

export default function Shop() {
  const [type, setType]     = useState("همه");
  const [gender, setGender] = useState("همه");
  const [sort, setSort]     = useState("default");

  let products = PRODUCTS
    .filter((p) => type === "همه" || p.subtitle === type)
    .filter((p) => gender === "همه" || p.gender === gender)
    .filter((p) => sort !== "discount" || !!p.discount);

  if (sort === "asc")  products = [...products].sort((a, b) => a.price - b.price);
  if (sort === "desc") products = [...products].sort((a, b) => b.price - a.price);

  function FilterBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        className="text-xs px-3 py-1.5 border transition-all duration-200 whitespace-nowrap"
        style={active
          ? { fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)", backgroundColor: "color-mix(in srgb, var(--gold) 12%, transparent)" }
          : { fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-dim)" }}
      >{label}</button>
    );
  }

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-6 pt-28 pb-20">
      {/* Title */}
      <div className="text-right mb-8">
        <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>همه محصولات</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>فروشگاه</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold ml-1" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>نوع:</span>
          {TYPES.map((t) => <FilterBtn key={t} label={t} active={type === t} onClick={() => setType(t)} />)}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold ml-1" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>جنسیت:</span>
          {GENDERS.map((g) => <FilterBtn key={g} label={g} active={gender === g} onClick={() => setGender(g)} />)}
        </div>
        <div className="flex flex-wrap gap-2 items-center mr-auto">
          <span className="text-xs font-semibold ml-1" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>مرتب‌سازی:</span>
          {SORTS.map((s) => <FilterBtn key={s.value} label={s.label} active={sort === s.value} onClick={() => setSort(s.value)} />)}
        </div>
      </div>

      {/* Count */}
      <p className="text-xs mb-6 text-right" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
        {products.length} محصول یافت شد
      </p>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>محصولی با این فیلترها یافت نشد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((p) => <ProductCardGrid key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
