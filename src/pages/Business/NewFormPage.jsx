// src/pages/NewFormPage.jsx
import React, { useState } from 'react';
import {
  FiPlus,
  FiChevronLeft,
  FiChevronRight, // For arrow direction when expanded
  FiEdit2,
  FiEye,
  FiSave,
  FiSend,
  FiSettings, // For properties sidebar toggle
} from 'react-icons/fi';

import FormFieldsSidebar from '../../components/NewForm/FormFieldsSidebar';
import FormBuilderArea from '../../components/NewForm/FormBuilderArea';
import ElementPropertiesSidebar from '../../components/NewForm/ElementPropertiesSidebar';

const NewFormPage = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For form fields sidebar toggle (left)
  const [isPropertiesSidebarOpen, setIsPropertiesSidebarOpen] = useState(false); // For properties sidebar toggle (right)
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false); // New state for header actions toggle

  const handleDrop = (e) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');
    console.log(`Dropped field type: ${fieldType}`);
    // In a real application, you would add this field to your form state
    // and potentially set it as the selected element
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile Sidebar Toggle Buttons (Hidden on desktop) */}
      <div className="md:hidden flex justify-between p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <FiPlus className="inline-block mr-2" />
          Fields
        </button>
        {selectedElement && ( // Only show properties toggle if an element is selected
          <button
            onClick={() => setIsPropertiesSidebarOpen(!isPropertiesSidebarOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <FiSettings className="inline-block mr-2" /> {/* Changed icon to FiSettings */}
            Properties
          </button>
        )}
      </div>

      {/* Left Sidebar for Form Fields */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <FormFieldsSidebar />
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-2 right-2 md:hidden text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      {/* Main Form Builder Area */}
      <div
        className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between bg-white p-4 py-3 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            {/* Back Button / Toggle Header Actions */}
            <button
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
            >
              {isHeaderExpanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </button>

            {/* Collapsible Header Elements */}
            <div
              className={`flex items-center space-x-2 transition-all duration-300 ease-in-out overflow-hidden ${
                isHeaderExpanded ? 'max-w-screen-xl opacity-100' : 'max-w-0 opacity-0'
              } md:max-w-full md:opacity-100`} // Always visible on md and larger screens
            >
              <h1 className="text-xl font-semibold text-gray-800 md:text-2xl whitespace-nowrap">
                Untitled
              </h1>
              {/* Edit Icon */}
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition-colors duration-200 focus:outline-none whitespace-nowrap">
                <FiEdit2 size={18} />
              </button>
              {/* Draft Tag */}
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full whitespace-nowrap">
                Draft
              </span>
            </div>
          </div>

          <div
            className={`flex items-center space-x-3 transition-all duration-300 ease-in-out overflow-hidden ${
              isHeaderExpanded ? 'max-w-screen-xl opacity-100' : 'max-w-0 opacity-0'
            } md:max-w-full md:opacity-100`} // Always visible on md and larger screens
          >
            {/* Preview Button */}
            <button className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 focus:outline-none whitespace-nowrap">
              <FiEye className="mr-2" size={16} />
              Preview
            </button>
            {/* Save Draft Button */}
            <button className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 focus:outline-none whitespace-nowrap">
              <FiSave className="mr-2" size={16} />
              Save Draft
            </button>
            {/* Send Form Button */}
            <button className="bg-[#1475F4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none flex items-center whitespace-nowrap">
              <FiSend className="mr-2" size={16} />
              Send Form
            </button>
          </div>
        </div>

        <FormBuilderArea setSelectedElement={setSelectedElement} />
      </div>

      {/* Right Sidebar for Element Properties */}
 
    </div>
  );
};

export default NewFormPage;


{/* <div>

       {selectedElement ? (
        <ElementPropertiesSidebar selectedElement={selectedElement} />
      ) : (
        <div className="w-80 border-l border-gray-200 bg-white p-6 shadow-sm flex items-center justify-center">
          <p className="text-center text-gray-500 text-sm max-w-xs mx-auto">Select an element on the form to edit its properties.</p>
        </div>
      )}
</div> */}