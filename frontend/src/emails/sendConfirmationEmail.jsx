// sendConfirmationEmail.js
// import { Resend } from 'resend';

// const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY); // yaha actual API key daal

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendConfirmationEmail = async (email, link) => {
  try {
    const response = await fetch(`${BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        link,
      }),
    });

    const text = await response.text(); // 👈 always get raw text first

    if (!response.ok) {
      console.error("❌ Email not sent:", text); // 👈 show full error
    } else {
      const data = JSON.parse(text); // ✅ only parse if safe
      console.log("✅ Email sent successfully:", data.message);
    }
  } catch (err) {
    console.error("❌ Network error:", err.message);
  }
};
