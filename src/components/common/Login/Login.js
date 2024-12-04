import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { useAuth } from "../../../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const { authData, login } = useAuth(); // Access auth context
  const navigate = useNavigate();

  // Redirect to account page if already logged in
  useEffect(() => {
    if (authData) {
      navigate("/account");
    }
  }, [authData, navigate]);

  const sendOtp = async () => {
    try {
      await axiosInstance.post("/api/auth/send-otp", phoneNumber, {
        headers: { "Content-Type": "text/plain" },
      });
      alert("OTP sent!");
      setStep(2);
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      await axiosInstance.post(
        "/api/auth/verify-otp",
        { phoneNumber, otp },
        {
          withCredentials: true,
        }
      );

      const response = await axiosInstance.get("/users/currentUser", {
        withCredentials: true,
      });

      login(response.data); // Store user data in context
      navigate("/account"); // Redirect to account page
    } catch (error) {
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
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
                onChange={(e) => setPhoneNumber(e.target.value)}
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
