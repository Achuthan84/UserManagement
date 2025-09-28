import React from 'react';

const BulkActions = ({ onSuspend, onArchive, onDelete, selectedCount, isProcessing }) => {
    return (
        <div className="flex gap-2">
            <button
                onClick={onSuspend}
                disabled={selectedCount === 0 || isProcessing}
                className={`px-4 py-2 border rounded hover:bg-gray-100 ${selectedCount === 0 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-red-300 text-red-600 hover:bg-red-50'
                    }`}
            >
                Suspend all
            </button>
            <button
                onClick={onArchive}
                disabled={selectedCount === 0 || isProcessing}
                className={`px-4 py-2 border rounded hover:bg-gray-100 ${selectedCount === 0 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-yellow-300 text-yellow-600 hover:bg-yellow-50'
                    }`}
            >
                Archive all
            </button>
            <button
                onClick={onDelete}
                disabled={selectedCount === 0 || isProcessing}
                className={`px-4 py-2 border rounded hover:bg-gray-100 ${selectedCount === 0 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-red-600 text-red-600 hover:bg-red-50'
                    }`}
            >
                Delete all
            </button>
        </div>
    );
};

export default BulkActions;