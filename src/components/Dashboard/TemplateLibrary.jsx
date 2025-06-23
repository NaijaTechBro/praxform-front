import React, { useState } from 'react';
import TemplateCard from './TemplateCard';
import { FaFolder, FaFileAlt } from 'react-icons/fa';
import { AiOutlineEllipsis } from 'react-icons/ai';

const TemplateLibrary = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const templates = [
    {
      id: 1,
      category: 'Financial',
      title: 'Credit Card Authorization',
      description: 'Standard information collection for processing and collecting card details.',
      usageCount: 431,
    },
    {
      id: 2,
      category: 'Legal',
      title: 'Non-Disclosure Agreement',
      description: 'Standard NDA for protecting confidential information',
      usageCount: 43,
    },
    {
      id: 3,
      category: 'Tax', // Note: No "Tax" filter in the UI, but we have a "W-9 Tax Form"
      title: 'W-9 Tax Form',
      description: 'Request for taxpayer identification Number',
      usageCount: 30,
    },
    {
      id: 4,
      category: 'Legal',
      title: 'ACH Authorization',
      description: 'Standard NDA for protecting confidential information',
      usageCount: 25,
    },
    // Add more templates here
  ];

  const filteredTemplates = activeFilter === 'All'
    ? templates
    : templates.filter(template => {
        if (activeFilter === 'Legal') return template.category === 'Legal';
        if (activeFilter === 'Financial') return template.category === 'Financial';
        if (activeFilter === 'Onboarding') return template.category === 'Onboarding'; // Assuming an 'Onboarding' category exists
        return true;
      });

  const handleUseTemplate = (title) => {
    alert(`Using template: ${title}`);
    // Implement your logic to start using the template
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Template Library</h3>
        <div className="hidden md:block">
          <button
            className={`px-3 py-2 text-sm rounded-md ${activeFilter === 'All' ? 'bg-gray-200 text-gray-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('All')}
          >
            All Templates
          </button>
          <button
            className={`px-3 py-2 text-sm rounded-md ${activeFilter === 'Legal' ? 'bg-gray-200 text-gray-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('Legal')}
          >
            Legal
          </button>
          <button
            className={`px-3 py-2 text-sm rounded-md ${activeFilter === 'Financial' ? 'bg-gray-200 text-gray-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('Financial')}
          >
            Financial
          </button>
          <button
            className={`px-3 py-2 text-sm rounded-md ${activeFilter === 'Onboarding' ? 'bg-gray-200 text-gray-800 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveFilter('Onboarding')}
          >
            Onboarding
          </button>
        </div>
        {/* Mobile filter dropdown (optional, can be implemented with a select element) */}
        <div className="md:hidden">
          <select
            className="border rounded-md py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="All">All Templates</option>
            <option value="Legal">Legal</option>
            <option value="Financial">Financial</option>
            <option value="Onboarding">Onboarding</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTemplates.map(template => (
          <TemplateCard
            key={template.id}
            title={template.title}
            description={template.description}
            usageCount={template.usageCount}
            onUse={() => handleUseTemplate(template.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;