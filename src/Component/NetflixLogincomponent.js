import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NetflixLogincomponent.css";

export default function NetflixLogincomponent() {
  const navigate = useNavigate();

  // State for managing form input and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login success
  const handleLoginSuccess = () => {
    if (validateForm()) {
      setError(""); // Clear any previous error
      navigate("/logsuc"); // Navigate to NetflixSucNavcomponent
    }
  };

  // Form validation logic
  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  return (
    <div className="login-container">
      {/* Left Side: Image Section */}
      <div className="login-image-section">
        <img
          src="https://via.placeholder.com/400x600" // Replace with your image URL
          alt="Netflix Banner"
          className="login-image"
        />
      </div>

      {/* Right Side: Login Form Section */}
      <div className="login-form-section">
        <div className="login-form-wrapper">
          <h2 className="text-center text-light mb-4">Welcome Back</h2>
          <form>
            {/* Display Error Message */}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label text-light">Email</label>
              <input
                type="email"
                className="form-control login-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label text-light">Password</label>
              <input
                type="password"
                className="form-control login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={handleLoginSuccess}
            >
              Login
            </button>

            {/* Sign-Up Link */}
            <p className="text-light mt-3 text-center">
              Don't have an account?{" "}
              <a href="/signin" className="text-danger text-decoration-none">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
