import React from 'react';

const FormPreviewModal = ({ show, onClose, formName, formDescription, formFields }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50 p-4 font-sans">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-800">{formName} - Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {formDescription && (
            <p className="text-gray-600 mb-6 pb-4 border-b border-gray-100">{formDescription}</p>
          )}

          <form className="space-y-6">
            {formFields.length > 0 ? (
              formFields.map((field) => (
                <div key={field.id} className="bg-gray-50 p-4 rounded-md border border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'ssn' ? (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value="" // Always empty for preview
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm"
                    />
                  ) : field.type === 'date' ? (
                    <input
                      type="date"
                      value="" // Always empty for preview
                      readOnly
                      className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm"
                    />
                  ) : field.type === 'file' ? (
                    <div className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-800 text-sm flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                      {field.placeholder || "No file selected"}
                    </div>
                  ) : field.type === 'signature' ? (
                    <div className="w-full h-24 p-2 border border-gray-300 rounded-md bg-white flex items-center justify-center text-gray-500 text-sm">
                      [Signature Pad Placeholder]
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Unsupported field type: {field.type}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm">No fields added to the form yet.</p>
            )}
          </form>
        </div>

        {/* Modal Footer (Optional, e.g., for a close button) */}
        <div className="sticky bottom-0 z-10 p-4 border-t border-gray-200 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPreviewModal;

