// import React, { useState, useRef, useEffect } from 'react';
// import { ShieldCheck, Eye, EyeOff, Building, Send } from 'lucide-react';
// import InputField from '../../../components/Auth/InputField';
// import PasswordCriteria from '../../../components/Auth/PasswordCriteria';
// import Header from '../../../components/Auth/Header';

// const CreateAccount = ({ setPage }) => {
//   return (
//     <>
//       <Header page="createAccount" setPage={setPage} />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-full py-4 max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl sm:p-12 my-16">
            
//           <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900">Let's Get Started</h1>
//             <p className="mt-2 text-sm text-gray-600">Create an account to continue.</p>
//           </div>

//           <div className="space-y-6">
//             <button className="w-full flex items-center justify-center py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
//                 <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C14.03,5.73 15.6,6.33 16.84,7.35L19.09,5.12C17.02,3.37 14.82,2.5 12.19,2.5C7.03,2.5 3,6.58 3,11.5C3,16.42 7.03,20.5 12.19,20.5C17.83,20.5 21.6,16.66 21.6,11.73C21.6,11.43 21.35,11.1 21.35,11.1Z"/></svg>
//                 <span className="font-semibold text-gray-700">Continue with Google</span>
//             </button>
//             <div className="flex items-center">
//                 <hr className="w-full border-gray-300" /><span className="px-4 text-sm font-medium text-gray-500">OR</span><hr className="w-full border-gray-300" />
//             </div>
            
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 <InputField id="firstName" label="First Name" placeholder="Dominic" />
//                 <InputField id="lastName" label="Last Name" placeholder="Praise" />
//             </div>
            
//             <InputField id="email" label="Email Address" type="email" placeholder="dom@gmail.com" isValid={null} />
//             <InputField id="password" label="Password" type="password" placeholder="••••••••" />

//             <PasswordCriteria />
            
//             <button onClick={() => setPage('verifyCode')} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
//                 Create Account
//             </button>
//           </div>
          
//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <a href="/signin" className="font-semibold text-blue-600 hover:underline">Sign In</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateAccount;

// src/pages/CreateAccount.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../../components/Auth/InputField';
import PasswordCriteria from '../../../components/Auth/PasswordCriteria';
import Header from '../../../components/Auth/Header';

const CreateAccount = ({ setPage }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const navigate = useNavigate();

    const handleNext = (e) => {
        e.preventDefault();
        setLocalError('');
        if (!firstName || !lastName || !email || !password) {
            setLocalError('All fields are required.');
            return;
        }
        
        const userData = { firstName, lastName, email, password };
        localStorage.setItem('tempUserData', JSON.stringify(userData));
        
        navigate('/business-setup');
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full py-4 max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl sm:p-12 my-16">
                    {/* ... (rest of the component) */}
                    <div className="space-y-6">
                        {/* ... (social login and OR divider) */}
                        <form onSubmit={handleNext}>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <InputField id="firstName" label="First Name" placeholder="Dominic" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <InputField id="lastName" label="Last Name" placeholder="Praise" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </div>
                            <InputField id="email" label="Email Address" type="email" placeholder="dom@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputField id="password" label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                            
                            {/* The password criteria component is now here, passing the password state */}
                            <PasswordCriteria password={password} />
                            
                            {localError && <p className="text-red-500 text-sm mt-4">{localError}</p>}
                            
                            <button type="submit" className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition">
                                Next
                            </button>
                        </form>
                    </div>
                    {/* ... (sign in link) */}
                </div>
            </div>
        </>
    );
};

export default CreateAccount;