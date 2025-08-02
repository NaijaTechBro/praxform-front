

// src/components/newForm/FormFieldsSidebar.jsx
import React from 'react';
import { FaTextHeight, FaRegDotCircle, FaCalendarAlt, FaSearch, FaFileUpload, FaIdCard, FaSignature } from 'react-icons/fa';
import { IoMdKey } from 'react-icons/io'; 
import { MdEmail } from 'react-icons/md'; 
import { BsFillCalendarFill } from 'react-icons/bs';

const FormFieldsSidebar = () => {
  const handleDragStart = (e, fieldType) => {
    e.dataTransfer.setData('fieldType', fieldType);
  };

  const basicFields = [
    { name: 'Text Field', icon: <FaTextHeight size={16} className="text-gray-500" />, type: 'text' },
    { name: 'Number', icon: <IoMdKey size={16} className="text-gray-500" />, type: 'number' }, // Changed icon to IoMdKey for "0"
    { name: 'Date Picker', icon: <BsFillCalendarFill size={16} className="text-gray-500" />, type: 'date' }, // Changed icon to BsFillCalendarFill
    { name: 'Email Field', icon: <MdEmail size={16} className="text-gray-500" />, type: 'email' }, // Changed icon to MdEmail
    { name: 'File Upload', icon: <FaFileUpload size={16} className="text-gray-500" />, type: 'file' },
  ];

  const selectionFields = [
    { name: 'SSN', icon: <FaIdCard size={16} className="text-gray-500" />, type: 'ssn' },
    { name: 'Signature', icon: <FaSignature size={16} className="text-gray-500" />, type: 'signature' },
  ];

  const FieldItem = ({ name, icon, type }) => (
    <div
      className="flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-grab text-sm rounded-lg border border-gray-200 transition-colors duration-200"
      draggable
      onDragStart={(e) => handleDragStart(e, type)}
    >
      <div className="flex items-center justify-center w-6 h-6 mr-2"> {/* Added wrapper for consistent icon spacing/sizing */}
        {icon}
      </div>
      <span className="ml-0">{name}</span> {/* Removed ml-2 as wrapper adds space */}
    </div>
  );

  return (
    <div className="w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> {/* Custom scrollbar */}
      <div className="mb-4">
        <div className="relative">
          <FaSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2 mt-6">Basic Fields</h3>
      <div className="space-y-2 mb-6">
        {basicFields.map((field) => (
          <FieldItem key={field.type} {...field} />
        ))}
      </div>

      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Selection Fields</h3>
      <div className="space-y-2">
        {selectionFields.map((field) => (
          <FieldItem key={field.type} {...field} />
        ))}
      </div>
    </div>
  );
};

export default FormFieldsSidebar;