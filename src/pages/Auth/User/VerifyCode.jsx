import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, Eye, EyeOff, Building, Send } from 'lucide-react';
import mail from '../../../assets/mailcode.png';
import Header from '../../../components/Auth/Header';

const VerifyCode = ({ setPage, fromPage }) => {
    const [code, setCode] = useState(new Array(6).fill(""));
    const inputsRef = useRef([]);

    const handleVerify = () => {
        if (fromPage === 'createAccount') {
            setPage({ name: 'businessSetup' });
        } else if (fromPage === 'forgotPassword') {
            setPage({ name: 'updatePassword' });
        }
    };

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newCode = [...code.map((d, idx) => (idx === index) ? element.value : d)];
        setCode(newCode);
        if (element.value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
       if (e.key === 'Backspace' && !code[index] && e.target.previousSibling) {
           e.target.previousSibling.focus();
       }
    };
    
    useEffect(() => { inputsRef.current[0]?.focus(); }, []);

    return (
        <>
        <Header/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl sm:p-12">
            <div className="text-center">
              <img src={mail} alt="Mail Icon" className='mx-auto w-24' />
              <h1 className="text-3xl font-bold text-gray-800">You've Got Mail!</h1>
              <p className="text-gray-500 mt-2">Please enter the 6-digit code sent to your email.</p>
            </div>
            <div className="space-y-6">
              <div className="flex justify-center space-x-2 md:space-x-3">
                {code.map((data, index) => (
                  <input
                    key={index}
                    ref={el => inputsRef.current[index] = el}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <button onClick={handleVerify} className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition">Verify Code</button>
              <div className="text-center text-sm">
                <span className="text-gray-500">Didn't get the code? </span>
                <button className="font-semibold text-blue-600 hover:underline inline-flex items-center"><Send className="w-4 h-4 mr-1" />Resend</button>
              </div>
            </div>
          </div>
        </div>
        </>
    );
};


export default VerifyCode;