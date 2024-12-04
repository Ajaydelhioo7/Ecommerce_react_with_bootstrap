import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { useAuth } from "../../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91"); // Default prefix
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await axiosInstance.post("/api/auth/send-otp", phoneNumber, {
        headers: { "Content-Type": "text/plain" },
      });
      alert("OTP sent!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.error("Error sending OTP:", error.response || error.message);
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      await axiosInstance.post(
        "/api/auth/verify-otp",
        { phoneNumber, otp },
        {
          withCredentials: true, // Include credentials for cookie handling
        }
      );

      // Fetch user session after successful OTP verification
      const userResponse = await axiosInstance.get("/users/currentUser", {
        withCredentials: true,
      });

      // Update context with user data
      login(userResponse.data);

      // Redirect to the account page
      navigate("/account");
    } catch (error) {
      console.error("Error verifying OTP:", error.response || error.message);
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;

    // Ensure the value always starts with "+91"
    if (!input.startsWith("+91")) {
      return;
    }

    // Allow only numeric characters after "+91"
    const sanitizedInput = input.replace(/[^\d+]/g, "");
    setPhoneNumber(sanitizedInput);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {step === 1 && (
          <>
            <h2>Login With OTP</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendOtp();
              }}
            >
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
              <button type="submit" className="btn btn-warning">
                Request OTP
              </button>
            </form>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Enter OTP</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyOtp();
              }}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-warning">
                Verify OTP
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
