import React, { useState } from "react";
import axios from "axios"; // Import Axios for API calls
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // To show a loading indicator
  const [error, setError] = useState(""); // To display error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send the form data to your API
      const response = await axios.post(
        "http://localhost:8080/users/register",
        formData
      );

      if (response.status === 201 || response.status === 200) {
        alert("Account created successfully!");
        // Optionally, redirect to login or OTP verification
        window.location.href = "/login"; // Redirect to login page
      }
    } catch (err) {
      console.error("Error creating account:", err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          {error && <div className="error-message">{error}</div>}{" "}
          {/* Display error message */}
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="First and Last Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At Least 8 Characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group captcha">
            <input type="checkbox" required /> I’m not a robot
          </div>
          <button type="submit" className="btn btn-warning" disabled={loading}>
            {loading ? "Creating Account..." : "Verify Mobile Number"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
