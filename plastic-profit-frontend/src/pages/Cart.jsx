import { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(storedItems);
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-xl shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{item.type}</h2>
              <p>Price: ₹{item.offerPrice}/kg</p>
              <p>Location: {item.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;