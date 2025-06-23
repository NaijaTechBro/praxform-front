import React from 'react';
import { FiSearch, FiEye, FiMoreVertical, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
  const baseStyle = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  const styles = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Expired: "bg-red-100 text-red-800",
    Draft: "bg-blue-100 text-blue-800",
  };
  return <span className={`${baseStyle} ${styles?.[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
};

const RecentFormsTable = () => {
  const forms = [
    { name: 'W-9 Tax Form', template: 'Tax Template', status: 'Expired', recipient: 'Praise Dominic', email: 'dominic@mail.com', date: 'May 28, 2025', modified: 'May 29, 2025' },
    { name: 'Credit Card Authorization', template: 'Financial Template', status: 'Completed', recipient: 'Philip Oyedepo', email: 'philip@mail.com', date: 'June 15, 2025', modified: 'June 15, 2025' },
    { name: 'Non-Disclosure Agreement', template: 'Financial Template', status: 'Pending', recipient: 'Sarah Wariboko', email: 'sarah@website.com', date: 'July 22, 2025', modified: 'July 22, 2025' },
    { name: 'ACH Authorization', template: 'Legal Template', status: 'Draft', recipient: 'Lydia Onwudiwe', email: 'onwudiwe@helpdesk.com', date: 'Aug 30, 2025', modified: 'Aug 30, 2025' },
    { name: 'Credit Card Authorization', template: 'Financial Template', status: 'Completed', recipient: 'Paul Agu', email: 'paulagu@service.com', date: 'Sept 12, 2025', modified: 'Sept 12, 2025' },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Recent Forms</h3>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 font-semibold">Form Name</th>
              <th scope="col" className="px-6 py-3 font-semibold">Status</th>
              <th scope="col" className="px-6 py-3 font-semibold">Recipient</th>
              <th scope="col" className="px-6 py-3 font-semibold">Date Sent</th>
              <th scope="col" className="px-6 py-3 font-semibold">Last Modified</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50 align-middle">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg mr-4 ${
                      form.name.includes('Tax') ? 'bg-orange-100 text-orange-600' :
                      form.template.includes('Financial') ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div>{form.name}</div>
                      <div className="text-xs text-gray-500">{form.template}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={form.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-800">{form.recipient}</div>
                  <div className="text-xs">{form.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{form.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{form.modified}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button className="hover:text-gray-800"><FiEye size={18} /></button>
                    <button className="hover:text-gray-800"><FiMoreVertical size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-5 border-t mt-[-1px]">
        <span className="text-sm text-gray-700 mb-4 md:mb-0">
          Showing <span className="font-semibold">5</span> of <span className="font-semibold">24</span>
        </span>
        <div className="inline-flex items-center -space-x-px">
          <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
            <FiChevronLeft size={16} />
          </button>
          <button className="px-4 py-2 leading-tight text-white bg-blue-600 border border-blue-600 hover:bg-blue-700">1</button>
          <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</button>
          <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">3</button>
          <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</button>
          <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</button>
          <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentFormsTable;