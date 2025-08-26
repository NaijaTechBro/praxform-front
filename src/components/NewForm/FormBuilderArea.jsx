// src/components/NewForm/FormBuilderArea.jsx
import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import create from '../../assets/statscard/create.png'; 

const FormBuilderArea = ({ formFields, setSelectedElement,onUseTemplate, selectedElement, onDeleteField, onStartFromScratch }) => { // Added onStartFromScratch prop
  if (formFields.length === 0) {
    return (
      <div className="min-h-[calc(100vh-170px)] bg-white rounded-lg shadow-md flex items-center justify-center p-8">
        <div className="text-center p-10 border border-dashed border-gray-300 rounded-lg max-w-lg">
          <img className="text-blue-400 text-6xl mx-auto mb-4" src={create} width="100px" alt="Create new form" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Create New Form</h3>
          <p className="text-gray-500 mb-6 text-base">Drag and drop form elements from the left sidebar or start with a template</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={onStartFromScratch}
              className="flex items-center bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
            >
              <FiPlus className="text-xl mr-2 -ml-1" /> Start From Scratch
            </button>
            <button 
            onClick={onUseTemplate}
              
            className="bg-[#1475F4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none">
              Use Template
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 min-h-[calc(100vh-170px)]">
      {formFields.map((field) => (
        <div
          key={field.id}
          onClick={() => setSelectedElement(field)}
          className={`relative p-4 mb-4 border rounded-lg cursor-pointer transition-colors
            ${selectedElement && selectedElement.id === field.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.isRequired && <span className="text-red-500">*</span>}
          </label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            readOnly // Make it read-only for the builder view
          />
          {/* Delete Button for each field */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent selecting the element when clicking delete
              onDeleteField(field.id);
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 focus:outline-none"
            title="Delete field"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormBuilderArea;
