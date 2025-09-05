import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import UpdatePasswordModal from '../../components/Settings/UpdatePasswordModal';
import UpdateNumberModal from '../../components/Settings/UpdateNumberModal';
import GenerateNewKeyModal from '../../components/Settings/GenerateNewKeyModal';

// Reusable component for a single detail row
const DetailRow = ({ label, value, onUpdate, buttonText = "Update" }) => (
    <div className="flex justify-between items-center py-2">
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            {value.startsWith('http') ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium break-all">{value.replace(/(^\w+:|^)\/\//, '')}</a>
            ) : (
                <p className="text-gray-800 font-medium">{value}</p>
            )}
        </div>
        {onUpdate && (
            <button onClick={onUpdate} className="px-4 py-2 rounded-full border text-black font-medium">{buttonText}</button>
        )}
    </div>
);

const SettingsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showNumberModal, setShowNumberModal] = useState(false);
    const [showGenerateKeyModal, setShowGenerateKeyModal] = useState(false);
    const [showLiveSecret, setShowLiveSecret] = useState(false);
    const [showTestSecret, setShowTestSecret] = useState(false);

    const [apiKeys, setApiKeys] = useState({
        livePublic: 'Ap_live_9367d6f442d2b0b12d5b88c63d6',
        liveSecret: '**********',
        liveCallbackUrl: 'https://example.com',
        liveWebhookUrl: 'https://example.com',
        testPublic: 'Ap_test_9367d6f442d2b0b12d5b88c63d6',
        testSecret: '**********',
        testCallbackUrl: 'https://example.com',
        testWebhookUrl: 'https://example.com',
    });
    
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        {/* Personal Information Section */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                            <div className="space-y-4">
                                <DetailRow label="Full Name" value={`${user?.firstName || ''} ${user?.lastName || ''}`} />
                                <DetailRow label="Phone Number" value={user?.phoneNumber || '+2349014496808'} onUpdate={() => setShowNumberModal(true)} />
                                <DetailRow label="Email Address" value={user?.email || 'dominic@gmail.com'} />
                                <div className="flex justify-between items-center py-2">
                                    <div>
                                        <p className="text-sm text-gray-500">Technical Skill</p>
                                        <p className="text-gray-800 font-medium">I am a developer</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                     <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                  </label>
                                </div>
                            </div>
                        </div>
                        {/* Organization's Information Section */}
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Organization's Information</h3>
                            <div className="space-y-4">
                                <DetailRow label="Organization Name" value={user?.currentOrganization?.name || 'Framelo Stores'} buttonText="Change" />
                                <DetailRow label="Organization Phone Number" value={user?.organizationPhoneNumber || '+2349014496808'} buttonText="Change" />
                                <DetailRow label="Organization Email Address" value={user?.organizationEmail || 'framelo@gmail.com'} />
                                <DetailRow label="Organization Website" value={user?.organizationWebsite || 'www.framelolabs.com'} onUpdate={() => { /* Update Website */ }} />
                            </div>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">Password</p>
                                    <p className="text-sm text-gray-500">Update your existing password</p>
                                </div>
                                <button onClick={() => setShowPasswordModal(true)} className="px-4 py-2 rounded-full border text-black font-medium">Update</button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">Push Notifications</p>
                                    <p className="text-sm text-gray-500">Get alerted immediately we push updates.</p>
                                </div>
                                <div>
                                     <label htmlFor="pushNotifications" className="relative inline-flex items-center cursor-pointer">
                                     <input type="checkbox" name="pushNotifications" id="pushNotifications" value="" className="sr-only peer" defaultChecked />
                                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                  </label>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">Two-factor Auth</p>
                                    <p className="text-sm text-gray-500">Get alerted immediately we push updates.</p>
                                </div>
                                 <div>
                                    <label htmlFor="twoFactorAuth" className="relative inline-flex items-center cursor-pointer">
                                     <input type="checkbox" name="twoFactorAuth" id="twoFactorAuth" value="" className="sr-only peer" defaultChecked />
                                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                  </label>
                                 </div>
                            </div>
                        </div>
                    </div>
                );
            case 'apiKeys':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">API Configuration - Live Mode</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Live Public Key</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-800 font-medium truncate">{apiKeys.livePublic}</p>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-500">Live Secret Key</p>
                                <div className="flex items-center space-x-2">
                                    <p className="text-gray-800 font-medium">{showLiveSecret ? apiKeys.liveSecret : '**********'}</p>
                                    <button onClick={() => setShowLiveSecret(!showLiveSecret)} className="text-gray-400 hover:text-gray-600">
                                        {showLiveSecret ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setShowGenerateKeyModal(true)} className="text-blue-600 font-medium">
                                Generate New Key
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased text-gray-900">
        <main className="p-6 md:p-10">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
                <p className="text-gray-500 text-sm mb-6">Overview of sent/received forms, status tracking, analytics</p>

                <div className="mb-6 flex space-x-2">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Security
                    </button>
                    <button
                        onClick={() => setActiveTab('apiKeys')}
                        className={`px-4 py-2 rounded-full font-medium transition-colors ${activeTab === 'apiKeys' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        API Keys & Webhooks
                    </button>
                </div>
            {renderContent()}

            {showPasswordModal && <UpdatePasswordModal onClose={() => setShowPasswordModal(false)} />}
            {showNumberModal && <UpdateNumberModal onClose={() => setShowNumberModal(false)} />}
            {showGenerateKeyModal && <GenerateNewKeyModal onClose={() => setShowGenerateKeyModal(false)} />}
            </div>
        </main>
    </div>
    );
};

export default SettingsPage;