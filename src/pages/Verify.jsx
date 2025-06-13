import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Verify = () => {
  const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const email = queryParams.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");

      if (accessToken) {
        const { data, error } = await supabase.auth.getUser(); // handled by supabase internally 
        if (data?.user?.id) {
          await supabase
          .from("profiles")
          .update({ is_verified: true })
          .eq("id", data.user.id)

          alert("Email verified successfully");
          navigate("/auth")
        } else {
          alert("Failed to verify. Try logging in again.");
          navigate("/auth");
        }
      }
    }

    verifyUser();s

  }, [])

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
