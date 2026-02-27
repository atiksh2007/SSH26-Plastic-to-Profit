import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  // ✅ Remove single item
  const handleDelete = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== id
    );

    setCartItems(updatedCart);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    );
  };

  // ✅ Calculate total
  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + item.offerPrice * item.quantity,
    0
  );

  return (
    <div className="min-h-screen pt-24 px-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="mb-4">No items in cart</p>

          <button
            onClick={() => navigate("/")}
            className="bg-olive-600 text-white px-6 py-3 rounded-xl"
          >
            Back to Marketplace
          </button>
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-lg rounded-xl p-6 mb-4 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  {item.listingType}
                </h2>
                <p>Seller: {item.seller}</p>
                <p>Quantity: {item.quantity} kg</p>
                <p className="text-green-600 font-bold">
                  ₹ {item.offerPrice} / kg
                </p>
              </div>

              {/* ❌ Delete Button */}
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          ))}

          {/* Total Section */}
          <div className="bg-white shadow-lg rounded-xl p-6 mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: ₹ {totalAmount}
            </h2>

            <div className="space-x-4">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl"
              >
                Back to Marketplace
              </button>

              <button className="bg-green-600 text-white px-6 py-3 rounded-xl">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;