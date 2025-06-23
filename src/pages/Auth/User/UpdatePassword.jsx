import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Eye, EyeOff, Building, Send } from 'lucide-react';
import InputField from '../../../components/Auth/InputField';
import PasswordCriteria from '../../../components/Auth/PasswordCriteria';
import yellow from '../../../assets/yellow-padlock.png';
import Header from '../../../components/Auth/Header';


const UpdatePassword = ({ setPage }) => {
    return (
        <>
        <Header/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl sm:p-12 my-16">
            <div className="text-center">
              <img src={yellow} alt="Lock Icon" className='mx-auto w-24'/>
              <h1 className="text-3xl font-bold text-gray-900">Set New Password</h1>
              <p className="mt-2 text-sm text-gray-600">Your new password must be different from previous ones.</p>
            </div>
            <div className="space-y-6">
              <InputField id="newPassword" label="Password" type="password" placeholder="••••••••" />
              <InputField id="confirmPassword" label="Confirm Password" type="password" placeholder="••••••••" />
              <PasswordCriteria />
              <button onClick={() => setPage({ name: 'signIn' })} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">Reset Password</button>
            </div>
          </div>
        </div>
        </>
    );
};

export default UpdatePassword;

