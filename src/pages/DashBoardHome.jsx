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
        <div className='w-10 h-10 rounded-full border-1 bg-gray-50'>
            <img src={user} className='w-full h-full rounded-full'/>
        </div>
      </div>

      {/* Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-white shadow rounded-lg p-4'>Card 1</div>
        <div className='bg-white shadow rounded-lg p-4'>Card 2</div>
        <div className='bg-white shadow rounded-lg p-4'>Card 3</div>
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
