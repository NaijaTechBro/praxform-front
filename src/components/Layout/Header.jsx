import React, { Fragment } from 'react';
import { FiSearch, FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Header = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth(); // Consume user and logout from AuthContext

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none md:hidden">
          <FiMenu size={24} />
        </button>
        {/* Search Bar - hidden on smaller screens, visible on md and up */}
        <div className="relative hidden md:block ml-4">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search forms, templates..."
            className="w-full max-w-xs py-2 pl-10 pr-4 bg-gray-100 text-[#5F80A0] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative text-gray-500 hover:text-gray-700">
          <FiBell size={22} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Organization Name Dropdown */}
        <Menu as="div" className="relative ml-3">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="flex items-center text-sm font-medium text-gray-700 focus:outline-none">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    {/* Placeholder for profile image / initial */}

                    {user?.currentOrganization?.name ? user.currentOrganization?.name.charAt(0).toUpperCase() : 'G'}
                  </div>
                  <span className="hidden lg:inline ml-2 text-sm font-semibold text-gray-700">
                    {/* Safely access organization name */}
                    {user?.currentOrganization?.name || 'Select Organization'}
                  </span>
                  <FiChevronDown className="ml-1 text-gray-500" />
                </Menu.Button>
              </div>

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
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/settings" // Link to user settings page
                          className={`${
                            active ? 'bg-[#1475F4] text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          Edit Profile
                        </NavLink>
                      )}
                    </Menu.Item>
                    {/* Placeholder for "Switch Organization" if you implement it */}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          // onClick={() => console.log('Switch Organization clicked')}
                          className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          disabled // Placeholder for now
                        >
                          Switch Organization (Soon)
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout} // Call the logout function
                          className={`${
                            active ? 'bg-red-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
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
    </header>
  );
};

export default Header;
