import {createContext, useContext, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (menu, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === menu.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === menu.id
        ? {
              ...item,
              quantity: item.quantity + quantity,
           }
            : item
        );
      }

        return [
            ...prevCart,
            {
                ...menu,
                quantity,
            },
        ];
    });
  }

  const removeFromCart = (menuId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== menuId)
    );
  }

  const increaseQuantity = (menuId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === menuId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

    const decreaseQuantity = (menuId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === menuId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
    );
  }

  const clearCart = () => {
    setCart([]);
  } 

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
      }}
    >
        {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}