import { useParams } from "react-router-dom";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import {getMenus} from "../services/api";

function MenuDetail() {

  // get cart context
  const { cart, addToCart } = useCart();

  // get menu id from url
  const { id } = useParams();

  // find menu by id
  const menu = menuData.find(
    (item) => item.id === Number(id)
  );

  if (!menu) {
    return <h2>Menu tidak ditemukan</h2>;
  }

  // state for quantity
  const [quantity, setQuantity] = useState(1);

  // increase and decrease quantity
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  
  return (
    
<div className="bg-amber-50 py-16">
  <Container>
    <div className="flex flex-col lg:flex-row items-center gap-16">

      {/* Image */}
      <div className="flex-1 flex justify-center">
        <img src={menu.image} alt={menu.title}
          className="w-full max-w-lg rounded-full object-cover"
        />
      </div>

      {/* Detail */}
      <div className="flex-1">
        <h1 className="text-5xl font-serif mb-6">
          {menu.title}
        </h1>

        <p className="text-gray-700 text-lg mb-8">
          {menu.description}
        </p>

        <div className="border-t border-b py-6 mb-8">
          <h2 className="text-3xl font-serif mb-4">
            Additional Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <span className="font-semibold">
              Price
            </span>
            <span>
              Rp {menu.price.toLocaleString("id-ID")}
            </span>

            <span className="font-semibold">
              Category
            </span>
            <span>
              {menu.category}
            </span>
          </div>
        </div>

        {/* Quantity + Button */}
       <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg overflow-hidden">

            <button onClick={decrease}
                    className="w-12 h-12 text-2xl hover:bg-gray-100 transition"
            >
               -
            </button>

            <span className="w-12 text-center text-lg font-semibold">
              {quantity}
            </span>

            <button
              onClick={increase}
              className="w-12 h-12 text-2xl hover:bg-gray-100 transition"
            >
              +
            </button>

          </div>
          
                <Button variant="primary" onClick={() => addToCart(menu, quantity)}>
                    Add to Cart +
                </Button>

                <Button variant="outline" to="/cart" onClick={() => addToCart(menu, quantity)}>
                  Buy Now
                </Button>

          </div>

        </div>

    </div>
    </Container>
  </div>
    
  );
}

export default MenuDetail;