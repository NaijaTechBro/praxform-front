
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // 1. Import Outlet
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => { // You can remove the {children} prop
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {/* 2. Replace {children} with <Outlet /> */}
          {/* This is where the nested route's component will be rendered */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;