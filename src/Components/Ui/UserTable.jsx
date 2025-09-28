import React from 'react';
import { Facebook, Twitter, Instagram, Globe, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';

const UserTable = ({
    users,
    selectedUsers,
    onSelectUser,
    onSelectAll,
    onEdit,
    onDelete,
    onTogglePromote
}) => {
    if (users.length === 0) return null;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                            <input
                                type="checkbox"
                                checked={users.length > 0 && selectedUsers.length === users.length}
                                onChange={onSelectAll}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </th>
                        {/* ... other headers ... */}
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USER</th>
                        <th>USER ROLE</th>
                        <th>STATUS</th>
                        <th>SOCIAL PROFILE</th>
                        <th>PROMOTE</th>
                        <th>RATING</th>
                        <th>LAST LOGIN</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id} className={`hover:bg-gray-50 ${user.isActive ? '' : 'bg-gray-50'}`}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => onSelectUser(user.id)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-8 w-8 rounded-full object-cover"
                                        src={user.imageUrl || `https://placehold.co/40x40?text=${user.name.charAt(0)}`}
                                        alt={user.name} />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'Administrator' ? 'bg-blue-100 text-blue-800' :
                                        user.role === 'Moderator' ? 'bg-purple-100 text-purple-800' :
                                            'bg-gray-100 text-gray-800'
                                    }`}>
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <span className={`w-2 h-2 rounded-full mr-2 ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                        {user.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-1">
                                    {user.social.map((s, i) => (
                                        <span key={i} className="text-xs text-gray-500">
                                            {s === 'f' && <Facebook size={14} />}
                                            {s === 'g' && <Globe size={14} />}
                                            {s === 't' && <Twitter size={14} />}
                                            {s === 'i' && <Instagram size={14} />}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <label className="inline-flex relative items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={user.promote}
                                        onChange={(e) => onTogglePromote(user.id, e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                </label>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    {user.rating >= 4.5 ? (
                                        <CheckCircle className="text-green-500 mr-1" size={16} />
                                    ) : (
                                        <XCircle className="text-red-500 mr-1" size={16} />
                                    )}
                                    <span className={`text-sm ${user.rating >= 4.5 ? 'text-green-600' : 'text-red-600'}`}>
                                        {user.rating}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.lastLogin}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                    <button onClick={() => onEdit(user)} className="text-blue-600 hover:text-blue-900" title="Edit">
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;