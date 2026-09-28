import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary frontend-only login action.
    // Real authentication will be connected later.
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Side */}
        <div className="login-brand-section">
          <Link to="/" className="login-brand">
            IP-SAKTI-Sahayak
          </Link>

          <div className="login-brand-content">
            <span className="login-badge">
              AI-POWERED IP ASSISTANT
            </span>

            <h1>
              Your Intellectual
              <br />
              Property Journey
              <span> Starts Here.</span>
            </h1>

            <p>
              Access your personalized workspace and explore
              intellectual property, regulatory information,
              traditional knowledge, and AI-powered assistance.
            </p>
          </div>

          <div className="login-brand-footer">
            <span className="login-status-dot"></span>
            Secure access to IP-SAKTI-Sahayak
          </div>
        </div>

        {/* Right Side */}
        <div className="login-form-section">
          <div className="login-card">

            <div className="login-card-header">
              <span className="login-card-label">
                WELCOME BACK
              </span>

              <h2>Sign in to your account</h2>

              <p>
                Enter your details to continue to
                IP-SAKTI-Sahayak.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="login-form"
            >

              {/* Email */}
              <div className="login-input-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password */}
              <div className="login-input-group">
                <div className="login-password-label">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      alert(
                        "Password recovery will be added later."
                      )
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="password-input-wrapper">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    name="remember"
                  />

                  <span>Remember me</span>
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="login-submit-button"
              >
                Sign In
                <span>→</span>
              </button>
            </form>

            {/* Register */}
            <div className="login-register">
              <span>Don't have an account?</span>

              <Link to="/register">
                Create an account
              </Link>
            </div>

            {/* Disclaimer */}
            <div className="login-disclaimer">
              By continuing, you agree to use
              IP-SAKTI-Sahayak for informational and
              research purposes.
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;