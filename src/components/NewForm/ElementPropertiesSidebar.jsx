

import React from 'react';
import { Switch } from '@headlessui/react';

const ElementPropertiesSidebar = ({ selectedElement }) => {
  const [isRequired, setIsRequired] = React.useState(false); // Example state for required field

  if (!selectedElement) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <p className="text-center text-gray-500 text-sm">Select an element on the form to edit its properties.</p>
      </div>
    );
  }

  return (
    <div className="w-80 border-l border-gray-200 bg-white p-6 shadow-sm overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> {/* Added scrollbar styling */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Element Properties</h2>

      <div className="space-y-4">
        {/* Label */}
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <input
            type="text"
            id="label"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={selectedElement.label || ''}
            placeholder="Text Field"
          />
        </div>

        {/* Placeholder Text */}
        <div>
          <label htmlFor="placeholder" className="block text-sm font-medium text-gray-700 mb-1">
            Placeholder Text
          </label>
          <input
            type="text"
            id="placeholder"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={selectedElement.placeholder || ''}
            placeholder="Start Typing"
          />
        </div>

        {/* Validation Section */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Validation</h3>

          {/* Required Field */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-700">Required Field</span>
            <Switch
              checked={isRequired}
              onChange={setIsRequired}
              className={`${
                isRequired ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            >
              <span
                className={`${
                  isRequired ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>

          {/* Min Length */}
          <div>
            <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 mb-1">
              Min Length
            </label>
            <input
              type="number"
              id="minLength"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={selectedElement.minLength || 0}
            />
          </div>

          {/* Max Length */}
          <div className="mt-3">
            <label htmlFor="maxLength" className="block text-sm font-medium text-gray-700 mb-1">
              Max Length
            </label>
            <input
              type="number"
              id="maxLength"
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue={selectedElement.maxLength || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementPropertiesSidebar;