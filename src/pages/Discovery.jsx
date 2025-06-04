import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";
import { IoSearchSharp } from "react-icons/io5";

const Discovery = () => {

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

          <div className='w-full h-80 rounded-xl bg-yellow-50 border-1 border-gray-200 hover:shadow-sm flex flex-col justify-center items-center gap-2'
            style={{background: "linear-gradient(322deg,rgba(255, 255, 230, 1) 0%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 230, 1) 99%)"}}
          >
            <h1 className='text-3xl font-bold'>Discover Creators</h1>
            <p className='text-sm text-gray-600'>Find and explore creators by various criteria</p>
            <div className='relative w-275 h-12'>
              <input 
                type='text'
                placeholder='Search by topic/keywords handle or email'
                className='w-full h-full rounded-xl border border-gray-400 bg-white pl-4 pr-10'
              />
              <IoSearchSharp className='absolute text-2xl right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer' />
            </div>

             <div className='w-220 mr-55 rounded-xl h-12 flex flex-row justify-center items-center'>
                <select
                  id="category"
                  defaultValue=""
                  className="block w-40 p-2 border-gray-400 bg-white rounded-lg shadow-sm border-1 focus:outline-none focus:ring-1 focus:ring-gray-200 hover:bg-yellow-50 text-gray-700"
                >
                  <option value="" disabled hidden>Category</option>
                  <option value="fashion">Fashion</option>
                  <option value="technology">Technology</option>
                  <option value="fitness">Fitness</option>
                  <option value="music">Music</option>
                </select>
            </div>

          </div>
      </div>
  )
}

export default Discovery