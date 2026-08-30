import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../components/About/About";  
import Contact from "../components/ContactUs/Contact";
import Menu from "../components/Menu/Menu";
import MenuDetail from "../pages/MenuDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

function AppRoutes() {
  return (
        <HashRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />         
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;