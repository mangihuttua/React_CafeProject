import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import { useCart } from "../context/CartContext";
import Button from "../components/Button/Button";


function Checkout() {

  const {
    cart,
    totalPrice,
  } = useCart();

// Form 

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    orderType: "dine-in",
    tableNumber: "",
    notes: "",
  });


  // ERROR STATE 

  const [errors, setErrors] = useState({});


  // HANDLE INPUT

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // VALIDATION

  const validateForm = () => {

    const newErrors = {};


    // Nama
    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi.";
    }


    // Nomor HP
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi.";
    }


    // Nomor meja hanya untuk Dine In
    if (
      formData.orderType === "dine-in" &&
      !formData.tableNumber.trim()
    ) {
      newErrors.tableNumber =
        "Nomor meja wajib diisi untuk Dine In.";
    }


    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;
  };


  // PLACE ORDER 

 const handleSubmit = (e) => {
  e.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  // Rincian item pesanan
  const orderItems = cart
    .map(
      (item) => `
        <div style="
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 8px;
        ">
          <span>
            ${item.title} x ${item.quantity}
          </span>

          <strong>
            Rp ${(item.price * item.quantity).toLocaleString("id-ID")}
          </strong>
        </div>
      `
    )
    .join("");

  Swal.fire({
    title: "Pesanan Berhasil!",
    icon: "success",

    html: `
      <div style="text-align: left;">

        <div style="
          border-bottom: 1px solid #ddd;
          padding-bottom: 12px;
          margin-bottom: 15px;
        ">

          <h3 style="
            font-weight: 600;
            margin-bottom: 10px;
          ">
            Informasi Pemesan
          </h3>

          <p>
            <strong>Nama:</strong> ${formData.name}
          </p>

          <p>
            <strong>No. HP:</strong> ${formData.phone}
          </p>

          <p>
            <strong>Tipe Pesanan:</strong>
            ${
              formData.orderType === "dine-in"
                ? "Dine In"
                : "Take Away"
            }
          </p>

          ${
            formData.orderType === "dine-in"
              ? `
                <p>
                  <strong>Nomor Meja:</strong>
                  ${formData.tableNumber}
                </p>
              `
              : ""
          }

          ${
            formData.notes
              ? `
                <p>
                  <strong>Catatan:</strong>
                  ${formData.notes}
                </p>
              `
              : ""
          }

        </div>

        <div>

          <h3 style="
            font-weight: 600;
            margin-bottom: 12px;
          ">
            Rincian Pesanan
          </h3>

          ${orderItems}

        </div>

        <div style="
          border-top: 1px solid #ddd;
          margin-top: 15px;
          padding-top: 12px;
          display: flex;
          justify-content: space-between;
          font-size: 18px;">

          <strong>Total</strong>

          <strong>
            Rp ${totalPrice.toLocaleString("id-ID")}
          </strong>

        </div>

      </div>
    `,

    confirmButtonText: "OK",
    confirmButtonColor: "#9a3412",
    width: "550px",
  });
};


  // EMPTY CART

  if (cart.length === 0) {

    return (
      <div className="max-w-5xl mx-auto p-10 text-center">

        <h1 className="text-3xl font-bold">
          Cart masih kosong
        </h1>

        <p className="text-gray-500 mt-2">
          Silakan pilih menu terlebih dahulu.
        </p>

        <Link to="/menu"
              className="inline-block mt-5 px-6 py-3 rounded-lg bg-orange-800 text-white hover:bg-orange-700 transition"
        >
          Kembali ke Menu
        </Link>

      </div>
    );

  }


  return (

    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* form pemesan */}
        <div className="border rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">
            Informasi Pemesan
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block font-medium mb-2">
                Nama
              </label>

              <input id="name" name="name" type="text" value={formData.name}
                     onChange={handleChange} placeholder="Masukkan nama"
                     className="w-full rounded-xl border border-gray-300
                                px-4 py-3 focus:border-orange-500
                                focus:outline-none focus:ring-orange-200"/>

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}

            </div>

            <div className="mb-5">
              <label className="block font-medium mb-2"
              >
                No. HP
              </label>

              <input id="phone" name="phone" type="tel" value={formData.phone}
                     onChange={handleChange} placeholder="08xxxxxxxxxx"
                     className="w-full rounded-xl border border-gray-300
                                px-4 py-3 focus:border-orange-500
                                focus:outline-none focus:ring-orange-200"/>

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}

            </div>

            <div className="mb-5">
              <label className="block font-medium mb-3">
                Tipe Pesanan
              </label>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="orderType" value="dine-in"
                         checked={
                                   formData.orderType === "dine-in"
                                  }
                          onChange={handleChange}
                  />
                  Dine In
                </label>


                <label className="flex items-center gap-2">
                  <input type="radio" name="orderType" value="take-away"
                         checked={
                                     formData.orderType === "take-away"
                            }
                          onChange={handleChange}
                  />
                  Take Away
                </label>

              </div>
            </div>


            {formData.orderType === "dine-in" && (
              <div className="mb-5">
                <label className="block font-medium mb-2"
                >
                  Nomor Meja
                </label>

                <input id="tableNumber" name="tableNumber" type="text"
                       value={formData.tableNumber} onChange={handleChange} placeholder="Contoh: 05"
                       className="w-full rounded-xl border border-gray-300
                                  px-4 py-3 focus:border-orange-500
                                  focus:outline-none focus:ring-orange-200"/>

                {errors.tableNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tableNumber}
                  </p>
                )}

              </div>

            )}

            <div className="mb-6">
              <label className="block font-medium mb-2"
              >
                Catatan
              </label>

              <textarea id="notes" name="notes" value={formData.notes}
                        onChange={handleChange} rows="4"
                        placeholder="Contoh: Tidak terlalu manis"
                        className="w-full rounded-xl border border-gray-300
                                  px-4 py-3 focus:border-orange-500
                                  focus:outline-none focus:ring-orange-200"/>

            </div>

            <Button  variant="secondary" type="submit">
               Order
            </Button>

          </form>

        </div>


        {/* ringkasan pesanan */}
        <div className="border rounded-2xl p-6 shadow-sm h-fit">
          <h2 className="text-2xl font-semibold mb-6">
            Rincian Pesanan
          </h2>

          <div className="space-y-5">
            {cart.map((item) => (

              <div key={item.id} className="flex justify-between gap-4">

                <div>
                  <h3 className="font-semibold">
                    {item.title} x {item.quantity}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                </div>

                <p className="font-semibold text-right">
                  Rp{" "}
                  {(item.price * item.quantity)
                    .toLocaleString("id-ID")}
                </p>

              </div>

            ))}

          </div>


          <div className="border-t mt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>

            </div>
          </div>

        </div>

      </div>
    </div>

  );
}


export default Checkout;