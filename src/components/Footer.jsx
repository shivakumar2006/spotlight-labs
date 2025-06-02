import React from 'react';
import { MdStars } from "react-icons/md";

const Footer = () => {
    return (
        <div className="w-full h-25 flex flex-row justify-between align-center">
            <div className='w-60 h-25 ml-6 flex justify-center items-center gap-5 cursor-pointer'>
                <MdStars  className='text-2xl'/>
                <p className='font-medium text-xl'>Spotlight labs</p>
            </div>
            <div className='w-80 h-25 mr-8 flex flex-row justify-evenly items-center'>
                <p className='text-sm text-gray-500'>© 2025 Spotlight Lab. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer;