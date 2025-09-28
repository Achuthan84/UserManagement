// src/components/ui/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="mb-4 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search users..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

export default SearchBar;