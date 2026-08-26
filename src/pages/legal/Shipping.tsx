const FA = "'Vazirmatn', system-ui, sans-serif";

export default function Shipping() {
  return (
    <div dir="rtl" className="max-w-3xl mx-auto px-6 pt-28 pb-20 text-right">
      <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>اطلاعات ارسال</p>
      <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: FA, color: "var(--fg)" }}>سیاست ارسال</h1>

      {[
        { title: "ارسال رایگان", body: "برای تمام سفارش‌های بالای ۵۰۰ هزار تومان ارسال کاملاً رایگان است. برای سفارش‌های کمتر، هزینه ارسال ۵۰ هزار تومان محاسبه می‌شود." },
        { title: "زمان پردازش", body: "سفارش‌های ثبت‌شده قبل از ساعت ۱۴ در همان روز کاری پردازش می‌شوند. سفارش‌های بعد از این ساعت روز کاری بعد پردازش خواهند شد." },
        { title: "زمان تحویل", body: "تحویل درون‌شهری (تهران): ۱ تا ۲ روز کاری\nسایر استان‌ها: ۳ تا ۵ روز کاری\nمناطق دورافتاده: ۵ تا ۷ روز کاری" },
        { title: "پیگیری سفارش", body: "پس از ارسال، کد رهگیری مرسوله از طریق پیامک و ایمیل برای شما ارسال می‌شود. می‌توانید از طریق سایت پست ایران وضعیت مرسوله خود را پیگیری کنید." },
        { title: "ارسال به خارج از کشور", body: "در حال حاضر ارسال به خارج از کشور انجام نمی‌شود. به زودی این سرویس اضافه خواهد شد." },
        { title: "بسته‌بندی", body: "تمام محصولات با بسته‌بندی مقاوم و جذاب ارسال می‌شوند. بسته‌بندی هدیه به صورت رایگان برای هر سفارش ارائه می‌شود." },
      ].map((s) => (
        <div key={s.title} className="mb-8 pb-8 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: FA, color: "var(--fg)" }}>{s.title}</h2>
          <p className="text-sm leading-loose whitespace-pre-line" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{s.body}</p>
        </div>
      ))}
    </div>
  );
}
