// sendConfirmationEmail.js
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY); // yaha actual API key daal

export const sendConfirmationEmail = async (userEmail, confirmationLink) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Ya tera custom verified email if you have one
      to: userEmail,
      subject: 'Confirm your signup',
      html: `
        <h2>Confirm your account</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${confirmationLink}" target="_blank">Verify Email</a>
      `
    });

    if (error) {
      console.error("❌ Email send error:", error);
    } else {
      console.log("✅ Email sent successfully:", data);
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
};
