import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    async function handleLogout() {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
            alert("Logout failed. Try again.");
        }
    }

    return (
        <header
            className="header"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 16px",
                gap: 12
            }}
        >
            <Link to="blogs" className="logo" style={{ textDecoration: "none" }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>Blocq .</span>
            </Link>

            <div className="nav-menu" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                    style={{
                        width: 44,
                        height: 24,
                        borderRadius: 999,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        background: theme === "dark" ? "#2d3748" : "#e6e6e6",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    <div
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 999,
                            background: "#fff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                            transform: theme === "dark" ? "translateX(20px)" : "translateX(0)",
                            transition: "transform 180ms ease"
                        }}
                    />
                    <div style={{ position: "absolute", pointerEvents: "none", marginLeft: 6 }}>
                        {theme === "dark" ? <FaMoon size={9} color="#f6e05e" /> : <FaSun size={9} color="#f6c048" />}
                    </div>
                </button>

                {user ? (
                    <>
                        <div
                            className="user-profile"
                            style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 6 }}
                        >
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    referrerPolicy="no-referrer"
                                    style={{
                                        width: 35,
                                        height: 35,
                                        borderRadius: "50%",
                                        objectFit: "cover"
                                    }}
                                />
                            ) : (
                                <FaUserCircle size={35} style={{ color: "#666" }} />
                            )}

                            <span style={{ fontSize: 14 }}>
                                {user.displayName || user.email || "User"}
                            </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="nav-button"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="nav-button"
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
