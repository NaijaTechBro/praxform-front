import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png';
import Dash from '../../assets/sidebar/dashboard.png';
import Forms from '../../assets/sidebar/form.png';
import Templates from '../../assets/sidebar/template.png';
import Submissions from '../../assets/sidebar/submission.png';
import Integrations from '../../assets/sidebar/integration.png';
import Compliance from '../../assets/sidebar/compliance.png';
import Settings from '../../assets/sidebar/setting.png';
import AuditLogs from '../../assets/sidebar/audit.png';
import { IoMdMore } from 'react-icons/io';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const createIcon = (src, alt) => <img src={src} alt={alt} className="w-5 h-5" />;

  const mainMenuItems = [
    { name: 'Dashboard', icon: createIcon(Dash, 'Dashboard Icon'), path: '/dashboard' },
    { name: 'Forms', icon: createIcon(Forms, 'Forms Icon'), path: '/forms' },
    { name: 'Templates', icon: createIcon(Templates, 'Templates Icon'), path: '/templates' },
    { name: 'Submissions', icon: createIcon(Submissions, 'Submissions Icon'), path: '/submissions' },
  ];

  const accountMenuItems = [
    { name: 'Integrations', icon: createIcon(Integrations, 'Integrations Icon'), path: '/integrations' },
    { name: 'Compliance', icon: createIcon(Compliance, 'Compliance Icon'), path: '/compliance' },
    { name: 'Settings', icon: createIcon(Settings, 'Settings Icon'), path: '/settings' },
    { name: 'Audit Logs', icon: createIcon(AuditLogs, 'Audit Logs Icon'), path: '/audit-logs' },
  ];

  // Style for active NavLink
  const activeLinkStyle = {
    backgroundColor: '#1475F4',
    color: 'white',
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 bg-white w-64 p-4 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                 md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-40 flex flex-col`}
      >
        <img src={logo} alt="Logo" className="w-36 h-12 mb-10" />

        {/* Main Menu */}
        <nav className="flex-1">
          <h2 className="text-xs font-semibold text-[#030405] uppercase tracking-wider mb-3">Main Menu</h2>
          <ul>
            {mainMenuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={item.path}
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  className="flex items-center p-2 text-sm text-[#5F80A0] hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Account Management */}
          <h2 className="text-xs font-semibold text-[#030405] uppercase tracking-wider mt-8 mb-3">Account Management</h2>
          <ul>
            {accountMenuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={item.path}
                  style={({ isActive }) => isActive ? activeLinkStyle : undefined}
                  className="flex items-center p-2 text-sm text-[#5F80A0] hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="mt-auto border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white">
                P
              </div>
              <span className="ml-3 text-sm font-semibold text-gray-800">Praise Dominic</span>
            </div>
            <button className="text-gray-500 hover:text-gray-800">
              <IoMdMore size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;