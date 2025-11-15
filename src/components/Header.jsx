import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa"; 

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
            <Link to="blogs" className="logo">
                Blocq .
            </Link>

            <div className="nav-menu">
                {user ? (
                    <>
                        <div className="user-profile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    referrerPolicy="no-referrer" 
                                    style={{
                                        width: 35,
                                        height: 35,
                                        marginRight: 0,
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <FaUserCircle
                                    size={40}
                                    style={{ color: "#333" }} 
                                />
                            )}

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