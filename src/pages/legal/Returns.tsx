const FA = "'Vazirmatn', system-ui, sans-serif";

export default function Returns() {
  return (
    <div dir="rtl" className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-right">
      <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>مرجوعی کالا</p>
      <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: FA, color: "var(--fg)" }}>سیاست بازگشت</h1>

      <div className="p-4 border-r-4 mb-8 rounded-sm" style={{ borderColor: "var(--gold)", backgroundColor: "color-mix(in srgb, var(--gold) 8%, transparent)" }}>
        <p className="text-sm font-semibold" style={{ fontFamily: FA, color: "var(--gold)" }}>گارانتی ۷ روزه بازگشت بدون سوال</p>
        <p className="text-sm mt-1" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>اگر به هر دلیلی از خرید خود راضی نبودید، در ۷ روز اول می‌توانید محصول را بازگردانید.</p>
      </div>

      {[
        { title: "شرایط مرجوعی", body: "محصول باید در بسته‌بندی اصلی و استفاده نشده باشد.\nدر صورت معیوب بودن محصول، حتی اگر استفاده شده باشد قابل مرجوعی است.\nمحصولات تخفیف‌دار شامل مرجوعی می‌شوند." },
        { title: "مراحل مرجوعی", body: "۱. با پشتیبانی ما تماس بگیرید (021-88001234)\n۲. کد مرجوعی دریافت کنید\n۳. محصول را با بسته‌بندی مناسب ارسال کنید\n۴. پس از تأیید، مبلغ ظرف ۳ روز کاری به حساب شما برمی‌گردد." },
        { title: "هزینه ارسال مرجوعی", body: "اگر محصول معیوب باشد، هزینه ارسال مرجوعی کاملاً رایگان است.\nدر غیر این صورت، هزینه ارسال مرجوعی بر عهده مشتری است." },
        { title: "بازپرداخت", body: "مبلغ به همان روش پرداخت اولیه بازگردانده می‌شود.\nبازپرداخت معمولاً ۲ تا ۵ روز کاری پس از تأیید مرجوعی انجام می‌شود." },
      ].map((s) => (
        <div key={s.title} className="mb-8 pb-8 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: FA, color: "var(--fg)" }}>{s.title}</h2>
          <p className="text-sm leading-loose whitespace-pre-line" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
