import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import StatsCard from "../components/StatsCard";
import { mockListings, mockStats } from "../data/mockListings";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("plasticProfitUser");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));

    const storedOffers = localStorage.getItem("plasticProfitOffers");
    if (storedOffers) {
      setOffers(JSON.parse(storedOffers));
    }
  }, [navigate]);

  const getPlasticTypeData = () => {
    const typeCounts = {};
    mockListings.forEach((listing) => {
      const type = listing.type.split(" ")[0];
      typeCounts[type] = (typeCounts[type] || 0) + listing.quantity;
    });

    return {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          label: "Quantity (kg)",
          data: Object.values(typeCounts),
          backgroundColor: [
            "rgba(85, 107, 47, 0.8)",
            "rgba(85, 107, 47, 0.6)",
            "rgba(85, 107, 47, 0.4)",
            "rgba(85, 107, 47, 0.3)",
            "rgba(85, 107, 47, 0.2)",
          ],
          borderColor: "rgba(85, 107, 47, 1)",
          borderWidth: 2,
        },
      ],
    };
  };

  const handleDeleteOffer = (id) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) return;

    const updatedOffers = offers.filter((offer) => offer.id !== id);

    setOffers(updatedOffers);
    localStorage.setItem("plasticProfitOffers", JSON.stringify(updatedOffers));
  };

  const getPieChartData = () => {
    const typeCounts = {};
    mockListings.forEach((listing) => {
      const type = listing.type.split(" ")[0];
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    return {
      labels: Object.keys(typeCounts),
      datasets: [
        {
          label: "Number of Listings",
          data: Object.values(typeCounts),
          backgroundColor: [
            "rgba(85, 107, 47, 0.9)",
            "rgba(122, 139, 100, 0.9)",
            "rgba(179, 189, 165, 0.9)",
            "rgba(209, 215, 200, 0.9)",
            "rgba(232, 235, 227, 0.9)",
          ],
          borderColor: "#ffffff",
          borderWidth: 3,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "'DM Sans', sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          family: "'DM Sans', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'DM Sans', sans-serif",
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            family: "'DM Sans', sans-serif",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'DM Sans', sans-serif",
          },
        },
      },
    },
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-12 opacity-0 animate-fadeInUp">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-black mb-2">
                Welcome back, {user.name}! 👋
              </h1>
              <p className="text-xl text-gray-600">
                Here's your marketplace overview and activity
              </p>
            </div>
            <button
              onClick={() => navigate("/marketplace")}
              className="btn-primary"
            >
              Browse Listings
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            icon="📋"
            value={mockStats.activeListings}
            label="Active Listings"
            trend={8}
            delay={0.1}
          />
          <StatsCard
            icon="💰"
            value={offers.length}
            label="Your Offers"
            trend={offers.length > 0 ? 12 : 0}
            delay={0.2}
          />
          <StatsCard
            icon="✅"
            value={offers.filter((o) => o.status === "accepted").length}
            label="Completed Deals"
            trend={20}
            delay={0.3}
          />
          <StatsCard
            icon="📈"
            value={`₹${offers.reduce((sum, o) => sum + o.offerPrice * o.quantity, 0).toLocaleString()}`}
            label="Total Value"
            trend={15}
            delay={0.4}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8 opacity-0 animate-fadeInUp delay-200">
            <h2 className="text-2xl font-bold text-black mb-6">
              Plastic Types by Quantity
            </h2>
            <div className="h-80">
              <Bar data={getPlasticTypeData()} options={barChartOptions} />
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-8 opacity-0 animate-fadeInUp delay-300">
            <h2 className="text-2xl font-bold text-black mb-6">
              Listings by Type
            </h2>
            <div className="h-80">
              <Pie data={getPieChartData()} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Your Offers Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 opacity-0 animate-fadeInUp delay-400">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">
              Your Recent Offers
            </h2>
            {offers.length > 0 && (
              <span className="px-4 py-2 bg-olive-50 text-olive-700 rounded-full text-sm font-semibold">
                {offers.length} {offers.length === 1 ? "Offer" : "Offers"}
              </span>
            )}
          </div>

          {offers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Listing
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Your Offer
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Total
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((offer) => (
                    <tr
                      key={offer.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold text-black">
                            {offer.listingType}
                          </div>
                          <div className="text-sm text-gray-600">
                            {offer.seller}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">
                        {offer.quantity} kg
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-semibold text-olive-600">
                            ₹{offer.offerPrice}/kg
                          </div>
                          <div className="text-xs text-gray-500">
                            Original: ₹{offer.originalPrice}/kg
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-semibold text-black">
                        ₹{(offer.offerPrice * offer.quantity).toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            offer.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : offer.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {offer.status.charAt(0).toUpperCase() +
                            offer.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 text-sm">
                        {offer.date}
                      </td>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">
                        Action
                      </th>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                No offers yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start exploring the marketplace and make your first offer
              </p>
              <button
                onClick={() => navigate("/marketplace")}
                className="btn-primary"
              >
                Browse Listings
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 opacity-0 animate-fadeInUp delay-500">
          <div className="bg-gradient-to-br from-olive-600 to-olive-700 rounded-2xl p-8 text-white card-hover cursor-pointer">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">📤</span>
            </div>
            <h3 className="text-xl font-bold mb-2">List Your Waste</h3>
            <p className="text-olive-100 mb-4">
              Start selling your plastic waste to verified recyclers
            </p>
            <button
              onClick={() => navigate("/ListPlastics")}
              className="text-white font-semibold hover:underline"
            >
              Create Listing →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 card-hover cursor-pointer">
            <div className="w-14 h-14 bg-olive-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">View Reports</h3>
            <p className="text-gray-600 mb-4">
              Detailed analytics and environmental impact reports
            </p>
            <button className="text-olive-600 font-semibold hover:underline">
              View Reports →
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 card-hover cursor-pointer">
            <div className="w-14 h-14 bg-olive-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-black mb-2">Get Verified</h3>
            <p className="text-gray-600 mb-4">
              Become a verified seller and increase trust
            </p>
            <button className="text-olive-600 font-semibold hover:underline">
              Start Verification →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
