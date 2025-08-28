
// export default FormBuilderArea;
import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import create from '../../assets/statscard/create.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FormBuilderArea = ({
  formFields,
  setFormFields, // Now needs setFormFields to update nested structures
  setSelectedElement,
  selectedElement,
  onDeleteField,
  onStartFromScratch,
  onUseTemplate,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Helper function to update a field or nested field
  const updateFieldInArray = (fields, updatedField) => {
    return fields.map(field => {
      if (field.id === updatedField.id) {
        return updatedField;
      }
      if (field.type === 'layout-row' && field.children) {
        return {
          ...field,
          children: updateFieldInArray(field.children, updatedField)
        };
      }
      return field;
    });
  };

  // Helper function to delete a field or nested field
  const deleteFieldInArray = (fields, fieldIdToDelete) => {
    return fields.filter(field => {
      if (field.id === fieldIdToDelete) {
        return false; // Remove this field
      }
      if (field.type === 'layout-row' && field.children) {
        // Recursively filter children
        const updatedChildren = deleteFieldInArray(field.children, fieldIdToDelete);
        // If all children are deleted, you might want to delete the row itself
        // For now, we'll keep the row even if empty, but this can be a design choice.
        return { ...field, children: updatedChildren };
      }
      return true; // Keep this field
    });
  };

  // Function to add a new field to a specific row's children
  const addFieldToRow = (targetRowId, newField) => {
    const addRecursive = (fields) => {
      return fields.map(field => {
        if (field.id === targetRowId && field.type === 'layout-row') {
          return {
            ...field,
            children: [...(field.children || []), newField]
          };
        }
        if (field.type === 'layout-row' && field.children) {
          return {
            ...field,
            children: addRecursive(field.children)
          };
        }
        return field;
      });
    };
    setFormFields(addRecursive(formFields));
  };


  const handleDrop = (e, targetRowId = null) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('fieldType');

    const newField = {
      id: Date.now().toString(),
      type: fieldType,
      label: `${fieldType} Field`,
      placeholder: `Enter ${fieldType}`,
      isRequired: false,
      minLength: 0,
      maxLength: 255,
      // Add default properties for new types
      ...(fieldType === 'checkbox' && { value: '', options: [{ label: 'Option 1', value: 'option1' }] }),
      ...(fieldType === 'radio-group' && { options: [{ label: 'Option 1', value: 'option1' }] }),
      ...(fieldType === 'select' && { options: [{ label: 'Option 1', value: 'option1' }] }),
      ...(fieldType === 'textarea' && { rows: 3 }),
      ...(fieldType === 'embed' && { url: 'https://example.com' }),
      ...(fieldType === 'layout-row' && { children: [], columns: 2 }), // Default to 2 columns
    };

    if (targetRowId) {
      addFieldToRow(targetRowId, newField);
    } else {
      setFormFields((prevFields) => [...prevFields, newField]);
    }
    setSelectedElement(newField);
  };

  const handleDragOver = (e) => e.preventDefault();

  // Recursive render function for fields
  const renderField = (field) => {
    const isSelected = selectedElement && selectedElement.id === field.id;

    // Render a layout row
    if (field.type === 'layout-row') {
      const columnClass = field.columns ? `grid-cols-${field.columns}` : 'grid-cols-1';
      return (
        <div
          key={field.id}
          onClick={() => setSelectedElement(field)}
          onDrop={(e) => handleDrop(e, field.id)} // Allow dropping into this row
          onDragOver={handleDragOver}
          className={`relative p-4 mb-4 border rounded-lg cursor-pointer transition-colors
            ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}
            min-h-[100px] flex flex-col`} // Added flex for vertical centering of drop area
        >
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {field.label || 'Layout Row'}
            </label>
            <button
              onClick={(e) => { e.stopPropagation(); onDeleteField(field.id); }}
              className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 focus:outline-none"
              title="Delete row"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
          {/* Children container with grid for side-by-side layout */}
          <div className={`grid ${columnClass} gap-4 flex-grow`}>
            {field.children && field.children.length > 0 ? (
              field.children.map(childField => (
                <div key={childField.id} className="relative">
                  {renderField(childField)} {/* Recursively render children */}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 p-4 border border-dashed border-gray-300 rounded-md">
                Drop fields here or drag them into this row.
              </div>
            )}
          </div>
        </div>
      );
    }

    // Render individual form fields
    return (
      <div
        key={field.id}
        onClick={() => setSelectedElement(field)}
        className={`relative p-4 mb-4 border rounded-lg cursor-pointer transition-colors
          ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
      >
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label} {field.isRequired && <span className="text-red-500">*</span>}
        </label>
        {field.type === 'textarea' ? (
          <textarea
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            readOnly
          ></textarea>
        ) : field.type === 'checkbox' ? (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              readOnly
            />
            <span className="ml-2 text-sm text-gray-700">{field.value || 'Checkbox Item'}</span>
          </div>
        ) : field.type === 'radio-group' ? (
          <div className="space-y-2">
            {(field.options || []).map((option, idx) => (
              <div key={idx} className="flex items-center">
                <input
                  type="radio"
                  name={field.id} // Group radios by field ID
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  readOnly
                />
                <label className="ml-2 text-sm text-gray-700">{option.label}</label>
              </div>
            ))}
          </div>
        ) : field.type === 'select' ? (
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            readOnly
          >
            {(field.options || []).map((option, idx) => (
              <option key={idx} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : field.type === 'embed' ? (
          <div className="relative w-full h-32 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
            <span className="text-gray-500 text-sm">Embed: {field.url || 'No URL set'}</span>
            {/* In a real preview, you might render an iframe here, but for builder, text is fine */}
          </div>
        ) : (
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            readOnly
          />
        )}
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
    );
  };

  if (formFields.length === 0) {
    return (
      <div
        className="min-h-[calc(100vh-170px)] bg-white rounded-lg shadow-md flex items-center justify-center p-8"
        onDrop={(e) => handleDrop(e)} // Allow dropping directly into empty area
        onDragOver={handleDragOver}
      >
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
    <div
      className="bg-white rounded-lg shadow-md p-8 min-h-[calc(100vh-170px)]"
      onDrop={(e) => handleDrop(e)} // Allow dropping into the main form area
      onDragOver={handleDragOver}
    >
      {formFields.map((field) => renderField(field))}
    </div>
  );
};

export default FormBuilderArea;
