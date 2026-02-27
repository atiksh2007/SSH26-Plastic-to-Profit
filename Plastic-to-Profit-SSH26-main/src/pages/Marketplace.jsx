import { useState, useEffect } from 'react';
import ListingCard from '../components/ListingCard';
import { mockListings, plasticTypes } from '../data/mockListings';
import { useNavigate } from 'react-router-dom';
const Marketplace = () => {
  const [listings, setListings] = useState(mockListings);
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('date');


  const navigate = useNavigate();

  useEffect(() => {
    filterAndSortListings();
  }, [searchQuery, selectedType, sortBy]);

  const filterAndSortListings = () => {
    let filtered = [...listings];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (listing) =>
          listing.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          listing.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter((listing) =>
        listing.type.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'quantity-low':
          return a.quantity - b.quantity;
        case 'quantity-high':
          return b.quantity - a.quantity;
        case 'date':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    setFilteredListings(filtered);
  };

const handleMakeOffer = (offerData) => {
  const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

  const newItem = {
    ...offerData,
    id: Date.now(),
  };

  existingCart.push(newItem);

  localStorage.setItem('cartItems', JSON.stringify(existingCart));

  navigate('/cart');
};
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSortBy('date');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 opacity-0 animate-fadeInUp">
          <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4">
            Explore Marketplace
          </h1>
          <p className="text-xl text-gray-600">
            Browse available plastic waste listings from verified sellers across India
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 opacity-0 animate-fadeInUp delay-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Listings
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Input your search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Plastic Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Plastic Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field cursor-pointer"
              >
                {plasticTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div> 

          
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field cursor-pointer"
              >
                <option value="date">Latest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="quantity-low">Quantity: Low to High</option>
                <option value="quantity-high">Quantity: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedType !== 'all') && (
            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                
                {searchQuery && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-olive-100 text-olive-800">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-2 text-olive-600 hover:text-olive-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                
                {selectedType !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-olive-100 text-olive-800">
                    Type: {plasticTypes.find(t => t.value === selectedType)?.label}
                    <button
                      onClick={() => setSelectedType('all')}
                      className="ml-2 text-olive-600 hover:text-olive-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
              
              <button
                onClick={clearFilters}
                className="text-sm text-olive-600 hover:text-olive-700 font-semibold"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 opacity-0 animate-fadeIn delay-300">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-black">{filteredListings.length}</span> of{' '}
            <span className="font-semibold text-black">{listings.length}</span> listings
          </p>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live marketplace</span>
          </div>
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing, index) => (
              <div
                key={listing.id}
                className="opacity-0 animate-fadeInUp"
                style={{ animationDelay: `${0.1 * (index % 6)}s` }}
              >
                <ListingCard listing={listing} onMakeOffer={handleMakeOffer} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-0 animate-fadeInUp">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">No listings found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button (for demo purposes) */}
        {filteredListings.length > 0 && filteredListings.length >= 9 && (
          <div className="text-center mt-12 opacity-0 animate-fadeIn delay-500">
            <button className="btn-secondary">
              Load More Listings
            </button>
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-16 bg-olive-50 rounded-2xl p-8 opacity-0 animate-fadeInUp delay-400">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-olive-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-2">New to the marketplace?</h3>
              <p className="text-gray-700 mb-4">
                All sellers are verified and materials are quality-checked. Make an offer on any listing 
                to start negotiating. Your offers are tracked in your dashboard.
              </p>
              <button  onClick={() => navigate("/SafeTrading")}>Learn More About Trading</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;