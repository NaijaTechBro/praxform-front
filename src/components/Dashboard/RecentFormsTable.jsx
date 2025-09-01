import React, { useState, useEffect } from 'react';
import { useForms } from '../../context/FormContext';
import { FiEye, FiMoreHorizontal } from 'react-icons/fi';
import { FaFileAlt, FaFileContract, FaFileSignature } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const iconEye = <FiEye size={20} />;
const iconEllipsis = <FiMoreHorizontal size={20} />;

const getFormIcon = (formName) => {
  if (formName.includes('Tax')) return <FaFileAlt size={20} className="text-yellow-500" />;
  if (formName.includes('Agreement')) return <FaFileContract size={20} className="text-blue-500" />;
  if (formName.includes('Authorization')) return <FaFileSignature size={20} className="text-green-500" />;
  return <FaFileAlt size={20} className="text-purple-500" />;
};

const getStatusClass = (status) => {
  switch (status) {
    case 'archived': return 'text-red-500 bg-red-100';
    case 'active': return 'text-green-500 bg-green-100';
    case 'draft': return 'text-blue-500 bg-blue-100';
    case 'paused': return 'text-orange-500 bg-orange-100';
    default: return 'text-gray-500 bg-gray-100';
  }
};

const RecentFormsTable = ({ limit = 5 }) => {
  // Removed loading from destructuring, as requested
  const { forms, getForms, error, clearError, getFormById, deleteForm, setMessage } = useForms();
  const navigate = useNavigate();

  useEffect(() => {
    getForms();
  }, []);

  useEffect(() => {
    if (error) {
      console.error(`Error fetching recent forms: ${error}`);
      clearError();
    }
  }, [error, clearError]);

  const recentForms = Array.isArray(forms)
    ? forms
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit)
    : [];

  const handleEditForm = async (formId) => {
    await getFormById(formId); 
    navigate(`/forms/edit/${formId}`);
  };

  const handleDeleteForm = async (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await deleteForm(formId);
        setMessage({ type: 'success', text: 'Form deleted successfully!' });
      } catch (err) {
        console.error('Failed to delete form:', err);
        setMessage({ type: 'error', text: 'Failed to delete form.' });
      }
    }
  };

  // Removed the explicit loading block, as requested.
  // The UI will render immediately with the initial state of 'forms' (an empty array).

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Recent Forms</h2>
        <button
          onClick={() => navigate('/forms')}
          className="text-[#1475F4] hover:underline text-sm font-medium"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">FORM NAME</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STATUS</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CREATED BY</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CREATED AT</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentForms.length > 0 ? (
              recentForms.map(form => (
                <tr key={form._id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        {getFormIcon(form.name)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{form.name}</div>
                        <div className="text-sm text-gray-500">{form.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(form.status)}`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{form.createdBy?.firstName || 'N/A'} {form.createdBy?.lastName || ''}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(form.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditForm(form._id)}
                        className="text-gray-500 hover:text-gray-900 transition-colors"
                        title="View/Edit Form"
                      >
                        {iconEye}
                      </button>
                      <button
                        onClick={() => handleDeleteForm(form._id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Form"
                      >
                        {iconEllipsis}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                  {"No recent forms found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentFormsTable;