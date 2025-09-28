// // UserManagement.jsx
// import React, { useState, useEffect } from 'react';
// import { Search, Plus, MoreVertical, CheckCircle, XCircle, Facebook, Twitter, Instagram, Globe, ChevronLeft, ChevronRight, Edit, Trash2, Star } from 'lucide-react';
// import axios from 'axios';
// import UserAdd from './UserAdd';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);

//   // API configuration - REPLACE WITH YOUR ACTUAL API
//   const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
//   const USERS_ENDPOINT = '/users';

//   // Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}${USERS_ENDPOINT}`);
      
//       // Transform API data to match our structure
//       const transformedUsers = response.data.map((user, index) => ({
//         id: user.id,
//         name: user.name,
//         role: index % 3 === 0 ? 'Administrator' : index % 3 === 1 ? 'Moderator' : 'Viewer',
//         isActive: Math.random() > 0.3,
//         social: ['f', 'g'],
//         rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
//         lastLogin: `${Math.floor(Math.random() * 30) + 1} Nov 2022`,
//         promote: Math.random() > 0.5,
//         imageUrl: `https://i.pravatar.cc/150?img=${user.id}`
//       }));
      
//       setUsers(transformedUsers);
//       setSelectedUsers([]); // Reset selection when data changes
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       setUsers([]);
//       setSelectedUsers([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add/Edit user
//   const handleAddUser = async (userData) => {
//     try {
//       if (editingUser) {
//         // Update existing user
//         const updatedUsers = users.map(user => 
//           user.id === editingUser.id ? { ...userData, id: editingUser.id } : user
//         );
//         setUsers(updatedUsers);
//         setEditingUser(null);
//       } else {
//         // Add new user
//         const apiData = {
//           name: userData.name,
//           username: userData.name.toLowerCase().replace(/\s+/g, ''),
//           email: `${userData.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
//         };

//         const response = await axios.post(`${API_BASE_URL}${USERS_ENDPOINT}`, apiData);
//         const newUser = { id: response.data.id, ...userData };
//         setUsers(prev => [newUser, ...prev]);
//       }
//       setShowAddModal(false);
//     } catch (error) {
//       console.error('Error saving user:', error);
//       alert('Failed to save user. Please try again.');
//     }
//   };

//   // Delete user
//   const handleDeleteUser = async (userId) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) return;
    
//     try {
//       await axios.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}`);
//       setUsers(users.filter(user => user.id !== userId));
//       setSelectedUsers(prev => prev.filter(id => id !== userId));
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       alert('Failed to delete user. Please try again.');
//     }
//   };

//   // Toggle user selection
//   const toggleUserSelection = (userId) => {
//     setSelectedUsers(prev => 
//       prev.includes(userId) 
//         ? prev.filter(id => id !== userId) 
//         : [...prev, userId]
//     );
//   };

//   // Toggle all users selection
//   const toggleAllSelection = () => {
//     if (selectedUsers.length === currentUsers.length && currentUsers.length > 0) {
//       setSelectedUsers([]);
//     } else {
//       setSelectedUsers(currentUsers.map(user => user.id));
//     }
//   };

//   // Bulk actions
//   const handleBulkAction = async (action) => {
//     if (selectedUsers.length === 0) return;
    
//     if (!window.confirm(`Are you sure you want to ${action} ${selectedUsers.length} user(s)?`)) return;
    
//     setIsProcessing(true);
//     try {
//       switch (action) {
//         case 'suspend':
//           // Update status to inactive
//           const suspendedUsers = users.map(user => 
//             selectedUsers.includes(user.id) ? { ...user, isActive: false } : user
//           );
//           setUsers(suspendedUsers);
//           break;
          
//         case 'archive':
//           // In a real app, you might add an 'archived' flag
//           // For now, we'll just remove them from the list
//           const archivedUsers = users.filter(user => !selectedUsers.includes(user.id));
//           setUsers(archivedUsers);
//           break;
          
//         case 'delete':
//           // Delete all selected users
//           for (const userId of selectedUsers) {
//             await axios.delete(`${API_BASE_URL}${USERS_ENDPOINT}/${userId}`);
//           }
//           const deletedUsers = users.filter(user => !selectedUsers.includes(user.id));
//           setUsers(deletedUsers);
//           break;
          
