// pages/DashboardLayout.jsx
import React from 'react';
import DashBoard from '../components/DashBoard';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='flex h-screen w-full'>
      {/* Sidebar */}
      <div className='w-64 border-r border-gray-200 shadow-md'>
        <DashBoard />
      </div>

      {/* Right-side content */}
      <div className='flex-1 overflow-y-auto p-6'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
