import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; 

export default function LoginPage() {
    const { user, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) navigate("/blogs", { replace: true });
    }, [user, navigate]);

    function handleFakeEmailLogin(e) {
        e.preventDefault();
        setError("Please sign in with Google to continue.");
    }

    async function handleGoogleLogin() {
        setError("");
        setLoading(true);
        try {
            await signInWithGoogle(); 
            navigate("/blogs");
        } catch (err) {
            console.error("Google sign-in error:", err);
            if (err.code === "auth/popup-closed-by-user") {
                setError("Popup closed. Try again.");
            } else if (err.code === "auth/cancelled-popup-request") {
                setError("Finish the previous sign-in attempt first.");
            } else {
                setError(err.message || "Login failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="form-container">
            <div className="form-box">
                <h2>Welcome Back</h2>
                <p className="form-subtitle">Sign in to continue to Blocq.</p>

                {error && (
                    <p style={{ color: "red", marginBottom: 12, textAlign: "center" }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleFakeEmailLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="form-input"
                        />
                    </div>

                    <button type="submit" className="form-button">
                        Sign In
                    </button>
                </form>

                <div className="form-divider">
                    <span>OR</span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="nav-button large-google-btn"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in with Google"}
                </button>
            </div>
        </div>
    );
}
