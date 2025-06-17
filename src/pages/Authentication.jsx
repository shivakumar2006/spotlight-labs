import React, { useState, useEffect } from 'react';
import AuthButtonWithProvider from "../auth/authWithProvider";
import { FaGoogle, FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { supabase } from '../supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import image from "../images/image.png";

const Authentication = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user info on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error getting user:", error);
        return;
      }
      console.log("Supabase User Info:", user); // ✅ Yeh console me dikhega
      if (user) {
        dispatch(setUser(user));
        navigate("/dashboard/home"); // Redirect to home if already logged in
      }
    };

    

    getUser();
  }, [dispatch, navigate]);

  const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  // ✅ Get session to get user.id
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    alert("Failed to get session: " + sessionError.message);
    return;
  }

  const userId = session?.user?.id;

  // // ✅ Insert user in profiles table if not exists (optional safe insert)
  // const { error: insertError } = await supabase
  //   .from("profiles")
  //   .upsert({ id: userId, email }) // 👈 aur agar profile me aur bhi fields ho to unko bhi yahan pass karo
  //   .eq("id", userId);

  // if (insertError) {
  //   alert("Failed to insert profile: " + insertError.message);
  //   return;
  // }

  // ✅ Dispatch & Redirect
  dispatch(setUser(session.user));
  navigate("/dashboard/home");
};


  const checkUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  console.log("👤 User Info:", data?.user);
  if (error) console.error("❌ Error getting user:", error.message);
};

// call it after successful login
useEffect(() => {
  checkUser();
}, []);

  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center'>
      {/* Left Section */}
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
          <img src={image} className='w-full h-full rounded-xl' />
        </div>
      </div>

      {/* Right Section */}
      <div className='w-180 h-full flex flex-col justify-center items-center'>
        <div className='w-60 h-18 mr-3 flex justify-center items-center gap-5'
             onClick={() => navigate("/")}>
          <MdStars className='text-2xl' />
          <p className='font-medium text-xl'>Spotlight labs</p>
        </div>

        <div className='w-full h-20 flex flex-col justify-center items-center gap-2'>
          <h1 className='text-3xl font-bold'>Welcome back</h1>
          <p className='text-sm font-light text-gray-600'>Sign in to your account to continue</p>
        </div>

        <div className='w-full h-12 mt-5 flex justify-center items-center'>
          <div className='w-120 h-10'>
            <AuthButtonWithProvider
              Icon={FaGoogle}
              Label={"Sign in with Google"}
              Provider="google"
            />
          </div>
        </div>

        <div className='w-100 h-10 flex flex-row justify-between items-center mt-4'>
          <div className='w-35 border-1 border-gray-200'></div>
          <div className='text-sm text-gray-600'>Or continue with</div>
          <div className='w-35 border-1 border-gray-200'></div>
        </div>

        {/* Email input */}
        <div className='w-50 h-10 mt-5 text-sm font-bold flex justify-center items-center'>
          Email
        </div>
        <div className='w-100 h-12'>
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full h-full pl-5 placeholder:text-sm placeholder:text-border-400 border-1 border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-sm'
          />
        </div>

        {/* Password input */}
        <div className='w-95 h-8 mt-2 flex flex-row justify-between items-center'>
          <p className='text-sm font-bold'>Password</p>
          <p className='text-[12px] text-blue-700 cursor-pointer hover:text-blue-500'>Forgot Password?</p>
        </div>
        <div className='relative w-100 h-12'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='......'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full h-full pl-5 pr-10 placeholder:text-2xl placeholder:text-border-400 border-1 border-gray-300 rounded-xl focus:outline-none focus:ring-0 text-sm'
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleLogin}
          className='w-100 h-12 bg-black text-md text-white mt-5 rounded-xl flex justify-center items-center cursor-pointer'
        >
          Sign In
        </button>

        <div className='w-100 h-10 text-sm flex flex-row justify-center items-center gap-2'>
            <p>Dont have an account</p>
            <p className='text-blue-700 cursor-pointer'
                onClick={() => navigate("/signup")}
            >Sign Up</p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
