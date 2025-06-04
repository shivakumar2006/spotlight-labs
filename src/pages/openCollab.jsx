import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";
import { IoSearchSharp } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { IoPeopleOutline } from "react-icons/io5";

const openCollab = () => {
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

      <div className='w-full h-60 border-1 border-gray-200 rounded-xl bg-yellow-50 flex flex-col justify-center items-center'>
        <h1 className="text-3xl font-bold">Open Collaboration</h1>
        <p className='text-sm text-gray-600'>Create and manage open collaborations with creators from your lists</p>

       <div className='relative w-full h-12 mt-10 flex justify-evenly items-center'>
          <IoSearchSharp className='absolute left-3 ml-13 top-1/2 transform -translate-y-1/2 text-xl text-gray-600 pointer-events-none' />
            <input 
              type='text'
              placeholder='Search Lists...'
              className='w-220 h-12 border border-gray-200 bg-white rounded-xl pl-20 pr-4 text-sm'
            />

          <div className='w-12 h-12 border-1 border-gray-200 rounded-xl bg-white flex justify-center items-center cursor-pointer'>
            <LuRefreshCw />
          </div>

          <div className='w-40 h-12 border-1 border-gray-200 rounded-xl '>
            <button className='bg-black text-white text-md w-40 h-12 rounded-xl flex flex-rwo justify-center items-center gap-2 cursor-pointer'>
              <FaPlus />Create List
            </button>
          </div>
        </div>
      </div>

      <div className='w-full h-80 flex flex-col justify-center items-center'>
                <IoPeopleOutline className='text-6xl bg-gray-300 rounded-full'/>
                <h1 className='text-2xl font-bold'>No open collaborations yet</h1>
                <p className='text-md text-gray-600'>Create your first collaboration to start working with creators</p>
                <p className='text-md text-gray-600'>from your lists</p>
            </div>
    </div>
  )
}

export default openCollab;