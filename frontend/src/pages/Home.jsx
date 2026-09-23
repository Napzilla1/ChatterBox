import React from 'react';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';

const Home = () => {
  return (
    <div className="flex h-[80vh] w-[80vw] max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
      <Sidebar />
      <ChatBox />
    </div>
  );
};

export default Home;
