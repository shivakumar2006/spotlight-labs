import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(null); // null = loading, true = success, false = error

  useEffect(() => {
    const verifyUser = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const email = queryParams.get("email");

      if (!email) {
        setIsVerified(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/verify-db", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        console.error(err);
        setIsVerified(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 text-center">
      {isVerified === null && (
        <p className="text-xl font-semibold animate-pulse">Verifying your email...</p>
      )}

      {isVerified === true && (
        <>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            ✅ Your email has been verified!
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </>
      )}

      {isVerified === false && (
        <p className="text-xl font-semibold text-red-600">
          ❌ Verification failed. Please try again later or contact support.
        </p>
      )}
    </div>
  );
};

export default Verify;
