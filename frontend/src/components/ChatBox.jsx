import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setMessages, addMessage } from '../redux/slices/chatSlice';

const ChatBox = () => {
    const { selectedUser, messages } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);
    const { socket } = useSelector((state) => state.socket);
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState('');
    const [newImage, setNewImage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser) return;
            try {
                const res = await axios.get(`http://localhost:8000/api/messages/${selectedUser._id}`, {
                    withCredentials: true,
                });
                dispatch(setMessages(res.data));
            } catch (error) {
                console.error(error);
            }
        };
        fetchMessages();
    }, [selectedUser, dispatch]);

    useEffect(() => {
        if (!socket) return;
        socket.on('newMessage', (newMessageData) => {
            if (selectedUser && newMessageData.senderId === selectedUser._id) {
                dispatch(addMessage(newMessageData));
            }
        });
        return () => socket.off('newMessage');
    }, [socket, selectedUser, dispatch]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() && !newImage) return;

        try {
            const res = await axios.post(`http://localhost:8000/api/messages/send/${selectedUser._id}`, {
                message: newMessage,
                image: newImage,
            }, {
                withCredentials: true,
            });
            dispatch(addMessage(res.data));
            setNewMessage('');
            setNewImage('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setNewImage(reader.result);
            };
        }
    };

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-xl text-gray-500">Select a chat to start messaging</p>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b border-gray-300 flex items-center gap-4">
                <img src={selectedUser.profilePic || 'https://via.placeholder.com/40'} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                <h3 className="font-semibold text-gray-800">{selectedUser.name || selectedUser.username}</h3>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-2">
                {messages.map((msg) => {
                    const isMine = msg.senderId === user._id;
                    return (
                        <div key={msg._id} className={`flex flex-col max-w-xs ${isMine ? 'self-end items-end' : 'self-start items-start'}`}>
                            <div className={`p-2 rounded-lg ${isMine ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.image && <img src={msg.image} alt="attachment" className="max-w-[200px] rounded-md mb-2" />}
                                {msg.message && <p>{msg.message}</p>}
                            </div>
                            <span className="text-xs text-gray-400 mt-1">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                        </div>
                    );
                })}
                <div ref={messagesEndRef}></div>
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-300 flex items-center gap-2">
                <label className="cursor-pointer text-gray-500 hover:text-blue-500 text-2xl">
                    🖼️
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
                {newImage && <span className="text-xs text-green-500">Image selected</span>}
                <input 
                    type="text" 
                    className="flex-1 border rounded-md p-2 outline-none focus:border-blue-500" 
                    placeholder="Type a message..." 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)} 
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
