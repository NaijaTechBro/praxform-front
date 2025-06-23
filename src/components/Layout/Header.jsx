// src/components/layout/Header.jsx
import React from 'react';
import { FiSearch, FiBell, FiChevronDown, FiPlus, FiMenu } from 'react-icons/fi';

const Header = ({ setSidebarOpen }) => {
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
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-full bg-gray-200"></div> {/* Placeholder for profile image */}
          <span className="hidden lg:inline ml-2 text-sm font-semibold text-gray-700">Framelo Stores</span>
          <FiChevronDown className="ml-1 text-gray-500" />
        </div>
      </div>
    </header>
  );
};

export default Header;