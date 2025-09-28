// src/App.jsx
import React from 'react';
import UserManagementPage from './Components/pages/UserManagementPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <UserManagementPage />
        </div>
      </main>
    </div>
  );
}

export default App;