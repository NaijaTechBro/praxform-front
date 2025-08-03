import React, { useState } from 'react';
import TemplateCard from './TemplateCard';
import { FaFolder, FaFileAlt } from 'react-icons/fa';
import { AiOutlineEllipsis } from 'react-icons/ai';

const TemplateLibrary = () => {

   const [activeFilter, setActiveFilter] = useState('All Templates');

  const templates = [
    {
      id: 1,
      category: 'Financial',
      title: 'Credit Card Authorization',
      description: 'Standard information collection for processing and collecting card details.',
      usageCount: 431,
      iconColor: 'green'
    },
    {
      id: 2,
      category: 'Legal',
      title: 'Non-Disclosure Agreement',
      description: 'Standard NDA for protecting confidential information',
      usageCount: 43,
      iconColor: 'yellow'
    },
    {
      id: 3,
      category: 'Tax',
      title: 'W-9 Tax Form',
      description: 'Request for taxpayer identification Number',
      usageCount: 30,
      iconColor: 'blue'
    },
    {
      id: 4,
      category: 'Legal',
      title: 'ACH Authorization',
      description: 'Standard NDA for protecting confidential information',
      usageCount: 25,
      iconColor: 'red'
    },
  ];

  const filteredTemplates = activeFilter === 'All Templates'
    ? templates
    : templates.filter(template => {
        if (activeFilter === 'Legal') return template.category === 'Legal';
        if (activeFilter === 'Financial') return template.category === 'Financial';
        if (activeFilter === 'Onboarding') return template.category === 'Onboarding';
        return false;
      });

  const handleUseTemplate = (title) => {
    // The alert() function has been replaced with a console log
    console.log(`Using template: ${title}`);
    // Implement your logic to start using the template here
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased text-gray-800">
      {/* This is the new container with the white background to match the design */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          {/* Main title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Template Library</h3>
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 text-sm">
            {['All Templates', 'Legal', 'Financial', 'Onboarding'].map(filter => (
              <button
                key={filter}
                className={`
                  px-3 py-1.5 rounded-lg font-medium transition-colors border
                  ${activeFilter === filter
                    ? 'bg-white border-gray-300 text-gray-800 shadow-sm'
                    : 'bg-transparent border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }
                `}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid for displaying the template cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                title={template.title}
                description={template.description}
                usageCount={template.usageCount}
                iconColor={template.iconColor}
                onUse={() => handleUseTemplate(template.title)}
              />
            ))
          ) : (
            // Display a message if no templates match the filter
            <div className="col-span-full text-center py-10 text-gray-500">
              No templates found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default TemplateLibrary;