import React, { useState } from 'react';
import { FiX, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import lock from '../../assets/lock.png'

const UpdatePasswordModal = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for API call
        console.log('Update password:', { oldPassword, newPassword, confirmPassword });
        toast.success('Password updated successfully!');
        onClose();
    };

    const getPasswordStrength = (password) => {
        if (!password) return '';
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);
        const isLongEnough = password.length >= 8;
        if (isLongEnough && hasNumber && hasSpecial) return 'Strong';
        if (isLongEnough) return 'Good';
        return 'Weak';
    };

    const passwordStrength = getPasswordStrength(newPassword);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <FiX size={24} />
                </button>
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Update Password</h2>
                    <img src={lock} alt="Lock Icon" className="mb-4"  height="80px" width="80px" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Old Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Old Password</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <span onClick={() => setShowOldPassword(!showOldPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400">
                                {showOldPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </span>
                        </div>
                    </div>
                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder='Password (Min. of 8 characters)'
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <span onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400">
                                {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </span>
                        </div>
                    </div>
                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Password (Min. of 8 characters)'
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md"
                                required
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400">
                                {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Password (Min. of 8 Characters)</p>
                        <div className="w-full h-1 mt-2 rounded-full" style={{ backgroundColor: passwordStrength === 'Weak' ? '#f87171' : passwordStrength === 'Good' ? '#facc15' : passwordStrength === 'Strong' ? '#4ade80' : '#e5e7eb' }}></div>
                        <p className={`mt-1 text-xs font-semibold ${passwordStrength === 'Weak' ? 'text-red-500' : passwordStrength === 'Good' ? 'text-yellow-500' : passwordStrength === 'Strong' ? 'text-green-500' : 'text-gray-500'}`}>{passwordStrength && `Password Strength: ${passwordStrength}`}</p>
                
                    </div>
                    {/* Buttons */}
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
                            Update Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePasswordModal;
