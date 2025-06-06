import React, { useEffect } from 'react';
import AuthButtonWithProvider from "../auth/authWithProvider";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { supabase } from '../supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { SiThemoviedatabase } from "react-icons/si";
import { Link } from 'react-router-dom';

const Authentication = () => {
  const dispatch = useDispatch();

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
        <div className='w-40 h-7 rounded-xl bg-black text-white flex justify-center items-center'>
            Spotlight lab
        </div>
        <div className='w-120 h-60 text-center flex justify-center items-center text-6xl font-bold'>
            Superfast TikTok Shop Automations
        </div>
        <div className='w-120 h-10 text-center text-gray-600 flex justify-center items-center text-sm font-bold'>
            Find best affiliates and run target and open collabs on autopilot
        </div>
    </div>
    <div className='w-180 h-full'>

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