//         default:
//           break;
//       }
//       setSelectedUsers([]);
//     } catch (error) {
//       console.error(`Error during ${action}:`, error);
//       alert(`Failed to ${action} users. Please try again.`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Filter users based on search term
//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination
//   const indexOfLastUser = currentPage * rowsPerPage;
//   const indexOfFirstUser = indexOfLastUser - rowsPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

//   // Handle page change
//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     setSelectedUsers([]); // Reset selection when changing pages
//   };

//   // Handle rows per page change
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//     setSelectedUsers([]);
//   };

//   // Fixed pagination logic
//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisiblePages = 5;
    
//     if (totalPages <= maxVisiblePages) {
//       // Show all pages
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);
      
//       if (currentPage > 3) {
//         pages.push('...');
//       }
      
//       // Show current page and neighbors
//       const startPage = Math.max(2, currentPage - 1);
//       const endPage = Math.min(totalPages - 1, currentPage + 1);
      
//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(i);
//       }
      
//       if (currentPage < totalPages - 2) {
//         pages.push('...');
//       }
      
//       // Always show last page
//       if (totalPages > 1) {
//         pages.push(totalPages);
//       }
//     }
    
//     return pages;
//   };

//   if (loading) {
//     return (
//       <div className="p-6 bg-white rounded-lg shadow">
//         <div className="animate-pulse">
//           <div className="h-8 bg-gray-200 rounded mb-4"></div>
//           <div className="space-y-4">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div key={i} className="flex items-center p-4 bg-gray-100 rounded">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full mr-4"></div>
//                 <div className="flex-1 space-y-2">
//                   <div className="h-4 bg-gray-300 rounded w-3/4"></div>
//                   <div className="h-3 bg-gray-300 rounded w-1/2"></div>
//                 </div>
//                 <div className="w-16 h-8 bg-gray-300 rounded ml-4"></div>
//                 <div className="w-24 h-8 bg-gray-300 rounded ml-4"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <button 
//           onClick={() => {
//             setEditingUser(null);
//             setShowAddModal(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
//         >
//           <Plus size={18} />
//           Add new user
//         </button>
        
//         <div className="flex gap-2">
//           <button 
//             onClick={() => handleBulkAction('suspend')}
//             disabled={selectedUsers.length === 0 || isProcessing}
//             className={`px-4 py-2 border rounded hover:bg-gray-100 ${
//               selectedUsers.length === 0 
//                 ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
//                 : 'border-red-300 text-red-600 hover:bg-red-50'
//             }`}
//           >
//             Suspend all
//           </button>
//           <button 
//             onClick={() => handleBulkAction('archive')}
//             disabled={selectedUsers.length === 0 || isProcessing}
//             className={`px-4 py-2 border rounded hover:bg-gray-100 ${
//               selectedUsers.length === 0 
//                 ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
//                 : 'border-yellow-300 text-yellow-600 hover:bg-yellow-50'
//             }`}
//           >
//             Archive all
//           </button>
//           <button 
//             onClick={() => handleBulkAction('delete')}
//             disabled={selectedUsers.length === 0 || isProcessing}
//             className={`px-4 py-2 border rounded hover:bg-gray-100 ${
//               selectedUsers.length === 0 
//                 ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
//                 : 'border-red-600 text-red-600 hover:bg-red-50'
//             }`}
//           >
//             Delete all
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="mb-4 relative">
//         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//           <Search className="h-5 w-5 text-gray-400" />
//         </div>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search users..."
//           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//         />
//       </div>

