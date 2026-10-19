import { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function requestReset(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setMessage(
      "If this email belongs to a registered account, reset instructions can be sent."
    );

    setStep(2);
  }

  function verifyCode(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!verificationCode.trim()) {
      setError("Please enter your verification code.");
      return;
    }

    setError(
      "Email verification is not connected yet. A backend verification service is required."
    );
  }

  function resetPassword(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (newPassword.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setError(
      "Password reset is not connected yet. Complete email verification and backend integration first."
    );
  }

  return (
    <main className="reset-page">
      <section className="reset-card">
        <a className="reset-brand" href="/">
          <span>▶</span> StreamHub
        </a>

        <div className="reset-icon">🔐</div>

        <h1>
          {step === 1
            ? "Forgot your password?"
            : "Verify your account"}
        </h1>

        <p className="reset-description">
          {step === 1
            ? "Enter your registered email address to begin the password-reset process."
            : "Enter the verification code sent to your registered email."}
        </p>

        {message && (
          <div className="reset-message" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="reset-error" role="alert">
            {error}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={requestReset}>
            <label htmlFor="reset-email">Email address</label>

            <input
              id="reset-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />

            <button type="submit" className="reset-button">
              Request password reset
            </button>
          </form>
        )}

        {step === 2 && (
          <>
            <form onSubmit={verifyCode}>
              <label htmlFor="verification-code">
                Verification code
              </label>

              <input
                id="verification-code"
                type="text"
                placeholder="Enter your code"
                value={verificationCode}
                onChange={(event) =>
                  setVerificationCode(event.target.value)
                }
                required
              />

              <button type="submit" className="reset-button">
                Verify code
              </button>
            </form>

            <form
              className="password-form"
              onSubmit={resetPassword}
            >
              <label htmlFor="new-password">New password</label>

              <input
                id="new-password"
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                autoComplete="new-password"
                minLength={8}
                required
              />

              <label htmlFor="confirm-password">
                Confirm new password
              </label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                required
              />

              <button type="submit" className="reset-button">
                Reset password
              </button>
            </form>
          </>
        )}

        <a className="back-to-home" href="/">
          ← Back to StreamHub
        </a>
      </section>
    </main>
  );
}

export default ForgotPassword;