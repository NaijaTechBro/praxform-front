// export default ElementPropertiesSidebar;
import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const ElementPropertiesSidebar = ({ selectedElement, onUpdate }) => {
  if (!selectedElement) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <p className="text-center text-gray-500 text-sm">Select an element on the form to edit its properties.</p>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    onUpdate({ ...selectedElement, [id]: value });
  };

  const handleSwitchChange = (checked) => {
    onUpdate({ ...selectedElement, isRequired: checked });
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...(selectedElement.options || [])];
    newOptions[index] = { ...newOptions[index], label: e.target.value, value: e.target.value.toLowerCase().replace(/\s/g, '_') };
    onUpdate({ ...selectedElement, options: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [...(selectedElement.options || [])];
    const newOptionLabel = `Option ${newOptions.length + 1}`;
    newOptions.push({ label: newOptionLabel, value: newOptionLabel.toLowerCase().replace(/\s/g, '_') });
    onUpdate({ ...selectedElement, options: newOptions });
  };

  const handleDeleteOption = (index) => {
    const newOptions = (selectedElement.options || []).filter((_, i) => i !== index);
    onUpdate({ ...selectedElement, options: newOptions });
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Element Properties</h2>
      <div className="space-y-4">
        {/* Label */}
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            id="label"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedElement.label || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* Placeholder Text (for applicable fields) */}
        {(selectedElement.type === 'text' || selectedElement.type === 'number' || selectedElement.type === 'email' || selectedElement.type === 'tel' || selectedElement.type === 'textarea') && (
          <div>
            <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700 mb-1">Placeholder Text</label>
            <input
              type="text"
              id="placeholder"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedElement.placeholder || ''}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Embed URL (for embed field) */}
        {selectedElement.type === 'embed' && (
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Embed URL</label>
            <input
              type="url"
              id="url"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedElement.url || ''}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Textarea Rows (for textarea field) */}
        {selectedElement.type === 'textarea' && (
          <div>
            <label htmlFor="rows" className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
            <input
              type="number"
              id="rows"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedElement.rows || 3}
              onChange={handleInputChange}
              min="1"
            />
          </div>
        )}

        {/* Options (for checkbox, radio-group, select fields) */}
        {(selectedElement.type === 'checkbox' || selectedElement.type === 'radio-group' || selectedElement.type === 'select') && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Options</h3>
            <div className="space-y-2">
              {(selectedElement.options || []).map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="flex-grow p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={option.label}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                  <button
                    onClick={() => handleDeleteOption(index)}
                    className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 focus:outline-none"
                    title="Delete option"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddOption}
              className="flex items-center justify-center w-full mt-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200 focus:outline-none"
            >
              <FiPlus className="mr-2" /> Add Option
            </button>
          </div>
        )}

        {/* Layout Row Columns (for layout-row field) */}
        {selectedElement.type === 'layout-row' && (
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Layout Settings</h3>
            <div>
              <label htmlFor="columns" className="block text-sm font-medium text-gray-700 mb-1">Number of Columns</label>
              <input
                type="number"
                id="columns"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedElement.columns || 1}
                onChange={handleInputChange}
                min="1"
                max="4" // Limit to 4 columns for reasonable layout
              />
            </div>
          </div>
        )}


        {/* Validation Section */}
        {selectedElement.type !== 'layout-row' && selectedElement.type !== 'embed' && ( // Layout rows and embeds don't have isRequired
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Validation</h3>
            {/* Required Field */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-700">Required Field</span>
              <Switch
                checked={selectedElement.isRequired}
                onChange={handleSwitchChange}
                className={`${
                  selectedElement.isRequired ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    selectedElement.isRequired ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            {/* Min Length (only for text/number/email/tel/ssn/textarea fields) */}
            {(selectedElement.type === 'text' || selectedElement.type === 'number' || selectedElement.type === 'email' || selectedElement.type === 'tel' || selectedElement.type === 'ssn' || selectedElement.type === 'textarea') && (
              <div>
                <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 mb-1">Min Length</label>
                <input
                  type="number"
                  id="minLength"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedElement.minLength || 0}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            )}

            {/* Max Length (only for text/number/email/tel/ssn/textarea fields) */}
            {(selectedElement.type === 'text' || selectedElement.type === 'number' || selectedElement.type === 'email' || selectedElement.type === 'tel' || selectedElement.type === 'ssn' || selectedElement.type === 'textarea') && (
              <div className="mt-3">
                <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">Max Length</label>
                <input
                  type="number"
                  id="maxLength"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedElement.maxLength || 0}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElementPropertiesSidebar;
