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
  const [timer, setTimer] = useState(60); // Timer for resend OTP
  const { authData, login } = useAuth(); // Access global authentication context
  const navigate = useNavigate();

  // Redirect to account page if already logged in
  useEffect(() => {
    if (authData) {
      navigate("/account");
    }
  }, [authData, navigate]);

  // Countdown for OTP resend timer
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup timer
    }
  }, [step, timer]);

  const sendOtp = async () => {
    try {
      await axiosInstance.post("/api/auth/send-otp", phoneNumber, {
        headers: { "Content-Type": "text/plain" },
      });
      alert("OTP sent!");
      setStep(2);
      setTimer(60); // Reset timer
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      // Verify OTP with backend
      await axiosInstance.post(
        "/api/auth/verify-otp",
        { phoneNumber, otp },
        {
          withCredentials: true,
        }
      );

      // Fetch current user details and store them globally
      const response = await axiosInstance.get("/users/currentUser", {
        withCredentials: true,
      });

      login(response.data); // Store session data in AuthContext
      navigate("/account"); // Redirect to account page
    } catch (error) {
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
    <div className="login-container-custom">
      <div className="login-box-custom">
        {errorMessage && <p className="login-error-message">{errorMessage}</p>}
        {step === 1 && (
          <>
            <h2 className="login-title">Login With OTP</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendOtp();
              }}
            >
              <input
                type="text"
                className="login-input"
                placeholder="Enter Email / Mobile Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
              <p className="login-terms">
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
              <button type="submit" className="btn btn-warning login-button">
                Request OTP
              </button>
            </form>
            <div className="login-register-section">
              <hr className="login-divider" />
              <span className="login-register-text">New to 99Notes?</span>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline-warning login-register-button"
              >
                Create Your 99Notes Account
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="login-title">Verify Mobile Number</h2>
            <p className="login-info">
              A text with a One Time Password (OTP) has been sent to your mobile
              number: <strong>{phoneNumber.slice(3)}</strong>{" "}
              <span
                className="change-link"
                onClick={() => setStep(1)} // Return to phone input step
              >
                Change
              </span>
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyOtp();
              }}
            >
              <label htmlFor="otp" className="otp-label">
                Enter OTP:
              </label>
              <input
                type="text"
                id="otp"
                className="login-input"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <div className="resend-section">
                {timer > 0 ? (
                  <span className="resend-timer">Resend OTP in {timer}s</span>
                ) : (
                  <span
                    className="resend-link"
                    onClick={sendOtp} // Allow resend OTP
                  >
                    Resend OTP
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-warning login-button login-otp-button"
              >
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
