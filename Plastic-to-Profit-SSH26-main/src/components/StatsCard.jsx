const StatsCard = ({ icon, value, label, delay = 0, trend }) => {
  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 opacity-0 animate-fadeInUp card-hover"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-olive-50 rounded-xl flex items-center justify-center">
          <span className="text-3xl">{icon}</span>
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${
            trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <span>{trend > 0 ? '↑' : '↓'}</span>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <div className="stat-number text-4xl font-bold text-black mb-2">
        {value}
      </div>
      
      <div className="text-gray-600 font-medium">
        {label}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Updated today</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;