//       {/* Table */}
//       {filteredUsers.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No users found</p>
//           <button 
//             onClick={() => {
//               setEditingUser(null);
//               setShowAddModal(true);
//             }}
//             className="mt-4 text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1 mx-auto"
//           >
//             <Plus size={16} />
//             Add your first user
//           </button>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
//                   <input
//                     type="checkbox"
//                     checked={currentUsers.length > 0 && selectedUsers.length === currentUsers.length}
//                     onChange={toggleAllSelection}
//                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   />
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   USER
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   USER ROLE
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   STATUS
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   SOCIAL PROFILE
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   PROMOTE
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   RATING
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   LAST LOGIN
//                 </th>
//                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   ACTIONS
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentUsers.map((user) => (
//                 <tr 
//                   key={user.id} 
//                   className={`hover:bg-gray-50 ${user.isActive ? '' : 'bg-gray-50'}`}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <input
//                       type="checkbox"
//                       checked={selectedUsers.includes(user.id)}
//                       onChange={() => toggleUserSelection(user.id)}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                     />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0 h-8 w-8">
//                         <img 
//                           className="h-8 w-8 rounded-full object-cover" 
//                           src={user.imageUrl || `https://placehold.co/40x40?text=${user.name.charAt(0)}`} 
//                           alt={user.name} 
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{user.name}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                       user.role === 'Administrator' ? 'bg-blue-100 text-blue-800' :
//                       user.role === 'Moderator' ? 'bg-purple-100 text-purple-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <span className={`w-2 h-2 rounded-full mr-2 ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                       <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
//                         {user.isActive ? 'Active' : 'Inactive'}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex space-x-1">
//                       {user.social.map((social, index) => (
//                         <span key={index} className="text-xs text-gray-500">
//                           {social === 'f' && <Facebook size={14} />}
//                           {social === 'g' && <Globe size={14} />}
//                           {social === 't' && <Twitter size={14} />}
//                           {social === '+' && <span>+{social.substring(1)}</span>}
//                           {social === 'i' && <Instagram size={14} />}
//                         </span>
//                       ))}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <label className="inline-flex relative items-center cursor-pointer">
//                         <input 
//                           type="checkbox" 
//                           checked={user.promote}
//                           onChange={(e) => {
//                             // In a real app, you would update this via API
//                             const updatedUsers = users.map(u => 
//                               u.id === user.id ? { ...u, promote: e.target.checked } : u
//                             );
//                             setUsers(updatedUsers);
//                           }}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                       </label>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       {user.rating >= 4.5 ? (
//                         <CheckCircle className="text-green-500 mr-1" size={16} />
//                       ) : (
//                         <XCircle className="text-red-500 mr-1" size={16} />
//                       )}
//                       <span className={`text-sm ${user.rating >= 4.5 ? 'text-green-600' : 'text-red-600'}`}>
//                         {user.rating}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {user.lastLogin}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex justify-end space-x-2">
//                       <button 
//                         onClick={() => {
//                           setEditingUser(user);
//                           setShowAddModal(true);
//                         }}
//                         className="text-blue-600 hover:text-blue-900"
//                         title="Edit"
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteUser(user.id)}
//                         className="text-red-600 hover:text-red-900"
//                         title="Delete"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Footer */}
//       {filteredUsers.length > 0 && (
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
//           <div className="flex items-center space-x-2">
//             <span className="text-sm text-gray-500">Rows per page</span>
//             <select 
//               value={rowsPerPage} 
//               onChange={handleRowsPerPageChange}
//               className="border border-gray-300 rounded px-2 py-1 text-sm"
//             >
//               <option value={5}>5</option>
//               <option value={10}>10</option>
//               <option value={20}>20</option>
//               <option value={50}>50</option>
//             </select>
//             <span className="text-sm text-gray-500">
//               {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length}
//             </span>
//             {selectedUsers.length > 0 && (
//               <span className="ml-4 text-sm font-medium text-blue-600">
//                 {selectedUsers.length} selected
//               </span>
//             )}
//           </div>
          
//           <div className="flex items-center space-x-1 mt-4 sm:mt-0">
//             <button 
//               onClick={() => paginate(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 border border-gray-300 rounded ${
//                 currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
//               }`}
//             >
//               <ChevronLeft size={16} />
//             </button>
            
//             {getPageNumbers().map((pageNum, index) => (
//               <React.Fragment key={index}>
//                 {pageNum === '...' ? (
//                   <span className="px-3 py-1">...</span>
//                 ) : (
//                   <button
//                     onClick={() => paginate(pageNum)}
//                     className={`px-3 py-1 border border-gray-300 rounded ${
//                       pageNum === currentPage ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 )}
//               </React.Fragment>
//             ))}
            
//             <button 
//               onClick={() => paginate(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1 border border-gray-300 rounded ${
//                 currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
//               }`}
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Add/Edit User Modal */}
//       {showAddModal && (
//         <UserAdd 
//           onAddUser={handleAddUser} 
//           onCancel={() => {
//             setShowAddModal(false);
//             setEditingUser(null);
//           }}
//           initialData={editingUser}
//         />
//       )}
//     </div>
//   );
// };

// export default UserManagement;