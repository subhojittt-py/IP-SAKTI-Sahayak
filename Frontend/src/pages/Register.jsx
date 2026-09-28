import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary frontend-only registration action.
    // Real account creation will be connected to the backend later.
    navigate("/login");
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* Left Side */}
        <div className="register-brand-section">
          <Link to="/" className="register-brand">
            IP-SAKTI-Sahayak
          </Link>

          <div className="register-brand-content">
            <span className="register-badge">
              JOIN IP-SAKTI-SAHAYAK
            </span>

            <h1>
              Build Your
              <br />
              Intellectual Property
              <span> Workspace.</span>
            </h1>

            <p>
              Create your account and get access to AI-powered
              intellectual property research, regulatory guidance,
              and knowledge tools.
            </p>
          </div>

          <div className="register-brand-footer">
            <span className="register-status-dot"></span>
            Start your IP research journey
          </div>
        </div>

        {/* Right Side */}
        <div className="register-form-section">
          <div className="register-card">

            <div className="register-card-header">
              <span className="register-card-label">
                CREATE ACCOUNT
              </span>

              <h2>Create your account</h2>

              <p>
                Fill in your details to get started with
                IP-SAKTI-Sahayak.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="register-form"
            >

              {/* Full Name */}
              <div className="register-input-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Email */}
              <div className="register-input-group">
                <label htmlFor="register-email">
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="register-input-group">
                <label htmlFor="register-password">
                  Password
                </label>

                <div className="register-password-wrapper">
                  <input
                    id="register-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="register-input-group">
                <label htmlFor="confirm-password">
                  Confirm Password
                </label>

                <div className="register-password-wrapper">
                  <input
                    id="confirm-password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous
                      )
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="register-terms">
                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to use IP-SAKTI-Sahayak for
                  informational and research purposes.
                </span>
              </label>

              {/* Register Button */}
              <button
                type="submit"
                className="register-submit-button"
              >
                Create Account
                <span>→</span>
              </button>
            </form>

            {/* Login */}
            <div className="register-login">
              <span>Already have an account?</span>

              <Link to="/login">
                Sign in
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="register-disclaimer">
              Your account will be connected to the
              IP-SAKTI-Sahayak platform once backend
              authentication is implemented.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;