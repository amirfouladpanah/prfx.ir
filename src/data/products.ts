export type Gender = "مردانه" | "زنانه" | "یونیسکس";

export type VolumeOption = {
  ml: number;
  price: number;
  priceLabel: string;
  originalPrice?: number;
  originalPriceLabel?: string;
  discount?: number;
};

export type Product = {
  id: number;
  name: string;
  subtitle: string;
  brand: string;
  price: number;          // default (35ml) price
  priceLabel: string;
  originalPrice?: number;
  originalPriceLabel?: string;
  discount?: number;
  ml: string;
  notes: string;
  image: string;
  images?: string[];
  tag: string | null;
  gender: Gender;
  isNew?: boolean;
  isBestseller?: boolean;
  isAutumn?: boolean;
  family: string;         // خانواده بویایی
  season: string[];
  concentration: string;  // EDP / EDC / EDT
  description: string;
  pyramid: { top: string[]; heart: string[]; base: string[] };
  volumes: VolumeOption[];
  sku: string;
  rating: number;
  ratingCount: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "نویر ابسولو",
    subtitle: "ادو پرفیوم",
    brand: "Maison Noir",
    price: 6800000, priceLabel: "۶٫۸۰۰٫۰۰۰",
    ml: "۳۵ میلی‌لیتر",
    notes: "عود · وتیور · عنبر",
    image: "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=700&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=700&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=700&fit=crop&q=70&auto=format",
      "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=700&fit=crop&sat=-30&auto=format",
      "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=700&fit=crop&con=50&auto=format",
    ],
    tag: "پرفروش", gender: "مردانه", isBestseller: true,
    family: "شرقی", season: ["پاییز", "زمستان"], concentration: "ادو پرفیوم",
    sku: "MN-NA-001",
    rating: 4.7, ratingCount: 284,
    description: "نویر ابسولو عطری است که از اعماق شب الهام گرفته؛ ترکیبی پیچیده از عود دودی، وتیور خاکی و عنبر گرم که هویت مردانه‌ای مستقل و جذاب را به تصویر می‌کشد. این عطر برای مردانی ساخته شده که به دنبال حضوری ماندگار هستند.",
    pyramid: { top: ["برگاموت", "فلفل سیاه"], heart: ["عود", "وتیور"], base: ["عنبر", "مشک سفید", "پاچولی"] },
    volumes: [
      { ml: 25, price: 4500000, priceLabel: "۴٫۵۰۰٫۰۰۰" },
      { ml: 35, price: 6800000, priceLabel: "۶٫۸۰۰٫۰۰۰" },
      { ml: 100, price: 14500000, priceLabel: "۱۴٫۵۰۰٫۰۰۰" },
    ],
  },
  {
    id: 2,
    name: "اتر شماره ۷",
    subtitle: "ادو کلن",
    brand: "Éclat Paris",
    price: 4600000, priceLabel: "۴٫۶۰۰٫۰۰۰",
    ml: "۳۵ میلی‌لیتر",
    notes: "برگاموت · سدر · مشک",
    image: "https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: null, gender: "مردانه", isBestseller: true,
    family: "تازه چوبی", season: ["بهار", "تابستان"], concentration: "ادو کلن",
    sku: "EP-A7-002",
    rating: 4.3, ratingCount: 156,
    description: "اتر شماره ۷ با خوش‌بینی بهاری و پویایی مردانه آغاز می‌شود. ترکیب هوشمندانه برگاموت اصیل ایتالیایی با سدر کانادایی و پایه مشک لطیف، رایحه‌ای به وجود می‌آورد که مناسب هر مناسبت است.",
    pyramid: { top: ["برگاموت", "لیمو"], heart: ["سدر", "نرولی"], base: ["مشک", "وتیور"] },
    volumes: [
      { ml: 25, price: 2900000, priceLabel: "۲٫۹۰۰٫۰۰۰" },
      { ml: 35, price: 4600000, priceLabel: "۴٫۶۰۰٫۰۰۰" },
      { ml: 100, price: 9800000, priceLabel: "۹٫۸۰۰٫۰۰۰" },
    ],
  },
  {
    id: 3,
    name: "سابل دوره",
    subtitle: "ادو پرفیوم",
    brand: "Luna Fragrances",
    price: 5740000, priceLabel: "۵٫۷۴۰٫۰۰۰",
    originalPrice: 8200000, originalPriceLabel: "۸٫۲۰۰٫۰۰۰", discount: 30,
    ml: "۳۵ میلی‌لیتر",
    notes: "صندل · وانیل · تونکا",
    image: "https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: "تخفیف", gender: "یونیسکس", isAutumn: true, isBestseller: true,
    family: "شرقی وانیلی", season: ["پاییز", "زمستان"], concentration: "ادو پرفیوم",
    sku: "LF-SD-003",
    rating: 4.8, ratingCount: 421,
    description: "سابل دوره مانند شنی طلایی از صحرا است؛ گرم، نرم و دعوت‌کننده. صندل هندی با وانیل مادگاسکار و تونکا ترکیبی فوق‌العاده لطیف و ماندگار ایجاد می‌کنند که با هر پوستی منحصربه‌فرد است.",
    pyramid: { top: ["هلو", "گلابی"], heart: ["صندل", "ایریس"], base: ["وانیل", "تونکا", "مشک"] },
    volumes: [
      { ml: 25, price: 3730000, priceLabel: "۳٫۷۳۰٫۰۰۰", originalPrice: 5330000, originalPriceLabel: "۵٫۳۳۰٫۰۰۰", discount: 30 },
      { ml: 35, price: 5740000, priceLabel: "۵٫۷۴۰٫۰۰۰", originalPrice: 8200000, originalPriceLabel: "۸٫۲۰۰٫۰۰۰", discount: 30 },
      { ml: 100, price: 12250000, priceLabel: "۱۲٫۲۵۰٫۰۰۰", originalPrice: 17500000, originalPriceLabel: "۱۷٫۵۰۰٫۰۰۰", discount: 30 },
    ],
  },
  {
    id: 4,
    name: "سوندر فرواید",
    subtitle: "اکسترا پرفیوم",
    brand: "Dark House",
    price: 10300000, priceLabel: "۱۰٫۳۰۰٫۰۰۰",
    ml: "۳۵ میلی‌لیتر",
    notes: "دود · چرم · زنبق",
    image: "https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: "محدود", gender: "مردانه",
    family: "چوبی دودی", season: ["پاییز", "زمستان"], concentration: "اکسترا پرفیوم",
    sku: "DH-SF-004",
    rating: 4.6, ratingCount: 89,
    description: "سوندر فرواید یک شاهکار عطری است برای کسانی که به دنبال تجربه‌ای کاملاً متفاوت هستند. دود، چرم و زنبق در کنار هم داستانی جذاب از قدرت و ظرافت روایت می‌کنند.",
    pyramid: { top: ["دود", "فلفل"], heart: ["چرم", "زنبق"], base: ["عود", "کهربا", "وتیور"] },
    volumes: [
      { ml: 25, price: 8500000, priceLabel: "۸٫۵۰۰٫۰۰۰" },
      { ml: 35, price: 10300000, priceLabel: "۱۰٫۳۰۰٫۰۰۰" },
      { ml: 100, price: 21000000, priceLabel: "۲۱٫۰۰۰٫۰۰۰" },
    ],
  },
  {
    id: 5,
    name: "ریواژ",
    subtitle: "ادو توالت",
    brand: "Côte Bleue",
    price: 4000000, priceLabel: "۴٫۰۰۰٫۰۰۰",
    ml: "۳۵ میلی‌لیتر",
    notes: "نمک دریا · نرولی · چوب",
    image: "https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: null, gender: "یونیسکس",
    family: "تازه آبی", season: ["بهار", "تابستان"], concentration: "ادو توالت",
    sku: "CB-RV-005",
    rating: 4.2, ratingCount: 203,
    description: "ریواژ شما را به ساحل می‌برد. نمک اقیانوس، نرولی شکوفه‌دار و چوب تازه با هم رایحه‌ای ایجاد می‌کنند که آزادی و پاکی را تداعی می‌کند. مناسب برای روزهای گرم بهاری.",
    pyramid: { top: ["نمک دریا", "گریپ‌فروت"], heart: ["نرولی", "بابونه"], base: ["چوب صنوبر", "مشک"] },
    volumes: [
      { ml: 25, price: 2500000, priceLabel: "۲٫۵۰۰٫۰۰۰" },
      { ml: 35, price: 4000000, priceLabel: "۴٫۰۰۰٫۰۰۰" },
      { ml: 100, price: 8500000, priceLabel: "۸٫۵۰۰٫۰۰۰" },
    ],
  },
  {
    id: 6,
    name: "انسنس رویال",
    subtitle: "ادو پرفیوم",
    brand: "Oud Royal",
    price: 7500000, priceLabel: "۷٫۵۰۰٫۰۰۰",
    ml: "۳۵ میلی‌لیتر",
    notes: "کندر · گل رز · پاچولی",
    image: "https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: null, gender: "زنانه", isBestseller: true,
    family: "گلی شرقی", season: ["پاییز", "زمستان"], concentration: "ادو پرفیوم",
    sku: "OR-IR-006",
    rating: 4.9, ratingCount: 512,
    description: "انسنس رویال عطری است که از معابد تاریخ الهام گرفته. کندر خالص با گل رز بلغاری و پاچولی اندونزیایی ترکیبی شاهانه می‌سازند که هر فضایی را جادویی می‌کند.",
    pyramid: { top: ["کندر", "ادویه"], heart: ["گل رز", "یاسمن"], base: ["پاچولی", "کهربا", "مشک"] },
    volumes: [
      { ml: 25, price: 4800000, priceLabel: "۴٫۸۰۰٫۰۰۰" },
      { ml: 35, price: 7500000, priceLabel: "۷٫۵۰۰٫۰۰۰" },
      { ml: 100, price: 15800000, priceLabel: "۱۵٫۸۰۰٫۰۰۰" },
    ],
  },
  {
    id: 7,
    name: "رز نوار",
    subtitle: "ادو پرفیوم",
    brand: "Jardin Fleuri",
    price: 5600000, priceLabel: "۵٫۶۰۰٫۰۰۰",
    originalPrice: 7000000, originalPriceLabel: "۷٫۰۰۰٫۰۰۰", discount: 20,
    ml: "۳۵ میلی‌لیتر",
    notes: "گل رز · مشک · وود",
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: "تخفیف", gender: "زنانه", isNew: true, isAutumn: true,
    family: "گلی", season: ["بهار", "تابستان"], concentration: "ادو پرفیوم",
    sku: "JF-RN-007",
    rating: 4.5, ratingCount: 178,
    description: "رز نوار اوج ظرافت زنانه است. گل رز بلغاری با مشک سفید و چوب صندل در هم می‌آمیزند تا عطری خلق کنند که هم مدرن است هم کلاسیک. انتخابی مطمئن برای هر مناسبتی.",
    pyramid: { top: ["لیچی", "گریپ‌فروت"], heart: ["گل رز", "شقایق"], base: ["چوب صندل", "مشک سفید"] },
    volumes: [
      { ml: 25, price: 3640000, priceLabel: "۳٫۶۴۰٫۰۰۰", originalPrice: 4550000, originalPriceLabel: "۴٫۵۵۰٫۰۰۰", discount: 20 },
      { ml: 35, price: 5600000, priceLabel: "۵٫۶۰۰٫۰۰۰", originalPrice: 7000000, originalPriceLabel: "۷٫۰۰۰٫۰۰۰", discount: 20 },
      { ml: 100, price: 11920000, priceLabel: "۱۱٫۹۲۰٫۰۰۰", originalPrice: 14900000, originalPriceLabel: "۱۴٫۹۰۰٫۰۰۰", discount: 20 },
    ],
  },
  {
    id: 8,
    name: "سیدر فورست",
    subtitle: "ادو توالت",
    brand: "Forest & Stone",
    price: 3800000, priceLabel: "۳٫۸۰۰٫۰۰۰",
    ml: "۳۵ میلی‌لیتر",
    notes: "سدر · خاک · پاچولی",
    image: "https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: "جدید", gender: "مردانه", isNew: true, isAutumn: true,
    family: "چوبی", season: ["پاییز", "زمستان"], concentration: "ادو توالت",
    sku: "FS-CF-008",
    rating: 4.1, ratingCount: 67,
    description: "سیدر فورست شما را به دل جنگل‌های پاییزی می‌برد. سدر آتلاس با خاک مرطوب و پاچولی طبیعی رایحه‌ای زمینی و صادقانه می‌سازد که ارتباط با طبیعت را تقویت می‌کند.",
    pyramid: { top: ["سدر", "برگ دریا"], heart: ["خاک", "ریشه زنبق"], base: ["پاچولی", "مشک خاکی"] },
    volumes: [
      { ml: 25, price: 2400000, priceLabel: "۲٫۴۰۰٫۰۰۰" },
      { ml: 35, price: 3800000, priceLabel: "۳٫۸۰۰٫۰۰۰" },
      { ml: 100, price: 8100000, priceLabel: "۸٫۱۰۰٫۰۰۰" },
    ],
  },
  {
    id: 9,
    name: "عنبر شرقی",
    subtitle: "ادو پرفیوم",
    brand: "Oriental Spice",
    price: 6200000, priceLabel: "۶٫۲۰۰٫۰۰۰",
    originalPrice: 8800000, originalPriceLabel: "۸٫۸۰۰٫۰۰۰", discount: 30,
    ml: "۳۵ میلی‌لیتر",
    notes: "عنبر · ادویه · وانیل",
    image: "https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: "تخفیف", gender: "یونیسکس", isNew: true, isAutumn: true,
    family: "شرقی ادویه‌ای", season: ["پاییز", "زمستان"], concentration: "ادو پرفیوم",
    sku: "OS-AS-009",
    rating: 4.4, ratingCount: 134,
    description: "عنبر شرقی سفری است به قلب شرق. عنبر خالص با زعفران طلایی، دارچین سیلانی و وانیل مادگاسکار ترکیبی می‌سازند که داستان‌های هزار و یک شب را زنده می‌کند.",
    pyramid: { top: ["زعفران", "دارچین"], heart: ["عنبر", "رز ترکی"], base: ["وانیل", "مشک", "صمغ"] },
    volumes: [
      { ml: 25, price: 4000000, priceLabel: "۴٫۰۰۰٫۰۰۰", originalPrice: 5720000, originalPriceLabel: "۵٫۷۲۰٫۰۰۰", discount: 30 },
      { ml: 35, price: 6200000, priceLabel: "۶٫۲۰۰٫۰۰۰", originalPrice: 8800000, originalPriceLabel: "۸٫۸۰۰٫۰۰۰", discount: 30 },
      { ml: 100, price: 13100000, priceLabel: "۱۳٫۱۰۰٫۰۰۰", originalPrice: 18700000, originalPriceLabel: "۱۸٫۷۰۰٫۰۰۰", discount: 30 },
    ],
  },
  {
    id: 10,
    name: "گل محمدی",
    subtitle: "ادو پرفیوم",
    brand: "Persian Gardens",
    price: 9100000, priceLabel: "۹٫۱۰۰٫۰۰۰",
    ml: "۳۵ میلی‌لیتر",
    notes: "گل محمدی · عود · مشک",
    image: "https://images.unsplash.com/photo-1759335284084-2cbed9b504ce?w=600&h=700&fit=crop&auto=format",
    images: ["https://images.unsplash.com/photo-1759335284084-2cbed9b504ce?w=600&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1759335284084-2cbed9b504ce?w=600&h=700&fit=crop&q=70&auto=format","https://images.unsplash.com/photo-1759335284084-2cbed9b504ce?w=600&h=700&fit=crop&sat=-30&auto=format","https://images.unsplash.com/photo-1759335284084-2cbed9b504ce?w=600&h=700&fit=crop&con=50&auto=format"],
    tag: "پرفروش", gender: "زنانه", isBestseller: true,
    family: "گلی شرقی", season: ["بهار", "پاییز"], concentration: "ادو پرفیوم",
    sku: "PG-GM-010",
    rating: 4.9, ratingCount: 673,
    description: "گل محمدی تقدیمی است به بهار ایران. گل محمدی کاشانی با عود هندی و مشک اصیل ترکیبی شاعرانه می‌سازند که روح ایرانی را بیدار می‌کند. هر قطره یادآور باغ‌های گل کاشان است.",
    pyramid: { top: ["گل محمدی", "یاسمن"], heart: ["عود", "صندل"], base: ["مشک", "کهربا"] },
    volumes: [
      { ml: 25, price: 5900000, priceLabel: "۵٫۹۰۰٫۰۰۰" },
      { ml: 35, price: 9100000, priceLabel: "۹٫۱۰۰٫۰۰۰" },
      { ml: 100, price: 19200000, priceLabel: "۱۹٫۲۰۰٫۰۰۰" },
    ],
  },
];
