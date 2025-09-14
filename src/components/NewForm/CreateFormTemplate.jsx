import React, { useState, useEffect } from 'react';
import { useForms } from '../../context/FormContext';
import { useTemplates } from '../../context/TemplateContext'; 
import { FiSave, FiEye, FiSend, FiPlus, FiTrash2, FiSettings } from 'react-icons/fi';
import ElementPropertiesSidebar from '../../components/NewForm/ElementPropertiesSidebar';
import FormFieldsSidebar from '../../components/NewForm/FormFieldsSidebar';
import FormPreviewModal from '../../components/NewForm/FormPreviewModal';
import SendFormModal from '../../components/NewForm/SendFormModal';
import { useNavigate, useParams } from 'react-router-dom'; 
import { toast } from 'react-toastify';

const CreateFromTemplatePage = () => {
    const { createForm, updateForm, loading: formsLoading, error: formError, clearError: clearFormError, sendForm } = useForms();
    const { getTemplateById, currentTemplate, loading: templatesLoading, error: templateError, clearError: clearTemplateError } = useTemplates(); // Use TemplateContext
    const navigate = useNavigate();
    const { templateId } = useParams(); 

    const [formName, setFormName] = useState('New Form from Template');
    const [formDescription, setFormDescription] = useState('');
    const [formFields, setFormFields] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const [formStatus, setFormStatus] = useState('draft');
    const [formId, setFormId] = useState(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [showSendModal, setShowSendModal] = useState(false);

    // Fetch template data if templateId is present
    useEffect(() => {
        if (templateId) {
            getTemplateById(templateId);
        }
    }, [templateId, getTemplateById]);

    // Populate form states once currentTemplate is loaded
    useEffect(() => {
        if (currentTemplate) {
            setFormName(`Copy of ${currentTemplate.name}`);
            setFormDescription(currentTemplate.description || '');
            // Deep copy the fields to ensure immutability and allow independent editing
            setFormFields(JSON.parse(JSON.stringify(currentTemplate.fields || [])));
        } else if (!templatesLoading && templateId) {
            toast.error('Template not found or could not be loaded.');
            navigate('/forms/new');
        }
    }, [currentTemplate, templatesLoading, templateId, navigate]);

    // Error handling
    useEffect(() => {
        if (formError) {
            toast.error(`Form Error: ${formError}`);
            clearFormError();
        }
        if (templateError) {
            toast.error(`Template Error: ${templateError}`);
            clearTemplateError();
        }
    }, [formError, clearFormError, templateError, clearTemplateError]);

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
            template: templateId || undefined,
        };
        setIsSaving(true);
        try {
            if (formId) {
                await updateForm(formId, formData);
            } else {
                const savedForm = await createForm(formData);
                setFormId(savedForm._id);
                setFormStatus(savedForm.status);
            }
            toast.success('Form saved successfully!');
        } catch (err) {
            console.error('Failed to save form:', err);
            toast.error('Failed to save form.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSendForm = () => {
        if (!formId) {
            toast.error("Please save the form as a draft first before sending.");
            return;
        }
        setShowSendModal(true);
    };

    const handleConfirmSend = async (recipients, message) => {
        setIsSending(true);
        setShowSendModal(false);
        try {
            await sendForm(formId, { recipients, message });
            setFormStatus('active');
            toast.success('Form sent successfully!');
            navigate('/forms');
        } catch (err) {
            console.error('Failed to send form:', err);
            toast.error(err.message || 'Failed to send form.');
        } finally {
            setIsSending(false);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const isLoadingPage = formsLoading || templatesLoading;

    if (isLoadingPage) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-100 font-sans">
                <p className="text-lg text-gray-700">Loading form...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Left Sidebar Toggle */}
            <div className="absolute top-4 left-4 z-50">
                <button
                    onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                    title={isLeftSidebarOpen ? "Collapse Fields" : "Expand Fields"}
                >
                    <FiPlus size={20} className={isLeftSidebarOpen ? 'transform rotate-45' : ''} />
                </button>
            </div>

            {/* Right Sidebar Toggle */}
            <div className="absolute top-4 right-4 z-50">
                <button
                    onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-600 shadow-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
                    title={isRightSidebarOpen ? "Collapse Properties" : "Expand Properties"}
                >
                    <FiSettings size={20} />
                </button>
            </div>

            {/* Left Sidebar for Form Fields (Toggable) */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out transform ${
                    isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <FormFieldsSidebar />
            </div>

            {/* Main Content Area */}
            <div
                className={`flex-1 flex flex-col p-6 transition-all duration-300 ease-in-out
                    ${isLeftSidebarOpen ? 'ml-64' : 'ml-0'}
                    ${isRightSidebarOpen ? 'mr-80' : 'mr-0'}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {/* Top Action Bar */}
                <div className="flex-none mb-6 flex items-center justify-between bg-white p-4 py-3 rounded-lg shadow-sm">
                    <input
                        type="text"
                        className="text-xl font-semibold text-gray-800 md:text-2xl whitespace-nowrap bg-transparent outline-none border-b border-transparent focus:border-gray-400 transition-colors duration-200"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                    />
                    <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full whitespace-nowrap`}>
                            {formStatus}
                        </span>
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
                            disabled={isSaving || isSending}
                        >
                            {isSaving ? 'Saving...' : <><FiSave className="mr-2" size={16} /> Save Draft</>}
                        </button>
                        <button
                            onClick={handleSendForm}
                            className="bg-[#1475F4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none flex items-center whitespace-nowrap"
                            disabled={isSaving || isSending}
                        >
                            {isSending ? 'Sending...' : <><FiSend className="mr-2" size={16} /> Send Form</>}
                        </button>
                    </div>
                </div>

                {/* Form Design Area */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {formFields.length === 0 ? (
                        <div className="text-center p-10 border border-dashed border-gray-300 rounded-lg max-w-lg mx-auto">
                            <p className="text-gray-500 mb-6 text-base">Drag and drop form elements from the left sidebar or select a template to start building your custom form.</p>
                        </div>
                    ) : (
                        formFields.map((field) => (
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
                                    readOnly
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteField(field.id);
                                    }}
                                    className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 focus:outline-none"
                                    title="Delete field"
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Right Sidebar for Element Properties (Toggable) */}
            <div
                className={`fixed inset-y-0 right-0 z-40 w-80 bg-white border-l border-gray-200 transition-transform duration-300 ease-in-out transform ${
                    isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
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
            </div>

            {/* Form Preview Modal */}
            <FormPreviewModal
                show={showPreviewModal}
                onClose={() => setShowPreviewModal(false)}
                formName={formName}
                formDescription={formDescription}
                formFields={formFields}
            />

            {/* Send Form Modal */}
            <SendFormModal
                show={showSendModal}
                onClose={() => setShowSendModal(false)}
                onSend={handleConfirmSend}
                formName={formName}
            />
        </div>
    );
};

export default CreateFromTemplatePage;