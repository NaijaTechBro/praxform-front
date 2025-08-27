import React, { useState } from 'react';
import { FiX, FiMail, FiFile, FiTrash2, FiSend } from 'react-icons/fi';
import * as XLSX from 'xlsx';

const SendFormModal = ({ show, onClose, onSend, formName, isSending }) => {
    const [recipients, setRecipients] = useState([]);
    const [manualEmail, setManualEmail] = useState('');
    const [file, setFile] = useState(null);
    const [customMessage, setCustomMessage] = useState('');

    const handleAddEmail = () => {
        if (manualEmail.trim() && recipients.every(r => r.email !== manualEmail.trim())) {
            setRecipients(prev => [...prev, { email: manualEmail.trim(), name: '' }]);
            setManualEmail('');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);

                const importedRecipients = json.map(row => ({
                    email: row.email,
                    name: row.name || ''
                })).filter(r => r.email); // Filter out rows without a valid email

                setRecipients(prev => {
                    // Prevent duplicate emails from file import
                    const currentEmails = new Set(prev.map(r => r.email));
                    const newRecipients = importedRecipients.filter(r => !currentEmails.has(r.email));
                    return [...prev, ...newRecipients];
                });
            };
            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const handleRemoveRecipient = (index) => {
        setRecipients(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (recipients.length > 0) {
            onSend(recipients, customMessage);
        } else {
            alert('Please add at least one recipient.');
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Send "{formName}"</h2>
                <p className="text-gray-500 mb-6">Select how you want to share your form.</p>

                {/* Custom Message Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Custom Message</label>
                    <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                        rows="3"
                        placeholder="e.g., Please fill out this important survey."
                    ></textarea>
                </div>

                {/* Recipients Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Recipients</label>
                    <div className="flex items-center space-x-2 mb-4">
                        <FiMail size={20} className="text-gray-400" />
                        <input
                            type="email"
                            value={manualEmail}
                            onChange={(e) => setManualEmail(e.target.value)}
                            className="flex-1 rounded-md border-gray-300 shadow-sm p-2"
                            placeholder="Enter email address"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddEmail();
                                }
                            }}
                        />
                        <button onClick={handleAddEmail} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Add
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FiFile size={20} className="text-gray-400" />
                        <label className="flex-1 cursor-pointer bg-gray-100 p-2 rounded-md border border-dashed border-gray-300 hover:bg-gray-200">
                            <span className="text-sm text-gray-600">{file ? file.name : 'Click to upload an Excel/CSV file'}</span>
                            <input
                                type="file"
                                accept=".csv, .xlsx, .xls"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Recipient List */}
                {recipients.length > 0 && (
                    <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">
                        <h4 className="text-sm font-semibold text-gray-600 mb-2">Recipient List:</h4>
                        <ul className="space-y-2">
                            {recipients.map((r, index) => (
                                <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                    <span className="text-sm text-gray-800">{r.email} {r.name && `(${r.name})`}</span>
                                    <button onClick={() => handleRemoveRecipient(index)} className="text-red-500 hover:text-red-700">
                                        <FiTrash2 size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                        disabled={isSending}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-md bg-[#1475F4] text-white hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={recipients.length === 0 || isSending}
                    >
                        {isSending ? 'Sending...' : (
                            <>
                                <FiSend className="inline mr-2" />
                                Send Form
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SendFormModal;