import React, { useState } from 'react';
import { MdStars } from "react-icons/md";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full px-4 py-4 flex items-center justify-between bg-white shadow-sm">
      {/* Logo */}
      <div 
        className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => navigate("/")}
      >
        <MdStars className="text-2xl" />
        <p className="text-xl font-medium">Spotlight labs</p>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 mr-6">
        <button 
          className="text-sm font-medium hover:text-gray-700 cursor-pointer"
          onClick={() => navigate("/pricing")}
        >
          Pricing
        </button>
        <button 
          className="text-sm font-medium hover:text-gray-700 cursor-pointer"
          onClick={() => navigate("/auth")}
        >
          Sign in
        </button>
        <button 
          className="flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => navigate("/auth")}
        >
          Get Started <FaArrowRight />
        </button>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 right-4 bg-white shadow-md rounded-lg w-48 flex flex-col items-start p-4 gap-3 z-50 md:hidden">
          <button 
            className="text-sm font-medium w-full text-left"
            onClick={() => {
              navigate("/pricing");
              setMobileMenuOpen(false);
            }}
          >
            Pricing
          </button>
          <button 
            className="text-sm font-medium w-full text-left"
            onClick={() => {
              navigate("/auth");
              setMobileMenuOpen(false);
            }}
          >
            Sign in
          </button>
          <button 
            className="flex items-center gap-2 bg-black text-white text-sm px-3 py-2 rounded-lg w-full justify-center"
            onClick={() => {
              navigate("/auth");
              setMobileMenuOpen(false);
            }}
          >
            Get Started <FaArrowRight />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
