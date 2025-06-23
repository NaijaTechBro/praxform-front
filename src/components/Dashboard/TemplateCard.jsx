import React from 'react';
import { FaFileAlt } from 'react-icons/fa'; // Example icon
import { AiOutlineEllipsis } from 'react-icons/ai';

const TemplateCard = ({ title, description, usageCount, onUse }) => {
  return (
    <div className="bg-white rounded-md shadow-sm border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-green-100 text-green-500 flex items-center justify-center">
              <FaFileAlt size={16} />
            </div>
            <h5 className="ml-2 font-semibold text-gray-800">{title}</h5>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <AiOutlineEllipsis size={20} />
          </button>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <p className="text-gray-500 text-xs">Used {usageCount} times</p>
      </div>
      <div className="border-t p-4 flex justify-end">
        <button
          onClick={onUse}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};

export default TemplateCard;