import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const verifyUser = async () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const access_token = hashParams.get("access_token");
    const refresh_token = hashParams.get("refresh_token");
    const email = new URLSearchParams(window.location.search).get("email");

    if (access_token && refresh_token) {
      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (sessionError) {
        alert("Failed to set session.");
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.auth.getUser();
      if (data?.user?.id) {
        // Optional: Confirm if email is actually confirmed
        console.log("Confirmed:", data.user.email_confirmed_at);

        await supabase
          .from("profiles")
          .update({ is_verified: true })
          .eq("id", data.user.id);

        alert("✅ Email verified successfully!");
      } else {
        alert("⚠️ Failed to verify. Try logging in again.");
      }

      navigate("/auth");
    } else {
      // Don't do anything here — wait for token to load
      console.warn("Tokens missing in URL");
    }
  };

  verifyUser();
}, []);


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Email Sent ✅</h1>
        <p className="mt-4">Click the verification link in your email.</p>
        <button
          onClick={() => navigate("/auth")}
          className="mt-6 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Verify;
