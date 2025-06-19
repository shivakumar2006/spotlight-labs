import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";
import { MdErrorOutline } from "react-icons/md";
import { useSelector } from 'react-redux';


const CRM = () => {

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);


  return (
     <div className='flex flex-col gap-6'>
          <div className='w-full h-18 border-b border-gray-200 border-2 rounded-xl flex justify-end items-center px-6 gap-5 bg-white'>
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

          <div className='w-full h-40 border-1 border-gray-200 rounded-xl bg-yellow-50 flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold'>CRM</h1>
            <p className='text-sm text-gray-600'>Monitor your creator relationships and content status across different stages.</p>
          </div>

          <div className='w-full h-12 border-1 border-blue-400 bg-blue-100 rounded-xl flex flex-row justify-between items-center'>
            <MdErrorOutline className='text-gray-600 ml-10'/>
            <p className='text-sm mr-45 text-blue-500'>If the numbers show 0, don't worry - data will update in a few hours. This won't affect your segments or dynamic bots.</p>
          </div>

          <div className='w-full h-40 text-gray-600 flex justify-center items-center'>
            No segments found. Create your first segment above.
          </div>

          <div className='w-full h-30 border-1 border-gray-400 flex justify-center items-center bg-gray-200 rounded-xl'> 
            No sample request bots found. Create your first bot to start reaching out to creators.
          </div>
     </div>
  )
}

export default CRM