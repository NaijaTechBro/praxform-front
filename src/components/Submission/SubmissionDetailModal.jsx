import React, { useState, useEffect } from 'react';
import { FiX, FiLock, FiTrash, FiDownload, FiAlertCircle } from 'react-icons/fi';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSubmissions } from '../../context/SubmissionContext';
import { toast } from 'react-toastify';

const SubmissionDetailModal = ({ submission, formFields, onClose, onSubmissionDeleted }) => {
    const { token } = useAuth();
    const { deleteSubmission } = useSubmissions();
    const [decryptedData, setDecryptedData] = useState(null);
    const [decryptionError, setDecryptionError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchFormKeyAndDecrypt = async () => {
            if (!submission || !submission.form) {
                setDecryptionError('Could not find form ID for decryption.');
                setLoading(false);
                return;
            }

            try {
                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                };
                const formResponse = await axios.get(`${API_BASE_URL}/forms/${submission.form}`, config);
                const formEncryptionKey = formResponse.data.encryptionKey;

                if (!formEncryptionKey) {
                    throw new Error('Form does not have an encryption key.');
                }

                const encryptedString = submission.encryptedData?.data;
                if (!encryptedString) {
                    setDecryptedData({});
                    setLoading(false);
                    return;
                }

                const bytes = CryptoJS.AES.decrypt(encryptedString, formEncryptionKey);
                const originalData = bytes.toString(CryptoJS.enc.Utf8);

                if (!originalData) {
                    throw new Error('Failed to decrypt data. Key may be incorrect.');
                }

                setDecryptedData(JSON.parse(originalData));
                setLoading(false);

            } catch (err) {
                setDecryptionError(err.response?.data?.message || err.message || 'Failed to decrypt data.');
                setLoading(false);
            }
        };

        fetchFormKeyAndDecrypt();
    }, [submission, token, API_BASE_URL]);

    const handleDeleteClick = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        setShowConfirmModal(false);
        try {
            await deleteSubmission(submission._id);
            toast.success('Submission deleted successfully!');
            onClose();
            if (onSubmissionDeleted) {
                onSubmissionDeleted(submission._id);
            }
        } catch (err) {
            toast.error(err.message || 'Failed to delete submission.');
        }
    };

    const handleDownload = () => {
        if (!decryptedData) {
            toast.error('No data to download.');
            return;
        }

        let content = `Submission Details\nSubmitted On: ${new Date(submission.createdAt).toLocaleString()}\n\n`;
        Object.entries(decryptedData).forEach(([key, value]) => {
            const fieldLabel = formFields.find(field => field.id === key)?.label || key;
            content += `${fieldLabel}: ${value}\n`;
        });

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `submission_${submission._id}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('File download initiated!');
    };

    const FieldDisplay = ({ label, value }) => (
        <div>
            <p className="text-gray-500 font-medium mb-1">{label}</p>
            <div className="bg-gray-100 p-3 rounded-lg text-gray-800 break-words font-semibold">
                {value}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-gray-800">Submission Details</h2>
                    <p className="text-sm text-gray-500 mt-1 mb-6">
                        Submitted On: {new Date(submission.createdAt).toLocaleString()}
                    </p>
                </div>

                {loading ? (
                    <div className="text-center text-gray-500 p-8">Decrypting data...</div>
                ) : decryptionError ? (
                    <div className="text-red-500 text-center p-8 bg-red-50 rounded-md flex items-center justify-center">
                        <FiLock size={20} className="mr-2" />
                        <p>{decryptionError}</p>
                    </div>
                ) : (
                    <div className="flex flex-col space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(decryptedData || {}).map(([key, value]) => {
                                const fieldLabel = formFields.find(field => field.id === key)?.label || key;
                                return (
                                    <FieldDisplay key={key} label={fieldLabel} value={value} />
                                );
                            })}
                        </div>
                        <div className="flex justify-center mt-8 space-x-4">
                            <button
                                onClick={handleDeleteClick}
                                className="bg-white text-red-500 border border-gray-300 rounded-full px-6 py-2 flex items-center shadow-sm hover:bg-red-50 transition-colors"
                            >
                                <FiTrash size={18} className="mr-2" /> Delete
                            </button>
                            <button
                                onClick={handleDownload}
                                className="bg-blue-600 text-white rounded-full px-6 py-2 flex items-center shadow-md hover:bg-blue-700 transition-colors"
                            >
                                <FiDownload size={18} className="mr-2" /> Download
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal integrated directly */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75 z-[60] flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <FiAlertCircle className="text-red-500 mr-2" size={24} />
                                <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
                            </div>
                            <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 hover:text-gray-600">
                                <FiX size={20} />
                            </button>
                        </div>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this submission? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmissionDetailModal;