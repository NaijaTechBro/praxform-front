// src/App.jsx
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

// Protected components that use the Layout
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout/Layout'; // This already contains Header and Sidebar
import NewFormPage from './pages/Form/NewFormPage';
import BlankFormPage from './pages/Form/BlankFormPage'; // Blank form page should also be protected
import Ach from './pages/Templates/ach/Ach';
import W9 from './pages/Templates/w9/W9';
import CreditCard from './pages/Templates/credit_card/Credit_Card';
import Templates from './pages/Templates/Templates';
import Forms from './pages/Form/Forms';
import Auditlogs from './pages/Audit/AuditLogs';
import ChangePassword from './pages/Auth/User/ChangePassword'; // Assuming this is a protected route

// Context Providers
import { AuthProvider } from './context/AuthContext'; 
import { FormProvider } from './context/FormContext';

// New ProtectedRoute component
import ProtectedRoute from './components/Auth/ProtectedRoute';


const App = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <Router>
          <Routes>
            {/* --- Public Routes (Accessible to everyone) --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/business-setup" element={<BusinessSetup />} />     
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
            <Route path="/demo" element={<BookADemo />} />

            {/* --- Protected Routes (Require authentication) --- */}
            {/* The Layout component contains the Header and Sidebar, which are part of the protected UI */}
            <Route element={<ProtectedRoute />}> {/* This is the main protected route wrapper */}
              <Route element={<Layout />}> {/* Routes within Layout will have Header and Sidebar */}
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/create-form' element={<NewFormPage />} />
                <Route path='/templates' element={<Templates />} />
                <Route path='/templates/ach' element={<Ach />} />
                <Route path='/templates/w9' element={<W9 />} />
                <Route path='/templates/credit-card' element={<CreditCard />} />
                <Route path='/forms' element={<Forms />} />
                <Route path='/audit-logs' element={<Auditlogs />} />
                <Route path='/change-password' element={<ChangePassword />} /> {/* Assuming this is a protected route */}
                {/* Add any other protected routes that should use the Layout here */}
              </Route>
              {/* Routes that are protected but DO NOT use the main Layout (e.g., a full-screen builder) */}
              <Route path='/blank-form' element={<BlankFormPage />} />
              {/* E.g., <Route path='/settings' element={<SettingsPage />} /> if it doesn't use Layout */}
            </Route>

            {/* --- Catch-all for unknown routes (optional) --- */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Router>
      </FormProvider>
    </AuthProvider>
  );
};

export default App;
