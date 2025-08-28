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

// New Public Form Page
import PublicForm from './pages/Submission/PublicForm';

// Protected components that use the Layout
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout/Layout';
import NewFormPage from './pages/Form/NewFormPage';
import BlankFormPage from './pages/Form/BlankFormPage';
import EditFormPage from './pages/Form/EditFormPage';
import Ach from './pages/Templates/ach/Ach';
import W9 from './pages/Templates/w9/W9';
import CreditCard from './pages/Templates/credit_card/Credit_Card';
import Templates from './pages/Templates/Templates';
import Forms from './pages/Form/Forms';
import Auditlogs from './pages/Audit/AuditLogs';
import ChangePassword from './pages/Auth/User/ChangePassword';
import Submissions from './pages/Submission/Submission';
import WebhooksPage from './pages/Webhook/WebhooksPage';
import CreateFromTemplatePage from './components/NewForm/CreateFormTemplate';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { FormProvider } from './context/FormContext';
import { SubmissionProvider } from './context/SubmissionContext';
import { WebhookProvider } from './context/WebhookContext';
import { AuditProvider } from './context/AuditContext';
import { TemplateProvider } from './context/TemplateContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <SubmissionProvider>
          <WebhookProvider>
            <AuditProvider>
            <TemplateProvider>
            <Router>
              <Routes>
                {/* --- Public Routes (Accessible to everyone) --- */}
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<CreateAccount />} />
                <Route path="/business-setup" element={<BusinessSetup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
                <Route path="/verify-code" element={<VerifyCode />} />
                <Route path="/resend-verification" element={<ResendVerification />} />
                <Route path="/demo" element={<BookADemo />} />

                {/* The PublicForm route must be public to allow anyone with the link to access it */}
                <Route path="/form/:formId/:accessCode" element={<PublicForm />} />

                {/* --- Protected Routes (Require authentication) --- */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/create-form' element={<NewFormPage />} />
                    <Route path='/templates' element={<Templates />} />
                    <Route path='/templates/ach' element={<Ach />} />
                    <Route path='/templates/w9' element={<W9 />} />
                    <Route path='/templates/credit-card' element={<CreditCard />} />
                    <Route path='/forms' element={<Forms />} />
                    <Route path='/audit-logs' element={<Auditlogs />} />
                    <Route path='/change-password' element={<ChangePassword />} />
                    <Route path='/submissions' element={<Submissions />} />
                    <Route path='/webhooks' element={<WebhooksPage />} />
                  </Route>
                  {/* Full-screen protected routes */}
                  <Route path='/forms/new' element={<BlankFormPage />} />
                  <Route path='/forms/edit/:id' element={<EditFormPage />} />

                  <Route path='/forms/new/template/:templateId' element={<CreateFromTemplatePage />} />
                </Route>
              </Routes>
            </Router>
            </TemplateProvider>
            </AuditProvider>
          </WebhookProvider>
        </SubmissionProvider>
      </FormProvider>
    </AuthProvider>
  );
};

export default App;

