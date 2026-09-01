import { useState } from "react";
import { Link } from "react-router";
import type { Product, VolumeOption } from "../data/products";
import { useApp } from "../context/AppContext";

const FA = "'Vazirmatn', system-ui, sans-serif";

const GENDER_ICON: Record<string, { icon: string; color: string }> = {
  مردانه:  { icon: "♂", color: "#6da4c4" },
  زنانه:   { icon: "♀", color: "#e07fa0" },
  یونیسکس: { icon: "⚥", color: "#c9a84c" },
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? "var(--gold)" : "none"} stroke="var(--gold)" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-[10px] mr-1" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>({rating})</span>
    </div>
  );
}

/* Horizontal card for scroll sections */
export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useApp();
  const [selectedVol, setSelectedVol] = useState<VolumeOption>(product.volumes[1] ?? product.volumes[0]);
  const [added, setAdded] = useState(false);
  const g = GENDER_ICON[product.gender];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product, selectedVol);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link to={`/product/${product.id}`} className="block shrink-0 w-52 sm:w-60 no-underline group" style={{ color: "inherit" }}>
      <article
        className="flex flex-col overflow-hidden h-full transition-all duration-300"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 4 }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ backgroundColor: "var(--bg-card2)", aspectRatio: "3/4" }}>
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "linear-gradient(to top, var(--bg-card) 0%, transparent 55%)" }} />
          {product.tag && (
            <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5" style={{ fontFamily: FA, backgroundColor: product.tag === "تخفیف" ? "#e05555" : "var(--gold)", color: product.tag === "تخفیف" ? "#fff" : "var(--gold-text)" }}>
              {product.tag}{product.discount ? ` ${product.discount}٪` : ""}
            </span>
          )}
          <span className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" title={product.gender} style={{ backgroundColor: "rgba(0,0,0,0.55)", color: g.color, backdropFilter: "blur(4px)" }}>
            {g.icon}
          </span>
        </div>

        {/* Body */}
        <div className="p-3 flex flex-col flex-1 gap-2 text-right" dir="rtl">
          <p className="text-[10px]" style={{ fontFamily: FA, color: "var(--gold)" }}>{product.brand}</p>
          <h3 className="text-sm font-semibold leading-snug" style={{ fontFamily: FA, color: "var(--fg)" }}>{product.name}</h3>
          <Stars rating={product.rating} />

          {/* Volume selector */}
          <div className="flex gap-1.5 flex-wrap mt-0.5" onClick={(e) => e.preventDefault()}>
            {product.volumes.map((v) => (
              <button
                key={v.ml}
                onClick={(e) => { e.preventDefault(); setSelectedVol(v); }}
                className="text-[10px] px-2 py-0.5 border transition-all duration-150"
                style={{
                  fontFamily: FA,
                  borderColor: selectedVol.ml === v.ml ? "var(--gold)" : "var(--border)",
                  color: selectedVol.ml === v.ml ? "var(--gold)" : "var(--fg-dim)",
                  backgroundColor: selectedVol.ml === v.ml ? "color-mix(in srgb, var(--gold) 10%, transparent)" : "transparent",
                }}
              >{v.ml} ml</button>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>{selectedVol.priceLabel}<span className="text-[10px] font-normal mr-0.5" style={{ color: "var(--fg-dim)" }}>تومان</span></span>
            {selectedVol.originalPriceLabel && <span className="text-[10px] line-through" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>{selectedVol.originalPriceLabel}</span>}
          </div>

          <button onClick={handleAdd} className="mt-auto text-[11px] font-semibold py-1.5 border transition-all duration-200"
            style={added ? { fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)", backgroundColor: "color-mix(in srgb,var(--gold) 12%,transparent)" } : { fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-muted)" }}
            onMouseEnter={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor="var(--gold)"; (e.currentTarget as HTMLElement).style.color="var(--gold)"; }}}
            onMouseLeave={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--fg-muted)"; }}}
          >{added ? "اضافه شد ✓" : "افزودن به سبد"}</button>
        </div>
      </article>
    </Link>
  );
}

/* Grid card */
export function ProductCardGrid({ product }: { product: Product }) {
  const { addToCart } = useApp();
  const [selectedVol, setSelectedVol] = useState<VolumeOption>(product.volumes[1] ?? product.volumes[0]);
  const [added, setAdded] = useState(false);
  const g = GENDER_ICON[product.gender];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addToCart(product, selectedVol);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <Link to={`/product/${product.id}`} className="block no-underline group" style={{ color: "inherit" }}>
      <article className="flex flex-col overflow-hidden h-full transition-all duration-300"
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
          <span className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold" title={product.gender} style={{ backgroundColor: "rgba(0,0,0,0.55)", color: g.color, backdropFilter: "blur(4px)" }}>
            {g.icon}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-1 gap-2 text-right" dir="rtl">
          <p className="text-[11px] font-semibold" style={{ fontFamily: FA, color: "var(--gold)" }}>{product.brand}</p>
          <h3 className="text-base font-semibold leading-snug" style={{ fontFamily: FA, color: "var(--fg)" }}>{product.name}</h3>
          <p className="text-[11px]" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{product.subtitle} · {product.concentration}</p>
          <Stars rating={product.rating} />
          <p className="text-[11px]" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{product.notes}</p>

          {/* Volume selector */}
          <div className="flex gap-1.5 flex-wrap mt-1" onClick={(e) => e.preventDefault()}>
            {product.volumes.map((v) => (
              <button key={v.ml} onClick={(e) => { e.preventDefault(); setSelectedVol(v); }}
                className="text-[11px] px-2.5 py-1 border transition-all duration-150"
                style={{ fontFamily: FA, borderColor: selectedVol.ml === v.ml ? "var(--gold)" : "var(--border)", color: selectedVol.ml === v.ml ? "var(--gold)" : "var(--fg-dim)", backgroundColor: selectedVol.ml === v.ml ? "color-mix(in srgb, var(--gold) 10%, transparent)" : "transparent" }}
              >{v.ml} ml</button>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 flex-wrap mt-1">
            <span className="text-base font-bold" style={{ fontFamily: FA, color: "var(--gold)" }}>{selectedVol.priceLabel}<span className="text-[11px] font-normal mr-0.5" style={{ color: "var(--fg-dim)" }}>تومان</span></span>
            {selectedVol.originalPriceLabel && <span className="text-xs line-through" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>{selectedVol.originalPriceLabel}</span>}
          </div>

          <div className="flex items-center gap-2 mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
            <button onClick={handleAdd} className="flex-1 text-xs font-semibold py-2 border transition-all duration-200"
              style={added ? { fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)", backgroundColor: "color-mix(in srgb,var(--gold) 12%,transparent)" } : { fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-muted)" }}
              onMouseEnter={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor="var(--gold)"; (e.currentTarget as HTMLElement).style.color="var(--gold)"; }}}
              onMouseLeave={(e) => { if (!added) { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--fg-muted)"; }}}
            >{added ? "اضافه شد ✓" : "افزودن به سبد"}</button>
            <button className="w-9 h-9 flex items-center justify-center border transition-colors shrink-0" style={{ borderColor: "var(--border)", color: "var(--fg-dim)" }}
              onClick={(e) => e.preventDefault()}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor="#e07fa0"; (e.currentTarget as HTMLElement).style.color="#e07fa0"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--fg-dim)"; }}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
}
