import React, { useState, useEffect } from 'react';
import { FiX, FiLock, FiUnlock } from 'react-icons/fi';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const SubmissionDetailModal = ({ submission, formFields, onClose }) => {
    const { token } = useAuth();
    const [decryptedData, setDecryptedData] = useState(null);
    const [decryptionError, setDecryptionError] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchFormKeyAndDecrypt = async () => {
            if (!submission || !submission.form) {
                setDecryptionError('Could not find form ID for decryption.');
                setLoading(false);
                return;
            }

            try {
                // Fetch the form from the backend to get the unique encryption key
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

                // Decrypt using the fetched key
                const bytes = CryptoJS.AES.decrypt(encryptedString, formEncryptionKey);
                const originalData = bytes.toString(CryptoJS.enc.Utf8);
                
                if (!originalData) {
                    throw new Error('Failed to decrypt data. Key may be incorrect.');
                }
                
                setDecryptedData(JSON.parse(originalData));
                setLoading(false);

            } catch (err) {
                console.error('Decryption failed:', err);
                setDecryptionError(err.response?.data?.message || err.message || 'Failed to decrypt data.');
                setLoading(false);
            }
        };

        fetchFormKeyAndDecrypt();
    }, [submission, token, API_BASE_URL]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Submission Details</h2>
                <p className="text-sm text-gray-500 mb-6">Submitted on: {new Date(submission.createdAt).toLocaleString()}</p>

                {loading ? (
                    <div className="text-center text-gray-500 p-4">Decrypting data...</div>
                ) : decryptionError ? (
                    <div className="text-red-500 text-center p-4 bg-red-50 rounded-md flex items-center justify-center">
                        <FiLock size={20} className="mr-2" />
                        <p>{decryptionError}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                            <FiUnlock size={18} className="mr-2" />
                            Decrypted Submission Data
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            {Object.entries(decryptedData || {}).map(([key, value]) => {
                                const fieldLabel = formFields.find(field => field.id === key)?.label || key;
                                return (
                                    <div key={key} className="mb-2">
                                        <p className="text-sm font-medium text-gray-600">{fieldLabel}:</p>
                                        <p className="text-sm text-gray-900 break-words">{value}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionDetailModal;