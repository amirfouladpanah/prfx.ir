import { useSearchParams } from "react-router";
import { PRODUCTS } from "../data/products";
import { ProductCardGrid } from "../components/ProductCard";

const FA = "'Vazirmatn', system-ui, sans-serif";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";

  const results = q.trim()
    ? PRODUCTS.filter(
        (p) => p.name.includes(q) || p.subtitle.includes(q) || p.notes.includes(q) || p.gender.includes(q)
      )
    : [];

  return (
    <div dir="rtl" className="max-w-7xl mx-auto px-6 pt-28 pb-20">
      <div className="text-right mb-8">
        <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>نتایج جستجو</p>
        <h1 className="text-3xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>
          {q ? `«${q}»` : "جستجو"}
        </h1>
        {q && (
          <p className="text-sm mt-2" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
            {results.length} محصول یافت شد
          </p>
        )}
      </div>

      {!q && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>عبارت جستجو را وارد کنید</p>
        </div>
      )}

      {q && results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-lg mb-2" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>نتیجه‌ای یافت نشد</p>
          <p className="text-sm" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>عبارت دیگری امتحان کنید</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((p) => <ProductCardGrid key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
