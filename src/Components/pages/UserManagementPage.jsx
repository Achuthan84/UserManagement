// src/pages/UserManagementPage.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import Pagination from '../Ui/Pagination';
import BulkActions from '../Ui/BulkActions';
import UserAddModal from '../Modals/UserAddModal';
import SearchBar from '../Ui/SearchBar';
import UserTable from '../Ui/UserTable';

const UserManagementPage = () => {
  const { users, loading, addUser, updateUser, deleteUser } = useUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const handleAddUser = (data) => {
    if (editingUser) {
      updateUser(editingUser.id, data);
    } else {
      addUser(data);
    }
    setShowAddModal(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(id);
    }
  };

  const toggleUserSelection = (id) => {
    setSelectedUsers(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    if (currentUsers.length > 0 && selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(u => u.id));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0 || !window.confirm(`Are you sure you want to ${action} ${selectedUsers.length} user(s)?`)) return;
    
    setIsProcessing(true);
    try {
      if (action === 'suspend') {
        selectedUsers.forEach(id => {
          const user = users.find(u => u.id === id);
          if (user) updateUser(id, { ...user, isActive: false });
        });
      } else if (action === 'delete') {
        selectedUsers.forEach(id => deleteUser(id));
      }
      setSelectedUsers([]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setSelectedUsers([]);
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <button
          onClick={() => { setEditingUser(null); setShowAddModal(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} /> Add new user
        </button>
        <BulkActions
          onSuspend={() => handleBulkAction('suspend')}
          onArchive={() => handleBulkAction('archive')}
          onDelete={() => handleBulkAction('delete')}
          selectedCount={selectedUsers.length}
          isProcessing={isProcessing}
        />
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {filteredUsers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No users found</p>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="mt-4 text-blue-600 flex items-center justify-center gap-1 mx-auto"
          >
            <Plus size={16} /> Add your first user
          </button>
        </div>
      ) : (
        <>
          <UserTable
            users={currentUsers}
            selectedUsers={selectedUsers}
            onSelectUser={toggleUserSelection}
            onSelectAll={toggleAllSelection}
            onEdit={(user) => {
              // ✅ FIX: Get latest user from state
              const latestUser = users.find(u => u.id === user.id);
              setEditingUser(latestUser);
              setShowAddModal(true);
            }}
            onDelete={handleDeleteUser}
            onTogglePromote={(id, promote) => {
              const user = users.find(u => u.id === id);
              if (user) updateUser(id, { ...user, promote });
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPage={rowsPerPage}
            totalItems={filteredUsers.length}
            from={indexOfFirst + 1}
            to={Math.min(indexOfLast, filteredUsers.length)}
          />
        </>
      )}

      {showAddModal && (
        <UserAddModal
          onAddUser={handleAddUser}
          onCancel={() => { setShowAddModal(false); setEditingUser(null); }}
          initialData={editingUser}
        />
      )}
    </div>
  );
};

export default UserManagementPage;