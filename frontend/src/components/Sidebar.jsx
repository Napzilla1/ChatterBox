import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/slices/chatSlice';

const Sidebar = () => {
    const [users, setUsers] = useState([]);
    const { onlineUsers } = useSelector((state) => state.socket);
    const { selectedUser } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/messages/users', {
                    withCredentials: true,
                });
                setUsers(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="w-1/3 border-r border-gray-300 p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Chats</h2>
            <div className="flex flex-col gap-2">
                {users.map((user) => (
                    <div 
                        key={user._id} 
                        className={`flex items-center gap-4 p-2 rounded-md cursor-pointer hover:bg-gray-100 ${selectedUser?._id === user._id ? 'bg-gray-200' : ''}`}
                        onClick={() => dispatch(setSelectedUser(user))}
                    >
                        <div className="relative">
                            <img src={user.profilePic || 'https://via.placeholder.com/40'} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-800">{user.name || user.username}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
