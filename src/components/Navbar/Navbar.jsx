import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import Container from "../Container/Container";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Button from "../Button/Button";
import { useAuth } from "../../context/AuthContext";

  // menu list 
    const menus = [ {name: "Home",path: "/"},
                    {name: "About",path: "/about"},
                    {name: "Menu",path: "/menu"},
                    {name: "Contact",path: "/contact"},
                  ];

function Navbar () { 
    // cart context
    const { cart } = useCart();

     // auth context
    const {user, logout} = useAuth();

    // state for mobile menu toggle
    const [isOpen, setIsOpen] = useState(false);

    // function to handle logout
    const handleLogout = () => {
      logout();
      closeMenu();
    };
    
    // CART COUNT
    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // function to close the mobile menu
    const closeMenu = () => {
        setIsOpen(false);
    
     const navLinkClass = ({ isActive }) =>
        isActive
          ? "text-amber-700 font-semibold border-b-2 border-amber-700"
          : "hover:text-amber-700 transition";

      const handleLogout = () => {
        logout();
        closeMenu();
      };

    };

    return (
    <header className="bg-amber-100 py-4 px-5">
      <nav className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <Link to="/" onClick={closeMenu}
            className="flex items-center gap-3">

            <img src={logo} alt="Cafe Delight Logo" className="w-10 h-10 rounded-full"/>
            <span className="text-xl sm:text-2xl font-semibold
                            uppercase tracking-wide text-amber-700">
              Cafe Delight
            </span>

          </Link>

        {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6">
                {menus.map((menu) => (
                <li key={menu.name}>
                  
                  {/* NAV LINK */}
                  <NavLink to={menu.path}
                    className={({ isActive }) =>
                      isActive
                        ? ` text-amber-700
                              font-semibold
                              border-b-2
                            border-amber-700 `
                        : 
                          ` hover:text-amber-700
                              transition `
                    }
                  >
                    {menu.name}
                  </NavLink>

                </li>

              ))}
            </ul>
              
            {/* CART */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={28} className="text-orange-800"/>

              {/* CART COUNT BADGE */}
              {cart.length > 0 && (
                
                <span className="absolute -top-3 -right-3
                                bg-red-600 text-white text-xs
                                w-5 h-5 rounded-full flex
                                items-center justify-center">
                  {cart.length}
                </span>
                
              )}

            </Link>

            {/* RESERVE TABLE BUTTON */}
            <Button variant="secondary" to="/menu">
              Reserve Table
            </Button>
            

            {/* AUTHENTICATION */}
            {!user ? (
             <Link to="/login"
                   className="text-amber-700 font-bold">
                Login
              </Link>

            ) : (
              <div className="flex items-center gap-3">
                <span className="max-w-32 truncate text-amber-900">
                  {user.name || user.email || "Pengguna"}
                </span>

            <Link className="text-amber-700 font-bold"
                  onClick={handleLogout}>
                Logout
            </Link>
              </div>
            )}


          </div>

        {/* MOBILE MENU TOGGLE */}
          <button type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-orange-800 hover:bg-amber-200 transition"
            aria-label="Toggle menu"
          >

            {isOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}

          </button>

        </div>

            {/* MOBILE MENU */}
        {isOpen && (

          <div className="md:hidden mt-4 border-t border-amber-200 pt-4">
            <ul className="flex flex-col gap-1">
              {menus.map((menu) => (

                <li key={menu.name}>
                  <NavLink to={menu.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg transition
                        ${
                          isActive
                            ? "bg-amber-200 text-amber-800 font-semibold"
                            : "hover:bg-amber-200"
                        } `
                    }
                  >
                    {menu.name}
                  </NavLink>

                </li>

              ))}

            </ul>

            {/* Mobile Cart */}
            <Link to="/cart" onClick={closeMenu}
              className="flex items-center
                        justify-between px-4 py-3 mt-2
                        rounded-lg hover:bg-amber-200 transition">

              <div className="flex items-center gap-3">
                <ShoppingCart size={24} className="text-orange-800" />

                <span>
                  Shopping Cart
                </span>

              </div>

              {cart.length > 0 && (
                <span className="bg-red-600 text-white
                                   text-xs w-6 h-6 rounded-full
                                  flex items-center justify-center">
                  {cart.length}
                </span>
              )}

            </Link>

            <div className="mt-3">
              <Button variant="primary" className="w-full">
                Reserve Table
              </Button>
            </div>

             {/* MOBILE AUTHENTICATION */}
            {!user ? (
              <Link to="/login"onClick={closeMenu}
                className="block w-30 h-10 mt-3 mx-auto bg-orange-800 text-white font-semibold rounded-lg text-center leading-10 hover:bg-amber-700 transition"
              >
                Login
              </Link>
            ) : (
              <div className="mt-3 space-y-2">
                <p className="px-4 py-2 text-amber-900">
                  {user.name || user.email || "Pengguna"}
                </p>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-30 h-10 mt-3 mx-auto bg-orange-800 text-white font-semibold rounded-lg text-center leading-10 hover:bg-amber-700 transition"
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        )}

      </nav>
    </header>
    );
}

export default Navbar;