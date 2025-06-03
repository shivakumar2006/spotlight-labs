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


const DashBoard = () => {
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
      { name: "Contacts", path: "/dashboard/contacts", icon: <RiContactsLine className='text-xl' /> },
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
      { name: "Settings", path: "/dashboard/settings", icon: <FaAngleLeft className='text-2xl' /> }
    ]
  }
];


  return (
    <div className='w-63 h-screen border-gray-200 border flex flex-col items-center'>
      
      {/* Top Logo */}
      <div className='w-63 h-18 flex flex-row justify-center items-center border border-gray-200 shadow-sm gap-5 cursor-pointer' onClick={() => navigate("/")}>
        <MdStars className='text-2xl' />
        <p className='font-medium text-xl'>Spotlight labs</p>
        <FaAngleLeft className='text-gray-500' />
      </div>

      {/* Sidebar Menu */}
      <div className='w-63 flex flex-col items-center gap-2 '>
        {/* <div className='w-63 h-12 flex flex-row justify-center items-center gap-5'>
          <p className='text-[12px] font-bold text-gray-500'>MAIN</p>
          <div className='w-40 border border-gray-200'></div>
        </div> */}

        {menuSections.map((section, idx) => (
  <div key={idx} className="w-63 flex flex-col items-center gap-2 mt-5">
    <div className='w-63 h-12 flex flex-row justify-center items-center gap-5'>
      <p className='text-[12px] font-bold text-gray-500'>{section.title}</p>
      <div className='w-30 border border-gray-200'></div>
    </div>

    {section.items.map((item, index) => {
      const isActive =
        (item.path === '/dashboard/home' && location.pathname === '/dashboard') ||
        location.pathname === item.path;

      return (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className={`w-60 h-10 ml-1 rounded-lg flex items-center gap-4 px-4 transition-all duration-300 cursor-pointer
            ${isActive ? 'bg-black text-white' : 'text-black hover:bg-gray-100'}
          `}
        >
          <span>{item.icon}</span>
          <p className='text-base font-medium'>{item.name}</p>
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
