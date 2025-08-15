// import React, { createContext, useState, useEffect, useContext } from 'react';
// import api from '../services/api';

// // Create the Auth Context
// const AuthContext = createContext();

// // Create a custom hook to use the Auth Context
// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(localStorage.getItem('userToken') || null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState('signIn');

//     // Base URL for your API
//     const API_BASE_URL = '/api/v1/auth';

//     // Initialize user and token from localStorage on mount
//     useEffect(() => {
//         const storedToken = localStorage.getItem('userToken');
//         if (storedToken) {
//             setToken(storedToken);
//             fetchMe(storedToken);
//         }
//         setLoading(false);
//     }, []);

//     // Function to fetch current user details (e.g., after login or on app load)
//     const fetchMe = async (authToken) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`${API_BASE_URL}/me`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}`,
//                 },
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setUser(data);
//             } else {
//                 setError(data.message || 'Failed to fetch user data.');
//                 setUser(null);
//                 setToken(null);
//                 localStorage.removeItem('userToken');
//             }
//         } catch (err) {
//             console.error('Fetch me error:', err);
//             setError('Network error or server unavailable.');
//             setUser(null);
//             setToken(null);
//             localStorage.removeItem('userToken');
//         } finally {
//             setLoading(false);
//         }
//     };


//     // Register User
//     const register = async (userData) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`${API_BASE_URL}/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 // Backend does not return a token on registration, only a success message.
//                 // The user must verify their email before they can log in.
//                 // The UI should handle this by showing a message to check email.
//                 return { success: true, message: data.message };
//             } else {
//                 setError(data.message || 'Registration failed.');
//                 return { success: false, message: data.message || 'Registration failed.' };
//             }
//         } catch (err) {
//             console.error('Registration error:', err);
//             setError('Network error or server unavailable.');
//             return { success: false, message: 'Network error or server unavailable.' };
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Login User
//     const login = async (credentials) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`${API_BASE_URL}/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(credentials),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 // Backend returns user data and a token on successful login
//                 setUser({
//                     _id: data._id,
//                     firstName: data.firstName,
//                     lastName: data.lastName,
//                     email: data.email,
//                 });
//                 setToken(data.token);
//                 localStorage.setItem('userToken', data.token);
//                 return { success: true };
//             } else {
//                 setError(data.message || 'Login failed. Invalid credentials.');
//                 return { success: false, message: data.message || 'Login failed.' };
//             }
//         } catch (err) {
//             console.error('Login error:', err);
//             setError('Network error or server unavailable.');
//             return { success: false, message: 'Network error or server unavailable.' };
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Logout User
//     const logout = () => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem('userToken');
//         setCurrentPage('signIn');
//     };

//     // Resend Verification Email
//     const resendVerification = async (email) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`${API_BASE_URL}/resendverification`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 return { success: true, message: data.message };
//             } else {
//                 setError(data.message || 'Failed to resend verification email.');
//                 return { success: false, message: data.message || 'Failed to resend verification email.' };
//             }
//         } catch (err) {
//             console.error('Resend verification error:', err);
//             setError('Network error or server unavailable.');
//             return { success: false, message: 'Network error or server unavailable.' };
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Verify Email
//     const verifyEmail = async (tokenParam) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`${API_BASE_URL}/verifyemail/${tokenParam}`, {
//                 method: 'GET',
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 return { success: true, message: data.message };
//             } else {
//                 setError(data.message || 'Email verification failed.');
//                 return { success: false, message: data.message || 'Email verification failed.' };
//             }
//         } catch (err) {
//             console.error('Verify email error:', err);
//             setError('Network error or server unavailable.');
//             return { success: false, message: 'Network error or server unavailable.' };
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Forgot Password
//     const forgotPassword = async (email) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`${API_BASE_URL}/forgotpassword`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 return { success: true, message: data.message };
//             } else {
//                 setError(data.message || 'Failed to send password reset email.');
//                 return { success: false, message: data.message || 'Failed to send password reset email.' };
//             }
//         } catch (err) {
//             console.error('Forgot password error:', err);
//             setError('Network error or server unavailable.');
//             return { success: false, message: 'Network error or server unavailable.' };
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Reset Password
//     const resetPassword = async (tokenParam, newPassword) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await fetch(`${API_BASE_URL}/resetpassword/${tokenParam}`, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ password: newPassword }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 return { success: true, message: data.message };
//             } else {
//                 setError(data.message || 'Failed to reset password.');
//                 return { success: false, message: data.message || 'Failed to reset password.' };
//             }
//         } catch (err) {
//             console.error('Reset password error:', err);
//             setError('Network error or server unavailable.');
//             return { success: false, message: 'Network error or server unavailable.' };
//         } finally {
//             setLoading(false);
//         }
//     };

//     const value = {
//         user,
//         token,
//         loading,
//         error,
//         currentPage,
//         setCurrentPage,
//         register,
//         login,
//         logout,
//         resendVerification,
//         verifyEmail,
//         forgotPassword,
//         resetPassword,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


// src/context/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
// import api from '../services/api'; // This 'api' (axios instance) is currently not used in fetch calls

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

    // **CHANGED**: Base URL for your API should be the full path to your backend's auth routes
    // Ensure this matches the base URL of your deployed backend + the auth prefix from your router
    const API_BASE_URL = 'https://praxform-server.onrender.com/api/v1/auth'; 

    // Initialize user and token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) {
            setToken(storedToken);
            fetchMe(storedToken);
        }
        setLoading(false);
    }, []);

    // Function to fetch current user details (e.g., after login or on app load)
    const fetchMe = async (authToken) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/me`, {
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
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // **IMPROVEMENT**: Handle non-OK responses gracefully before parsing JSON
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
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            // **IMPROVEMENT**: Handle non-OK responses gracefully before parsing JSON
            if (response.ok) {
                const data = await response.json();
                // Backend returns user data and a token on successful login
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
                // Attempt to parse error message if available, otherwise use a generic message
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
            const response = await fetch(`${API_BASE_URL}/resendverification`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            // **IMPROVEMENT**: Handle non-OK responses gracefully before parsing JSON
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
            const response = await fetch(`${API_BASE_URL}/verifyemail/${tokenParam}`, {
                method: 'GET',
            });
            // **IMPROVEMENT**: Handle non-OK responses gracefully before parsing JSON
            if (response.ok) {
                const data = await response.json();
                return { success: true, message: data.message };
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
            const response = await fetch(`${API_BASE_URL}/forgotpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            // **IMPROVEMENT**: Handle non-OK responses gracefully before parsing JSON
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
            const response = await fetch(`${API_BASE_URL}/resetpassword/${tokenParam}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: newPassword }),
            });
            // **IMPROVEMENT**: Handle non-OK responses gracefully before parsing JSON
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
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};