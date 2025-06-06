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
    <div
      className='w-screen h-screen text-black flex flex-col justify-evenly items-center'
    >
        <div className='w-72 sm:w-80 h-14 my-10 text-black rounded-2xl flex flex-col justify-center items-center gap-3'>
          <AuthButtonWithProvider
            Icon={FaGoogle}
            Label={"Sign in with Google"}
            Provider="google"
          />
          <AuthButtonWithProvider
            Icon={FaGithub}
            Label={"Sign in with GitHub"}
            Provider="github"
          />
        </div>
      </div>
  );
};

export default Authentication;
