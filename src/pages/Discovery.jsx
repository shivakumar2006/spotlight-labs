// pages/Discovery.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import user from "../images/user.avif";
import { IoSearchSharp } from "react-icons/io5";
import SelectBox from '../components/SelectBox';
import { IoPeopleOutline } from "react-icons/io5";

const Discovery = () => {
  const navigate = useNavigate();

  // Select options data
  const categoryOptions = [
    { value: "none", label: "No Category" },
    { value: "auto", label: "Automobile & Motorcycle" },
    { value: "baby", label: "Baby & Maternity" },
    { value: "beauty", label: "Beauty & Personal Care" },
    { value: "books", label: "Books, Magazines & Audio" },
    { value: "collectibles", label: "Collectibles" },
    { value: "collections", label: "Collections" },
  ];

  const followerOptions = [
    { value: "0-10k", label: "0-10k" },
    { value: "10k-100k", label: "10k-100k" },
    { value: "100k-1M", label: "100k-1M" },
    { value: "1M-10M", label: "1M-10M" },
    { value: "10M+", label: "10M+" },
  ];

  const gmvOptions = [
    { value: "0-100", label: "$0-100" },
    { value: "100-1k", label: "$100-1k" },
    { value: "1k-10k", label: "$1k-10k" },
    { value: "10k+", label: "$10k+" },
  ];

  const followerAgeOptions = [
    { value: "18-24", label: "18-24" },
    { value: "25-34", label: "25-34" },
    { value: "35-44", label: "35-44" },
    { value: "45-54", label: "45-54" },
    { value: "55+", label: "55+" },
  ];

  const followersGender = [
    {value: "male", label: "Male"},
    {value: "female", label: "Female"},
  ];

  const allRates = [
    {value: "entry", label: "Entry Label (500+)"},
    {value: "rising", label: "Rising Creators (500+)"},
    {value: "established", label: "Established (3,000+)"},
    {value: "high", label: "High Performers (6,000+)"},
    {value: "Power", label: "Power Influencers (10,000+)"},
  ]

  return (
    <div className='flex flex-col gap-6'>
      {/* Top Bar */}
      <div className='w-full h-18 border-b border-gray-200 border-2 rounded-xl flex justify-end items-center px-6 gap-5 bg-white'>
        <button
          className='w-50 h-10 text-white text-[15px] bg-black rounded-xl cursor-pointer'
          onClick={() => navigate("/pricing")}
        >
          Upgrade to Premium
        </button>
        <div className='w-10 h-10 rounded-full border-1 bg-gray-50 cursor-pointer'>
          <img src={user} className='w-full h-full rounded-full' />
        </div>
      </div>

      {/* Discovery Section */}
      <div
        className='w-full h-80 rounded-xl bg-yellow-50 border-1 border-gray-200 hover:shadow-sm flex flex-col justify-center items-center gap-4'
        style={{
          background:
            "linear-gradient(322deg,rgba(255, 255, 230, 1) 0%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 230, 1) 99%)",
        }}
      >
        <h1 className='text-3xl font-bold'>Discover Creators</h1>
        <p className='text-sm text-gray-600'>Find and explore creators by various criteria</p>

        {/* Search Input with Icon */}
        <div className='relative w-275 h-12'>
          <input
            type='text'
            placeholder='Search by topic/keywords handle or email'
            className='w-full h-full rounded-xl border border-gray-400 bg-white pl-4 pr-10'
          />
          <IoSearchSharp className='absolute text-2xl right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer' />
        </div>

        {/* Filters */}
        <div className='w-220 mr-55 rounded-xl h-12 flex flex-row justify-between items-center gap-4'>
          <SelectBox id="category" placeholder="Category" options={categoryOptions} />
          <SelectBox id="followers" placeholder="Followers" options={followerOptions} />
          <SelectBox id="gmv" placeholder="GMV" options={gmvOptions} />
          <SelectBox id="followers-age" placeholder="Followers Age" options={followerAgeOptions} />
        </div>
        <div className='w-108 mr-168 rounded-xl h-12 flex flex-row justify-between items-center gap-4'>
          <SelectBox id="followers-gender" placeholder="Followers Gender" options={followersGender}/>
          <SelectBox id="All-rates" placeholder="All Engagement Rates" options={allRates}/>
        </div>
      </div>

      <div className='w-full h-80 flex flex-col justify-center items-center'>
          <IoPeopleOutline className='text-6xl bg-gray-300 rounded-full'/>
          <h1 className='text-2xl font-bold'>Discover Creators</h1>
          <p className='text-md text-gray-600'>Use the search bar above to find creators by keywords or</p>
          <p className='text-md text-gray-600'>apply filters to browse by category, follower count, and more.</p>
      </div>
    </div>
  );
};

export default Discovery;
