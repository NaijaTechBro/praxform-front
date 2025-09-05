import React, { useState } from 'react';
import { FiX, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import key from '../../assets/red-alert.png'
import { toast } from 'react-toastify';

const GenerateNewKeyModal = ({ onClose }) => {
    const [accountPassword, setAccountPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Generate new key with password:', accountPassword);
        toast.success('New API key generated!');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                </button>
                <div className="flex flex-col items-center mb-6">
                    <img src={key} alt="Warning Icon" className="mb-4" width="80px" />
                    <h2 className="text-xl font-bold text-gray-800">Generate New Keys</h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Expiry Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Expiry Time</label>
                        <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                            defaultValue="never"
                        >
                            <option value="1h">1 Hour</option>
                            <option value="1d">1 Day</option>
                            <option value="7d">7 Days</option>
                            <option value="30d">30 Days</option>
                            <option value="never">Never</option>
                        </select>
                    </div>
                    {/* Account Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Account Password</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={accountPassword}
                                onChange={(e) => setAccountPassword(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400">
                                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-start p-4 text-sm text-yellow-800 bg-yellow-50 rounded-lg">
                        <FiAlertCircle size={18} className="flex-shrink-0 mt-1 mr-2" />
                        <span>This action will expire your live and test secret keys. Update your with the new keys to continue API calls.</span>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-full bg-blue-600 text-white flex items-center hover:bg-blue-700"
                        >
                            Generate New Key
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenerateNewKeyModal;
