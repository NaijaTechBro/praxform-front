import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import InputField from '../../../components/Auth/InputField';
import Header from '../../../components/Auth/Header';
import Business from '../../../assets/business.png';

const BusinessSetup = ({ setPage }) => {
  const [orgName, setOrgName] = useState('');
  const [industry, setIndustry] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [localError, setLocalError] = useState('');
  
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleProceed = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (!orgName || !industry) {
      setLocalError('Organization name and industry are required.');
      return;
    }

    const tempUserData = JSON.parse(localStorage.getItem('tempUserData'));
    if (!tempUserData) {
        setLocalError('User data not found. Please go back and create an account.');
        return;
    }

    const userData = {
        ...tempUserData,
        organization: {
            name: orgName,
            industry: industry,
        },
        // Optional fields from the form can be added here
    };

    const result = await register(userData);
    
    if (result.success) {
      localStorage.removeItem('tempUserData');
      // On successful registration, redirect to a page that tells the user to check their email
      navigate('/verify-code'); 
    } else {
      setLocalError(result.message || error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl sm:p-12 my-16">
          <div className="text-center">
            <div className="mx-auto bg-blue-100 rounded-lg w-16 h-16 flex items-center justify-center mb-4"><img src={Business} alt='building' className='mx-auto w-24' /></div>
            <h1 className="text-3xl font-bold text-gray-800">Business Setup</h1>
            <p className="mt-2 text-sm text-gray-600">Tell us a bit about your organization.</p>
          </div>
          
          <div className="space-y-6">
            <form onSubmit={handleProceed}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField id="orgName" label="Organization Name" placeholder="Frameio Stores" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                <InputField id="industry" label="Industry" placeholder="Design" value={industry} onChange={(e) => setIndustry(e.target.value)} />
              </div>
              <InputField id="address" label="Address" placeholder="301 Fremont Street, CA" value={address} onChange={(e) => setAddress(e.target.value)} />
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="flex">
                  <select className="border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option>🇳🇬 +234</option><option>🇺🇸 +1</option>
                  </select>
                  <div className="relative flex-grow">
                    <input id="phoneNumber" type="tel" placeholder="801 234 5678" className="w-full py-3 pl-4 pr-10 rounded-r-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <ShieldCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  </div>
                </div>
              </div>
              
              <InputField id="website" label="Website" placeholder="frameiolabs.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
              
              {localError && <p className="text-red-500 text-sm mt-4">{localError}</p>}
              <br/>
              <button type="submit" className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition" disabled={loading}>
                {loading ? 'Processing...' : 'Proceed'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessSetup;