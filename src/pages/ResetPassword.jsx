import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier =
    location.state?.identifier ||
    location.state?.email ||
    "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    /*
      Temporary frontend-only flow.

      Later this will call the backend to update
      the user's password.
    */

    alert("Password reset successfully.");

    navigate("/login");
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">

        {/* Left Brand Section */}
        <div className="reset-password-brand">
          <div className="reset-password-brand-content">
            <span className="reset-password-label">
              IP-SAKTI-Sahayak
            </span>

            <h1>
              Create a new
              <span> password.</span>
            </h1>

            <p>
              Choose a strong password to keep your
              IP-SAKTI-Sahayak account secure.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="reset-password-form-section">
          <div className="reset-password-card-header">

            <span className="reset-password-icon">
              *
            </span>

            <h2>Reset Password</h2>

            <p>
              Enter your new password below.
            </p>

            {identifier && (
              <strong className="reset-password-identifier">
                {identifier}
              </strong>
            )}
          </div>

          <form
            className="reset-password-form"
            onSubmit={handleSubmit}
          >

            {/* New Password */}
            <div className="reset-password-input-group">
              <label htmlFor="new-password">
                New Password
              </label>

              <div className="password-input-wrapper">
                <input
                  id="new-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter new password"
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div className="reset-password-input-group">
              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <div className="password-input-wrapper">
                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(
                      event.target.value
                    );
                    setError("");
                  }}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      (previous) => !previous
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="reset-password-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="reset-password-submit-button"
            >
              Reset Password
              <span>→</span>
            </button>
          </form>

          <div className="reset-password-back">
            <span>Remember your password?</span>

            <Link to="/login">
              Back to Login
            </Link>
          </div>

          <p className="reset-password-disclaimer">
            IP-SAKTI-Sahayak provides informational assistance
            and should not replace professional legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;