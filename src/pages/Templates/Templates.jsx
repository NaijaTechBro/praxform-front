import React, { useState } from 'react';

const TemplateCard = ({ template, onSelect }) => {
  // Utility function to get the color class for the icon background
  const getBgColorClass = (color) => {
    switch(color) {
      case 'green': return 'bg-green-100 text-green-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Inline SVG for File Text icon
  const fileTextIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );

  // Inline SVG for Ellipsis icon
  const moreIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col justify-between">
      <div className="p-4 flex-grow">
        {/* Header with icon, title, and options button */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            {/* Icon container with dynamic background color */}
            <div className={`w-8 h-8 rounded-md ${getBgColorClass(template.iconColor)} flex items-center justify-center`}>
              {fileTextIcon}
            </div>
            <h5 className="ml-2 font-semibold text-sm text-gray-800">{template.title}</h5>
          </div>
          {/* Ellipsis button for more options */}
          <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mt-1 -mr-1">
            {moreIcon}
          </button>
        </div>
        {/* Template description with a more compact line-height */}
        <p className="text-gray-500 text-xs mb-3 leading-snug">{template.description}</p>
      </div>
      {/* Footer with usage count and "Use Template" button */}
      <div className="border-t border-gray-100 px-4 py-3 flex justify-between items-center">
        <p className="text-gray-500 text-[10px]">Used {template.usageCount} times</p>
        <button
          onClick={() => onSelect(template)}
          className="text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};

// The main page component, replacing the modal
const TemplatesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Templates');

  // Mock data for templates
  const templates = [
    { id: 1, category: 'Financial', title: 'Credit Card Authorization', description: 'Standard information collection for processing and collecting card details.', usageCount: 431, iconColor: 'green' },
    { id: 2, category: 'Legal', title: 'Non-Disclosure Agreement', description: 'Standard NDA for protecting confidential information', usageCount: 43, iconColor: 'yellow' },
    { id: 3, category: 'Tax', title: 'W-9 Tax Form', description: 'Request for taxpayer identification Number', usageCount: 30, iconColor: 'blue' },
    { id: 4, category: 'Legal', title: 'ACH Authorization', description: 'Standard NDA for protecting confidential information', usageCount: 25, iconColor: 'red' },
    { id: 5, category: 'Onboarding', title: 'Employee Onboarding Checklist', description: 'A comprehensive checklist for new employee onboarding.', usageCount: 15, iconColor: 'green' },
    { id: 6, category: 'Financial', title: 'Expense Report', description: 'A template for submitting and tracking business expenses.', usageCount: 89, iconColor: 'yellow' },
  ];

  // Filter templates based on search term and active filter
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === 'All Templates' || template.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleSelectTemplate = (template) => {
    console.log('Selected template:', template.title);
    // In a real application, this would trigger a navigation to the form editor page for the selected template.
    // e.g., navigate(`/forms/create?template=${template.id}`);
  };
  
  // Inline SVG for Search icon
  const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-7xl mx-auto">
        {/* Header and Search Bar */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Templates</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {searchIcon}
            </div>
            <input
              type="text"
              placeholder="Search templates"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['All Templates', 'Legal', 'Financial', 'Onboarding', 'Tax'].map(filter => (
            <button
              key={filter}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border
                ${activeFilter === filter
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }
              `}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelect={handleSelectTemplate}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              No templates found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;
