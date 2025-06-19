import React from 'react';
import { useNavigate } from 'react-router-dom';
import userImage from "../images/user.avif";
import { CiUser } from "react-icons/ci";
import { supabase } from '../supabase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/authSlice';

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Redux se user data

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      dispatch(setUser(null));
      navigate("/auth"); // Auth page par redirect
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      {/* Top Navbar */}
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

      {/* Account Section Title */}
      <div className='w-full h-12 mt-10 flex flex-row items-center gap-5'>
        <div className='w-10 h-10 text-xl bg-gray-200 rounded-full flex justify-center items-center'>
          <CiUser />
        </div>
        <p className='text-xl font-bold'>Account</p>
      </div>

      {/* Profile Box */}
      <div className='w-full h-50 border-1 border-gray-200 hover:shadow-xl rounded-xl flex flex-col justify-between items-center'>
        <div className='w-full h-10 border-1 pl-10 border-gray-200 rounded-t-xl flex flex-row justify-start items-center gap-2'>
          <CiUser />
          <p className='text-sm'>Profile</p>
        </div>

        <div className='w-full h-40 flex flex-row justify-evenly items-center'>
          <div className='w-20 h-20 text-2xl rounded-full bg-black flex justify-center items-center text-white'>
            {user?.user_metadata?.picture ? (
                    <img
                      src={user.user_metadata.picture}
                      alt="User"
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = user; // fallback image
                      }}
                    />
                  ) : (
                    <CiUser />
                  )}
          </div>

          <div className='w-100 h-full flex flex-col justify-center items-center'>
            <p>Full Name</p>
            <div className='w-100 h-10 pl-5 border-1 border-gray-400 flex items-center'>
              {user?.user_metadata?.full_name || "Your Name"}
            </div>
          </div>

          <div className='w-100 h-full flex flex-col justify-center items-center'>
            <p>Email</p>
            <div className='w-100 h-10 pl-5 border-1 border-gray-400 flex items-center'>
              {user?.email || "Your Email"}
            </div>
          </div>
        </div>

        
        </div>
      <div className="w-full h-20 rounded-b-2xl flex items-center justify-center p-4">
          <button
            className="w-64 sm:w-72 h-12 text-white text-xl bg-black rounded-xl cursor-pointer"
            onClick={handleLogout}
          >
            <p className='button'>Log out</p>
          </button>
    </div>
    </div>
  );
};

export default Setting;
