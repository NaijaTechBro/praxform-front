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









// import React, { useState } from 'react';
// import { FiX, FiMail, FiFile, FiTrash2, FiSend } from 'react-icons/fi';
// import * as XLSX from 'xlsx';
// import { Switch } from '@headlessui/react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { toast } from 'react-toastify';

// const SendFormModal = ({ show, onClose, onSend, formName, isSending }) => {
//     const [recipients, setRecipients] = useState([]);
//     const [manualEmail, setManualEmail] = useState('');
//     const [file, setFile] = useState(null);
//     const [oneTimeUse, setOneTimeUse] = useState(false);
//     const [smsCode, setSmsCode] = useState(false);
//     const [emailAuth, setEmailAuth] = useState(false);
//     const [dueDate, setDueDate] = useState(null);

//     const handleAddEmail = () => {
//         if (manualEmail.trim() && recipients.every(r => r.email !== manualEmail.trim())) {
//             setRecipients(prev => [...prev, { email: manualEmail.trim(), name: '' }]);
//             setManualEmail('');
//         }
//     };

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 try {
//                     const data = new Uint8Array(event.target.result);
//                     const workbook = XLSX.read(data, { type: 'array' });
//                     const sheetName = workbook.SheetNames[0];
//                     const worksheet = workbook.Sheets[sheetName];
//                     const json = XLSX.utils.sheet_to_json(worksheet, { header: ["email", "name"] });

//                     const importedRecipients = json.map(row => ({
//                         email: row.email?.toLowerCase().trim(),
//                         name: row.name || ''
//                     })).filter(r => r.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)); // Filter for valid emails

//                     if (importedRecipients.length === 0) {
//                         toast.error("No valid emails found in the file. Please ensure the first column is 'email' and the second is 'name'.");
//                         setFile(null);
//                         return;
//                     }

//                     setRecipients(prev => {
//                         const currentEmails = new Set(prev.map(r => r.email));
//                         const newRecipients = importedRecipients.filter(r => !currentEmails.has(r.email));
//                         return [...prev, ...newRecipients];
//                     });
//                     toast.success(`${importedRecipients.length} recipients imported successfully!`);
//                 } catch (error) {
//                     toast.error("Failed to read the file. Please check the format.");
//                     console.error("File read error:", error);
//                     setFile(null);
//                 }
//             };
//             reader.readAsArrayBuffer(selectedFile);
//         }
//     };

//     const handleRemoveRecipient = (index) => {
//         setRecipients(prev => prev.filter((_, i) => i !== index));
//     };

//     const handleSubmit = () => {
//         if (recipients.length === 0) {
//             toast.error('Please add at least one recipient.');
//             return;
//         }

//         const options = {
//             oneTimeUse,
//             smsCode,
//             emailAuth,
//             dueDate
//         };
//         onSend(recipients, options);
//     };

//     if (!show) {
//         return null;
//     }

//     return (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center p-4">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
//                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
//                     <FiX size={24} />
//                 </button>
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl font-semibold text-gray-800">Share Form</h2>
//                     <button className="text-sm font-medium text-blue-500 hover:text-blue-700">
//                         Get Secure Link
//                     </button>
//                 </div>

//                 {/* Recipient's Email Input */}
//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Recipient's Email</label>
//                     <div className="relative">
//                         <input
//                             type="email"
//                             value={manualEmail}
//                             onChange={(e) => setManualEmail(e.target.value)}
//                             onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                     e.preventDefault();
//                                     handleAddEmail();
//                                 }
//                             }}
//                             className="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors"
//                             placeholder="dom@gmail.com"
//                         />
//                         <button
//                             onClick={handleAddEmail}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
//                         >
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.75 12.75H16.5C16.9142 12.75 17.25 12.4142 17.25 12C17.25 11.5858 16.9142 11.25 16.5 11.25H12.75V7.5C12.75 7.08579 12.4142 6.75 12 6.75C11.5858 6.75 11.25 7.08579 11.25 7.5V11.25H7.5C7.08579 11.25 6.75 11.5858 6.75 12C6.75 12.4142 7.08579 12.75 7.5 12.75H11.25V16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5V12.75Z"></path></svg>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Recipient List - Tag UI */}
//                 {recipients.length > 0 && (
//                     <div className="mb-4 flex flex-wrap gap-2">
//                         {recipients.map((r, index) => (
//                             <div key={index} className="flex items-center bg-gray-100 rounded-full pr-3 py-1 pl-1">
//                                 <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-1 text-xs">
//                                     <FiMail size={14} />
//                                 </div>
//                                 <span className="text-sm font-medium text-gray-800">{r.email}</span>
//                                 <button
//                                     onClick={() => handleRemoveRecipient(index)}
//                                     className="ml-2 text-gray-400 hover:text-gray-600"
//                                 >
//                                     <FiX size={16} />
//                                 </button>
//                             </div>
//                         ))}
//                     </div>
//                 )}

//                 {/* File Upload Section */}
//                 <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Upload Recipient List (CSV/XLSX)</label>
//                     <label className="flex items-center justify-center space-x-2 cursor-pointer bg-gray-100 p-3 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors">
//                         <FiFile size={20} className="text-gray-400" />
//                         <span className="text-sm text-gray-600 font-medium">
//                             {file ? file.name : 'Click to browse or drag & drop a file'}
//                         </span>
//                         <input
//                             type="file"
//                             accept=".csv, .xlsx, .xls"
//                             className="hidden"
//                             onChange={handleFileChange}
//                         />
//                     </label>
//                 </div>
                
//                 {/* One Time Use, SMS, and Email Auth Switches */}
//                 <div className="mb-6 space-y-4">
//                     <div className="flex justify-between items-center">
//                         <label className="text-gray-700 font-medium">One Time Use</label>
//                         <Switch
//                             checked={oneTimeUse}
//                             onChange={setOneTimeUse}
//                             className={`${oneTimeUse ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//                         >
//                             <span className={`${oneTimeUse ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
//                         </Switch>
//                     </div>
//                     <div className="flex justify-between items-center">
//                         <label className="text-gray-700 font-medium">SMS Code</label>
//                         <Switch
//                             checked={smsCode}
//                             onChange={setSmsCode}
//                             className={`${smsCode ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//                         >
//                             <span className={`${smsCode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
//                         </Switch>
//                     </div>
//                     <div className="flex justify-between items-center">
//                         <label className="text-gray-700 font-medium">Email Authentication</label>
//                         <Switch
//                             checked={emailAuth}
//                             onChange={setEmailAuth}
//                             className={`${emailAuth ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
//                         >
//                             <span className={`${emailAuth ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`} />
//                         </Switch>
//                     </div>
//                 </div>

//                 {/* Due Date Picker */}
//                 <div className="mb-6">
//                     <label className="text-gray-700 font-medium">Due Date</label>
//                     <DatePicker
//                         selected={dueDate}
//                         onChange={(date) => setDueDate(date)}
//                         className="w-full mt-2 pl-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 transition-colors"
//                         placeholderText="Choose Date"
//                     />
//                 </div>

//                 <div className="mt-8 flex justify-end space-x-3">
//                     <button
//                         onClick={onClose}
//                         className="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
//                         disabled={isSending}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         onClick={handleSubmit}
//                         className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center justify-center"
//                         disabled={recipients.length === 0 || isSending}
//                     >
//                         {isSending ? (
//                             <>
//                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                 </svg>
//                                 Sending...
//                             </>
//                         ) : (
//                             <>
//                                 <FiSend className="inline mr-2" />
//                                 Send Form
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SendFormModal;