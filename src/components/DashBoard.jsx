import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdStars, MdOutlineDashboard } from "react-icons/md";
import { FaAngleLeft } from "react-icons/fa";
import { IoCompassOutline } from "react-icons/io5";
import { GoStack } from "react-icons/go";
import { FiTarget } from "react-icons/fi";
import { RiContactsLine } from "react-icons/ri";
import { TbMessages } from "react-icons/tb";
import { RiPieChartLine } from "react-icons/ri";
import { IoMdContacts } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { AiOutlineCreditCard } from "react-icons/ai";


const DashBoard = ({collapsed, setCollapsed}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuSections = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", path: "/dashboard/home", icon: <MdOutlineDashboard className='text-2xl' /> },
      { name: "Discovery", path: "/dashboard/discovery", icon: <IoCompassOutline className='text-2xl' /> },
      { name: "Collection", path: "/dashboard/collection", icon: <GoStack className='text-2xl' /> },
      { name: "Target Collaboration", path: "/dashboard/target", icon: <FiTarget className='text-2xl' /> },
      { name: "Open Collaboration", path: "/dashboard/open", icon: <TbMessages className='text-xl' /> },
      { name: "CRM", path: "/dashboard/contacts", icon: <RiContactsLine className='text-xl' /> },
    ]
  },
  {
    title: "ANALYTICS",
    items: [
      { name: "Request Analysis", path: "/dashboard/analytics/request", icon: <RiPieChartLine className='text-2xl' /> },
      { name: "Competitor Creators", path: "/dashboard/analytics/competitors", icon: <IoMdContacts className='text-2xl' /> },
    ]
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Billing and Address", path: "/dashboard/settings/billing", icon: <AiOutlineCreditCard className='text-2xl'/>},
      { name: "Settings", path: "/dashboard/settings/setting", icon: <LuSettings className='text-2xl' /> }
    ]
  }
];


  return (
    <div className={`h-screen border-gray-200 border-1 flex flex-col ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>

      
      {/* Top Logo */}
      <div className='w-full h-18 flex flex-row justify-between items-center border border-gray-200 px-3'>
        <div className='flex items-center gap-5 cursor-pointer'>
          <MdStars className='text-2xl' />
          {!collapsed && <p className='font-medium text-xl'>Spotlight labs</p>}
        </div>
        <button onClick={() => setCollapsed(!collapsed)}>
          <FaAngleLeft className={`text-gray-500 cursor-pointer transform transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className='flex flex-col gap-2 w-full'>

        {/* <div className='w-63 h-12 flex flex-row justify-center items-center gap-5'>
          <p className='text-[12px] font-bold text-gray-500'>MAIN</p>
          <div className='w-40 border border-gray-200'></div>
        </div> */}

    {menuSections.map((section, idx) => (
        <div key={idx} className="flex flex-col gap-0 mt-5 w-full px-2">

        <div className='h-12 flex items-center gap-3 px-2'>

        {!collapsed && (
        <div className='text-[12px] font-bold text-gray-500 '>{section.title}</div>
    )} 

    {/* <div className='text-[12px] font-bold text-gray-500'>{section.title}</div> */}
    {!collapsed && <div className='flex-1 border-t border-gray-200'></div>}


    </div>

    {section.items.map((item, index) => {
      const isActive =
        (item.path === '/dashboard/home' && location.pathname === '/dashboard') ||
        location.pathname === item.path;

      return (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className={`w-full h-10 flex items-center ${
            collapsed ? 'justify-center px-0' : 'justify-start px-4'
          } gap-3 rounded-lg transition-all duration-300 cursor-pointer
          ${isActive ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}`}
        >
            <span>{item.icon}</span>
          {!collapsed && <p className='text-base font-medium'>{item.name}</p>}
        </button>

      );
    })}
  </div>
))}


      </div>
    </div>
  );
};

export default DashBoard;
