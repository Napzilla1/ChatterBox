import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/slices/authSlice';

const Login = () => {
    const [inputs, setInputs] = useState({ username: '', password: '' });
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', inputs, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            dispatch(setAuthUser(res.data));
            toast.success("Login successful");
        } catch (error) {
            toast.error(error.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-white">
                <h1 className="text-3xl font-semibold text-center text-gray-800">
                    Login <span className="text-blue-500">ChatterBox</span>
                </h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <label className="label p-2"><span className="text-base label-text">Username</span></label>
                        <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10 px-3 py-2 border rounded-md"
                            value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="label p-2"><span className="text-base label-text">Password</span></label>
                        <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10 px-3 py-2 border rounded-md"
                            value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>
                    <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block">
                        Don't have an account?
                    </Link>
                    <div>
                        <button className="w-full bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
