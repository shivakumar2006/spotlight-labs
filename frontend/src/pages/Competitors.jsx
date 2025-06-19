import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";
import { LuRefreshCw } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";
import { useSelector } from 'react-redux';

const Competitors = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const brands = [
        {name: "Tuneful", button: "View Creators"},
        {name: "TUINYO", button: "view Creators"},
        {name: "vertvie", button: "view Creators"},
        {name: "Veidoo", button: "view Creators"},
        {name: "VEVOR", button: "view Creators"},
    ]

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
                        e.target.src = user; // fallback image
                      }}
                    />
                  ) : (
                    <img src={user} alt="Default user" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>

              <div className='w-full h-50 border-1 border-gray-200 bg-yellow-50 rounded-xl flex flex-col justify-center items-center gap-2'>
                <h1 className='text-3xl font-bold'>CRM Analytics</h1>
                <p className='text-sm text-gray-600 mb-5'>Track and analyze creator performance for your CRM activities.</p>
                <div className='w-full h-10 flex flex-row justify-evenly items-center'>
                  <div className='relative w-190 h-10'>
                    <CiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg' />
                    <input 
                      type='text'
                      placeholder='Search brands...'
                      className='w-full h-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm'
                    />
                  </div>

                  <button className='w-40 h-10 border text-sm border-gray-200 flex flex-row justify-center items-center gap-2 rounded-xl cursor-pointer bg-white'>
                    <LuRefreshCw />
                    Refresh
                  </button>
                </div>

              </div>

             <div className='w-full rounded-2xl border border-gray-200 flex flex-col bg-white'>
              {/* Header */}
              <div className='w-full py-3 text-xl font-semibold text-center border-b border-gray-200'>
                All Brands
              </div>

              {/* Brand List */}
              {brands?.map((item, index) => (
                <div
                  key={index}
                  className="w-full py-3 px-4 border-b border-gray-100 flex flex-row justify-between items-center"
                >
                  <p className='text-base font-medium text-gray-800'>{item.name}</p>
                  <button className='px-4 py-2 bg-yellow-50 rounded-xl border border-gray-300 text-sm text-gray-800 hover:bg-yellow-100 transition cursor-pointer'>
                    {item.button}
                  </button>
                </div>
              ))}
            </div>

    </div>
  )
}

export default Competitors;