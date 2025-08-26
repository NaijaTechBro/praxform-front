import React, { createContext, useState, useEffect, useContext } from 'react';

import axios from 'axios';
// Create the Auth Context
const AuthContext = createContext();

// Create a custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('userToken'));
    const [loading, setLoading] = useState(true); // Start loading, as we might fetch user data
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState('signIn');

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // Fetch user data on component mount if a token exists
    useEffect(() => {
        const initializeAuth = async () => {
            if (token) {
                await fetchMe(token);
            } else {
                setLoading(false); // No token, so not loading user data
            }
        };
        initializeAuth();
    }, []); // Empty dependency array means this runs once on mount

    // Function to fetch current user details
    const fetchMe = async (authToken) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const data = response.data;

            // Ensure currentOrganization is set from the backend response
            setUser({
                _id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                currentOrganization: data.currentOrganization,
            });
            setToken(authToken); // Keep the token if fetchMe was successful
        } catch (err) {
            console.error('Fetch me error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            setUser(null);
            setToken(null);
            localStorage.removeItem('userToken');
        } finally {
            setLoading(false);
        }
    };


    // Register User
    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                return { success: true, message: response.data.message };
            } else {
                setError(response.data.message || 'Registration failed.');
                return { success: false, message: response.data.message || 'Registration failed.' };
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Login User
    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = response.data;
                setUser({
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    currentOrganization: data.currentOrganization,
                });
                setToken(data.token);
                localStorage.setItem('userToken', data.token);
                return { success: true };
            } else {
                setError(response.data.message || 'Login failed. Invalid credentials.');
                return { success: false, message: response.data.message || 'Login failed.' };
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Logout User
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('userToken');
        window.location.href = '/signin'; // Redirect to the sign-in page after logout
    };

    // Resend Verification Email
    const resendVerification = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/resend-verification`, { email }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            } else {
                setError(response.data.message || 'Failed to resend verification email.');
                return { success: false, message: response.data.message || 'Failed to resend verification email.' };
            }
        } catch (err) {
            console.error('Resend verification error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Verify Email
    const verifyEmail = async (tokenParam) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/verifyemail/${tokenParam}`);
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            } else {
                setError(response.data.message || 'Email verification failed.');
                return { success: false, message: response.data.message || 'Email verification failed.' };
            }
        } catch (err) {
            console.error('Verify email error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Forgot Password
    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            } else {
                setError(response.data.message || 'Failed to send password reset email.');
                return { success: false, message: response.data.message || 'Failed to send password reset email.' };
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Reset Password
    const resetPassword = async (token, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${API_BASE_URL}/auth/reset-password/${token}`, { password: newPassword }, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            } else {
                setError(response.data.message || 'Failed to reset password.');
                return { success: false, message: response.data.message || 'Failed to reset password.' };
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Change Password (for logged-in users)
    const changePassword = async (oldPassword, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            if (!token) {
                setError('Authentication token is missing. Please log in again.');
                return { success: false, message: 'Authentication token is missing.' };
            }

            const response = await axios.put(`${API_BASE_URL}/auth/change-password`, { oldPassword, newPassword }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                return { success: true, message: response.data.message };
            } else {
                setError(response.data.message || 'Failed to change password.');
                return { success: false, message: response.data.message || 'Failed to change password.' };
            }
        } catch (err) {
            console.error('Change password error:', err);
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Function to clear errors
    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        token,
        loading,
        error,
        currentPage,
        setCurrentPage,
        register,
        login,
        logout,
        resendVerification,
        verifyEmail,
        forgotPassword,
        resetPassword,
        changePassword,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
