import React from 'react';
import { FaTextHeight, FaCalendarAlt, FaSearch, FaFileUpload, FaIdCard, FaSignature, FaLink, FaListUl, FaCheckSquare, FaDotCircle, FaAlignLeft } from 'react-icons/fa';
import { IoMdKey } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { GrGroup } from 'react-icons/gr'; // Icon for layout row

const FormFieldsSidebar = () => {
  const handleDragStart = (e, fieldType) => {
    e.dataTransfer.setData('fieldType', fieldType);
  };

  const basicFields = [
    { name: 'Text Field', icon: <FaTextHeight size={16} className="text-gray-500" />, type: 'text' },
    { name: 'Text Area', icon: <FaAlignLeft size={16} className="text-gray-500" />, type: 'textarea' },
    { name: 'Number', icon: <IoMdKey size={16} className="text-gray-500" />, type: 'number' },
    { name: 'Date Picker', icon: <FaCalendarAlt size={16} className="text-gray-500" />, type: 'date' },
    { name: 'Email Field', icon: <MdEmail size={16} className="text-gray-500" />, type: 'email' },
    { name: 'File Upload', icon: <FaFileUpload size={16} className="text-gray-500" />, type: 'file' },
    { name: 'Embed Link', icon: <FaLink size={16} className="text-gray-500" />, type: 'embed' }, // New field type
  ];

  const selectionFields = [
    { name: 'Checkbox', icon: <FaCheckSquare size={16} className="text-gray-500" />, type: 'checkbox' }, // New field type
    { name: 'Radio Group', icon: <FaDotCircle size={16} className="text-gray-500" />, type: 'radio-group' }, // New field type for multiple radio options
    { name: 'Select (Dropdown)', icon: <FaListUl size={16} className="text-gray-500" />, type: 'select' }, // New field type
    { name: 'SSN', icon: <FaIdCard size={16} className="text-gray-500" />, type: 'ssn' },
    { name: 'Signature', icon: <FaSignature size={16} className="text-gray-500" />, type: 'signature' },
  ];

  // New layout fields section
  const layoutFields = [
    { name: 'Layout Row', icon: <GrGroup size={16} className="text-gray-500" />, type: 'layout-row' }, // Crucial for side-by-side
  ];

  const FieldItem = ({ name, icon, type }) => (
    <div
      className="flex items-center p-2 text-gray-700 hover:bg-gray-100 cursor-grab text-sm rounded-lg border border-gray-200 transition-colors duration-200"
      draggable
      onDragStart={(e) => handleDragStart(e, type)}
    >
      <div className="flex items-center justify-center w-6 h-6 mr-2">
        {icon}
      </div>
      <span className="ml-0">{name}</span>
    </div>
  );

  return (
    <div className="w-full h-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
      <div className="space-y-2 mb-6">
        {selectionFields.map((field) => (
          <FieldItem key={field.type} {...field} />
        ))}
      </div>

      <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">Layout Elements</h3>
      <div className="space-y-2">
        {layoutFields.map((field) => (
          <FieldItem key={field.type} {...field} />
        ))}
      </div>
    </div>
  );
};

export default FormFieldsSidebar;
