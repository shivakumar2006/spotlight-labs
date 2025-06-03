import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";

const DashBoardHome = () => {

    const Navigate = useNavigate();

  return (
    <div className='flex flex-col gap-6'>
      {/* Top Bar */}
      <div className='w-full h-18 border-b border-gray-200 border-2 flex justify-end items-center px-6 gap-5 sticky top-0 bg-white z-10'>

        <button className='w-50 h-10 text-white text-[15px] bg-black rounded-xl cursor-pointer'
            onClick={() => Navigate("/pricing")}
        >
            Upgrade to Premium
        </button>
        <div className='w-10 h-10 rounded-full border-1 bg-gray-50 cursor-pointer'>
            <img src={user} className='w-full h-full rounded-full'/>
        </div>
      </div>

      {/* Cards Section */}
      <div className='w-full h-70 shadow rounded-2xl hover:shadow-md flex flex-col justify-center items-center'
        style={{background: "linear-gradient(90deg,rgba(255, 255, 230, 1) 0%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 230, 1) 99%)"}}
      >
        <h1 className='text-4xl font-bold'>Welcome Back</h1>
        <div className='text-gray-500 text-lg text-center'>
         <p>Manage your creator collaborations and track your</p>
         <p>performance</p>
        </div>
      </div>

      {/* Chart or Table */}
      <div className='bg-white shadow rounded-lg p-4 mt-6'>
        <h2 className='text-lg font-medium mb-4'>Analytics</h2>
        <div className='h-64 border-dashed border-2 border-gray-300 flex items-center justify-center'>
          Chart / Table Placeholder
        </div>
      </div>
    </div>
  )
}

export default DashBoardHome
