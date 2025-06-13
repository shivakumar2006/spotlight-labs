import React, { useState, useEffect } from 'react';
import AuthButtonWithProvider from "../auth/authWithProvider";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { supabase } from '../supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import image from "../images/image.png";
import { sendConfirmationEmail } from '../emails/sendConfirmationEmail';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    // ✅ Now check if profile exists in 'profiles' table
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile && !error) {
      dispatch(setUser(user));
      navigate("/auth");
    } else {
      console.warn("User logged in, but profile missing");
      // You can alert or show message to fill profile again
    }
  };
  getUser();
}, []);


  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    dispatch(setUser(data.user));
    navigate("/");
  };

  const handleSignUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:5173/verify",
    },
  });

  if (error) {
    alert("Sign-up failed: " + error.message);
    return;
  }

  // ✅ Get session to fetch correct user.id
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    alert("Session error: " + sessionError.message);
    return;
  }

  const userId = session?.user?.id;

if (userId) {
  const { error: insertError } = await supabase
  .from("profiles")
  .upsert({
    id: userId,
    email,
    first_name: firstName,
    last_name: lastName,
    is_verified: false,
    created_at: new Date().toISOString(),
  });

if (insertError) {
  console.error("❌ Profile insert failed:", insertError);
  alert("❌ Profile insert failed: " + (insertError.message || "Unknown error"));
  return;
}

}


  try {
    await sendConfirmationEmail(
      email,
      `http://localhost:8080/verify-email?email=${encodeURIComponent(email)}`
    );
    alert("Sign-up successful! Check your inbox to verify your email.");
  } catch (err) {
    console.error(err);
    alert("Signup succeeded, but failed to send verification email.");
  }
};


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
          <img src={image} className='w-full h-full rounded-xl' />
        </div>
      </div>

      <div className='w-180 h-full flex flex-col justify-center items-center'>
        <div className='w-60 h-18 mr-3 flex justify-center items-center gap-5'
             onClick={() => navigate("/")}>
          <MdStars className='text-2xl' />
          <p className='font-medium text-xl'>Spotlight labs</p>
        </div>

        <div className='w-full h-20 flex flex-col justify-center items-center gap-2'>
          <h1 className='text-3xl font-bold'>{isSignUp ? "Create an account" : "Welcome back"}</h1>
          <p className='text-sm font-light text-gray-600'>
            {isSignUp ? "Sign up to get started" : "Sign in to your account to continue"}
          </p>
        </div>

        <div className='w-full h-12 mt-5 flex justify-center items-center'>
          <div className='w-120 h-10'>
            <AuthButtonWithProvider
              Icon={FaGoogle}
              Label={isSignUp ? "Sign up with Google" : "Sign in with Google"}
              Provider="google"
            />
          </div>
        </div>

        <div className='w-100 h-10 flex flex-row justify-between items-center mt-4'>
          <div className='w-35 border-1 border-gray-200'></div>
          <div className='text-sm text-gray-600'>Or continue with</div>
          <div className='w-35 border-1 border-gray-200'></div>
        </div>

        {isSignUp && (
          <div className='w-100 mt-4'>
            <input
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='w-full h-12 mb-2 pl-5 border-1 border-gray-300 rounded-xl text-sm'
            />
            <input
              type='text'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='w-full h-12 pl-5 border-1 border-gray-300 rounded-xl text-sm'
            />
          </div>
        )}

        <div className='w-50 h-10 mt-5 text-sm font-bold flex justify-center items-center'>Email</div>
        <div className='w-100 h-12'>
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full h-full pl-5 placeholder:text-sm border-1 border-gray-300 rounded-xl text-sm'
          />
        </div>

        <div className='w-95 h-8 mt-2 flex flex-row justify-between items-center'>
          <p className='text-sm font-bold'>Password</p>
          {!isSignUp && <p className='text-[12px] text-blue-700 cursor-pointer hover:text-blue-500'>Forgot Password?</p>}
        </div>
        <div className='relative w-100 h-12'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='......'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full h-full pl-5 pr-10 placeholder:text-2xl border-1 border-gray-300 rounded-xl text-sm'
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={isSignUp ? handleSignUp : handleLogin}
          className='w-100 h-12 bg-black text-md text-white mt-5 rounded-xl flex justify-center items-center cursor-pointer'
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p className='mt-3 text-sm text-gray-600'>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <span
            className='ml-1 text-blue-700 cursor-pointer'
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
