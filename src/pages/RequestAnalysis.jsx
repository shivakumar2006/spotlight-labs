import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";

const RequestAnalysis = () => {
  return (
    <div className='flex flex-col gap-6'>
              <div className='w-full h-18 border-b border-gray-200 border-1 rounded-xl flex justify-end items-center px-6 gap-5 bg-white'>
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

              <div className='w-full h-50 border-1 border-gray-200 bg-yellow-50 rounded-xl flex flex-col justify-center items-center gap-2'>
                <h1 className='text-3xl font-bold'>CRM Analytics</h1>
                <p className='text-sm text-gray-600 mb-5'>Track and analyze creator performance for your CRM activities.</p>
                <div className='w-full h-10 flex flex-row justify-evenly items-center'>
                    <input 
                        type='text'
                        placeholder='Search by creator username'
                        className='w-190 h-10 rounded-xl  border-1 border-gray-200 bg-white pl-10'
                    />
                    <select 
                        defaultValue=""
                        className='w-50 h-10 border-1 border-gray-200 rounded-xl bg-white'
                    >
                    <option value="">No Sorted</option>
                    <option value="gmv">By Affiliated GMV</option>
                    <option className='date'>By Sample Sent Date</option>
                    </select>
                </div>
              </div>
    </div>
  )
}

export default RequestAnalysis;