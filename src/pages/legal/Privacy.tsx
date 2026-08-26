const FA = "'Vazirmatn', system-ui, sans-serif";

const SECTIONS = [
  { title: "۱. اطلاعاتی که جمع‌آوری می‌کنیم", body: "ما اطلاعات زیر را از شما جمع‌آوری می‌کنیم:\n• نام و نام خانوادگی\n• آدرس ایمیل و شماره تماس\n• آدرس پستی برای ارسال سفارش\n• اطلاعات پرداخت (اطلاعات کارت بانکی ذخیره نمی‌شود)\n• تاریخچه سفارشات و رفتار مرور در سایت" },
  { title: "۲. نحوه استفاده از اطلاعات", body: "اطلاعات شما برای اهداف زیر استفاده می‌شود:\n• پردازش و ارسال سفارش‌ها\n• ارتباط با شما درباره سفارش‌ها\n• ارسال پیشنهادات و اخبار (با رضایت شما)\n• بهبود خدمات و تجربه کاربری\n• جلوگیری از تقلب و سوء استفاده" },
  { title: "۳. اشتراک‌گذاری اطلاعات", body: "ما هرگز اطلاعات شخصی شما را بدون رضایت شما به اشخاص ثالث نمی‌فروشیم. ممکن است اطلاعات را با:\n• شرکت‌های پستی برای ارسال سفارش\n• درگاه‌های پرداخت بانکی\n• مراجع قانونی در صورت الزام قانونی\nبه اشتراک بگذاریم." },
  { title: "۴. امنیت اطلاعات", body: "ما از پروتکل‌های امنیتی استاندارد صنعت از جمله رمزگذاری SSL استفاده می‌کنیم. اطلاعات کارت بانکی شما هرگز در سرورهای ما ذخیره نمی‌شود." },
  { title: "۵. حقوق شما", body: "شما حق دارید:\n• به اطلاعات شخصی خود دسترسی داشته باشید\n• اطلاعات نادرست را اصلاح کنید\n• درخواست حذف اطلاعات خود کنید\n• از دریافت ایمیل‌های بازاریابی انصراف دهید\nبرای اعمال این حقوق با ما از طریق privacy@perfumex.ir تماس بگیرید." },
  { title: "۶. کوکی‌ها", body: "سایت ما از کوکی‌ها برای بهبود تجربه کاربری استفاده می‌کند. کوکی‌ها اطلاعاتی مانند ترجیحات زبان و محتوای سبد خرید را ذخیره می‌کنند. می‌توانید کوکی‌ها را در مرورگر خود غیرفعال کنید، اما ممکن است برخی قابلیت‌ها کار نکنند." },
  { title: "۷. تغییرات در سیاست حریم خصوصی", body: "ما ممکن است این سیاست را بروزرسانی کنیم. در صورت تغییرات مهم، از طریق ایمیل یا اعلان در سایت شما را مطلع خواهیم کرد. آخرین بروزرسانی: مهر ۱۴۰۵" },
];

export default function Privacy() {
  return (
    <div dir="rtl" className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-right">
      <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>محافظت از داده‌های شما</p>
      <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: FA, color: "var(--fg)" }}>حریم خصوصی</h1>
      <p className="text-sm mb-10" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>آخرین بروزرسانی: مهر ۱۴۰۵</p>

      <div className="p-4 border-r-4 mb-8 rounded-sm" style={{ borderColor: "var(--gold)", backgroundColor: "color-mix(in srgb, var(--gold) 8%, transparent)" }}>
        <p className="text-sm" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>پرفیوم ایکس متعهد به حفاظت از حریم خصوصی شماست. این سند نحوه جمع‌آوری، استفاده و حفاظت از اطلاعات شما را توضیح می‌دهد.</p>
      </div>

      {SECTIONS.map((s) => (
        <div key={s.title} className="mb-8 pb-8 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: FA, color: "var(--fg)" }}>{s.title}</h2>
          <p className="text-sm leading-loose whitespace-pre-line" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
