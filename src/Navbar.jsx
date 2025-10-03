import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // get current path

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/"); // redirect to home/login
  };

  // Determine button label and link
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          CleanTrack
        </Link>
      </div>

      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        ) : (
          <Link
            to={isRegisterPage ? "/" : "/register"} // switch link based on current page
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              borderRadius: "4px",
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {isRegisterPage ? "Login" : "Register"} {/* switch text */}
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
