import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";

const Collection = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div className='w-full h-18 border-b border-gray-200 border-2 rounded-xl flex justify-end items-center px-6 gap-5 bg-white'>
              <button
                className='w-50 h-10 text-white text-[15px] bg-black rounded-xl cursor-pointer'
                onClick={() => navigate("/pricing")}
              >
                Upgrade to Premium
              </button>
              <div className='w-10 h-10 rounded-full border-1 bg-gray-50 cursor-pointer'>
                <img src={user} className='w-full h-full rounded-full' />
              </div>
      </div>

      <div>
        
      </div>
    </div>
  )
}

export default Collection