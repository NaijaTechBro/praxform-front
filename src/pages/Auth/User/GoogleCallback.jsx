import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const GoogleCallback = () => {
    const { googleAuth, loading } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Use a ref to prevent duplicate execution in React's Strict Mode
    const hasFired = useRef(false);

    useEffect(() => {
        if (hasFired.current) {
            return;
        }
        hasFired.current = true;
        
        const handleAuth = async () => {
            const searchParams = new URLSearchParams(location.search);
            const code = searchParams.get('code');

            if (code) {
                const result = await googleAuth(code);
                
                if (result && result.success) {
                    toast.success("Successfully authenticated with Google!");
                    navigate('/dashboard');
                } else {
                    toast.error(result?.message || "Google sign-in failed. Please try again.");
                    navigate('/signin');
                }
            } else {
                const error = searchParams.get('error');
                console.error("Google authentication cancelled or failed with error:", error);
                toast.error("Google authentication was not completed. Please try again.");
                navigate('/signin');
            }
        };

        handleAuth();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-8">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-600 mx-auto"></div>
                <h1 className="text-2xl font-semibold text-gray-800 mt-4">
                    Authenticating with Google...
                </h1>
                <p className="text-gray-600 mt-2">
                    Please wait, we're securely verifying your identity.
                </p>
                {loading && <p className="text-blue-500 mt-2">Processing...</p>}
            </div>
        </div>
    );
};

export default GoogleCallback;

