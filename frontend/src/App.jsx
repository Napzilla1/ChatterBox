import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { logout } from './redux/slices/authSlice';
import { setSocket, setOnlineUsers } from './redux/slices/socketSlice';
import axios from 'axios';
import { useEffect } from 'react';
import io from 'socket.io-client';

function App() {
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
      if (user) {
          const socketInstance = io('http://localhost:8000', {
              query: {
                  userId: user._id,
              },
          });

          dispatch(setSocket(socketInstance));

          socketInstance.on('getOnlineUsers', (users) => {
              dispatch(setOnlineUsers(users));
          });

          return () => socketInstance.close();
      } else {
          if (socket) {
              socket.close();
              dispatch(setSocket(null));
          }
      }
  }, [user]);

  const handleLogout = async () => {
    try {
        await axios.post('http://localhost:8000/api/auth/logout');
        dispatch(logout());
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-200">
      {user && (
          <nav className="bg-white p-4 flex justify-between shadow-md">
            <h1 className="text-xl font-bold text-blue-500">ChatterBox</h1>
            <div className="flex gap-4 items-center">
                <Link to="/" className="text-gray-700 hover:text-blue-500">Chat</Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-500">Profile</Link>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button>
            </div>
          </nav>
      )}
      <div className="flex-1 p-4 flex items-center justify-center">
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to="/" /> : <Signup />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
