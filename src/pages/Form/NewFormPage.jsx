import React, { useEffect } from 'react';
import { useForms } from '../../context/FormContext';
import FormBuilderArea from '../../components/NewForm/FormBuilderArea';
import { useNavigate } from 'react-router-dom';

const NewFormPage = () => {
  const { currentForm, clearCurrentForm } = useForms();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentForm) {
      clearCurrentForm();
    }
  }, [currentForm, clearCurrentForm]);

  const handleStartFromScratch = () => {
    navigate('/forms/new'); 
  };

  const handleUseTemplate = () => {
    navigate('/templates');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="flex-1 flex flex-col">
        {/* Header Section (simplified for this view) */}
        <div className="flex-none p-6 pb-2">
          <div className="flex items-center justify-between bg-white p-4 py-3 rounded-lg shadow-sm">
            <h1 className="text-xl font-bold text-gray-800 md:text-2xl whitespace-nowrap">Create New Form</h1>
          </div>
        </div>

        <div className="flex-1 p-6 pt-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <FormBuilderArea
            formFields={[]} 
            onStartFromScratch={handleStartFromScratch}
            onUseTemplate={handleUseTemplate}
          />
        </div>
      </div>
    </div>
  );
};

export default NewFormPage;
