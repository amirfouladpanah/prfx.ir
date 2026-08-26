import { useRef } from "react";
import type { Product } from "../data/products";
import ProductCard from "./ProductCard";

const FA = "'Vazirmatn', system-ui, sans-serif";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
};

export default function HorizontalScroll({ title, subtitle, products, viewAllHref = "/shop" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "right" | "left") {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? 280 : -280, behavior: "smooth" });
  }

  return (
    <section dir="rtl" className="py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 flex items-end justify-between mb-6">
        <div>
          {subtitle && (
            <p className="text-xs tracking-wide mb-1" style={{ fontFamily: FA, color: "var(--gold)" }}>{subtitle}</p>
          )}
          <h2 className="text-2xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {/* Arrow buttons */}
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 border flex items-center justify-center transition-all duration-200 rounded-sm"
            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
            aria-label="قبلی"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 border flex items-center justify-center transition-all duration-200 rounded-sm"
            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
            aria-label="بعدی"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <a
            href={viewAllHref}
            className="text-xs border-b transition-colors duration-200"
            style={{ fontFamily: FA, borderColor: "var(--gold)", color: "var(--gold)" }}
          >
            مشاهده همه
          </a>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{
          paddingRight: "max(1.5rem, calc((100% - 80rem) / 2 + 1.5rem))",
          paddingLeft: "1.5rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
