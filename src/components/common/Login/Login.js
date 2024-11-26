import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/send-otp", phoneNumber, {
        headers: { "Content-Type": "text/plain" },
      });
      alert("OTP sent!");
      setStep(2);
    } catch (error) {
      console.error("Error sending OTP", error);
      alert("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        {
          phoneNumber,
          otp,
        }
      );
      alert(response.data);
      navigate("/checkout");
    } catch (error) {
      console.error("Error verifying OTP", error);
      alert("Failed to verify OTP");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
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
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <p>
                By continuing, you agree to 99Notes’s{" "}
                <a href="/terms" target="_blank">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank">
                  Privacy Policy
                </a>
                .
              </p>
              <button type="submit" className="btn btn-warning">
                Send OTP
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

        {step === 1 && (
          <>
            <hr />
            <div className="register-section">
              <span>New to 99Notes?</span>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline-warning"
              >
                Create Your 99Notes Account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
