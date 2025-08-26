import React, { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import RecentFormsTable from '../components/Dashboard/RecentFormsTable';
import StatsCard from '../components/Dashboard/StatsCard';
import TemplateLibrary from '../components/Dashboard/TemplateLibrary';
import { useForms } from '../context/FormContext';
import { Link } from 'react-router-dom';

// Import local image assets for StatsCard icons
import SentIcon from '../assets/statscard/sent.png';
import PendingIcon from '../assets/statscard/pending.png';
import CompletedIcon from '../assets/statscard/completed.png';
import TimeIcon from '../assets/statscard/average.png';

const Dashboard = () => {
  const { forms, getForms, loading: formsLoading, error: formsError } = useForms(); // Renamed loading and error

  useEffect(() => {
    getForms(); // Fetch all forms for dashboard stats when the component mounts
  }, []);

  // Helper to create an image icon element
  const createIcon = (src, alt) => <img src={src} alt={alt} className="w-5 h-5" />;

  // Calculate dynamic stats based on the fetched forms
  const totalForms = Array.isArray(forms) ? forms.length : 0;
  const activeForms = Array.isArray(forms) ? forms.filter(form => form.status === 'active').length : 0;
  const draftForms = Array.isArray(forms) ? forms.filter(form => form.status === 'draft').length : 0;

  // Calculate completed forms by iterating through recipients
  const completedForms = Array.isArray(forms)
    ? forms.reduce((count, form) => {
        if (Array.isArray(form.recipients)) {
          return count + form.recipients.filter(rec => rec.status === 'completed').length;
        }
        return count;
      }, 0)
    : 0;

  // For demonstration, let's assume some arbitrary previous values for trend calculation.
  // In a real production app, you would fetch these from a backend or calculate based on historical data.
  const previousTotalForms = 10;
  const previousActiveForms = 3;
  const previousDraftForms = 5;
  const previousCompletedForms = 500;

  // Dynamic stats array for rendering StatsCard components
  const dynamicStats = [
    { title: 'Total Forms', value: totalForms, previousValue: previousTotalForms, icon: createIcon(SentIcon, 'sent Icon') },
    { title: 'Active Forms', value: activeForms, previousValue: previousActiveForms, icon: createIcon(PendingIcon, 'pending Icon') },
    { title: 'Draft Forms', value: draftForms, previousValue: previousDraftForms, icon: createIcon(TimeIcon, 'average completion time Icon') },
    { title: 'Completed Submissions', value: completedForms, previousValue: previousCompletedForms, icon: createIcon(CompletedIcon, 'completed Icon') },
  ];

  // Removed the explicit `if (formsLoading)` block.
  // The components will now render immediately with their default/initial states.

  if (formsError) { // Keep error display as it's critical
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-red-700">Error loading dashboard: {formsError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      {/* Dashboard Header */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-[#5F80A0]">Overview of sent/received forms, status tracking, analytics</p>
        </div>

        <div className="flex justify-center space-x-4">
          {/* Create New Form Button (Desktop) */}
          <Link
            to="/create-form"
            className="hidden sm:flex items-center justify-center bg-[#1475F4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none"
          >
            <FiPlus className="mr-2" />
            Create New Form
          </Link>

          {/* This button is a mobile-only fallback for the one in the header */}
          <Link
            to="/create-form"
            className="flex sm:hidden mt-4 w-full justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none"
          >
            <FiPlus className="mr-2" />
            Create New Form
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dynamicStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Forms Table Section */}
      <div className="space-y-8">
        <RecentFormsTable />
        <TemplateLibrary />
      </div>
    </div>
  );
};

export default Dashboard;
