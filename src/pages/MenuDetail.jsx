import { useParams } from "react-router-dom";
import Container from "../components/Container/Container";
import Button from "../components/Button/Button";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";


function MenuDetail() {

  // Ambil ID dari URL
  const { id } = useParams();

  // Cart
  const { addToCart } = useCart();

  // State menu
  const [menu, setMenu] = useState(null);

  // State loading
  const [loading, setLoading] = useState(true);

  // State error
  const [error, setError] = useState("");

  // Quantity
  const [quantity, setQuantity] = useState(1);


  // Ambil data menu dari API
  useEffect(() => {

    fetch(`http://localhost:5000/api/menu/${id}`)

      .then((response) => {

        if (!response.ok) {
          throw new Error("Menu tidak ditemukan");
        }

        return response.json();
      })

      .then((result) => {

        setMenu(result.data);
        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setError("Menu tidak ditemukan");
        setLoading(false);

      });

  }, [id]);


  // Loading
  if (loading) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">
          Loading menu...
        </h2>
      </div>
    );
  }


  // Error
  if (error) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  // Quantity +1
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };


  // Quantity -1
  const decrease = () => {

    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );

  };


  return (

    <div className="bg-amber-50 py-16">

      <Container>

        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image */}

          <div className="flex-1 flex justify-center">
            <img src={`/images/menuImages/${menu.image}`}
                 alt={menu.title}
                 className="w-full max-w-lg rounded-full object-cover" />
          </div>


          {/* Detail */}

          <div className="flex-1">
            <h1 className="text-5xl font-serif mb-6">
              {menu.title}
            </h1>


            <p className="text-gray-700 text-lg mb-8">
              {menu.description}
            </p>

            {/* Additional Information */}

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

              {/* Quantity */}

              <div className="flex items-center border rounded-lg overflow-hidden">

                <button
                  onClick={decrease}
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


              {/* Add to Cart */}

              <Button
                variant="primary"
                onClick={() => addToCart(menu, quantity)}
              >
                Add to Cart +
              </Button>


              {/* Buy Now */}

              <Button
                variant="outline"
                to="/cart"
                onClick={() => addToCart(menu, quantity)}
              >
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