// // UserAdd.jsx
// import React, { useState } from 'react';
// import { Facebook, Twitter, Instagram, Globe, Star, Upload, X } from 'lucide-react';

// const UserAdd = ({ onAddUser, onCancel, initialData = null }) => {
//   const [newUser, setNewUser] = useState({
//     name: initialData?.name || '',
//     role: initialData?.role || 'Viewer',
//     isActive: initialData?.isActive ?? true,
//     social: initialData?.social || [],
//     rating: initialData?.rating || 0,
//     lastLogin: initialData?.lastLogin || new Date().toLocaleDateString('en-GB', { 
//       day: 'numeric', 
//       month: 'short', 
//       year: 'numeric' 
//     }),
//     promote: initialData?.promote || false,
//     imageUrl: initialData?.imageUrl || ''
//   });
//   const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
//   const [imageFile, setImageFile] = useState(null);

//   const handleSocialChange = (platform) => {
//     setNewUser(prev => {
//       const current = prev.social || [];
//       if (current.includes(platform)) {
//         return { ...prev, social: current.filter(p => p !== platform) };
//       } else {
//         return { ...prev, social: [...current, platform] };
//       }
//     });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//         setNewUser(prev => ({ ...prev, imageUrl: e.target.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImagePreview('');
//     setImageFile(null);
//     setNewUser(prev => ({ ...prev, imageUrl: '' }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newUser.name.trim()) return;
    
//     // In a real app, you would upload the image file to your server
//     // For now, we'll just use the base64 preview URL
//     onAddUser({ ...newUser, imageFile });
//   };

//   return (
//  <div className="fixed inset-0 backdrop-blur-xs bg-white/15 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
//         <div className="p-6">
//           <h2 className="text-xl font-bold mb-4">
//             {initialData ? 'Edit User' : 'Add New User'}
//           </h2>
          
//           <form onSubmit={handleSubmit}>
//             {/* Image Upload */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
//               <div className="flex items-center space-x-4">
//                 {imagePreview ? (
//                   <div className="relative">
//                     <img 
//                       src={imagePreview} 
//                       alt="Preview" 
//                       className="w-16 h-16 rounded-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={removeImage}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                     >
//                       <X size={12} />
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
//                     <Upload size={20} className="text-gray-400" />
//                   </div>
//                 )}
//                 <label className="flex flex-col items-center px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
//                   <span className="text-sm font-medium text-blue-600">Choose File</span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                   <span className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</span>
//                 </label>
//               </div>
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
//               <input
//                 type="text"
//                 required
//                 value={newUser.name}
//                 onChange={(e) => setNewUser({...newUser, name: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 placeholder="Enter full name"
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//               <select
//                 value={newUser.role}
//                 onChange={(e) => setNewUser({...newUser, role: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               >
//                 <option value="Viewer">Viewer</option>
//                 <option value="Moderator">Moderator</option>
//                 <option value="Administrator">Administrator</option>
//               </select>
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={newUser.isActive}
//                   onChange={(e) => setNewUser({...newUser, isActive: e.target.checked})}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <span className="ml-2 text-sm text-gray-700">
//                   {newUser.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Promote User</label>
//               <div className="flex items-center">
//                 <label className="inline-flex relative items-center cursor-pointer">
//                   <input 
//                     type="checkbox" 
//                     checked={newUser.promote}
//                     onChange={(e) => setNewUser({...newUser, promote: e.target.checked})}
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                   <span className="ml-3 text-sm text-gray-700">
//                     {newUser.promote ? 'Promoted' : 'Not Promoted'}
//                   </span>
//                 </label>
//               </div>
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-1">Social Profiles</label>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   { id: 'f', icon: Facebook, label: 'Facebook' },
//                   { id: 't', icon: Twitter, label: 'Twitter' },
//                   { id: 'i', icon: Instagram, label: 'Instagram' },
//                   { id: 'g', icon: Globe, label: 'Website' }
//                 ].map((platform) => (
//                   <button
//                     key={platform.id}
//                     type="button"
//                     onClick={() => handleSocialChange(platform.id)}
//                     className={`p-2 rounded border flex flex-col items-center w-16 ${
//                       newUser.social?.includes(platform.id) 
//                         ? 'bg-blue-100 border-blue-500 text-blue-700' 
//                         : 'bg-gray-100 border-gray-300 text-gray-700'
//                     }`}
//                     title={platform.label}
//                   >
//                     <platform.icon size={18} />
//                     <span className="text-xs mt-1">{platform.label.substring(0, 3)}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onCancel}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 {initialData ? 'Update User' : 'Add User'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserAdd;