import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiLink, FiGlobe, FiAlertCircle, FiX } from 'react-icons/fi';
import { useWebhooks } from '../../context/WebhookContext';
import { toast } from 'react-toastify';

const WebhooksPage = () => {
    const { getWebhooks, createWebhook, updateWebhook, deleteWebhook, loading, error } = useWebhooks();
    const [webhooks, setWebhooks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWebhook, setCurrentWebhook] = useState(null);
    const [webhookName, setWebhookName] = useState('');
    const [webhookEndpoint, setWebhookEndpoint] = useState('');
    const [webhookEvents, setWebhookEvents] = useState(['submission.created']);
    const [showSecret, setShowSecret] = useState(false);

    useEffect(() => {
        fetchWebhooks();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const fetchWebhooks = async () => {
        try {
            const data = await getWebhooks();
            setWebhooks(data);
        } catch (err) {
            // Error is handled by context and toast
        }
    };

    const handleOpenModal = (webhook = null) => {
        setCurrentWebhook(webhook);
        if (webhook) {
            setWebhookName(webhook.name);
            setWebhookEndpoint(webhook.endpoint);
            setWebhookEvents(webhook.events);
        } else {
            setWebhookName('');
            setWebhookEndpoint('');
            setWebhookEvents(['submission.created']);
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentWebhook) {
                await updateWebhook(currentWebhook._id, { name: webhookName, endpoint: webhookEndpoint, events: webhookEvents });
                toast.success('Webhook updated successfully!');
            } else {
                await createWebhook({ name: webhookName, endpoint: webhookEndpoint, events: webhookEvents });
                toast.success('Webhook created successfully!');
            }
            setIsModalOpen(false);
            fetchWebhooks();
        } catch (err) {
            // Error is handled by context and toast
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this webhook?')) {
            try {
                await deleteWebhook(id);
                toast.success('Webhook deleted successfully!');
                fetchWebhooks();
            } catch (err) {
                // Error is handled by context and toast
            }
        }
    };

    return (
        <div className="p-8 font-sans">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Webhooks</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FiPlus className="mr-2" /> New Webhook
                </button>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : webhooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {webhooks.map(webhook => (
                        <div key={webhook._id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-semibold text-gray-800">{webhook.name}</h3>
                                <div className="flex space-x-2">
                                    <button onClick={() => handleOpenModal(webhook)} className="text-blue-500 hover:text-blue-700">
                                        <FiEdit2 />
                                    </button>
                                    <button onClick={() => handleDelete(webhook._id)} className="text-red-500 hover:text-red-700">
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-4 truncate">
                                <FiLink className="inline mr-1" />{webhook.endpoint}
                            </p>
                            <div className="flex items-center text-xs text-gray-600 space-x-2 mb-4">
                                <span className={`px-2 py-1 rounded-full ${webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {webhook.status}
                                </span>
                                <span>Events: {webhook.events.join(', ')}</span>
                            </div>
                            {webhook.secret && (
                                <div className="text-sm bg-gray-100 p-3 rounded-md break-words">
                                    <strong>Secret:</strong> <span className={`${showSecret ? 'text-gray-800' : 'blur-sm'}`}>{webhook.secret}</span>
                                    <button
                                        onClick={() => setShowSecret(!showSecret)}
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                        {showSecret ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                    <p className="text-lg text-gray-500 mb-4">No webhooks found.</p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="flex items-center justify-center mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FiPlus className="mr-2" /> Create Your First Webhook
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <FiX size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {currentWebhook ? 'Edit Webhook' : 'Create Webhook'}
                        </h2>
                        <form onSubmit={handleSave}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={webhookName}
                                    onChange={(e) => setWebhookName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1">Endpoint URL</label>
                                <input
                                    type="url"
                                    value={webhookEndpoint}
                                    onChange={(e) => setWebhookEndpoint(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1 flex items-center">
                                    <FiAlertCircle className="mr-1" /> This is where your submission data will be sent.
                                </p>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-1">Events</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="checkbox"
                                        checked={webhookEvents.includes('submission.created')}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setWebhookEvents([...webhookEvents, 'submission.created']);
                                            } else {
                                                setWebhookEvents(webhookEvents.filter(event => event !== 'submission.created'));
                                            }
                                        }}
                                    />
                                    <span className="text-sm">submission.created</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {currentWebhook ? 'Update Webhook' : 'Create Webhook'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WebhooksPage;