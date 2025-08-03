import React, { useState } from 'react';
import { FileText, MoreVertical } from 'lucide-react'; 


const TemplateCard = ({ title, description, usageCount, iconColor, onUse }) => {
  const getBgColorClass = (color) => {
    switch(color) {
      case 'green': return 'bg-green-100 text-green-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 h-full flex flex-col justify-between">
      <div className="p-4 flex-grow">
        {/* Header with icon, title, and options button */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            {/* Icon container with dynamic background color */}
            <div className={`w-8 h-8 rounded-md ${getBgColorClass(iconColor)} flex items-center justify-center`}>
              <FileText size={16} />
            </div>
            <h5 className="ml-2 font-semibold text-sm text-gray-800">{title}</h5>
          </div>
          {/* Ellipsis button for more options */}
          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mt-1 -mr-1">
            <MoreVertical size={18} />
          </button>
        </div>
        {/* Template description with a more compact line-height */}
        <p className="text-gray-500 text-xs mb-3 leading-snug">{description}</p>
      </div>
      {/* Footer with usage count and "Use Template" button */}
      <div className="border-t border-gray-100 px-4 py-3 flex justify-between items-center">
        <p className="text-gray-500 text-[10px]">Used {usageCount} times</p>
        <button
          onClick={onUse}
          className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};


export default TemplateCard;