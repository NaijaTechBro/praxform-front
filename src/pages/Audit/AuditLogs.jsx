import React, { useState } from 'react';

// Inline SVG icons to replace external dependencies
const iconSearch = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const AuditLogs = () => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 30; // Mock total items for pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Mock data for audit logs based on the provided schema
  const auditLogsData = [
    {
      id: 1,
      user: 'Praise Dominic',
      action: 'Form Sent',
      resourceType: 'W-9 Tax Form',
      details: 'Form sent to john.doe@example.com',
      timestamp: '2025-05-28T10:30:00Z',
    },
    {
      id: 2,
      user: 'Philip Oyedepo',
      action: 'Form Viewed',
      resourceType: 'Credit Card Authorization',
      details: 'Form was viewed by the recipient.',
      timestamp: '2025-06-15T14:45:00Z',
    },
    {
      id: 3,
      user: 'Praise Dominic',
      action: 'Form Edited',
      resourceType: 'Non-Disclosure Agreement',
      details: 'Recipient name changed from Jane to Sarah',
      timestamp: '2025-07-22T08:00:00Z',
    },
    {
      id: 4,
      user: 'Lydia Onwudiwe',
      action: 'Form Signed',
      resourceType: 'ACH Authorization',
      details: 'Signature completed by Lydia Onwudiwe',
      timestamp: '2025-08-30T16:20:00Z',
    },
    {
      id: 5,
      user: 'Paul Agu',
      action: 'Form Sent',
      resourceType: 'Credit Card Authorization',
      details: 'Form sent to paulagu@service.com',
      timestamp: '2025-09-12T11:10:00Z',
    },
  ];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Helper function to get color classes for action status
  const getActionClass = (action) => {
    switch (action) {
      case 'Form Sent':
        return 'text-blue-500 bg-blue-100';
      case 'Form Viewed':
        return 'text-green-500 bg-green-100';
      case 'Form Edited':
        return 'text-yellow-500 bg-yellow-100';
      case 'Form Signed':
        return 'text-purple-500 bg-purple-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-7xl mx-auto">
        {/* Header with Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Audit Logs</h1>
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {iconSearch}
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-full sm:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">TIMESTAMP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">USER</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ACTION</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">RESOURCE TYPE</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">DETAILS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditLogsData.map(log => (
                <tr key={log.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(log.timestamp)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getActionClass(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                    {log.resourceType}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 hidden lg:table-cell">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {auditLogsData.length} of {totalItems}
          </div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            {[...Array(totalPages).keys()].map(page => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === page + 1
                    ? 'z-10 bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};


export default AuditLogs;
