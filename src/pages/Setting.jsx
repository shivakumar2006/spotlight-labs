import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";
import { CiUser } from "react-icons/ci";

const Setting = () => {

    const navigate = useNavigate();

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

                  <div className='w-full h-12 mt-10 flex flex-row items-center gap-5'>
                    <div className='w-10 h-10 text-xl bg-gray-200 rounded-full flex flex-row justify-center items-center'>
                        <CiUser />
                    </div>
                    <div className='text-xl font-bold'>
                        <p className='text-xl font-bold'>Account</p>
                    </div>
                  </div>

                  <div className='w-full h-50 border-1 border-gray-200 hover:shadow-xl rounded-xl flex flex-col justify-between items-center'>
                    <div className='w-full h-10 border-1 pl-10  border-gray-200 rounded-t-xl flex flex-row justify-start items-center gap-2'>
                        <CiUser />
                        <p className='text-sm'>Profile</p>
                    </div>

                    <div className='w-full h-40 flex flex-row justify-evenly items-center '>
                        <div className='w-20 h-20 text-2xl rounded-full bg-black flex justify-center items-center text-white'>
                            <CiUser />
                        </div>
                        <div className='w-100 h-full flex flex-col justify-center items-center'>
                            <p>Full Name</p>
                            <div className='w-100 h-10 pl-5 border-1 border-gray-400 flex justify-start items-center'>
                                Your Name
                            </div>
                        </div>

                        <div className='w-100 h-full flex flex-col justify-center items-center'>
                            <p>Full Email</p>
                            <div className='w-100 h-10 pl-5 border-1 border-gray-400 flex justify-start items-center'>
                                Your Email
                            </div>
                        </div>
                    </div>
                  </div>
    </div>
  )
}

export default Setting