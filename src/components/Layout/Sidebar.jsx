import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'; // Import Menu and Transition
import { Fragment } from 'react'; // Import Fragment for Transition

// Import local image assets
import logo from '../../assets/logo.png';
import icon from '../../assets/icon.png';
import Dash from '../../assets/sidebar/dashboard.png';
import Forms from '../../assets/sidebar/form.png';
import Templates from '../../assets/sidebar/template.png';
import Submissions from '../../assets/sidebar/submission.png';
import Integrations from '../../assets/sidebar/integration.png';
import Compliance from '../../assets/sidebar/compliance.png';
import Settings from '../../assets/sidebar/setting.png';
import AuditLogs from '../../assets/sidebar/audit.png';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

// Inline SVG icons for collapse button and more options
const menuIcons = {
  arrowLeft: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-circle"><circle cx="12" cy="12" r="10"/><path d="M12 8l-4 4 4 4"/><path d="M16 12H8"/></svg>
  ),
  arrowRight: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-circle"><circle cx="12" cy="12" r="10"/><path d="M12 16l4-4-4-4"/><path d="M8 12h8"/></svg>
  ),
  more: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
  )
};

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth(); // Consume user and logout from AuthContext

  // Create a utility to render an image icon with default styling
  const createIcon = (src, alt) => <img src={src} alt={alt} className="w-5 h-5" />;

  const mainMenuItems = [
    { name: 'Dashboard', icon: createIcon(Dash, 'Dashboard Icon'), path: '/dashboard' },
    { name: 'Forms', icon: createIcon(Forms, 'Forms Icon'), path: '/forms' },
    { name: 'Templates', icon: createIcon(Templates, 'Templates Icon'), path: '/templates' },
    { name: 'Submissions', icon: createIcon(Submissions, 'Submissions Icon'), path: '/submissions' },
  ];

  const accountMenuItems = [
    { name: 'Webhooks', icon: createIcon(Integrations, 'Integrations Icon'), path: '/webhooks' },
    { name: 'Compliance', icon: createIcon(Compliance, 'Compliance Icon'), path: '/compliance' },
    { name: 'Settings', icon: createIcon(Settings, 'Settings Icon'), path: '/settings' },
    { name: 'Audit Logs', icon: createIcon(AuditLogs, 'Audit Logs Icon'), path: '/audit-logs' },
  ];

  // Style for active NavLink
  const activeLinkStyle = 'bg-[#1475F4] text-white';

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`
          fixed inset-y-0 left-0 bg-white p-4 transition-all duration-300 ease-in-out z-40 flex flex-col
          ${isSidebarOpen ? 'w-64' : 'w-20'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <div className={`flex items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} mb-10`}>
          {isSidebarOpen ? (
            <img src={logo} alt="Logo" className="w-34 h-10 mb-10" />
          ) : (
            <img src={icon} alt="icon" className="w-10 h-10 rounded-lg" />
          )}
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-800 hidden md:block transition-transform duration-300 ease-in-out">
            {isSidebarOpen ? menuIcons.arrowLeft : menuIcons.arrowRight}
          </button>
        </div>

        {/* Main Menu */}
        <nav className="flex-1">
          {isSidebarOpen && (
            <h2 className="text-xs font-semibold text-[#030405] uppercase tracking-wider mb-3 px-2">Main Menu</h2>
          )}
          <ul>
            {mainMenuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-2 text-sm text-[#5F80A0] rounded-full transition-colors duration-200
                    ${isActive ? activeLinkStyle : 'hover:bg-gray-100'}
                    ${!isSidebarOpen && 'justify-center'}
                  `}
                >
                  <span className={`${isSidebarOpen && 'mr-3'}`}>{item.icon}</span>
                  {isSidebarOpen && item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Account Management */}
          {isSidebarOpen && (
            <h2 className="text-xs font-semibold text-[#030405] uppercase tracking-wider mt-8 mb-3 px-2">Account Management</h2>
          )}
          <ul>
            {accountMenuItems.map((item, index) => (
              <li key={index} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center p-2 text-sm text-[#5F80A0] rounded-full transition-colors duration-200
                    ${isActive ? activeLinkStyle : 'hover:bg-gray-100'}
                    ${!isSidebarOpen && 'justify-center'}
                  `}
                >
                  <span className={`${isSidebarOpen && 'mr-3'}`}>{item.icon}</span>
                  {isSidebarOpen && item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile with Dropdown */}
        <div className="mt-auto border-t pt-4">
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <Menu.Button className={`flex items-center w-full focus:outline-none ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white">
                      {user && user.firstName ? user.firstName.charAt(0).toUpperCase() : 'P'}
                    </div>
                    {isSidebarOpen && (
                      <span className="ml-3 text-sm font-semibold text-gray-800">
                        {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
                      </span>
                    )}
                  </div>
                  {isSidebarOpen && (
                    <span className="text-gray-500 hover:text-gray-800">
                      {menuIcons.more}
                    </span>
                  )}
                </Menu.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className={`absolute bottom-full mb-2 ${isSidebarOpen ? 'right-0 w-48' : 'left-full ml-2 w-48'} origin-bottom-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  >
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/settings" // Link to user settings page
                            className={`${
                              active ? 'bg-[#1475F4] text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Edit Profile
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout} // Call the logout function
                            className={`${
                              active ? 'bg-red-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
