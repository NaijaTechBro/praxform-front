import React, { useState, useEffect } from 'react';
import { useForms } from '../../context/FormContext';
import { FiEye, FiSearch, FiMoreHorizontal } from 'react-icons/fi';
import { FaFileAlt, FaFileContract, FaFileSignature } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const iconEye = <FiEye size={20} />;
const iconEllipsis = <FiMoreHorizontal size={20} />;
const iconSearch = <FiSearch size={20} />;

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

const Forms = () => {
  const { forms, getForms, loading: formsLoading, error: formsError, getFormById, deleteForm, setMessage } = useForms();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  useEffect(() => {
    getForms();
  }, []);

  useEffect(() => {
    if (formsError) {
      setMessage({ type: 'error', text: `Error fetching forms: ${formsError}` });
    }
  }, [formsError, setMessage]);

  const filteredForms = Array.isArray(forms) ? forms.filter(form =>
    form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.createdBy?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    form.createdBy?.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const totalItems = filteredForms.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedForms = filteredForms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEditForm = async (formId) => {
    await getFormById(formId); 
    navigate(`/edit-form/${formId}`); // Changed navigation to the new edit page
  };

  const handleDeleteForm = async (formId) => {
    if (window.confirm('Are you sure you want to delete this form?')) {
      try {
        await deleteForm(formId);
        // Message is now handled by the context
      } catch (err) {
        console.error('Failed to delete form:', err);
      }
    }
  };

  if (formsError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-red-700">Error loading forms: {formsError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-7xl mx-auto">
        {/* Header with Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Recent Forms</h1>
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {iconSearch}
            </div>
            <input
              type="text"
              placeholder="Search forms..."
              className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Forms Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">FORM NAME</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CREATED BY</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">CREATED AT</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">LAST MODIFIED</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedForms.length > 0 ? (
                paginatedForms.map(form => (
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
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{new Date(form.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{new Date(form.updatedAt).toLocaleDateString()}</td>
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
                  <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                    {formsLoading ? "Loading forms..." : "No forms found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {paginatedForms.length} of {totalItems}
            </div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              {[...Array(totalPages).keys()].map(page => (
                <button
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === page + 1 ? 'z-10 bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forms;
