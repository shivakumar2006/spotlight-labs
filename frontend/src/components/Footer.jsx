import React from 'react';
import { MdStars } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="w-full px-4 py-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Logo + Name */}
        <div className="flex items-center gap-2 mb-4 md:mb-0 cursor-pointer">
          <MdStars className="text-2xl" />
          <p className="font-medium text-lg">Spotlight Labs</p>
        </div>

        {/* Footer text */}
        <p className="text-sm text-gray-500 text-center">
          © 2025 Spotlight Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
