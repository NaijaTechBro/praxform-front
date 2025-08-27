import React, { useState, useEffect } from 'react';
import { useForms } from '../../context/FormContext';
import { useSubmissions } from '../../context/SubmissionContext';
import { FiArrowLeft, FiMoreHorizontal, FiTrash2, FiEye } from 'react-icons/fi';
import SubmissionDetailModal from '../../components/Submission/SubmissionDetailModal';
import { toast } from 'react-toastify';

const Submissions = () => {
    const { forms, getForms, error: formsError } = useForms();
    const { getSubmissionsByFormId, deleteSubmission, error: submissionsError } = useSubmissions();

    const [selectedForm, setSelectedForm] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        getForms();
    }, [getForms]);

    useEffect(() => {
        if (formsError) {
            toast.error(formsError);
        }
    }, [formsError]);

    const fetchSubmissions = async (formId) => {
        try {
            const fetchedSubmissions = await getSubmissionsByFormId(formId);
            setSubmissions(fetchedSubmissions);
        } catch (err) {
            // Error is handled by context.
        }
    };

    const handleFormClick = (form) => {
        setSelectedForm(form);
        fetchSubmissions(form._id);
    };

    const handleDelete = async (submissionId) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            try {
                const message = await deleteSubmission(submissionId);
                toast.success(message);
                fetchSubmissions(selectedForm._id);
            } catch (err) {
                toast.error(err.message);
            }
        }
    };

    const handleViewSubmission = (submission) => {
        setSelectedSubmission(submission);
        setShowDetailModal(true);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 font-sans">
            {/* Left Sidebar: Forms List */}
            <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Forms</h2>
                <ul className="space-y-2">
                    {Array.isArray(forms) && forms.length > 0 ? (
                        forms.map(form => (
                            <li
                                key={form._id}
                                onClick={() => handleFormClick(form)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors duration-200
                                    ${selectedForm?._id === form._id ? 'bg-[#1475F4] text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >
                                <h3 className={`text-sm font-semibold ${selectedForm?._id === form._id ? 'text-white' : 'text-gray-800'}`}>
                                    {form.name}
                                </h3>
                                <p className={`text-xs ${selectedForm?._id === form._id ? 'text-gray-200' : 'text-gray-500'}`}>
                                    {form.description}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No forms found.</p>
                    )}
                </ul>
            </div>

            {/* Right Panel: Submissions Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {!selectedForm ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-lg text-gray-500">Select a form from the left to view its submissions.</p>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSelectedForm(null)}
                                    className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 mr-4"
                                    title="Back to forms list"
                                >
                                    <FiArrowLeft size={20} />
                                </button>
                                <h2 className="text-2xl font-bold text-gray-800">Submissions for "{selectedForm.name}"</h2>
                            </div>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                {submissions.length} Total Submissions
                            </span>
                        </div>
                        {submissionsError ? (
                            <p className="text-center text-red-500">Error: {submissionsError}</p>
                        ) : submissions.length > 0 ? (
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SUBMISSION ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">DATE SUBMITTED</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">RECIPIENT EMAIL</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STATUS</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {submissions.map(sub => (
                                                <tr key={sub._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sub._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(sub.createdAt).toLocaleString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {sub.recipientEmail} {/* NEW DATA CELL */}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}>
                                                            {sub.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end space-x-2">
                                                        <button 
                                                            onClick={() => handleViewSubmission(sub)}
                                                            className="text-gray-500 hover:text-gray-900 transition-colors"
                                                            title="View details"
                                                        >
                                                            <FiEye size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(sub._id)}
                                                            className="text-red-500 hover:text-red-700 transition-colors"
                                                            title="Delete submission"
                                                        >
                                                            <FiTrash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                                <p className="text-lg text-gray-500">No submissions found for this form.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {showDetailModal && (
                <SubmissionDetailModal
                    submission={selectedSubmission}
                    formFields={selectedForm?.fields || []}
                    onClose={() => setShowDetailModal(false)}
                />
            )}
        </div>
    );
};

export default Submissions;
