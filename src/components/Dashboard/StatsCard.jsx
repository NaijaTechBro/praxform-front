import React from 'react';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const StatsCard = ({ icon, title, value, previousValue }) => {

  const currentValue = typeof value === 'number' ? value : 0;
  const prevValue = typeof previousValue === 'number' ? previousValue : 0;

  let change = 0;
  let trend = 'neutral'; 

  if (prevValue !== 0) {
    change = ((currentValue - prevValue) / prevValue) * 100;
    if (change > 0) {
      trend = 'up';
    } else if (change < 0) {
      trend = 'down';
    }
  } else if (currentValue > 0) {
    // If previous value was 0 and current is > 0, it's an "up" trend
    trend = 'up';
    change = 100; // Represent as 100% increase from zero
  }

  const isUp = trend === 'up';
  const trendColor = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500';
  const TrendIcon = isUp ? FiArrowUp : FiArrowDown;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="text-2xl text-gray-400">{icon}</div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900">{currentValue}</h3>
        <div className="flex items-center text-sm mt-1">
          {trend !== 'neutral' && (
            <span className={`flex items-center font-semibold ${trendColor}`}>
              <TrendIcon className="mr-1" />
              {change.toFixed(2)}%
            </span>
          )}
          <span className="text-gray-500 ml-1">Today</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
