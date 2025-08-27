import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js'; // You'll need to install this package

const FormFillComponent = ({ formId, formFields, accessCode }) => {
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    
    // Encryption key (must be securely managed, e.g., from an environment variable or server)
    const ENCRYPTION_KEY = 'your-secret-key'; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        // Step 1: Encrypt the sensitive form data
        const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(formData), 
            ENCRYPTION_KEY
        ).toString();

        // Step 2: Prepare the payload for the server
        const payload = {
            formId,
            accessCode,
            data: {}, // An empty or minimal 'data' field
            encryptedData, // Send the encrypted data to the server
            files: [] // Assuming file handling is separate
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/submissions`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setMessage('Submission successful! 🎉');
            // Clear form or redirect
        } catch (error) {
            console.error('Submission error:', error);
            setMessage(error.response?.data?.message || 'Submission failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-bold mb-4">Fill out this form</h3>
            {/* Render form fields dynamically */}
            {formFields.map(field => (
                <div key={field.name} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        required
                    />
                </div>
            ))}
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
            {message && <p className="mt-4 text-center">{message}</p>}
        </form>
    );
};

export default FormFillComponent;