import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TemplateCard from '../../components/Dashboard/TemplateCard'; 
import { useTemplates } from '../../context/TemplateContext'; 
import { FaSearch } from 'react-icons/fa'; 

const Templates = () => { 
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Templates');
    const { templates, loading, error, getTemplates, clearError } = useTemplates();
    const navigate = useNavigate();

    // Function to derive color based on template category
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Financial':
            case 'payment': return 'green';
            case 'Legal': return 'yellow';
            case 'Tax': return 'blue';
            case 'Onboarding': return 'red';
            case 'consent': return 'purple';
            case 'survey': return 'orange';
            default: return 'gray';
        }
    };

    // Fetch templates when the component mounts
    useEffect(() => {
        getTemplates();
    }, [getTemplates]);

    // Handle errors from the template context
    useEffect(() => {
        if (error) {
            console.error("Templates Page Error:", error);
            clearError();
        }
    }, [error, clearError]);

    // Dynamically derive unique categories from the fetched templates for filters
    const categories = ['All Templates', ...new Set(templates.map(t => t.category).filter(Boolean))];

    // Filter templates based on search term and active filter
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (template.description && template.description.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesFilter = activeFilter === 'All Templates' || template.category === activeFilter;

        return matchesSearch && matchesFilter;
    }).map(template => ({
        // Map to add derivedIconColor to each template object before passing to TemplateCard
        ...template,
        derivedIconColor: getCategoryColor(template.category)
    }));

    const handleSelectTemplate = (template) => {
        console.log('Selected template for use from Templates Page:', template.name);
        navigate(`/forms/new/template/${template._id}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">All Templates</h3> {/* Updated title */}
                    <div className="relative flex-grow md:max-w-xs mb-4 md:mb-0">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <FaSearch size={16} />
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

                <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map(filter => (
                        <button
                            key={filter}
                            className={`
                                px-3 py-1.5 rounded-lg font-medium transition-colors border
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

                {loading && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        Loading templates...
                    </div>
                )}
                {error && (
                    <div className="col-span-full text-center py-10 text-red-500">
                        Error loading templates: {error}
                    </div>
                )}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredTemplates.length > 0 ? (
                            filteredTemplates.map(template => (
                                <TemplateCard
                                    key={template._id}
                                    template={template}
                                    onUse={() => handleSelectTemplate(template)}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No templates found for this category or search term.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Templates;
