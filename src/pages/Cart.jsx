import Button from "../components/Button/Button";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-2">

          <h2 className="text-2xl font-semibold text-gray-700">
            Cart masih kosong
          </h2>

          <p className="text-gray-500 mt-2">
            Yuk pilih menu favoritmu terlebih dahulu.
          </p>

          <Button to="/menu" variant="secondary">
            Lihat Menu
          </Button>

        </div>
      ) : (

        // cart items and summary
        <>
          {cart.map((item) => (

            <div key={item.id}
                 className="rounded-2xl border p-4 sm:p-5 mb-3">

              
              {/* MOBILE */}
              <div className="md:hidden">

                <div className="flex gap-4">
                  <img src={item.image} alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover" />

                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p>

                  </div>
                </div>


                {/* QUANTITY */}
                <div className="flex justify-end mt-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => decreaseQuantity(item.id)}
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      -
                    </button>

                    <span className="px-5">
                      {item.quantity}
                    </span>

                    <button onClick={() => increaseQuantity(item.id)}
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>

                  </div>
                </div>

                {/* SUBTOTAL & DELETE */}
                <div className="flex justify-between items-center mt-5">
                  <div>
                    <p className="font-semibold text-gray-500">
                      Subtotal
                    </p>

                    <p className="font-bold text-lg">
                      Rp{" "}
                      {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>

                  </div>

                  <button onClick={() => removeFromCart(item.id)}
                    className=" text-red-700">
                    Hapus
                  </button>

                </div>

              </div>

              {/* DESKTOP */}
              <div className="hidden md:grid md:grid-cols-4 items-center gap-6">

                {/* PRODUCT */}
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title}
                    className="w-24 h-24 rounded-lg object-cover"/>

                  <div>

                    <h2 className="text-xl font-semibold">
                      {item.title}
                    </h2>

                    <p className="text-gray-500">
                      Rp {item.price.toLocaleString("id-ID")}
                    </p> 

                  </div>

                </div>

                {/* QUANTITY */}
                <div className="flex justify-center">

                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button onClick={() => decreaseQuantity(item.id)}
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      -
                    </button>

                    <span className="px-5">
                      {item.quantity}
                    </span>

                    <button onClick={() => increaseQuantity(item.id)}
                      className="px-4 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-500">
                    Subtotal
                  </p>

                  <p className="font-bold text-lg">
                    Rp{" "}
                    {(item.price * item.quantity).toLocaleString("id-ID")}
                  </p>

                </div>

                <button onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Hapus
                </button>

              </div>
            </div>

          ))}

          {/* TOTAL & BUTTONS */}
          <div className="mt-8 border-t pt-6">
            <div className="flex
                            flex-col
                            sm:flex-row
                            justify-between
                            items-start
                            sm:items-center
                            gap-3">

              <span className="text-xl font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>

            </div>

            <div className="flex flex-col-reverse
                            sm:flex-row
                            justify-end
                            gap-3
                            mt-5">

              <Button to="/menu" variant="secondary">
                Back to Menu
              </Button>

              <Button to="/checkout">
                Checkout
              </Button>

            </div>
          </div>
        </>

      )}

    </div>
  );
}

export default Cart;