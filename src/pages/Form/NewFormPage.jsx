// src/pages/NewFormPage.jsx
import React, { useState, useEffect } from 'react';
import { useForms } from '../../context/FormContext';
import { FiPlus, FiChevronLeft, FiChevronRight, FiEdit2, FiEye, FiSave, FiSend, FiSettings } from 'react-icons/fi';
import FormFieldsSidebar from '../../components/NewForm/FormFieldsSidebar';
import FormBuilderArea from '../../components/NewForm/FormBuilderArea';
import ElementPropertiesSidebar from '../../components/NewForm/ElementPropertiesSidebar';
import FormPreviewModal from '../../components/NewForm/FormPreviewModal';
import create from '../../assets/statscard/create.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const NewFormPage = () => {
  const { createForm, updateForm, currentForm, loading, error, clearError, sendForm } = useForms();
  const navigate = useNavigate(); // Initialize navigate hook

  const [formName, setFormName] = useState('Untitled Form');
  const [formDescription, setFormDescription] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPropertiesSidebarOpen, setIsPropertiesSidebarOpen] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [formStatus, setFormStatus] = useState('draft');
  const [formId, setFormId] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    if (currentForm) {
      setFormId(currentForm._id);
      setFormName(currentForm.name);
      setFormDescription(currentForm.description || '');
      setFormFields(currentForm.fields || []);
      setFormStatus(currentForm.status);
    } else {
      setFormId(null);
      setFormName('Untitled Form');
      setFormDescription('');
      setFormFields([]);
      setFormStatus('draft');
      setSelectedElement(null);
    }
  }, [currentForm]);

  useEffect(() => {
    if (error) {
      alert(`Error: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  const handleDrop = (e) => {
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
    };
    const newFields = [...formFields, newField];
    setFormFields(newFields);
    setSelectedElement(newField);
  };

  const handleUpdateElement = (updatedElement) => {
    setFormFields(
      formFields.map((field) =>
        field.id === updatedElement.id ? updatedElement : field
      )
    );
    setSelectedElement(updatedElement);
  };

  const handleDeleteField = (id) => {
    setFormFields((prevFields) => prevFields.filter((field) => field.id !== id));
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null);
    }
  };

  const handleSaveDraft = async () => {
    const formData = {
      name: formName,
      description: formDescription,
      fields: formFields,
      status: 'draft',
    };
    try {
      let savedForm;
      if (formId) {
        savedForm = await updateForm(formId, formData);
        alert('Form draft updated successfully!');
      } else {
        savedForm = await createForm(formData);
        alert('Form draft created successfully!');
      }
      setFormId(savedForm._id);
      setFormStatus(savedForm.status);
    } catch (err) {
      console.error('Failed to save form:', err);
    }
  };

  const handleSendForm = async () => {
    if (!formId) {
      alert("Please save the form as a draft first before sending.");
      return;
    }
    const recipients = [{ email: 'test@example.com', name: 'Test User' }];
    const message = 'Please fill out this form.';
    const expiresIn = 7;

    try {
      await sendForm(formId, { recipients, message, expiresIn });
      setFormStatus('active');
      alert('Form sent successfully!');
    } catch (err) {
      console.error('Failed to send form:', err);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleStartFromScratch = () => {
    navigate('/blank-form'); // Navigate to the new blank form page
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Mobile Sidebar Toggle Buttons */}
      <div className="md:hidden flex justify-between p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <FiPlus className="inline-block mr-2" />
          Fields
        </button>
        {selectedElement && (
          <button
            onClick={() => setIsPropertiesSidebarOpen(!isPropertiesSidebarOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <FiSettings className="inline-block mr-2" />
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

      {/* Main content area - now using flex-col to stack header and scrollable content */}
      <div className="flex-1 flex flex-col">
        {/* Header Section - fixed at the top of the main content area */}
        <div className="flex-none p-6 pb-2"> {/* Adjusted padding-bottom to pb-2 */}
          <div className="flex items-center justify-between bg-white p-4 py-3 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
              >
                {isHeaderExpanded ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
              </button>

              <div
                className={`flex items-center space-x-2 transition-all duration-300 ease-in-out overflow-hidden ${
                  isHeaderExpanded ? 'max-w-screen-xl opacity-100' : 'max-w-0 opacity-0'
                } md:max-w-full md:opacity-100`}
              >
                <input
                  type="text"
                  className="text-xl font-semibold text-gray-800 md:text-2xl whitespace-nowrap bg-transparent outline-none border-b border-transparent focus:border-gray-400 transition-colors duration-200"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
                <span className={`px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full whitespace-nowrap`}>
                  {formStatus}
                </span>
              </div>
            </div>

            <div
              className={`flex items-center space-x-3 transition-all duration-300 ease-in-out overflow-hidden ${
                isHeaderExpanded ? 'max-w-screen-xl opacity-100' : 'max-w-0 opacity-0'
              } md:max-w-full md:opacity-100`}
            >
              <button
                onClick={() => setShowPreviewModal(true)}
                className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 focus:outline-none whitespace-nowrap"
              >
                <FiEye className="mr-2" size={16} />
                Preview
              </button>
              <button
                onClick={handleSaveDraft}
                className="flex items-center text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 focus:outline-none whitespace-nowrap"
                disabled={loading}
              >
                {loading ? 'Saving...' : <><FiSave className="mr-2" size={16} /> Save Draft</>}
              </button>
              <button
                onClick={handleSendForm}
                className="bg-[#1475F4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none flex items-center whitespace-nowrap"
                disabled={loading}
              >
                {loading ? 'Sending...' : <><FiSend className="mr-2" size={16} /> Send Form</>}
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Form Builder Area */}
        <div
          className="flex-1 p-6 pt-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <FormBuilderArea
            formFields={formFields}
            setSelectedElement={setSelectedElement}
            selectedElement={selectedElement}
            onDeleteField={handleDeleteField}
            onStartFromScratch={handleStartFromScratch} // Pass the handler
          />
        </div>
      </div>

      {/* Right Sidebar for Element Properties */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 transition-transform duration-300 ease-in-out transform md:relative md:translate-x-0 ${
          isPropertiesSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedElement ? (
          <ElementPropertiesSidebar
            selectedElement={selectedElement}
            onUpdate={handleUpdateElement}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <p className="text-center text-gray-500 text-sm">Select an element on the form to edit its properties.</p>
          </div>
        )}
        <button
          onClick={() => setIsPropertiesSidebarOpen(false)}
          className="absolute top-2 left-2 md:hidden text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      {/* Form Preview Modal */}
      <FormPreviewModal
        show={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        formName={formName}
        formDescription={formDescription}
        formFields={formFields}
      />
    </div>
  );
};

export default NewFormPage;
