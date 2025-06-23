import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff} from 'lucide-react';

const InputField = ({ id, label, type = 'text', placeholder, hasError, isValid }) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    return (
        <div>
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <div className="relative">
                <input
                    id={id}
                    type={isPasswordVisible ? 'text' : type}
                    placeholder={placeholder}
                    className={`w-full py-3 px-4 pr-10 rounded-lg border text-gray-800 placeholder-gray-400
                        ${hasError ? 'border-red-500' : 'border-gray-300'}
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                />
                {type === 'password' && (
                    <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                )}
                 {isValid && !hasError && (
                     <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                 )}
            </div>
        </div>
    );
};

export default InputField;