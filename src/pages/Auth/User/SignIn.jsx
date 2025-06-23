import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Header from '../../../components/Auth/Header';
import InputField from '../../../components/Auth/InputField';


const SignIn = ({ setPage }) => {
  return (
    <>
      <Header page="signIn" setPage={setPage} />
    
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Added margin-top (mt-16) and margin-bottom (mb-16) for spacing */}
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl sm:p-12 my-16">
            
          {/* Section for the main title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Sign In to Your Account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
                Welcome back! Please enter your details.
            </p>
          </div>

          {/* Container for all form elements with consistent spacing */}
          <div className="space-y-6">
            <button className="w-full flex items-center justify-center py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C14.03,5.73 15.6,6.33 16.84,7.35L19.09,5.12C17.02,3.37 14.82,2.5 12.19,2.5C7.03,2.5 3,6.58 3,11.5C3,16.42 7.03,20.5 12.19,20.5C17.83,20.5 21.6,16.66 21.6,11.73C21.6,11.43 21.35,11.1 21.35,11.1Z"/>
                </svg>
                <span className="font-semibold text-gray-700">Continue with Google</span>
            </button>

            <div className="flex items-center">
                <hr className="w-full border-gray-300" />
                <span className="px-4 text-sm font-medium text-gray-500">OR</span>
                <hr className="w-full border-gray-300" />
            </div>
            
            <InputField id="email" label="Email Address" type="email" placeholder="e.g., you@example.com" />
            
            <InputField id="password" label="Password" type="password" placeholder="Enter your password" />
            
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                    <input type="checkbox" id="rememberMe" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="rememberMe" className="ml-2 text-gray-700">Remember Me</label>
                </div>
                <a href="/forgot-password" className="font-semibold text-blue-600 hover:underline">
                    Forgot Password?
                </a>
            </div>
            
            <button className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
              Get Started
            </button>
          </div>
          
          {/* Section for the sign-up link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-semibold text-blue-600 hover:underline">
                Create Account
              </a>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default SignIn;