// pages/DashboardLayout.jsx
import React, {useState} from 'react';
import DashBoard from '../components/DashBoard';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='flex h-screen w-full'>
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-20' : 'w-64'}overflow-hidden transition-all duration-300 border-r border-gray-200 shadow-md`}>
        <DashBoard collapsed={collapsed} setCollapsed={setCollapsed}/>
      </div>

      {/* Right-side content */}
      <div className='flex-1 overflow-y-auto p-6'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
