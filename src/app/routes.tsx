import { createBrowserRouter, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppProvider } from "../context/AppContext";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Journal from "../pages/Journal";
import SearchResults from "../pages/Search";
import Shipping from "../pages/legal/Shipping";
import Returns from "../pages/legal/Returns";
import FAQ from "../pages/legal/FAQ";
import Privacy from "../pages/legal/Privacy";

function Root() {
  return (
    <AppProvider>
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg)" }}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

/* Login page skips the Navbar/Footer shell */
function LoginRoot() {
  return (
    <AppProvider>
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: "var(--bg)" }}>
        <Login />
      </div>
    </AppProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "cart", Component: Cart },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "journal", Component: Journal },
      { path: "search", Component: SearchResults },
      { path: "shipping", Component: Shipping },
      { path: "returns", Component: Returns },
      { path: "faq", Component: FAQ },
      { path: "privacy", Component: Privacy },
    ],
  },
  { path: "/login", Component: LoginRoot },
]);
