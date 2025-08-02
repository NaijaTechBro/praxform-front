// src/components/newForm/FormBuilderArea.jsx
import React from 'react';
import { FiPlus } from 'react-icons/fi'; 
import create from '../../assets/statscard/create.png';

const FormBuilderArea = ({ setSelectedElement }) => {
  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  return (
    <div className="min-h-[calc(100vh-170px)] bg-white rounded-lg shadow-md flex items-center justify-center p-8">

      <div className="text-center p-10 border border-dashed border-gray-300 rounded-lg max-w-lg"> 
        <img className="text-blue-400 text-6xl mx-auto mb-4" src={create} width={"100px"}/>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Create New Form</h3>
        <p className="text-gray-500 mb-6 text-base">Drag and drop form elements from the left sidebar or start with a template</p> 
        <div className="flex justify-center space-x-4">
          <button className="flex items-center bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200 focus:outline-none">
            <FiPlus className="text-xl mr-2 -ml-1" /> Start From Scratch 
          </button>
          <button className="bg-[#1475F4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none">
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormBuilderArea;