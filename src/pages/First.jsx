import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import image from "../images/image.png"

const First = () => {
    return (
        <div className='w-screen min-h-screen'>
            <div className='w-full h-135 bg-yellow-50 flex flex-row justify-between items-center'>
                <div className='w-180 h-135 flex flex-col justify-center items-center gap-5'>
                    <p className='w-55 h-8 mr-105 mt-20 bg-black rounded-2xl font-medium text-yellow-50 text-sm flex items-center justify-center '>
                        TIKTOK SHOP AUTOMATION
                    </p>
                    <div className='w-180 h-30 ml-20 text-6xl font-bold'>
                        Operate on TikTok Shop <span className='text-orange-400'>1000x faster</span>
                    </div>
                    <p className='w-180 ml-20 mt-1 text-gray-600 text-xl'>With Spotlight run target and open collaborations on autopilot</p>
                    <button className='w-40 h-11 mr-120 mt-3 rounded-md text-sm bg-black text-white flex flex-row justify-center items-center gap-3 cursor-pointer'>
                        Get Started<FaArrowRight />
                    </button>
                    <div className='w-180 h-20 pt-5 pl-10'>
                    <p className='text-gray-600 text-sm'>Trusted by leading TikTok Shop brands</p>
                    </div>
                </div>

                <div className='w-220 h-135 flex justify-center items-center'>
                    <img src={image}
                        className="w-120 h-110 rounded-2xl shadow-xl animate-[upDown_3s_ease-in-out_infinite]"
                        style={{
                          animationName: 'upDown',
                          animationDuration: '5s',
                          animationIterationCount: 'infinite',
                          animationTimingFunction: 'ease-in-out',
                    }}/>
                </div>
            </div>

            <div className='w-full h-190 flex flex-col justify-center items-center gap-5'>
                <p className='w-45 h-7 text-white text-sm font-medium bg-black rounded-2xl flex justify-center items-center'>TOOLS & FEATURES</p>
                <div className='w-140 text-center h-20'>
                    <h1 className='text-5xl font-bold'>Most Powerful Tool for Accelerate Growth</h1>
                </div>
                <p className='text-gray-600 mt-5 text-lg'>Everything you need to scale your TikTok Shop through strategic creator partnerships</p>

                <div className='w-full h-80 mt-10 flex justify-evenly items-center'>
                   <div className="w-110 h-60 border border-gray-200 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out hover:scale-101 hover:shadow-xl group rounded-xl cursor-pointer">
                        <div className="w-15 h-15 mb-5 bg-white rounded-full flex justify-center items-center text-4xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-md">
                          <FiSearch />
                        </div>
                        <h1 className="text-2xl mb-3 font-bold transition-colors duration-500">Create Discovery</h1>
                        <p className="text-lg text-center text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
                          Find perfect TikTok creators for your brand from the world's largest database
                        </p>
                   </div>

                    <div className="w-110 h-60 border border-gray-200 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out hover:scale-101 hover:shadow-xl group rounded-xl cursor-pointer">
                        <div className="w-15 h-15 mb-5 bg-white rounded-full flex justify-center items-center text-4xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-md">
                          <MdOutlineEmail />
                        </div>
                        <h1 className="text-2xl mb-3 font-bold transition-colors duration-500">Automated Outreach</h1>
                        <p className="text-lg text-center text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
                          Scale relationships with intelligent communication tools
                        </p>
                   </div>

                   <div className="w-110 h-60 border border-gray-200 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out hover:scale-101 hover:shadow-xl group rounded-xl cursor-pointer">
                        <div className="w-15 h-15 mb-5 bg-white rounded-full flex justify-center items-center text-4xl transition-transform duration-500 ease-in-out group-hover:scale-105 group-hover:shadow-md">
                          <CiCalendar />
                        </div>
                        <h1 className="text-2xl mb-3 font-bold transition-colors duration-500">Lifecycle Management</h1>
                        <p className="text-lg text-center text-gray-600 transition-colors duration-500 group-hover:text-gray-800">
                          Track partnerships from first contact to final sale
                        </p>
                   </div>
                </div>
            </div>

            <div className='w-full h-168 shadow-md bg-yellow-50 flex flex-col justify-center items-center gap-3'>
                <p className='w-40 h-7 text-white text-sm font-medium bg-black rounded-2xl flex justify-center items-center'>HOW IT WORKS</p>
                <div className='w-180 h-20'>
                    <h1 className='text-5xl mt-3 font-bold'>Seamless Creator Management</h1>
                </div>
                <p className='text-gray-600 text-lg'>Scale your TikTok Shop presence with our powerful automation platform</p>

                <div className='w-full h-30 mt-20 flex justify-center items-center gap-20'>
                   <div className='w-20 h-20 rounded-2xl bg-white hover:shadow-xl shadow-lg flex justify-center items-center text-3xl transition-transform duration-500 ease-in-out hover:scale-104'>
                        <TbWorld/>
                   </div>
                   <div className='w-50 border-gray-400 border-1'></div>
                   <div className='w-20 h-20 rounded-2xl bg-white hover:shadow-xl shadow-lg flex justify-center items-center text-3xl transition-transform duration-500 ease-in-out hover:scale-104'>
                        <RiRobot2Line/>
                   </div>
                   <div className='w-50 border-gray-400 border-1'></div>
                   <div className='w-20 h-20 rounded-2xl bg-white hover:shadow-xl shadow-lg flex justify-center items-center text-3xl transition-transform duration-500 ease-in-out hover:scale-104'>
                        <IoStatsChart/>
                   </div>
                </div>
                <div className='w-full h-50 border-2 flex flex-row justify-evenly items-center'>
                    <div className='w-100 h-50 border-2 flex flex-col justify-evenly items-center'>

                    </div>
                </div>
            </div>
            <div className='w-full h-100 border-2'>

            </div>
        </div>
    )
}

export default First;