import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setAuthUser } from '../redux/slices/authSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState(user?.name || '');
    const [profilePic, setProfilePic] = useState(user?.profilePic || '');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProfilePic(reader.result);
            };
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put('http://localhost:8000/api/auth/update', {
                name,
                profilePic,
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            dispatch(setAuthUser(res.data));
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.error || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-white">
                <h1 className="text-3xl font-semibold text-center text-gray-800">
                    Profile Setup
                </h1>
                <form onSubmit={handleUpdate} className="mt-4">
                    <div className="flex flex-col items-center mb-4">
                        <img 
                            src={profilePic || 'https://via.placeholder.com/150'} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover border border-gray-300"
                        />
                        <label className="mt-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Upload Image
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                    </div>
                    <div>
                        <label className="label p-2"><span className="text-base label-text">Display Name</span></label>
                        <input type="text" placeholder="Enter display name" className="w-full input input-bordered h-10 px-3 py-2 border rounded-md"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <button disabled={loading} className="w-full bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600">
                            {loading ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
