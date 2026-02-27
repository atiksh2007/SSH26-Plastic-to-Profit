import { useState } from "react";
import { plasticTypes, plasticDetails } from "../data/mockListings";

const ListWastes = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [quantity, setQuantity] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");

  const selectedDetails = plasticDetails[selectedType];

  const total =
    quantity && pricePerKg ? Number(quantity) * Number(pricePerKg) : 0;



    const handleSubmit = () => {
  if (selectedType === "all") {
    alert("Please select a plastic type");
    return;
  }

  if (!quantity || !pricePerKg) {
    alert("Please enter quantity and price");
    return;
  }

  const existingOffers = JSON.parse(
    localStorage.getItem("plasticProfitOffers") || "[]"
  );

  const newOffer = {
    id: Date.now(),
    type: plasticTypes.find(t => t.value === selectedType)?.label,
    quantity: Number(quantity),
    offerPrice: Number(pricePerKg),
    status: "pending",
    date: new Date().toISOString(),
  };

  existingOffers.push(newOffer);

  localStorage.setItem(
    "plasticProfitOffers",
    JSON.stringify(existingOffers)
  );

  alert("Offer submitted successfully! Check dashboard.");

  // Reset fields
  setQuantity("");
  setPricePerKg("");
};
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-6">
            Types of Plastics
          </h1>
          <p className="text-xl text-gray-600">
            Browse available plastic waste listings from verified sellers across India
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8">

          {/* Dropdown */}
          <label className="block text-sm font-semibold mb-2">
            Select Plastic Type
          </label>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border rounded-lg p-3 mb-6 w-full md:w-1/2"
          >
            {plasticTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Plastic Details */}
          {selectedType !== "all" && selectedDetails && (
            <div className="bg-gray-100 p-6 rounded-xl mb-8">
              <h3 className="text-2xl font-semibold mb-3">
                {plasticTypes.find(t => t.value === selectedType)?.label}
              </h3>
              <p className="text-gray-700">
                {selectedDetails.description}
              </p>
            </div>
          )}

          {/* Quantity + Price Section */}
          {selectedType !== "all" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Quantity (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter quantity"
                  className="border rounded-lg p-3 w-full"
                />
              </div>

              {/* Price Per KG */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price per kg (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={pricePerKg}
                  onChange={(e) => setPricePerKg(e.target.value)}
                  placeholder="Enter price"
                  className="border rounded-lg p-3 w-full"
                />
              </div>

              {/* Total */}
              <div className="flex flex-col justify-end">
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-700">
                    ₹ {total}
                  </p>
                </div>
              </div>

            </div>
          )}
                        <button
              onClick={handleSubmit}
              className="btn-primary text-lg px-10 py-4 shadow-2xl"
            >
             Submit
            </button>
        </div>

      </div>
    </div>
  );
};

export default ListWastes;