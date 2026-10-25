import { HashRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../components/About/About";  
import Contact from "../components/ContactUs/Contact";
import Menu from "../components/Menu/Menu";
import MenuDetail from "../pages/MenuDetail";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "../pages/AdminDashboard";
import Register from "../pages/Register";
import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {
  
  return (
     <HashRouter>
      <Routes>
      <Route element={<MainLayout />}>
        {/* Halaman publik */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<MenuDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman yang wajib login */}
       <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        
        </Route>

         {/* Halaman khusus admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        </Route>
        
        </Route>

        </Route>   
      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;