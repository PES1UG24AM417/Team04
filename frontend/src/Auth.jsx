
import { useState } from "react";
import "./Auth.css";

const API_URL = "http://127.0.0.1:8001";

export default function Auth({ onVerified, onBack }) {
    const [step, setStep] = useState("register");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(event) {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    full_name: fullName.trim(),
                    email: email.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof data.detail === "string"
                        ? data.detail
                        : "Registration failed. Please check your details."
                );
            }

            setStep("verify");
            setMessage(
                "Account created! For local testing, get the OTP from the backend terminal."
            );
        } catch (error) {
            setMessage(
                error.message === "Failed to fetch"
                    ? "Cannot connect to the backend. Check that it is running on port 8001."
                    : error.message
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleVerify(event) {
        event.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.trim(),
                    otp,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    typeof data.detail === "string"
                        ? data.detail
                        : "Verification failed. Please check your OTP."
                );
            }

            if (data.is_verified !== true) {
                throw new Error("The server did not confirm email verification.");
            }

            setMessage("Email verified successfully!");
            onVerified();
        } catch (error) {
            setMessage(
                error.message === "Failed to fetch"
                    ? "Cannot connect to the backend. Check that it is running."
                    : error.message
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <h1>StreamHub</h1>

                {step === "register" ? (
                    <>
                        <h2>Create your account</h2>
                        <p>Join StreamHub to explore your next favorite movie.</p>

                        <form onSubmit={handleRegister}>
                            <label htmlFor="fullName">Full name</label>
                            <input
                                id="fullName"
                                type="text"
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                                minLength={2}
                                maxLength={100}
                                autoComplete="name"
                                required
                            />

                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                minLength={8}
                                maxLength={128}
                                autoComplete="new-password"
                                required
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? "Creating account..." : "Create account"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Verify your email</h2>
                        <p>
                            Enter the six-digit code for <strong>{email}</strong>.
                        </p>

                        <form onSubmit={handleVerify}>
                            <label htmlFor="otp">Verification code</label>
                            <input
                                id="otp"
                                type="text"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                value={otp}
                                onChange={(event) =>
                                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                                }
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                            >
                                {loading ? "Verifying..." : "Verify email"}
                            </button>
                        </form>

                        <button
                            type="button"
                            className="auth-secondary"
                            disabled={loading}
                            onClick={() => {
                                setStep("register");
                                setOtp("");
                                setMessage("");
                            }}
                        >
                            Back to registration
                        </button>
                    </>
                )}

                {message && (
                    <p className="auth-message" role="status" aria-live="polite">
                        {message}
                    </p>
                )}

                <button
                    type="button"
                    className="auth-secondary"
                    onClick={onBack}
                    disabled={loading}
                >
                    Back to homepage
                </button>
            </section>
        </main>
    );
}
