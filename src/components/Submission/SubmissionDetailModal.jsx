import React, { useState, useEffect } from 'react';
import { FiX, FiLock, FiUnlock } from 'react-icons/fi';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'a-super-secret-key-for-encryption-and-decryption';

const SubmissionDetailModal = ({ submission, formFields, onClose }) => {
    const [decryptedData, setDecryptedData] = useState(null);
    const [decryptionError, setDecryptionError] = useState(null);

    useEffect(() => {
        if (submission?.encryptedData) {
            try {
                // Ensure the data being decrypted is the string stored in the 'data' property
                const bytes = CryptoJS.AES.decrypt(submission.encryptedData.data, SECRET_KEY);
                const originalData = bytes.toString(CryptoJS.enc.Utf8);
                if (!originalData) {
                    throw new Error('Failed to decrypt data. Key may be incorrect.');
                }
                setDecryptedData(JSON.parse(originalData));
            } catch (err) {
                console.error('Decryption failed:', err);
                setDecryptionError('Failed to decrypt data. The encryption key may be invalid.');
            }
        } else {
            setDecryptedData({});
        }
    }, [submission]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Submission Details</h2>
                <p className="text-sm text-gray-500 mb-6">Submitted on: {new Date(submission.createdAt).toLocaleString()}</p>

                {decryptionError ? (
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
                        {decryptedData ? (
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                                {Object.entries(decryptedData).map(([key, value]) => {
                                    const fieldLabel = formFields.find(field => field.id === key)?.label || key;
                                    return (
                                        <div key={key} className="mb-2">
                                            <p className="text-sm font-medium text-gray-600">{fieldLabel}:</p>
                                            <p className="text-sm text-gray-900 break-words">{value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Decrypting submission data...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionDetailModal;