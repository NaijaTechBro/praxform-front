// src/components/Auth/PasswordCriteria.jsx

import React from 'react';
import { ShieldCheck } from 'lucide-react';

const PasswordCriteria = ({ password }) => {
    const isEightChars = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const hasOneNumber = /\d/.test(password);

    return (
        <ul className="space-y-2 text-sm text-gray-500 mt-4">
            <li className={`flex items-center ${isEightChars ? 'text-green-500' : 'text-gray-500'}`}>
                <ShieldCheck className="h-4 w-4 mr-2" /> Eight Characters Long
            </li>
            <li className={`flex items-center ${hasSpecialChar ? 'text-green-500' : 'text-gray-500'}`}>
                <ShieldCheck className="h-4 w-4 mr-2" /> Contain Special Characters (&, #, $, etc)
            </li>
            <li className={`flex items-center ${hasOneNumber ? 'text-green-500' : 'text-gray-500'}`}>
                <ShieldCheck className="h-4 w-4 mr-2" /> Contain One Number
            </li>
        </ul>
    );
};

export default PasswordCriteria;