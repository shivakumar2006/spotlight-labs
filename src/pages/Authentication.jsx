import React, { useEffect } from 'react';
import AuthButtonWithProvider from "../auth/authWithProvider";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { supabase } from '../supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import image from "../images/image.png";
import { MdStars } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { SiThemoviedatabase } from "react-icons/si";
import { Link } from 'react-router-dom';

const Authentication = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // Get user info on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error);
        return;
      }

      if (user) {
        // Dispatch user data to Redux store if user is logged in
        dispatch(setUser(user));
      } else {
        console.log("No user logged in!");
      }
    };
    getUser();
  }, [dispatch]);

  return (
   <div className='w-screen h-screen flex flex-row justify-center items-center'>
    <div className='w-180 h-full bg-yellow-50 flex flex-col justify-center items-center'>
        <div className='w-40 h-7 mb-[-30px] rounded-xl bg-black text-white flex justify-center items-center'>
            Spotlight lab
        </div>
        <div className='w-100 h-60 text-center flex justify-center items-center text-5xl font-bold'>
            Superfast TikTok Shop Automations
        </div>
        <div className='w-120 h-10 mt-[-20px] text-center text-gray-600 flex justify-center items-center text-lg font-light'>
            Find best affiliates and run target and open collabs on autopilot
        </div>
        <div className='w-120 h-80 border-1 rounded-xl mt-10'>
            <img src={image} className='w-full h-full rounded-xl'/>
        </div>
    </div>
    <div className='w-180 h-full flex flex-col justify-center items-center'>
        <div className='w-60 h-18 mr-3 flex justify-center items-center gap-5'
            onClick={() => Navigate("/")}
        >
            <MdStars  className='text-2xl'/>
            <p className='font-medium text-xl'>Spotlight labs</p>
        </div>

        <div className='w-full h-20 flex flex-col justify-center items-center gap-2'>
            <h1 className='text-3xl font-bold'>Welcome back</h1>
            <p className='text-sm font-light text-gray-600'>Sign in to your account to continue</p>
        </div>

        <div className='w-full h-12 border-2 flex justify-center items-center'>
            <div className='w-100 h-10'>
            <AuthButtonWithProvider
            Icon={FaGoogle}
            Label={"Sign in with Google"}
            Provider="google"
          />
          </div>
        </div>
    </div>
   </div>
  );
};

export default Authentication;



{/* <AuthButtonWithProvider
            Icon={FaGoogle}
            Label={"Sign in with Google"}
            Provider="google"
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            Label={"Sign in with GitHub"}
            Provider="github"
          /> */}
