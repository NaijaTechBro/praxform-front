import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Create a custom hook to use the Auth Context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('userToken') || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState('signIn');

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // Initialize user and token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            setToken(storedToken);
            fetchMe(storedToken);
        }
        setLoading(false);
    }, []);

    // Function to fetch current user details
    const fetchMe = async (authToken) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data);
            } else {
                setError(data.message || 'Failed to fetch user data.');
                setUser(null);
                setToken(null);
                localStorage.removeItem('userToken');
            }
        } catch (err) {
            console.error('Fetch me error:', err);
            setError('Network error or server unavailable.');
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
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message };
            } else {
                // Attempt to parse error message if available, otherwise use a generic message
                const errorData = await response.json().catch(() => ({ message: 'Server error or invalid response.' }));
                setError(errorData.message || 'Registration failed.');
                return { success: false, message: errorData.message || 'Registration failed.' };
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError('Network error or server unavailable.');
            return { success: false, message: 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Login User
    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (response.ok) {
                const data = await response.json();
                // returns user data and a token on successful login
                setUser({
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                });
                setToken(data.token);
                localStorage.setItem('userToken', data.token);
                return { success: true };
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Server error or invalid response.' }));
                setError(errorData.message || 'Login failed. Invalid credentials.');
                return { success: false, message: errorData.message || 'Login failed.' };
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Network error or server unavailable.');
            return { success: false, message: 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Logout User
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('userToken');
        setCurrentPage('signIn');
    };

    // Resend Verification Email
    const resendVerification = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/resendverification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message };
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Server error or invalid response.' }));
                setError(errorData.message || 'Failed to resend verification email.');
                return { success: false, message: errorData.message || 'Failed to resend verification email.' };
            }
        } catch (err) {
            console.error('Resend verification error:', err);
            setError('Network error or server unavailable.');
            return { success: false, message: 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Verify Email
    const verifyEmail = async (tokenParam) => {
        setLoading(true);
        setError(null);
        try {
            // Backend expects the 6-digit code as a URL parameter named 'code'
            const response = await fetch(`${API_BASE_URL}/auth/verifyemail/${tokenParam}`, {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message }; // Returns the success message
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Server error or invalid response.' }));
                setError(errorData.message || 'Email verification failed.');
                return { success: false, message: errorData.message || 'Email verification failed.' };
            }
        } catch (err) {
            console.error('Verify email error:', err);
            setError('Network error or server unavailable.');
            return { success: false, message: 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Forgot Password
    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            // Backend expects the email in the request body
            const response = await fetch(`${API_BASE_URL}/auth/forgotpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message };
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Server error or invalid response.' }));
                setError(errorData.message || 'Failed to send password reset email.');
                return { success: false, message: errorData.message || 'Failed to send password reset email.' };
            }
        } catch (err) {
            console.error('Forgot password error:', err);
            setError('Network error or server unavailable.');
            return { success: false, message: 'Network error or server unavailable.' };
        } finally {
            setLoading(false);
        }
    };

    // Reset Password
    const resetPassword = async (tokenParam, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            // Backend expects the reset token as a URL parameter and new password in body
            const response = await fetch(`${API_BASE_URL}/auth/resetpassword/${tokenParam}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword }),
            });
            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message };
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Server error or invalid response.' }));
                setError(errorData.message || 'Failed to reset password.');
                return { success: false, message: errorData.message || 'Failed to reset password.' };
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setError('Network error or server unavailable.');
            return { success: false, message: 'Network error or server unavailable.' };
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

            const response = await fetch(`${API_BASE_URL}/auth/changepassword`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Use the stored token
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, message: data.message };
            } else {
                setError(data.message || 'Failed to change password.');
                return { success: false, message: data.message || 'Failed to change password.' };
            }
        } catch (err) {
            console.error('Change password error:', err);
            setError('Network error or server unavailable.');
            return { success: false, message: 'Network error or server unavailable.' };
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