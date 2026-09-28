import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    // Temporary frontend flow.
    // Later this will call the backend to send the OTP.
    navigate("/verify-otp", {
      state: {
        email: email.trim(),
      },
    });
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">

        {/* Left Brand Section */}
        <div className="forgot-password-brand">
          <div className="forgot-password-brand-content">
            <span className="forgot-password-label">
              IP-SAKTI-Sahayak
            </span>

            <h1>
              Recover your
              <span> account.</span>
            </h1>

            <p>
              Enter your registered email address and we'll
              help you regain access to your account.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="forgot-password-form-section">
          <div className="forgot-password-card-header">
            <span className="forgot-password-icon">
              ?
            </span>

            <h2>Forgot Password?</h2>

            <p>
              Enter the email address associated with your
              account to continue.
            </p>
          </div>

          <form
            className="forgot-password-form"
            onSubmit={handleSubmit}
          >
            <div className="forgot-password-input-group">
              <label htmlFor="forgot-email">
                Email Address
              </label>

              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="Enter your email address"
                autoComplete="email"
              />

              {error && (
                <p className="forgot-password-error">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="forgot-password-submit-button"
            >
              Send OTP
              <span>→</span>
            </button>
          </form>

          <div className="forgot-password-back">
            <span>Remember your password?</span>

            <Link to="/login">
              Back to Login
            </Link>
          </div>

          <p className="forgot-password-disclaimer">
            IP-SAKTI-Sahayak provides informational assistance
            and should not replace professional legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;