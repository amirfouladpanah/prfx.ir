const FA = "'Vazirmatn', system-ui, sans-serif";

const POSTS = [
  {
    id: 1,
    title: "راهنمای انتخاب عطر پاییزی",
    excerpt: "پاییز فصل گرمای درون است. در این مقاله یاد می‌گیریم چطور عطری انتخاب کنیم که با روح پاییز هماهنگ باشد.",
    date: "۱۴ مهر ۱۴۰۵",
    category: "راهنمای خرید",
    image: "https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=600&h=350&fit=crop&auto=format",
    readTime: "۵ دقیقه",
  },
  {
    id: 2,
    title: "تفاوت ادو پرفیوم، ادو کلن و ادو توالت",
    excerpt: "هنگام خرید عطر با این سوال مواجه شدید؟ ما همه چیز را به زبان ساده توضیح می‌دهیم.",
    date: "۲ مهر ۱۴۰۵",
    category: "آموزش",
    image: "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=350&fit=crop&auto=format",
    readTime: "۷ دقیقه",
  },
  {
    id: 3,
    title: "هنر لایه‌بندی عطر: یک عطر منحصربه‌فرد بسازید",
    excerpt: "با ترکیب هوشمندانه عطرها می‌توانید یک بوی کاملاً شخصی و بی‌نظیر خلق کنید.",
    date: "۱۸ شهریور ۱۴۰۵",
    category: "آموزش",
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=350&fit=crop&auto=format",
    readTime: "۶ دقیقه",
  },
  {
    id: 4,
    title: "بهترین عطرهای مردانه ۱۴۰۵",
    excerpt: "کارشناسان ما برترین عطرهای مردانه امسال را بررسی کردند. نتایج شگفت‌انگیز بود.",
    date: "۵ شهریور ۱۴۰۵",
    category: "معرفی محصول",
    image: "https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=350&fit=crop&auto=format",
    readTime: "۸ دقیقه",
  },
  {
    id: 5,
    title: "ماندگاری عطر: چطور عطرتان بیشتر دوام بیاورد",
    excerpt: "با چند ترفند ساده می‌توانید ماندگاری عطر خود را چندین برابر افزایش دهید.",
    date: "۲۰ مرداد ۱۴۰۵",
    category: "راهنمای خرید",
    image: "https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=350&fit=crop&auto=format",
    readTime: "۴ دقیقه",
  },
  {
    id: 6,
    title: "عطرهای یونیسکس: سنت‌شکنی در دنیای رایحه",
    excerpt: "عطرهای یونیسکس چرا محبوب شدند و چطور می‌توانند بهترین انتخاب برای هر دو جنس باشند.",
    date: "۸ مرداد ۱۴۰۵",
    category: "ترند",
    image: "https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=350&fit=crop&auto=format",
    readTime: "۵ دقیقه",
  },
];

const CATS = ["همه", "آموزش", "راهنمای خرید", "معرفی محصول", "ترند"];

export default function Journal() {
  return (
    <div dir="rtl" className="max-w-6xl mx-auto px-6 pt-28 pb-20">
      <div className="text-right mb-10">
        <p className="text-xs tracking-wide mb-2" style={{ fontFamily: FA, color: "var(--gold)" }}>دنیای عطر</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: FA, color: "var(--fg)" }}>مجله پرفیوم ایکس</h1>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATS.map((c) => (
          <button key={c} className="text-xs px-4 py-1.5 border transition-colors" style={{ fontFamily: FA, borderColor: "var(--border)", color: "var(--fg-dim)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--fg-dim)"; }}
          >{c}</button>
        ))}
      </div>

      {/* Featured post */}
      <div className="mb-10 group cursor-pointer overflow-hidden rounded-sm border" style={{ borderColor: "var(--border)" }}>
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={POSTS[0].image} alt={POSTS[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
          <div className="absolute bottom-0 right-0 p-6 text-right">
            <span className="text-xs px-2.5 py-1 mb-3 inline-block" style={{ fontFamily: FA, backgroundColor: "var(--gold)", color: "var(--gold-text)" }}>{POSTS[0].category}</span>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: FA }}>{POSTS[0].title}</h2>
            <p className="text-sm text-white/70" style={{ fontFamily: FA }}>{POSTS[0].date} · {POSTS[0].readTime} مطالعه</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.slice(1).map((post) => (
          <article key={post.id} className="group cursor-pointer overflow-hidden border transition-all" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <div className="overflow-hidden h-44">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-4 text-right">
              <span className="text-[10px] font-semibold px-2 py-0.5 mb-2 inline-block" style={{ fontFamily: FA, backgroundColor: "color-mix(in srgb, var(--gold) 15%, transparent)", color: "var(--gold)" }}>{post.category}</span>
              <h3 className="text-sm font-bold leading-snug mb-2" style={{ fontFamily: FA, color: "var(--fg)" }}>{post.title}</h3>
              <p className="text-xs leading-loose mb-3" style={{ fontFamily: FA, color: "var(--fg-dim)" }}>{post.excerpt}</p>
              <p className="text-[10px]" style={{ fontFamily: FA, color: "var(--fg-dimmer)" }}>{post.date} · {post.readTime} مطالعه</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
