import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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
        <header className="header">
            <Link to="/" className="logo">
                Blocq .
            </Link>

            <div className="nav-menu">
                {user ? (
                    <>
                        <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40x40/333333/FFFFFF?text=U"}
                                alt="Profile"
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                            />
                            <span>{user.displayName || user.email || "User"}</span>
                        </div>

                        <button onClick={handleLogout} className="nav-button">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="nav-button">
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    );
}
