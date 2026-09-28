import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const identifier =
    location.state?.identifier ||
    location.state?.email ||
    "";

  const type = location.state?.type || "email";
  const purpose = location.state?.purpose || "reset-password";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const isPhoneLogin =
    type === "phone" && purpose === "login";

  const handleOtpChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setError("");

    /*
      Temporary frontend-only OTP flow.

      Later this will call the backend to verify
      the actual OTP.
    */

    if (isPhoneLogin) {
      // Phone login → Home
      navigate("/");
    } else {
      // Forgot password → Reset Password
      navigate("/reset-password", {
        state: {
          identifier,
          type,
          otp,
        },
      });
    }
  };

  const handleResendOTP = () => {
    setOtp("");
    setError("");

    // Later this will call the backend
    // to send a new OTP.
    alert("A new OTP has been sent.");
  };

  return (
    <div className="verify-otp-page">
      <div className="verify-otp-container">

        {/* Left Brand Section */}
        <div className="verify-otp-brand">
          <div className="verify-otp-brand-content">
            <span className="verify-otp-label">
              IP-SAKTI-Sahayak
            </span>

            <h1>
              Verify your
              <span> identity.</span>
            </h1>

            <p>
              Enter the verification code sent to your
              {type === "phone"
                ? " phone number."
                : " email address."}
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="verify-otp-form-section">
          <div className="verify-otp-card-header">

            <span className="verify-otp-icon">
              #
            </span>

            <h2>Verify OTP</h2>

            <p>
              We've sent a 6-digit verification code to
              your {type === "phone" ? "phone number" : "email"}.
            </p>

            {identifier && (
              <strong className="verify-otp-identifier">
                {identifier}
              </strong>
            )}
          </div>

          <form
            className="verify-otp-form"
            onSubmit={handleSubmit}
          >
            <div className="verify-otp-input-group">
              <label htmlFor="otp">
                Verification Code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                autoComplete="one-time-code"
                autoFocus
              />

              {error && (
                <p className="verify-otp-error">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="verify-otp-submit-button"
            >
              {isPhoneLogin
                ? "Verify & Login"
                : "Verify OTP"}

              <span>→</span>
            </button>
          </form>

          <div className="verify-otp-resend">
            <span>Didn't receive the code?</span>

            <button
              type="button"
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          </div>

          <div className="verify-otp-back">
            <span>
              {isPhoneLogin
                ? "Want to use another number?"
                : "Entered the wrong email?"}
            </span>

            <Link
              to={
                isPhoneLogin
                  ? "/login"
                  : "/forgot-password"
              }
            >
              Go Back
            </Link>
          </div>

          <p className="verify-otp-disclaimer">
            IP-SAKTI-Sahayak provides informational assistance
            and should not replace professional legal advice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;