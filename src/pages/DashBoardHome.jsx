import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";
import { GiNetworkBars } from "react-icons/gi";
import { FiMessageCircle } from "react-icons/fi";
import { IoPeopleOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

const DashBoardHome = () => {

    const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-6'>
      {/* Top Bar */}
      <div className='w-full h-18 border-b border-gray-200 border-2 rounded-xl flex justify-end items-center px-6 gap-5 bg-white'>

        <button className='w-50 h-10 text-white text-[15px] bg-black rounded-xl cursor-pointer'
            onClick={() => navigate("/pricing")}
        >
            Upgrade to Premium
        </button>
        <div className='w-10 h-10 rounded-full border-1 bg-gray-50 cursor-pointer'>
            <img src={user} className='w-full h-full rounded-full'/>
        </div>
      </div>

      {/* Cards Section */}
      <div className='w-full h-70 shadow rounded-2xl hover:shadow-md flex flex-col justify-center items-center transition-tranform duration-500 ease-in-out'
        style={{background: "linear-gradient(90deg,rgba(255, 255, 230, 1) 0%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 230, 1) 99%)"}}
      >
        <h1 className='text-4xl font-bold'>Welcome Back</h1>
        <div className='text-gray-500 text-lg text-center'>
         <p>Manage your creator collaborations and track your</p>
         <p>performance</p>
        </div>
      </div>

      <div className='w-full h-50flex flex-col justify-center items-center'>
        <div className='flex flex-row justify-between items-center'>
        <div className='w-90 h-50 rounded-3xl shadow border-gray-200 border-1 hover:shadow-md transition-transform ease-in-out duration-500 flex flex-wrap flex-row justify-start'>
            <div className='w-50 h-25 mt-2 flex flex-col items-center justify-center'>
                <p className='text-sm font-medium'>Target collabrotations sent</p>
                <h1 className='text-3xl font-bold'>0</h1>
            </div>
            <div className='w-10 h-10 ml-25 mt-8 rounded-xl bg-gray-200 flex justify-center items-center'>
                <GiNetworkBars className='text-green-600'/>
            </div>
            <p className='text-[12px] ml-8 mb-10 text-gray-400'>Total successful invites sent in target collaborations</p>
        </div>
        <div className='w-90 h-50 rounded-3xl shadow border-gray-200 border-1 hover:shadow-md transition-transform ease-in-out duration-500 flex flex-wrap flex-row justify-start'>
            <div className='w-60 h-25 mt-2 flex flex-col items-center justify-center'>
                <p className='text-sm font-medium'>Open Collaboration Messages Sent</p>
                <h1 className='text-3xl font-bold'>0</h1>
            </div>
            <div className='w-10 h-10 ml-75 mt-[-105px] rounded-xl bg-gray-200 flex justify-center items-center'>
                <FiMessageCircle className='text-purple-600'/>
            </div>
            <p className='text-[12px] ml-8 mt-[-45px] text-gray-400'>Total successful invites sent in target collaborations</p>
        </div>
        <div className='w-90 h-50 rounded-3xl shadow border-gray-200 border-1 hover:shadow-md transition-transform ease-in-out duration-500 flex flex-wrap flex-row justify-start'>
            <div className='w-50 h-25 mt-2 flex flex-col items-center justify-center'>
                <p className='text-sm font-medium'>Bot Account</p>
                <h1 className='text-3xl font-bold'>0</h1>
            </div>
            <div className='w-10 h-10 ml-25 mt-8 rounded-xl bg-gray-200 flex justify-center items-center'>
                <IoPeopleOutline className='text-red-600'/>
            </div>
            <p className='text-[12px] ml-35 mb-10 text-gray-400'>No bot account</p>
            <button className='w-40 h-10 rounded-xl border-1 text-sm text-gray-600 ml-25 mt-[-40px] border-gray-400 flex justify-center items-center cursor-pointer hover:bg-yellow-50'>
                Configure bot Account
            </button>
        </div>
            
        </div>
      </div>
       <div className='w-full h-15 flex flex-row justify-between items-center'>
            <h1 className='text-2xl font-medium'>Active Campaigns</h1>
            <div className='w-100 h-15 flex flex-row justify-evenly items-center'>
                <button className='w-45 h-10 text-sm text-gray-600 border-gray-400 border-1 rounded-xl flex flex-row justify-center items-center gap-2 hover:bg-yellow-50'
                    onClick={() => navigate("/dashboard/target")}
                >
                    Target Campaign <FaArrowRight />
                </button>
                <button type="button" className='w-45 h-10 text-sm text-gray-600 border-gray-400 border-1 rounded-xl flex flex-row justify-center items-center gap-2 hover:bg-yellow-50'
                    onClick={() => navigate("/dashboard/open")}
                >
                    Open Campaign <FaArrowRight />
                </button>
            </div>
        </div>

        <div className='w-full h-50 rounded-2xl shadow hover:shadow-xl border-1 border-gray-200 flex flex-col justify-center items-center gap-5'>
            <h1 className='text-lg font-medium'>No active campaigns</h1>
            <p className='w-140 text-sm text-gray-600 text-center'>You don't have any active campaigns at the moment. Start a new campaign to engage with creators.</p>
            <div className='w-80 h-10 flex justify-center items-center gap-5'>
                <button className='w-35 h-10 text-sm text-white bg-black rounded-xl cursor-pointer'
                    onClick={() => navigate("/dashboard/target")}
                >
                    Target Campaign
                </button>
                <button className='w-35 h-10 text-sm text-black bg-white border-1 border-gray-400 rounded-xl hover:bg-yellow-50 cursor-pointer'
                    onClick={() => navigate("/dashboard/open")}
                >
                    Open Campaign
                </button>
            </div>
        </div>

        <div className='w-full h-12 text-2xl font-medium flex justify-center items-center'>
            <p>Quick Actions</p>
        </div>
        <div className='w-full h-40 flex flex-row justify-evenly items-center'>
            <div className='w-90 h-40 rounded-xl border-1 border-gray-200 bg-yellow-50 hover:shadow-xl flex flex-col justify-center items-center gap-2'>
                <h1 className='text-lg font-medium'>Target Collaboration</h1>
                <p className='text-sm text-gray-600'>Invite specific creators to your TikTok Shop</p>
                <button className='w-50 h-10 rounded-xl text-white bg-black flex flex-row justify-center items-center gap-2 cursor-pointer'
                    onClick={() => navigate("/dashboard/target")}
                >
                    <FaPlus /> Create Campaign
                </button>
            </div>
            <div className='w-90 h-40 rounded-xl border-1 border-gray-200 bg-yellow-50 hover:shadow-xl flex flex-col justify-center items-center gap-2'>
                <h1 className='text-lg font-medium'>Open Collaboration</h1>
                <p className='text-sm text-gray-600'>Send mass invitations to creator lists</p>
                <button className='w-50 h-10 rounded-xl text-white bg-black flex flex-row justify-center items-center gap-2 cursor-pointer'
                    onClick={() => navigate("/dashboard/open")}
                >
                    <FaPlus /> Create Campaign
                </button>
            </div>
            <div className='w-90 h-40 rounded-xl border-1 border-gray-200 bg-yellow-50 hover:shadow-xl flex flex-col justify-center items-center gap-2'>
                <h1 className='text-lg font-medium'>Discover Creators</h1>
                <p className='text-sm text-gray-600'>Find and add creators to your collections</p>
                <button className='w-50 h-10 rounded-xl text-white bg-black flex flex-row justify-center items-center gap-2 cursor-pointer'
                    onClick={() => navigate("/dashboard/discovery")}
                >
                    <FaPlus /> Find Creators
                </button>
            </div>
        </div>
    </div>
  )
}

export default DashBoardHome
