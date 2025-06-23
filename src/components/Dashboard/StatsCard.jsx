// src/components/dashboard/StatsCard.jsx
import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatsCard = ({ icon, title, value, change, trend }) => {
  const isUp = trend === 'up';
  const trendColor = isUp ? 'text-green-500' : 'text-red-500';
  const TrendIcon = isUp ? FiArrowUp : FiArrowDown;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="text-2xl text-gray-400">{icon}</div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        <div className="flex items-center text-sm mt-1">
          <span className={`flex items-center font-semibold ${trendColor}`}>
            <TrendIcon className="mr-1" />
            {change}
          </span>
          <span className="text-gray-500 ml-1">Today</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;