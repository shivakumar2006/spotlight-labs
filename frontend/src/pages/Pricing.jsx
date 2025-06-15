import React from 'react';
import { BsPatchCheck } from "react-icons/bs";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";


const Pricing = () => {
  return (
    <div className='w-screen min-h-screen flex flex-col items-center'>
        <div className='w-full mt-20 bg-white flex flex-col justify-center items-center'>
             <p className='w-40 h-7 text-black text-sm font-medium bg-yellow-50 rounded-2xl flex flex-row justify-center items-center gap-2'><BsPatchCheck/>SIMPLE PRICING</p>
        <div className='w-140 text-center h-20'>
            <h1 className='text-5xl mt-5 font-bold text-center'>One Plan, All Features</h1>
        </div>
        <p className='text-gray-600 mt-5 text-lg text-center'>Everything you need to grow your TikTok Shop business with unlimited access to all our powerful features.</p>
        </div>

        <div className='w-225 h-145 rounded-2xl shadow-xl mt-20 bg-gray-50 flex flex-col items-center'>
            <div className='w-225 h-11 text-xl rounded-t-2xl bg-black text-white flex justify-center items-center'>
                <p>Most popular</p>
            </div>
            <p className='text-3xl mt-5 font-bold'>Unlimited</p>
            <div className='w-225 h-20 flex flex-row justify-center items-center gap-2'>
                <p className='text-6xl font-bold'>$249</p>
                <p className='text-xl text-gray-600'>/month</p>
            </div>
            <p className='text-gray-600 text-xl'>Complete access to all features for one store</p>

            <div className='w-225 h-70 mt-5 flex flex-row justify-center items-center'>
                <div className='w-110 h-70 flex flex-col justify-center items-center gap-10 text-left'>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>One TikTok Shop account</p>
                    </div>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>Target collaboration campaigns</p>
                    </div>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>Open collaboration campaigns</p>
                    </div>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>Creator CRM system</p>
                    </div>
                </div>
                <div className='w-110 h-70 flex flex-col justify-center items-center gap-10 text-left'>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>Advanced creator discovery</p>
                    </div>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>Custom analytics & reporting</p>
                    </div>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>Advanced competitor insights</p>
                    </div>
                    <div className='flex flex-row text-left gap-2'>
                        <IoIosCheckmarkCircleOutline className='text-2xl'/><p className='font-bold'>All future features at no extra cost</p>
                    </div>
                </div>

            </div>

             <div className='w-225 h-20 flex justify-center items-center'>
                    <button className='w-100 h-15 bg-black text-white text-xl rounded-2xl flex flex-row justify-center items-center gap-3 cursor-pointer'>
                        Upgrade to Premium<FaArrowRight/>
                    </button>
                </div>
        </div>

        <div className='w-full h-150 mt-10  bg-yellow-50 flex justify-center items-center'>
            <div className='w-330 h-120 shadow-xl rounded-3xl bg-white flex flex-col justify-center items-center'>
                 <p className='w-50 h-7 text-black text-sm font-medium bg-yellow-50 rounded-2xl flex flex-row justify-center items-center gap-2'><BsPatchCheck/>GET STARTED TODAY</p>
            <div className='w-140 text-center h-20'>
                <h1 className='text-5xl mt-5 font-bold text-center'>Ready to Transform Your TikTok Shop?</h1>
            </div>
            <p className='text-gray-600 mt-15 text-lg text-center'>Join hundreds of brands using our platform to scale their creator marketing efforts and drive TikTok Shop sales.</p>
                <button className='w-40 h-11 mt-10 rounded-md text-sm bg-black text-white flex flex-row justify-center items-center gap-3 cursor-pointer'>
                    Get Started<FaArrowRight />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Pricing