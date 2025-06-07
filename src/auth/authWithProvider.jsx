import React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { supabase } from '../supabase';

const AuthButtonWithProvider = ({ Icon, Label, Provider}) => {

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: Provider,
            options: {
                redirectTo: "http://localhost:5174/dashboard/home" // Add you rdesired redirect url here
            }
        });
        if(error) {
            alert("Authntication Failed ! ");
            console.error("error : ", error);
        }
    }

  return (
    <div onClick={handleLogin} className='w-100 h-10 px-4 py-3 flex items-center justify-center border-gray-400 hover:border-gray-600 rounded-md border-1 cursor-pointer group hover:bg-gray-100 active:scale-95 duration-150 hover:shadow-md gap-2'>
            <Icon className="text-black text-md group-hover:text-black" />
            <p className='text-black text-sm group-hover:text-black'>{Label}</p>
            {/* <FaChevronRight className='text-black text-base group-hover:text-black' /> */}
    </div>
  )
}

export default AuthButtonWithProvider