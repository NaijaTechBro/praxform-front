// src/components/NewForm/ElementPropertiesSidebar.jsx
import React from 'react';
import { Switch } from '@headlessui/react';

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

        {/* Placeholder Text */}
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

        {/* Validation Section */}
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

          {/* Min Length (only for text/number fields) */}
          {(selectedElement.type === 'text' || selectedElement.type === 'number') && (
            <div>
              <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 mb-1">Min Length</label>
              <input
                type="number"
                id="minLength"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedElement.minLength || 0}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Max Length (only for text/number fields) */}
          {(selectedElement.type === 'text' || selectedElement.type === 'number') && (
            <div className="mt-3">
              <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">Max Length</label>
              <input
                type="number"
                id="maxLength"
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedElement.maxLength || 0}
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* Add more properties based on field type if needed */}
        </div>
      </div>
    </div>
  );
};

export default ElementPropertiesSidebar;
