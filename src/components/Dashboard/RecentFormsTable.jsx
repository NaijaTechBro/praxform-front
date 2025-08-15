// import React from 'react';
// import { FiSearch, FiEye, FiMoreVertical, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// const StatusBadge = ({ status }) => {
//   const baseStyle = "px-3 py-1 text-xs font-medium rounded-full inline-block";
//   const styles = {
//     Completed: "bg-green-100 text-green-800",
//     Pending: "bg-yellow-100 text-yellow-800",
//     Expired: "bg-red-100 text-red-800",
//     Draft: "bg-blue-100 text-blue-800",
//   };
//   return <span className={`${baseStyle} ${styles?.[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
// };

// const RecentFormsTable = () => {
//   const forms = [
//     { name: 'W-9 Tax Form', template: 'Tax Template', status: 'Expired', recipient: 'Praise Dominic', email: 'dominic@mail.com', date: 'May 28, 2025', modified: 'May 29, 2025' },
//     { name: 'Credit Card Authorization', template: 'Financial Template', status: 'Completed', recipient: 'Philip Oyedepo', email: 'philip@mail.com', date: 'June 15, 2025', modified: 'June 15, 2025' },
//     { name: 'Non-Disclosure Agreement', template: 'Financial Template', status: 'Pending', recipient: 'Sarah Wariboko', email: 'sarah@website.com', date: 'July 22, 2025', modified: 'July 22, 2025' },
//     { name: 'ACH Authorization', template: 'Legal Template', status: 'Draft', recipient: 'Lydia Onwudiwe', email: 'onwudiwe@helpdesk.com', date: 'Aug 30, 2025', modified: 'Aug 30, 2025' },
//     { name: 'Credit Card Authorization', template: 'Financial Template', status: 'Completed', recipient: 'Paul Agu', email: 'paulagu@service.com', date: 'Sept 12, 2025', modified: 'Sept 12, 2025' },
//   ];

//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
//         <h3 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Recent Forms</h3>
//         <div className="relative">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//             <FiSearch className="text-gray-400" />
//           </span>
//           <input
//             type="text"
//             placeholder="Search"
//             className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left text-gray-600">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 font-semibold">Form Name</th>
//               <th scope="col" className="px-6 py-3 font-semibold">Status</th>
//               <th scope="col" className="px-6 py-3 font-semibold">Recipient</th>
//               <th scope="col" className="px-6 py-3 font-semibold">Date Sent</th>
//               <th scope="col" className="px-6 py-3 font-semibold">Last Modified</th>
//               <th scope="col" className="px-6 py-3 font-semibold text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {forms.map((form, index) => (
//               <tr key={index} className="bg-white border-b hover:bg-gray-50 align-middle">
//                 <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className={`w-8 h-8 flex items-center justify-center rounded-lg mr-4 ${
//                       form.name.includes('Tax') ? 'bg-orange-100 text-orange-600' :
//                       form.template.includes('Financial') ? 'bg-green-100 text-green-600' :
//                       'bg-purple-100 text-purple-600'
//                     }`}>
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <div>{form.name}</div>
//                       <div className="text-xs text-gray-500">{form.template}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4">
//                   <StatusBadge status={form.status} />
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="font-medium text-gray-800">{form.recipient}</div>
//                   <div className="text-xs">{form.email}</div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">{form.date}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{form.modified}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center space-x-4 text-gray-500">
//                     <button className="hover:text-gray-800"><FiEye size={18} /></button>
//                     <button className="hover:text-gray-800"><FiMoreVertical size={18} /></button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex flex-col md:flex-row items-center justify-between pt-5 border-t mt-[-1px]">
//         <span className="text-sm text-gray-700 mb-4 md:mb-0">
//           Showing <span className="font-semibold">5</span> of <span className="font-semibold">24</span>
//         </span>
//         <div className="inline-flex items-center -space-x-px">
//           <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
//             <FiChevronLeft size={16} />
//           </button>
//           <button className="px-4 py-2 leading-tight text-white bg-blue-600 border border-blue-600 hover:bg-blue-700">1</button>
//           <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</button>
//           <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">3</button>
//           <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">4</button>
//           <button className="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">5</button>
//           <button className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
//             <FiChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentFormsTable;


import React, { useState } from 'react';

// Inline SVG icons to replace external dependencies
const iconEye = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

const iconEllipsis = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
);

const iconSearch = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

// Form Card icons
const iconFileYellow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);
const iconFileGreen = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);
const iconFileBlue = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);
const iconFilePurple = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);


const RecentFormsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 24;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getFormIcon = (formName) => {
    switch (formName) {
      case 'W-9 Tax Form': return iconFileYellow;
      case 'Credit Card Authorization': return iconFileGreen;
      case 'Non-Disclosure Agreement': return iconFileBlue;
      case 'ACH Authorization': return iconFilePurple;
      default: return iconFileGreen;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Expired': return 'text-red-500 bg-red-100';
      case 'Completed': return 'text-green-500 bg-green-100';
      case 'Pending': return 'text-yellow-500 bg-yellow-100';
      case 'Draft': return 'text-blue-500 bg-blue-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const formsData = [
    { id: 1, name: 'W-9 Tax Form', sub: 'Tax Template', status: 'Expired', recipient: 'Praise Dominic', recipientEmail: 'dominic@mail.com', dateSent: 'May 28, 2025', lastModified: 'May 29, 2025' },
    { id: 2, name: 'Credit Card Authorization', sub: 'Financial Template', status: 'Completed', recipient: 'Philip Oyedepo', recipientEmail: 'philip@mail.com', dateSent: 'June 15, 2025', lastModified: 'June 15, 2025' },
    { id: 3, name: 'Non-Disclosure Agreement', sub: 'Financial Template', status: 'Pending', recipient: 'Sarah Wariboko', recipientEmail: 'sarah@website.com', dateSent: 'July 22, 2025', lastModified: 'July 22, 2025' },
    { id: 4, name: 'ACH Authorization', sub: 'Legal Template', status: 'Draft', recipient: 'Lydia Onwudiwe', recipientEmail: 'onwudiwe@helpdesk.com', dateSent: 'Aug 30, 2025', lastModified: 'Aug 30, 2025' },
    { id: 5, name: 'Credit Card Authorization', sub: 'Financial Template', status: 'Completed', recipient: 'Paul Agu', recipientEmail: 'paulagu@service.com', dateSent: 'Sept 12, 2025', lastModified: 'Sept 12, 2025' },
  ];

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-7xl mx-auto">
        {/* Header with Search Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">Recent Forms</h1>
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

        {/* Forms Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">FORM NAME</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">RECIPIENT</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">DATE SENT</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">LAST MODIFIED</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formsData.map(form => (
                <tr key={form.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                        {getFormIcon(form.name)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{form.name}</div>
                        <div className="text-sm text-gray-500">{form.sub}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(form.status)}`}>
                      {form.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{form.recipient}</div>
                    <div className="text-sm text-gray-500">{form.recipientEmail}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{form.dateSent}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{form.lastModified}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-500 hover:text-gray-900 transition-colors">
                        {iconEye}
                      </button>
                      <button className="text-gray-500 hover:text-gray-900 transition-colors">
                        {iconEllipsis}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {formsData.length} of {totalItems}
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

export default RecentFormsTable;