import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../../../redux/userSlice"; 
import "./Login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("+91"); // Default prefix included
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  //const { login } = useAuth(); // Use login function from AuthContext
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/auth/send-otp",
        phoneNumber, // Send full phone number, including prefix
        {
          headers: { "Content-Type": "text/plain" },
        }
      );
      console.log("OTP sent response:", response.data); // Debug the response
      alert("OTP sent!");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      console.error("Error sending OTP:", error.response || error.message);
      setErrorMessage(
        "Failed to send OTP. Please check the phone number and try again."
      );
    }
  };
  const dispatch = useDispatch();
  const verifyOtp = async () => {
    try {
      const response = await axiosInstance.post("/api/auth/verify-otp", {
        phoneNumber, // Send full phone number, including prefix
        otp,
      });

      console.log("Verify OTP response:", response.data); // Debug the response

      if (response.status === 200) {
        dispatch(fetchUserData()); 
        navigate("/account"); // Redirect to the account page
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response || error.message);
      if (error.response?.status === 401) {
        setErrorMessage("Invalid OTP. Please try again.");
      } else {
        setErrorMessage("Failed to verify OTP. Please try again.");
      }
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
        <div className="logo"></div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Show error messages */}
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
              <p className="terms">
                By continuing, you agree to 99Notes’s{" "}
                <a href="/terms" target="_blank" rel="noopener noreferrer">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </a>
                .
              </p>
              <button type="submit" className="btn btn-warning">
                Request OTP
              </button>
            </form>
            <div className="register-section">
              <hr />
              <span>New to 99Notes?</span>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline-warning register-btn"
              >
                Create Your 99Notes Account
              </button>
            </div>
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
