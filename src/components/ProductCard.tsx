import { useState } from "react";
import type { Product } from "../data/products";
import { useApp } from "../context/AppContext";

const FA = "'Vazirmatn', system-ui, sans-serif";

const GENDER_ICON: Record<string, { icon: string; label: string; color: string }> = {
  مردانه:  { icon: "♂", label: "مردانه",  color: "#6da4c4" },
  زنانه:   { icon: "♀", label: "زنانه",   color: "#e07fa0" },
  یونیسکس: { icon: "⚥", label: "یونیسکس", color: "#c9a84c" },
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useApp();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const g = GENDER_ICON[product.gender];

  return (
    <article
      dir="rtl"
      className="group flex flex-col overflow-hidden transition-all duration-300 shrink-0 w-56 sm:w-64"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4 }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ backgroundColor: "var(--bg-card2)", aspectRatio: "3/4" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(to top, var(--bg-card) 0%, transparent 55%)" }}
        />

        {/* Tag top-right */}
        {product.tag && (
          <span
            className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5"
            style={{
              fontFamily: FA,
              backgroundColor: product.tag === "تخفیف" ? "#e05555" : "var(--gold)",
              color: product.tag === "تخفیف" ? "#fff" : "var(--gold-text)",
            }}
          >
            {product.tag}
            {product.discount ? ` ${product.discount}٪` : ""}
          </span>
        )}

        {/* Gender top-left */}
        <span
          className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
          title={g.label}
          style={{ backgroundColor: "rgba(0,0,0,0.55)", color: g.color, backdropFilter: "blur(4px)" }}
        >
          {g.icon}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1 gap-2 text-right">
        <div>
          <p className="text-[10px] mb-0.5" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
            {product.subtitle} · {product.ml}
          </p>
          <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily: FA, color: "var(--fg)" }}>
            {product.name}
          </h3>
          <p className="text-[10px] mt-1" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>
            {product.notes}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>
            {product.priceLabel}
            <span className="text-[10px] font-normal mr-0.5" style={{ color: "var(--fg-dim)" }}>تومان</span>
          </span>
          {product.originalPriceLabel && (
            <span className="text-[10px] line-through" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>
              {product.originalPriceLabel}
            </span>
          )}
        </div>

        {/* Add button */}
        <button
          onClick={handleAdd}
          className="mt-auto text-xs font-semibold py-2 border transition-all duration-200"
          style={
            added
              ? { fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)", backgroundColor: "color-mix(in srgb, var(--gold) 12%, transparent)" }
              : { fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-muted)" }
          }
          onMouseEnter={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; } }}
          onMouseLeave={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; } }}
        >
          {added ? "اضافه شد ✓" : "افزودن به سبد"}
        </button>
      </div>
    </article>
  );
}

/* Wider card variant for grid layouts */
export function ProductCardGrid({ product }: { product: Product }) {
  const { addToCart } = useApp();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const g = GENDER_ICON[product.gender];

  return (
    <article
      dir="rtl"
      className="group flex flex-col overflow-hidden transition-all duration-300"
      style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4 }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div className="relative overflow-hidden" style={{ backgroundColor: "var(--bg-card2)", aspectRatio: "3/4" }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, var(--bg-card) 0%, transparent 55%)" }} />
        {product.tag && (
          <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5" style={{ fontFamily: FA, backgroundColor: product.tag === "تخفیف" ? "#e05555" : "var(--gold)", color: product.tag === "تخفیف" ? "#fff" : "var(--gold-text)" }}>
            {product.tag}{product.discount ? ` ${product.discount}٪` : ""}
          </span>
        )}
        <span className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" title={g.label} style={{ backgroundColor: "rgba(0,0,0,0.55)", color: g.color, backdropFilter: "blur(4px)" }}>
          {g.icon}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3 text-right">
        <div>
          <p className="text-[11px] mb-1" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{product.subtitle} · {product.ml}</p>
          <h3 className="text-lg font-semibold leading-snug" style={{ fontFamily: FA, color: "var(--fg)" }}>{product.name}</h3>
          <p className="text-xs mt-1.5" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{product.notes}</p>
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-base font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>{product.priceLabel}<span className="text-xs font-normal mr-0.5" style={{ color: "var(--fg-dim)" }}>تومان</span></span>
          {product.originalPriceLabel && <span className="text-xs line-through" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>{product.originalPriceLabel}</span>}
        </div>
        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <button onClick={handleAdd} className="text-xs font-semibold px-4 py-2 border transition-all duration-200"
            style={added ? { fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)", backgroundColor: "color-mix(in srgb, var(--gold) 12%, transparent)" } : { fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-muted)" }}
            onMouseEnter={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; } }}
            onMouseLeave={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; } }}
          >
            {added ? "اضافه شد ✓" : "افزودن به سبد"}
          </button>
          <span className="text-base font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>{product.priceLabel}<span className="text-[10px] font-normal mr-0.5" style={{ color: "var(--fg-dim)" }}>تومان</span></span>
        </div>
      </div>
    </article>
  );
}
