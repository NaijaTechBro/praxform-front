// Corrected App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public pages
import HomePage from './pages/Home';
import SignIn from './pages/Auth/User/SignIn';
import CreateAccount from './pages/Auth/User/CreateAccount';
import BusinessSetup from './pages/Auth/User/BusinessSetup';
import ForgotPassword from './pages/Auth/User/ForgotPassword';
import ResetPassword from './pages/Auth/User/ResetPassword';
import ResendVerification from './pages/Auth/User/ResendVerification';
import VerifyCode from './pages/Auth/User/VerifyCode';
import BookADemo from './components/Home/BookADemo';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout/Layout';
import NewFormPage from './pages/Form/NewFormPage';
import Ach from './pages/Templates/ach/Ach';
import W9 from './pages/Templates/w9/W9';
import CreditCard from './pages/Templates/credit_card/Credit_Card';
import Templates from './pages/Templates/Templates';
import Forms from './pages/Form/Forms';
import Auditlogs from './pages/Audit/AuditLogs';

import { AuthProvider } from './context/AuthContext'; 
import ChangePassword from './pages/Auth/User/ChangePassword';


const App = () => {
  return (
    <AuthProvider>
        <Router>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/business-setup" element={<BusinessSetup />} />    
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
            <Route path="/change-password" element={<ChangePassword />} />  
            <Route path='/demo' element={<BookADemo/>}  />


             {/* --- Protected Routes (These will have the Sidebar and Header) --- */}
        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-form' element={<NewFormPage />} />
          <Route path='/templates' element={<Templates />} />
          <Route path='/templates/ach' element={<Ach />} />
          <Route path='/templates/w9' element={<W9 />} />
          <Route path='/templates/credit-card' element={<CreditCard />} />
          {/* Add other protected routes here that need the layout */}
          <Route path='/forms' element={<Forms />} />
          <Route path='/audit-logs' element={<Auditlogs />} />
          {/* E.g., <Route path='/settings' element={<SettingsPage />} /> */}
        </Route>

          </Routes>
              </Router>
              </AuthProvider>
  );
};

export default App;