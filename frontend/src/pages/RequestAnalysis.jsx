import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from "../images/user.avif";
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';

const RequestAnalysis = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);


  return (
    <div className='flex flex-col gap-6'>
              <div className='w-full h-18 border-b border-gray-200 border-1 rounded-xl flex justify-end items-center px-6 gap-5 bg-white'>
                      <button
                        className='w-50 h-10 text-white text-[15px] bg-black rounded-xl cursor-pointer'
                        onClick={() => navigate("/pricing")}
                      >
                        Upgrade to Premium
                      </button>
                       <div className='w-10 h-10 rounded-full bg-gray-50 overflow-hidden '>
                  {user?.user_metadata?.picture ? (
                    <img
                      src={user.user_metadata.picture}
                      alt="User"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = User; // fallback image
                      }}
                    />
                  ) : (
                    <img src={User} alt="Default user" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>

              <div className='w-full h-50 border-1 border-gray-200 bg-yellow-50 rounded-xl flex flex-col justify-center items-center gap-2'>
                <h1 className='text-3xl font-bold'>CRM Analytics</h1>
                <p className='text-sm text-gray-600 mb-5'>Track and analyze creator performance for your CRM activities.</p>
                <div className='w-full h-10 flex flex-row justify-evenly items-center'>
                  {/* Search input with icon */}
                  <div className='relative w-190 h-10'>
                    <CiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg' />
                    <input 
                      type='text'
                      placeholder='Search by creator username'
                      className='w-full h-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm'
                    />
                  </div>
                
                  {/* Sort select box */}
                  <select 
                    defaultValue=""
                    className='w-50 h-10 border border-gray-200 rounded-xl bg-white text-sm'
                  >
                    <option value="">No Sorted</option>
                    <option value="gmv">By Affiliated GMV</option>
                    <option value="date">By Sample Sent Date</option>
                  </select>
                </div>

              </div>

              <div className='w-full h-70 border-1 border-gray-200 rounded-xl shadow flex flex-col justify-center items-center'>
                <h1 className='text-2xl font-bold'>Creator Performance</h1>
                <p className='text-sm text-gray-600'>Analytics for creators who received sample requests - Page 10</p>
                <div className='text-md mt-10 font-light w-full h-30 flex justify-center items-center '>
                    No creator data available
                </div>
              </div>
    </div>
  )
}

export default RequestAnalysis;