import { useState } from "react";

const FA = "'Vazirmatn', system-ui, sans-serif";

const FAQS = [
  { q: "چطور مطمئن شوم عطر انتخابی برای من مناسب است؟", a: "پیشنهاد می‌کنیم نمونه‌های رایگان را با هر سفارش بالای ۵۰۰ هزار تومان امتحان کنید. همچنین می‌توانید توضیحات ترکیبات و نظرات کاربران را مطالعه کنید." },
  { q: "محصولات اصلی هستند؟", a: "بله، تمام محصولات پرفیوم ایکس ۱۰۰٪ اصل و دارای گواهی اصالت هستند. ما مستقیماً از تولیدکنندگان معتبر خرید می‌کنیم." },
  { q: "آیا می‌توانم عطر را به عنوان هدیه ارسال کنم؟", a: "بله! هنگام خرید گزینه 'ارسال به عنوان هدیه' را انتخاب کنید. بسته‌بندی هدیه رایگان ارائه می‌شود و فاکتور قیمت داخل بسته قرار نمی‌گیرد." },
  { q: "نحوه نگهداری از عطر چگونه است؟", a: "عطر را در مکان خنک، دور از نور مستقیم آفتاب و دما نگهداری کنید. بهتر است در جعبه اصلی نگه دارید. از نگهداری در حمام خودداری کنید چون بخار آب کیفیت آن را کاهش می‌دهد." },
  { q: "تفاوت ادو پرفیوم و ادو کلن چیست؟", a: "ادو پرفیوم (EDP) حاوی ۱۵ تا ۲۰ درصد روغن معطر است و ۶ تا ۸ ساعت ماندگاری دارد. ادو کلن (EDC) حاوی ۲ تا ۴ درصد روغن است و ۲ تا ۳ ساعت دوام دارد." },
  { q: "آیا عطرهای شما برای پوست حساس مناسب است؟", a: "اکثر عطرهای ما از مواد طبیعی تهیه شده‌اند. برای پوست‌های بسیار حساس توصیه می‌کنیم ابتدا روی ناحیه کوچکی از پوست آزمایش کنید. اگر خاص علائم حساسیت دیدید، استفاده را متوقف کنید." },
  { q: "آیا می‌توانم قبل از خرید عطر را امتحان کنم؟", a: "بله، می‌توانید نمونه‌های رایگان با هر سفارش درخواست کنید. همچنین در فروشگاه‌های حضوری ما در تهران می‌توانید عطرها را به صورت حضوری بو کنید." },
  { q: "روش‌های پرداخت چیست؟", a: "ما پرداخت آنلاین از طریق درگاه‌های معتبر بانکی و همچنین پرداخت در محل (هنگام تحویل) را می‌پذیریم." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div dir="rtl" className="max-w-3xl mx-auto px-6 pt-28 pb-20">
      <div className="text-right mb-10">
        <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>پاسخ به سوالات شما</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>سوالات متداول</h1>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="border rounded-sm overflow-hidden transition-all" style={{ borderColor: open === i ? "var(--gold)" : "var(--border)", backgroundColor: "var(--bg-card)" }}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-right gap-4"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-sm font-semibold text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>{faq.q}</span>
              <svg
                width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                className="shrink-0 transition-transform duration-300"
                style={{ color: "var(--gold)", transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <p className="text-sm leading-loose text-right" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
