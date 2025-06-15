import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import image from "../images/image.png"
import { useNavigate } from 'react-router-dom';

const First = () => {

    const navigate = useNavigate();

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
                    <button 
                        className='w-40 h-11 mr-120 mt-3 rounded-md text-sm bg-black text-white flex flex-row justify-center items-center gap-3 cursor-pointer'
                        onClick={() => navigate("/auth")}
                    >
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

                <div className='w-full h-30 mt-20 flex justify-center items-center gap-22'>
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
                <div className='w-full h-50 flex flex-row justify-evenly items-center'>
                    <div className='w-100 h-50 flex flex-col justify-evenly items-center'>
                        <h1 className='text-2xl text-black font-bold'>01</h1>
                        <h1 className='text-2xl text-black font-bold'>Discover</h1>
                        <p className='text-gray-600'>Find the perfect creators for your brand</p>
                    </div>
                    <div className='w-100 h-50 flex flex-col justify-evenly items-center'>
                        <h1 className='text-2xl text-black font-bold'>02</h1>
                        <h1 className='text-2xl text-black font-bold'>Automate</h1>
                        <p className='text-gray-600 text-center'>Deploy campaigns with one-click automation</p>
                    </div>
                    <div className='w-100 h-50 flex flex-col justify-evenly items-center'>
                        <h1 className='text-2xl text-black font-bold'>03</h1>
                        <h1 className='text-2xl text-black font-bold'>Scale</h1>
                        <p className='text-gray-600 text-center'>Send unlimited outreach to your ideal creator</p>
                    </div>
                </div>
            </div>

            <div className='w-full h-140 flex flex-col justify-center items-center '>
                <p className='w-35 h-7 text-white text-sm font-medium bg-black rounded-2xl flex justify-center items-center'>TESTIMONIALS</p>
                <div className='w-140 text-center h-20'>
                    <h1 className='text-5xl mt-5 font-bold'>What Our Clients Say</h1>
                </div>
                <p className='text-gray-600 mt-5 text-lg'>Hear from brands that have transformed their TikTok Shop performance with Spotlight.</p>

                <div className='w-full h-80 flex justify-evenly items-center'>
                   <div className="w-110 h-60 border gap-5 border-gray-200 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out hover:scale-101 hover:shadow-xl group rounded-xl cursor-pointer">
                        <p className='text-gray-600 text-center'>Spotlight Lab increased our creator conversion rate by 3X while cutting our management time in half.</p>
                        <div className='w-110 h-20 flex flex-row justify-center items-center'>
                            <div className='w-20 h-20 flex justify-center items-center'>
                                <div className='rounded-full w-12 h-12 bg-black text-white text-2xl flex justify-center items-center'>
                                    <p>S</p>
                                </div>
                            </div>
                            <div className='w-70 h-20 flex flex-col justify-center items-center'>
                                <p className='text-lg font-bold'>Sarah Jhonson</p>
                                <p className='text-gray-600'>Marketing Director & Fashion Brand
                                </p>
                            </div>
                        </div>
                   </div>

                    <div className="w-110 h-60 border gap-5 border-gray-200 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out hover:scale-101 hover:shadow-xl group rounded-xl cursor-pointer">
                        <p className='text-gray-600 text-center'>The automation tools are game-changing. We're now managing 500+ creator relationships with the same team size.</p>
                        <div className='w-110 h-20 flex flex-row justify-center items-center'>
                            <div className='w-20 h-20 flex justify-center items-center'>
                                <div className='rounded-full w-12 h-12 bg-black text-white text-2xl flex justify-center items-center'>
                                    <p>M</p>
                                </div>
                            </div>
                            <div className='w-70 h-20 flex flex-col justify-center items-center'>
                                <p className='text-lg font-bold'>Michael Chen</p>
                                <p className='text-gray-600'>head of Growth & BeautyBox
                                </p>
                            </div>
                        </div>
                   </div>

                   <div className="w-110 h-60 border gap-5 border-gray-200 flex flex-col justify-center items-center transition-transform duration-500 ease-in-out hover:scale-101 hover:shadow-xl group rounded-xl cursor-pointer">
                        <p className='text-gray-600 text-center'>Our TikTok Shop sales increased by 240% within 3 months of implementing Spotlight's creator strategy.</p>
                        <div className='w-110 h-20 flex flex-row justify-center items-center'>
                            <div className='w-20 h-20 flex justify-center items-center'>
                                <div className='rounded-full w-12 h-12 bg-black text-white text-2xl flex justify-center items-center'>
                                    <p>E</p>
                                </div>
                            </div>
                            <div className='w-70 h-20 flex flex-col justify-center items-center'>
                                <p className='text-lg font-bold'>Emma Rodriguez</p>
                                <p className='text-gray-600'>E-commerce Managere & Home Goods
                                </p>
                            </div>
                        </div>
                   </div>
                </div>
            </div>

            <div className='w-full h-150 bg-yellow-50 flex justify-center items-center'>
                <div className='w-330 h-120 shadow-xl rounded-3xl bg-white flex flex-col justify-center items-center'>
                     <p className='w-40 h-7 text-white text-sm font-medium bg-black rounded-2xl flex justify-center items-center'>GET STARTED TODAY</p>
                <div className='w-140 text-center h-20'>
                    <h1 className='text-5xl mt-5 font-bold text-center'>Ready to Transform Your TikTok Shop?</h1>
                </div>
                <p className='text-gray-600 mt-15 text-lg text-center'>Join hundreds of brands using our platform to scale their creator marketing efforts and drive TikTok Shop sales.</p>
                    <button 
                        className='w-40 h-11 mt-10 rounded-md text-sm bg-black text-white flex flex-row justify-center items-center gap-3 cursor-pointer'
                        onClick={() => navigate("/auth")}
                    >
                        Get Started<FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default First;