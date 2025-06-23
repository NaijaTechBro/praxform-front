import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Eye, EyeOff, Building, Send } from 'lucide-react';
import InputField from '../../../components/Auth/InputField';
import Header from '../../../components/Auth/Header';
import yellow from '../../../assets/yellow-padlock.png';


const ForgotPassword = ({ setPage }) => {
    return (
      <>
        <Header page="forgotPassword" setPage={setPage} />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl sm:p-12 my-16">
            
            <div className="text-center">
              <img src={yellow} alt="Lock Icon" className='mx-auto w-24' />
              <h1 className="text-3xl font-bold text-gray-900 mt-4">Forgot Password?</h1>
              <p className="mt-2 text-sm text-gray-600">
                No problem! Enter your email and we'll send you a reset link.
              </p>
            </div>
 
            <div className="space-y-6">
              <InputField id="email" label="Email Address" type="email" placeholder="e.g., you@example.com" />
              <button 
                onClick={() => setPage('verifyCode')} 
                className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Send Reset Link
              </button>
              <button 
                onClick={() => setPage('signIn')} 
                className="w-full py-3 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition rounded-lg"
              >
                Return to Sign In
              </button>
            </div>

          </div>
        </div>
      </>
    );
};

export default ForgotPassword;