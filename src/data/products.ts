export type Gender = "مردانه" | "زنانه" | "یونیسکس";

export type Product = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  priceLabel: string;
  originalPrice?: number;
  originalPriceLabel?: string;
  discount?: number;
  ml: string;
  notes: string;
  image: string;
  tag: string | null;
  gender: Gender;
  isNew?: boolean;
  isBestseller?: boolean;
  isAutumn?: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "نویر ابسولو",
    subtitle: "ادو پرفیوم",
    price: 6800000,
    priceLabel: "۶٫۸۰۰٫۰۰۰",
    ml: "۵۰ میلی‌لیتر",
    notes: "عود · وتیور · عنبر",
    image: "https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=600&h=700&fit=crop&auto=format",
    tag: "پرفروش",
    gender: "مردانه",
    isBestseller: true,
  },
  {
    id: 2,
    name: "اتر شماره ۷",
    subtitle: "ادو کلن",
    price: 4600000,
    priceLabel: "۴٫۶۰۰٫۰۰۰",
    ml: "۱۰۰ میلی‌لیتر",
    notes: "برگاموت · سدر · مشک",
    image: "https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=700&fit=crop&auto=format",
    tag: null,
    gender: "مردانه",
    isBestseller: true,
  },
  {
    id: 3,
    name: "سابل دوره",
    subtitle: "ادو پرفیوم",
    price: 5740000,
    priceLabel: "۵٫۷۴۰٫۰۰۰",
    originalPrice: 8200000,
    originalPriceLabel: "۸٫۲۰۰٫۰۰۰",
    discount: 30,
    ml: "۵۰ میلی‌لیتر",
    notes: "صندل · وانیل · تونکا",
    image: "https://images.unsplash.com/photo-1761329842950-f3551938e4da?w=600&h=700&fit=crop&auto=format",
    tag: "تخفیف",
    gender: "یونیسکس",
    isAutumn: true,
    isBestseller: true,
  },
  {
    id: 4,
    name: "سوندر فرواید",
    subtitle: "اکسترا پرفیوم",
    price: 10300000,
    priceLabel: "۱۰٫۳۰۰٫۰۰۰",
    ml: "۳۰ میلی‌لیتر",
    notes: "دود · چرم · زنبق",
    image: "https://images.unsplash.com/photo-1640975972263-1f73398e943b?w=600&h=700&fit=crop&auto=format",
    tag: "محدود",
    gender: "مردانه",
  },
  {
    id: 5,
    name: "ریواژ",
    subtitle: "ادو توالت",
    price: 4000000,
    priceLabel: "۴٫۰۰۰٫۰۰۰",
    ml: "۱۰۰ میلی‌لیتر",
    notes: "نمک دریا · نرولی · چوب",
    image: "https://images.unsplash.com/photo-1553699357-fdefb876c402?w=600&h=700&fit=crop&auto=format",
    tag: null,
    gender: "یونیسکس",
  },
  {
    id: 6,
    name: "انسنس رویال",
    subtitle: "ادو پرفیوم",
    price: 7500000,
    priceLabel: "۷٫۵۰۰٫۰۰۰",
    ml: "۵۰ میلی‌لیتر",
    notes: "کندر · گل رز · پاچولی",
    image: "https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=700&fit=crop&auto=format",
    tag: null,
    gender: "زنانه",
    isBestseller: true,
  },
  {
    id: 7,
    name: "رز نوار",
    subtitle: "ادو پرفیوم",
    price: 5600000,
    priceLabel: "۵٫۶۰۰٫۰۰۰",
    originalPrice: 7000000,
    originalPriceLabel: "۷٫۰۰۰٫۰۰۰",
    discount: 20,
    ml: "۵۰ میلی‌لیتر",
    notes: "گل رز · مشک · وود",
    image: "https://images.unsplash.com/photo-1572726729207-a78d6feb18d7?w=600&h=700&fit=crop&auto=format",
    tag: "تخفیف",
    gender: "زنانه",
    isNew: true,
    isAutumn: true,
  },
  {
    id: 8,
    name: "سیدر فورست",
    subtitle: "ادو توالت",
    price: 3800000,
    priceLabel: "۳٫۸۰۰٫۰۰۰",
    ml: "۱۰۰ میلی‌لیتر",
    notes: "سدر · خاک · پاچولی",
    image: "https://images.unsplash.com/photo-1759793499938-904b23d7ddae?w=600&h=700&fit=crop&auto=format",
    tag: "جدید",
    gender: "مردانه",
    isNew: true,
    isAutumn: true,
  },
  {
    id: 9,
    name: "عنبر شرقی",
    subtitle: "ادو پرفیوم",
    price: 6200000,
    priceLabel: "۶٫۲۰۰٫۰۰۰",
    originalPrice: 8800000,
    originalPriceLabel: "۸٫۸۰۰٫۰۰۰",
    discount: 30,
    ml: "۵۰ میلی‌لیتر",
    notes: "عنبر · ادویه · وانیل",
    image: "https://images.unsplash.com/photo-1760447068551-26ae4dfb1f80?w=600&h=700&fit=crop&auto=format",
    tag: "تخفیف",
    gender: "یونیسکس",
    isNew: true,
    isAutumn: true,
  },
  {
    id: 10,
    name: "گل محمدی",
    subtitle: "ادو پرفیوم",
    price: 9100000,
    priceLabel: "۹٫۱۰۰٫۰۰۰",
    ml: "۳۰ میلی‌لیتر",
    notes: "گل محمدی · عود · مشک",
    image: "https://images.unsplash.com/photo-1759335284084-2cbed9b504ce?w=600&h=700&fit=crop&auto=format",
    tag: "پرفروش",
    gender: "زنانه",
    isBestseller: true,
  },
];
