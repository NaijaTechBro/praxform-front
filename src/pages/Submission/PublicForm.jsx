// NOTE: In a production app, this key should be securely managed and
// retrieved, likely from an API endpoint, not hardcoded.


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// The key used for encryption
const SECRET_KEY = 'a-super-secret-key-for-encryption-and-decryption';

const PublicForm = () => {
    const { formId, accessCode } = useParams();
    const [form, setForm] = useState(null);
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchForm = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/submissions/${formId}/${accessCode}`);
                setForm(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load form. Invalid URL or expired link.');
            } finally {
                setLoading(false);
            }
        };

        if (formId && accessCode) {
            fetchForm();
        } else {
            setLoading(false);
            setError('Invalid form URL. Please check the link and try again.');
        }
    }, [formId, accessCode, API_BASE_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const requiredFields = form.fields.filter(field => field.isRequired);
        const missingFields = requiredFields.filter(field => !formData[field.id]);
        if (missingFields.length > 0) {
            toast.error('Please fill out all required fields.');
            setIsSubmitting(false);
            return;
        }

        try {
            const dataToEncrypt = JSON.stringify(formData);
            const encryptedString = CryptoJS.AES.encrypt(dataToEncrypt, SECRET_KEY).toString();

            const payload = {
                formId,
                accessCode,
                encryptedData: { data: encryptedString },
                data: {},
                files: []
            };

            await axios.post(`${API_BASE_URL}/submissions`, payload);
            setSubmissionSuccess(true);
            toast.success('Form submitted successfully! Thank you.');
        } catch (error) {
            console.error('Submission error:', error);
            setError(error.response?.data?.message || 'Submission failed. Please try again.');
            toast.error(error.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-500">Loading form...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
                    <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    if (submissionSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
                    <h2 className="text-xl font-bold text-green-500 mb-4">Success!</h2>
                    <p className="text-gray-600">Your form has been submitted successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-2">{form.name}</h1>
                <p className="text-gray-600 text-center mb-8">{form.description}</p>
                <form onSubmit={handleSubmit}>
                    {form.fields.map(field => (
                        <div key={field.id} className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">
                                {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                            </label>
                            <input
                                type={field.type}
                                name={field.id}
                                placeholder={field.placeholder}
                                value={formData[field.id] || ''}
                                onChange={handleChange}
                                required={field.isRequired}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Form'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PublicForm;