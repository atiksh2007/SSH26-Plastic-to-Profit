const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <div
      className="card-hover bg-white rounded-2xl p-8 shadow-lg border border-gray-100 opacity-0 animate-fadeInUp"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-16 h-16 bg-olive-50 rounded-2xl flex items-center justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
        <span className="text-4xl">{icon}</span>
      </div>
      
      <h3 className="text-2xl font-bold text-black mb-4">
        {title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
      
      <div className="mt-6 flex items-center text-olive-600 font-semibold group">
        <span className="transition-transform duration-300 group-hover:translate-x-2">
          Learn more
        </span>
        <svg
          className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </div>
  );
};

export default FeatureCard;