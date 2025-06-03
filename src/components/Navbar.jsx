import React from 'react';
import { MdStars } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const Navigate = useNavigate();

    return (
        <div className="w-full h-18 flex flex-row justify-between align-center">
            <div className='w-60 h-18 ml-6 flex justify-center items-center gap-5 cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105'
                onClick={() => Navigate("/")}
            >
                <MdStars  className='text-2xl'/>
                <p className='font-medium text-xl'>Spotlight labs</p>
            </div>
            <div className='w-80 h-18 mr-8 flex flex-row justify-evenly items-center'>
                <button 
                    className='w-15 h-10 text-sm font-medium cursor-pointer'
                    onClick={() => Navigate("/pricing")}
                >
                    Pricing
                </button>
                <button className='w-15 h-10 text-sm font-medium cursor-pointer'>
                    Sign in
                </button>
                <button className='w-32 h-9 bg-black text-sm text-white rounded-lg cursor-pointer flex flex-row justify-center items-center gap-3'
                    onClick={() => Navigate("/dashboard")}
                >
                    Get Started<FaArrowRight />
                </button>
            </div>
        </div>
    )
}

export default Navbar;