import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import StatsCard from "../components/StatsCard";
import { mockStats } from "../data/mockListings";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📦",
      title: "Sell Plastic Waste",
      description:
        "List your plastic waste inventory and connect with verified recyclers. Get competitive prices for PET, HDPE, PVC, and more.",
    },
    {
      icon: "🔄",
      title: "Buy Recyclable Materials",
      description:
        "Access a marketplace of quality plastic materials. Source sustainable inputs for your manufacturing needs.",
    },
    {
      icon: "🌱",
      title: "Track Environmental Impact",
      description:
        "Monitor your contribution to plastic waste reduction. See real-time data on CO₂ saved and materials recycled.",
    },
  ];

  const stats = [
    {
      icon: "📊",
      value: mockStats.totalListed.toLocaleString(),
      label: "Total Plastic Listed (kg)",
      trend: 12,
    },
    {
      icon: "🔥",
      value: mockStats.activeListings,
      label: "Active Listings",
      trend: 8,
    },
    {
      icon: "👥",
      value: mockStats.totalUsers,
      label: "Active Users",
      trend: 15,
    },
    {
      icon: "✅",
      value: mockStats.completedTransactions,
      label: "Completed Deals",
      trend: 20,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070')`,
            }}
          ></div>
          <div className="absolute inset-0 gradient-overlay"></div>
          <div className="absolute inset-0 noise-texture"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 opacity-0 animate-fadeInUp text-balance">
            Turn Plastic Waste Into
            <span className="block text-olive-300 mt-2">Profit & Purpose</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto opacity-0 animate-fadeInUp delay-200">
            India's first circular marketplace connecting waste generators with
            recyclers. Transform environmental responsibility into economic
            opportunity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fadeInUp delay-300">
            <button
              onClick={() => navigate("/marketplace")}
              className="btn-primary text-lg px-10 py-4 shadow-2xl"
            >
              Let's Go →
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-white/20 border-2 border-white/30"
            >
              Learn More
            </button>
          </div>

          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto opacity-0 animate-fadeIn delay-500">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-black mb-1">
                {mockStats.totalWeight}
              </div>
              <div className="text-sm text-black-300">Plastic Recycled</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-black mb-1">
                {mockStats.co2Saved}
              </div>
              <div className="text-sm text-black-300">CO₂ Emissions Saved</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-black mb-1">24/7</div>
              <div className="text-sm text-black-300">Marketplace Active</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-black mb-1">100%</div>
              <div className="text-sm text-black-300">Verified Buyers</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div> */}
      </section>

      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, transparent platform for buying and selling plastic
              waste. Join the circular economy revolution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
              Platform Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time metrics showing our collective impact on plastic waste
              reduction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                trend={stat.trend}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-24 bg-gradient-to-br from-olive-50 to-white relative overflow-hidden"
      >
        <div className="absolute top-20 right-20 w-72 h-72 bg-olive-600 opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-olive-600 opacity-5 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="opacity-0 animate-fadeInUp">
              <h2 className="text-4xl sm:text-5xl font-bold text-black mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                PlasticProfit exists to solve India's plastic waste crisis by
                creating a transparent marketplace that makes recycling
                profitable and accessible for everyone.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're connecting waste generators with recyclers to reduce
                plastic pollution, create economic opportunity, and build a
                truly circular economy. Every transaction on our platform
                represents plastic waste diverted from landfills and oceans.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-olive-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">
                      Verified Network
                    </h3>
                    <p className="text-gray-600">
                      All buyers and sellers are thoroughly vetted
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-olive-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">
                      Transparent Pricing
                    </h3>
                    <p className="text-gray-600">
                      Real-time market rates for all plastic types
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-olive-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">
                      Impact Tracking
                    </h3>
                    <p className="text-gray-600">
                      Measure your environmental contribution
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative opacity-0 animate-fadeInUp delay-200">
              <div className="aspect-square bg-olive-600 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?q=80&w=1000"
                  alt="Plastic recycling"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl animate-float">
                <div className="text-3xl font-bold text-olive-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">Tonnes Recycled</div>
              </div>

              <div
                className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl animate-float"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="text-3xl font-bold text-olive-600 mb-1">
                  15K+
                </div>
                <div className="text-sm text-gray-600">Trees Saved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-olive-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-olive-600 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join hundreds of businesses already using PlasticProfit to turn
            waste into value
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/marketplace")}
              className="bg-olive-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-olive-700 hover:shadow-2xl hover:scale-105"
            >
              Explore Marketplace
            </button>
            <button
              onClick={() => navigate("/login")}
              className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
