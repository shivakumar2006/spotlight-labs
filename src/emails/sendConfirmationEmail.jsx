// sendConfirmationEmail.js
// import { Resend } from 'resend';

// const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY); // yaha actual API key daal

export const sendConfirmationEmail = async (email, link) => {
  try {
    const response = await fetch("http://localhost:8080/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        link: link,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Email not sent:", data.error);
    } else {
      console.log("✅ Email sent successfully:", data.message);
    }
  } catch (err) {
    console.error("❌ Network error:", err.message);
  }
};

