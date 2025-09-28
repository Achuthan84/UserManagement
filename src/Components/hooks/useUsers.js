// src/hooks/useUsers.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // ✅ Fetch real users from JSONPlaceholder
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');

            // Transform to match your UI structure
            const transformed = response.data.map((user, index) => ({
                id: user.id,
                name: user.name,
                role: index % 3 === 0 ? 'Administrator' : index % 3 === 1 ? 'Moderator' : 'Viewer',
                isActive: Math.random() > 0.3,
                social: ['f', 'g'],
                rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
                lastLogin: `${Math.floor(Math.random() * 28) + 1} May 2024`,
                promote: Math.random() > 0.5,
                imageUrl: `https://i.pravatar.cc/150?img=${user.id}`
            }));

            setUsers(transformed);
        } catch (err) {
            console.error('Failed to fetch users:', err);
            // Fallback to empty array
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const addUser = (userData) => {
        const newId = Math.max(...users.map(u => u.id), 0) + 1;
        const newUser = {
            ...userData,
            id: newId,
            imageUrl: userData.imageUrl || `https://i.pravatar.cc/150?img=${newId}`
        };
        setUsers(prev => [newUser, ...prev]);
    };

    const updateUser = (id, updatedData) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...updatedData, id } : u));
    };

    const deleteUser = (id) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        loading,
        addUser,
        updateUser,
        deleteUser
    };
};