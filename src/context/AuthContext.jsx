import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState('signIn');

    const axiosInterceptor = useRef(null);
    const isRefreshing = useRef(false);
    const subscribers = useRef([]);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // Helper function to process queued requests after token refresh
    const subscribeTokenRefresh = (cb) => {
        subscribers.current.push(cb);
    };

    const onRefreshed = (newToken) => {
        subscribers.current.forEach(cb => cb(newToken));
        subscribers.current = [];
    };

    const logout = (redirect = true) => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('userToken');
        if (redirect) {
            window.location.href = '/signin';
        }
    };

    useEffect(() => {
        // Remove old interceptor to avoid multiple instances
        if (axiosInterceptor.current) {
            axios.interceptors.request.eject(axiosInterceptor.current);
        }

        axiosInterceptor.current = axios.interceptors.request.use(
            (config) => {
                if (token && config.headers['Authorization'] !== `Bearer ${token}`) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (err) => Promise.reject(err)
        );

        axios.interceptors.response.use(
            (response) => response,
            async (err) => {
                const originalRequest = err.config;

                // If error is 401 and not a refresh token request
                if (err.response?.status === 401 && originalRequest.url !== `${API_BASE_URL}/auth/refresh-token`) {
                    if (!isRefreshing.current) {
                        isRefreshing.current = true;
                        try {
                            const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`);
                            const newAccessToken = response.data.accessToken;
                            localStorage.setItem('userToken', newAccessToken);
                            setToken(newAccessToken);
                            onRefreshed(newAccessToken);
                        } catch (refreshErr) {
                            toast.error('Session expired. Please log in again.');
                            logout();
                            return Promise.reject(refreshErr);
                        } finally {
                            isRefreshing.current = false;
                        }
                    }

                    // Queue the original request
                    return new Promise(resolve => {
                        subscribeTokenRefresh(newToken => {
                            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                            resolve(axios(originalRequest));
                        });
                    });
                }
                
                return Promise.reject(err);
            }
        );
        
        // Cleanup function for when the component unmounts
        return () => {
            axios.interceptors.response.eject(axiosInterceptor.current);
            axios.interceptors.request.eject(axiosInterceptor.current);
        };
    }, [token, API_BASE_URL]);


    useEffect(() => {
        const fetchMe = async () => {
            if (token) {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`${API_BASE_URL}/auth/me`);
                    const data = response.data;
                    setUser({
                        _id: data._id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        currentOrganization: data.currentOrganization,
                    });
                } catch (err) {
                    setError(err.response?.data?.message || 'Failed to fetch user data. Please log in again.');
                    logout();
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                setUser(null);
            }
        };
        fetchMe();
    }, [token, API_BASE_URL]);

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
            if (response.status === 201) {
                return { success: true, message: response.data.message };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Registration failed.' };
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
            const data = response.data;

            // MFA is now mandatory, so we always expect mfaRequired
            if (data.mfaRequired) {
                return { success: true, mfaRequired: true, message: data.message };
            }
            
            // This part is a fallback, but the backend should always require MFA now
            if (response.status === 200 && data.accessToken) {
                const authToken = data.accessToken;
                localStorage.setItem('userToken', authToken);
                setToken(authToken);
                return { success: true };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Login failed.' };
        } finally {
            setLoading(false);
        }
    };

    const verifyMfa = async (email, code) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/verify-mfa`, { email, code });
            if (response.status === 200) {
                const data = response.data;
                const authToken = data.accessToken;
                localStorage.setItem('userToken', authToken);
                setToken(authToken);
                return { success: true };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'MFA verification failed.' };
        } finally {
            setLoading(false);
        }
    };

    const googleAuth = async (googleCode) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/google`, { code: googleCode });
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                const authToken = data.accessToken;
                localStorage.setItem('userToken', authToken);
                setToken(authToken);
                return { success: true };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Google authentication failed.');
            return { success: false, message: err.response?.data?.message || 'Google authentication failed.' };
        } finally {
            setLoading(false);
        }
    };

    const resendVerification = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/resend-verification`, { email });
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Failed to resend verification email.' };
        } finally {
            setLoading(false);
        }
    };

    const verifyEmail = async (tokenParam) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/verifyemail/${tokenParam}`);
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Email verification failed.' };
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Failed to send password reset email.' };
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (token, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${API_BASE_URL}/auth/reset-password/${token}`, { password: newPassword });
            if (response.status === 200) {
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('userToken', newAccessToken);
                setToken(newAccessToken);
                return { success: true, message: response.data.message };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Failed to reset password.' };
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (oldPassword, newPassword) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.put(`${API_BASE_URL}/auth/change-password`, { oldPassword, newPassword });
            if (response.status === 200) {
                return { success: true, message: response.data.message };
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Network error or server unavailable.');
            return { success: false, message: err.response?.data?.message || 'Failed to change password.' };
        } finally {
            setLoading(false);
        }
    };

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
        verifyMfa,
        googleAuth,
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
