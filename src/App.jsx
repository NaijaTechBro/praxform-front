import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public pages
import HomePage from './pages/Home';
import SignIn from './pages/Auth/User/SignIn';
import CreateAccount from './pages/Auth/User/CreateAccount';
import BusinessSetup from './pages/Auth/User/BusinessSetup';
import ForgotPassword from './pages/Auth/User/ForgotPassword';
import VerifyCode from './pages/Auth/User/VerifyCode';
import UpdatePassword from './pages/Auth/User/UpdatePassword';
import BookADemo from './components/Home/BookADemo';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout/Layout';
import NewFormPage from './pages/Form/NewFormPage';
import Ach from './pages/Templates/ach/Ach';
import W9 from './pages/Templates/w9/W9';
import CreditCard from './pages/Templates/credit_card/Credit_Card';
import Templates from './pages/Templates/Templates';


const App = () => {
  return (
        <Router>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/business-setup" element={<BusinessSetup />} />    
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-code" element={<VerifyCode />} />
            <Route path="/update-password" element={<UpdatePassword />} />  
            <Route path='/demo' element={<BookADemo/>}  />


             {/* --- Protected Routes (These will have the Sidebar and Header) --- */}
        <Route element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create-form' element={<NewFormPage />} />
          <Route path='/templates' element={<Templates />} />
          <Route path='/templates/ach' element={<Ach />} />
          <Route path='/templates/w9' element={<W9 />} />
          <Route path='/templates/credit-card' element={<CreditCard />} />
          {/* Add other protected routes here that need the layout */}
          {/* E.g., <Route path='/forms' element={<FormsPage />} /> */}
          {/* E.g., <Route path='/settings' element={<SettingsPage />} /> */}
        </Route>

          </Routes>
              </Router>
  );
};

export default App;