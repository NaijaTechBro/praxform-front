
import React from 'react';
import { FiPlus } from 'react-icons/fi';

import SentIcon from '../assets/statscard/sent.png';
import PendingIcon from '../assets/statscard/pending.png';
import CompletedIcon from '../assets/statscard/completed.png';
import TimeIcon from '../assets/statscard/average.png';
import StatsCard from '../components/dashboard/StatsCard';
import RecentFormsTable from '../components/dashboard/RecentFormsTable';
import TemplateLibrary from '../components/Dashboard/TemplateLibrary';

const Dashboard = () => {
  const createIcon = (src, alt) => <img src={src} alt={alt} className="w-5 h-5" />;
  const stats = [
    { title: 'Total Forms Sent', value: '300', change: '+12.5%', trend: 'up', icon: createIcon(SentIcon, 'sent Icon') },
    { title: 'Forms Pending', value: '35', change: '-8.2%', trend: 'down', icon: createIcon(PendingIcon, 'pending Icon') },
    { title: 'Completed Forms', value: '538', change: '+16.8%', trend: 'up', icon: createIcon(CompletedIcon, 'completed Icon') },
    { title: 'Avg. Completion Time', value: '2.4 Days', change: '+5.1%', trend: 'up', icon: createIcon(TimeIcon, 'average completion time Icon') },
  ];

  return (
    <div>
      {/* Dashboard Header */}
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-[#5F80A0]">Overview of sent/received forms, status tracking, analytics</p>
        </div>
                <button className="hidden sm:flex items-center justify-center bg-[#1475F4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <FiPlus className="mr-2" />
          Create New Form
        </button>
        {/* This button is a mobile-only fallback for the one in the header */}
        <button className="flex sm:hidden mt-4 w-full justify-center items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <FiPlus className="mr-2" />
            Create New Form
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Forms & Templates Section */}
      <div className="space-y-8">
        <RecentFormsTable />
        <TemplateLibrary />
      </div>
    </div>
  );
};

export default Dashboard;