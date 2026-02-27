import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ListingCard = ({ listing, onMakeOffer }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const handleMakeOffer = () => {
   navigate("/Cart");
    
    if (offerPrice && !isNaN(offerPrice) && parseFloat(offerPrice) > 0) {
      onMakeOffer({
        listingId: listing.id,
        listingType: listing.type,
        originalPrice: listing.price,
        offerPrice: parseFloat(offerPrice),
        quantity: listing.quantity,
        seller: listing.seller,
        date: new Date().toISOString().split('T')[0]
      });
    } else if (offerPrice !== null) {
      
      alert('Please enter a valid price.');
    }
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with icon */}
      <div className="bg-gradient-to-br from-olive-50 to-olive-100 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-3xl">{listing.image}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-black">{listing.type}</h3>
            <p className="text-sm text-gray-600">Quality: {listing.quality}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${listing.quality === 'High' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {listing.description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Quantity</span>
            <span className="font-semibold text-black">{listing.quantity} kg</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Price per kg</span>
            <span className="font-bold text-olive-600 text-lg">₹{listing.price}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Value</span>
            <span className="font-bold text-black">₹{listing.quantity * listing.price}</span>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm text-gray-600">{listing.location}</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm text-gray-600">{listing.seller}</span>
          </div>

          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-600">Listed on {listing.date}</span>
          </div>
        </div>

        <button
          onClick={handleMakeOffer}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
            isHovered
              ? 'bg-olive-600 text-white shadow-lg scale-105'
              : 'bg-olive-600 text-white'
          }`}
        >
          Make an Offer
        </button>
      </div>
    </div>
  );
};

export default ListingCard;