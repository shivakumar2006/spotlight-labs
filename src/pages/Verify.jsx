import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Verify = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/auth");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Email Sent ✅</h1>
        <p className="mt-4">A confirmation email has been sent to:</p>
        <p className="text-lg font-semibold text-blue-600">{email}</p>
        <p className="mt-2 text-gray-600">Please click on the link in your email inbox to complete verification.</p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Verify;
