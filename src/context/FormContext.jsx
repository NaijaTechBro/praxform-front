import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; 

// Create the Form Context
const FormContext = createContext();

// Create a custom hook to use the Form Context
export const useForms = () => {
    return useContext(FormContext);
};

// Form Provider Component
export const FormProvider = ({ children }) => {
    const { token, user, loading: authLoading } = useAuth(); 
    const [forms, setForms] = useState([]);
    const [currentForm, setCurrentForm] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // Helper to clear errors
    const clearError = () => setError(null);
    // Helper to clear the current form selection
    const clearCurrentForm = () => setCurrentForm(null);

    // Function to make authenticated API requests
    const makeAuthenticatedRequest = async (method, url, data = null) => {
        if (!token) {
            setError('Authentication token is missing. Please log in.');
            throw new Error('Unauthorized');
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        try {
            setLoading(true);
            setError(null);
            let res;
            switch (method) {
                case 'get':
                    res = await axios.get(url, config);
                    break;
                case 'post':
                    res = await axios.post(url, data, config);
                    break;
                case 'put':
                    res = await axios.put(url, data, config);
                    break;
                case 'delete':
                    res = await axios.delete(url, config);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
            return res.data;
        } catch (err) {
            console.error('Form API error:', err);
            const errorMessage = err.response?.data?.message || 'Server error or network issue.';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Function to create a new form
    const createForm = async (formData) => {
        if (!user || !user.currentOrganization) {
            setError('User does not have a current organization selected.');
            throw new Error('No organization selected.');
        }
        const formPayload = {
            ...formData,
            organization: user.currentOrganization,
            createdBy: user._id,
            status: 'draft',
        };
        try {
            // Corrected API call: use API_BASE_URL directly for the forms endpoint
            const newForm = await makeAuthenticatedRequest('post', `${API_BASE_URL}/forms`, formPayload);
            setForms((prevForms) => [...prevForms, newForm]);
            setCurrentForm(newForm);
            return newForm;
        } catch (err) {
            throw err;
        }
    };

    // Function to get all forms
    const getForms = async () => {
        if (authLoading || !token) {
            return;
        }
        try {
            const fetchedForms = await makeAuthenticatedRequest('get', `${API_BASE_URL}/forms`);
            setForms(fetchedForms);
        } catch (err) {
            // Error is already set by makeAuthenticatedRequest
        }
    };

    // Function to get a single form by ID
    const getFormById = async (id) => {
        try {
            const fetchedForm = await makeAuthenticatedRequest('get', `${API_BASE_URL}/forms/${id}`);
            setCurrentForm(fetchedForm);
            return fetchedForm;
        } catch (err) {
            throw err;
        }
    };

    // Function to update a form
    const updateForm = async (id, formData) => {
        try {
            const updatedForm = await makeAuthenticatedRequest('put', `${API_BASE_URL}/forms/${id}`, formData);
            setForms((prevForms) =>
                prevForms.map((form) => (form._id === updatedForm._id ? updatedForm : form))
            );
            setCurrentForm(updatedForm);
            return updatedForm;
        } catch (err) {
            // Error is already set by makeAuthenticatedRequest
            throw err;
        }
    };

    // Function to delete a form
    const deleteForm = async (id) => {
        try {
            await makeAuthenticatedRequest('delete', `${API_BASE_URL}/forms/${id}`);
            setForms((prevForms) => prevForms.filter((form) => form._id !== id));
            if (currentForm && currentForm._id === id) {
                setCurrentForm(null);
            }
        } catch (err) {
            // Error is already set by makeAuthenticatedRequest
        }
    };

    // Function to send a form
    const sendForm = async (id, { recipients, message, expiresIn }) => {
        try {
            const payload = { recipients, message, expiresIn };
            await makeAuthenticatedRequest('post', `${API_BASE_URL}/forms/${id}/send`, payload);
            // Optionally, refresh forms or update the status of the sent form
            getForms(); // Re-fetch all forms to update status
            setCurrentForm(prev => prev ? { ...prev, status: 'active' } : null); // Optimistically update if current form is the one sent
            alert('Form sent successfully!');
        } catch (err) {
            alert('Failed to send form.');
            // Error is already set by makeAuthenticatedRequest
        }
    };

    const value = {
        forms,
        currentForm,
        loading,
        error,
        createForm,
        getForms,
        getFormById,
        updateForm,
        deleteForm,
        sendForm,
        clearError,
        clearCurrentForm,
    };

    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    );
};
