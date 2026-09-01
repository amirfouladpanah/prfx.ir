import { createContext, useContext, useEffect, useState } from "react";
import type { Product, VolumeOption } from "../data/products";

export type CartItem = {
  product: Product;
  qty: number;
  volumeMl: number;
  price: number;
  priceLabel: string;
  originalPrice?: number;
  discount?: number;
};

type AppContextType = {
  isDark: boolean;
  toggleDark: () => void;
  cartItems: CartItem[];
  addToCart: (p: Product, vol: VolumeOption) => void;
  removeOneFromCart: (productId: number, volumeMl: number) => void;
  removeAllFromCart: (productId: number, volumeMl: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartOriginalTotal: number;
  cartDiscount: number;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("px_logged_in"));

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  function addToCart(product: Product, vol: VolumeOption) {
    setCartItems((prev) => {
      const key = (i: CartItem) => i.product.id === product.id && i.volumeMl === vol.ml;
      const existing = prev.find(key);
      if (existing) return prev.map((i) => key(i) ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, {
        product,
        qty: 1,
        volumeMl: vol.ml,
        price: vol.price,
        priceLabel: vol.priceLabel,
        originalPrice: vol.originalPrice,
        discount: vol.discount,
      }];
    });
  }

  function removeOneFromCart(productId: number, volumeMl: number) {
    setCartItems((prev) => {
      const key = (i: CartItem) => i.product.id === productId && i.volumeMl === volumeMl;
      const existing = prev.find(key);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((i) => !key(i));
      return prev.map((i) => key(i) ? { ...i, qty: i.qty - 1 } : i);
    });
  }

  function removeAllFromCart(productId: number, volumeMl: number) {
    setCartItems((prev) => prev.filter((i) => !(i.product.id === productId && i.volumeMl === volumeMl)));
  }

  function clearCart() { setCartItems([]); }

  function login() { localStorage.setItem("px_logged_in", "1"); setIsLoggedIn(true); }
  function logout() { localStorage.removeItem("px_logged_in"); setIsLoggedIn(false); }

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const cartOriginalTotal = cartItems.reduce((s, i) => s + (i.originalPrice ?? i.price) * i.qty, 0);
  const cartDiscount = cartOriginalTotal - cartTotal;

  return (
    <AppContext.Provider value={{ isDark, toggleDark: () => setIsDark((v) => !v), cartItems, addToCart, removeOneFromCart, removeAllFromCart, clearCart, cartCount, cartTotal, cartOriginalTotal, cartDiscount, isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
