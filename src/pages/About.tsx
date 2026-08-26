const FA = "'Vazirmatn', system-ui, sans-serif";

const TEAM = [
  { name: "دکتر سارا اکبری", role: "مدیر عامل و بنیان‌گذار", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&auto=format" },
  { name: "محمدرضا کریمی", role: "سرپرست فرموله‌سازی", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format" },
  { name: "نیلوفر حسینی", role: "طراح خلاق", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&auto=format" },
];

const VALUES = [
  { icon: "🌿", title: "طبیعی و پاک", desc: "تمام ترکیبات ما از منابع طبیعی تهیه می‌شوند و عاری از مواد مضر هستند." },
  { icon: "♻️", title: "پایدار", desc: "بسته‌بندی‌های ما ۱۰۰٪ قابل بازیافت و دوستدار محیط زیست هستند." },
  { icon: "🎨", title: "هنرمندانه", desc: "هر عطر یک اثر هنری است که با دقت و ظرافت خلق می‌شود." },
  { icon: "🤝", title: "معتبر", desc: "بیش از ۳۵ سال سابقه در صنعت عطر با هزاران مشتری وفادار." },
];

export default function About() {
  return (
    <div dir="rtl" className="pt-20" style={{ backgroundColor: "var(--bg)" }}>

      {/* Hero */}
      <div className="relative h-64 md:h-96 overflow-hidden" style={{ backgroundColor: "var(--bg-card2)" }}>
        <img src="https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=1400&h=500&fit=crop&auto=format" alt="درباره ما" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: FA, color: "var(--gold)" }}>داستان ما</p>
          <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>پرفیوم ایکس</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Story */}
        <section className="mb-16 text-right">
          <p className="text-xs tracking-wide mb-3" style={{ fontFamily: FA, color: "var(--gold)" }}>از ۱۳۶۶ تا امروز</p>
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: FA, color: "var(--fg)" }}>روایت یک عشق</h2>
          <div className="space-y-4 text-sm leading-loose" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>
            <p>پرفیوم ایکس در سال ۱۳۶۶ با یک رویا متولد شد: ایجاد عطرهایی که نه تنها بو بدهند، بلکه احساسات را بیدار کنند. بنیان‌گذار ما، دکتر سارا اکبری، بعد از سال‌ها تحصیل در مدرسه عطرسازی گراس فرانسه، به ایران بازگشت تا این هنر را به هموطنانش هدیه دهد.</p>
            <p>امروز، بیش از سه دهه بعد، ما با تیمی از متخصصان برجسته، ترکیبات نادر از سراسر جهان را با مواد اصیل ایرانی درهم می‌آمیزیم تا عطرهایی خلق کنیم که هویت و فرهنگ ما را بازتاب دهند.</p>
            <p>هر بطری پرفیوم ایکس حاوی صدها ساعت تحقیق، آزمایش و خلاقیت است. ما به هیچ‌وجه با کیفیت کنار نمی‌آییم—چون می‌دانیم که عطر خوب یک خاطره ماندگار می‌سازد.</p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>ارزش‌های ما</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="p-5 border rounded-sm text-right" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
                <span className="text-3xl mb-3 block">{v.icon}</span>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: FA, color: "var(--fg)" }}>{v.title}</h3>
                <p className="text-sm leading-loose" style={{ fontFamily: FA, color: "var(--fg-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-right" style={{ fontFamily: FA, color: "var(--fg)" }}>تیم ما</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="text-center">
                <img src={m.img} alt={m.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-4" />
                <p className="font-bold text-sm" style={{ fontFamily: FA, color: "var(--fg)" }}>{m.name}</p>
                <p className="text-xs mt-1" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{m.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
