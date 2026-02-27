import { useState } from "react";

const ListingCard = ({ listing, onMakeOffer }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMakeOffer = () => {
    const offerData = {
      listingId: listing.id,
      listingType: listing.type,
      originalPrice: listing.price,
      offerPrice: listing.price,
      quantity: listing.quantity,
      seller: listing.seller,
      date: new Date().toISOString().split("T")[0],
    };

    onMakeOffer(offerData);
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-olive-50 to-olive-100 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow">
            <span className="text-2xl">{listing.image}</span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-black">
              {listing.type}
            </h3>
            <p className="text-sm text-gray-600">
              Quality: {listing.quality}
            </p>
          </div>
        </div>

        <div
          className={`w-3 h-3 rounded-full ${
            listing.quality === "High"
              ? "bg-green-500"
              : "bg-yellow-500"
          } animate-pulse`}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {listing.description}
        </p>

        <div className="space-y-4 mb-6">
          {/* Quantity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Quantity
              </span>
            </div>
            <span className="font-semibold">
              {listing.quantity} kg
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.5 0-2.5.5-2.5 1.5S10.5 11 12 11s2.5.5 2.5 1.5S13.5 14 12 14m0-8v2m0 8v2"
                />
              </svg>
              <span className="text-sm text-gray-500">
                Price / kg
              </span>
            </div>
            <span className="font-bold text-olive-600">
              ₹{listing.price}
            </span>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Total Value
            </span>
            <span className="font-bold">
              ₹{listing.quantity * listing.price}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm text-gray-600">
              {listing.location}
            </span>
          </div>

          {/* Seller */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm text-gray-600">
              {listing.seller}
            </span>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleMakeOffer}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isHovered
              ? "bg-olive-600 text-white shadow-lg scale-105"
              : "bg-olive-600 text-white"
          }`}
        >
          Make an Offer
        </button>
      </div>
    </div>
  );
};

export default ListingCard;