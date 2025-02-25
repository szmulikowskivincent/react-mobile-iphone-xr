import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield, FaSignOutAlt, FaDatabase } from "react-icons/fa";
import "../../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [initials, setInitials] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const savedStatus = localStorage.getItem("userStatus");

    if (email) {
      setIsAuthenticated(true);
      const nameParts = email.split("@")[0].split(".");
      const initials = nameParts
        .map((part) => part.charAt(0).toUpperCase())
        .join("");
      setInitials(initials);

      if (email === "marie.admin@gmail.com") {
        setRole("Admin");
      } else if (savedStatus === "Sponsor") {
        setRole("Sponsor");
      } else if (savedStatus) {
        setRole(savedStatus);
      } else {
        setRole("Utilisateur");
      }
    } else {
      setIsAuthenticated(false);
      setRole("Invité");
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsAuthenticated(false);
    setInitials("");
    setRole("Invité");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link
          title="Home"
          className="navbar-brand d-flex align-items-center"
          to="/"
        >
          <img src="/logo_ZakUp_v1.webp" alt="Logo" />
        </Link>

        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          {isAuthenticated && role && (
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/abonnement">
                  Abonnement
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  My-Profil
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  My-Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              {role === "Admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/database">
                    <FaDatabase /> Accès Database
                  </Link>
                </li>
              )}
            </ul>
          )}

          {!isAuthenticated && (
            <div
              className="d-flex flex-column align-items-center justify-content-center"
              style={{ marginTop: "100px" }}
            >
              <Link to="/register" className="w-100 mb-3">
                <button
                  style={{
                    fontSize: "25px",
                    letterSpacing: "1px",
                    fontWeight: "600",
                    transition: "all 0.3s ease-in-out",
                  }}
                  className="btn btn-outline-success py-3 w-100 rounded-4 shadow-lg hover:bg-success hover:text-white hover:border-success focus:outline-none focus:ring-2 focus:ring-success"
                >
                  <i className="bi bi-person-plus me-2"></i> Register
                </button>
              </Link>
              <Link to="/login" className="w-100">
                <button
                  style={{
                    fontSize: "25px",
                    letterSpacing: "1px",
                    fontWeight: "600",
                    transition: "all 0.3s ease-in-out",
                  }}
                  className="btn btn-outline-primary py-3 w-100 rounded-4 shadow-lg hover:bg-primary hover:text-white hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i> Login
                </button>
              </Link>

              <img
                style={{ marginTop: "70px" }}
                src="/qrcode_localhost-removebg-preview.png"
                width="50%"
                alt="QR Code"
                onClick={() => navigate("/dashboard-vente-achat")}
              />
              <p style={{ color: "black", fontSize: "14px", marginTop: "15px" }}>
                <i
                  className="bi bi-cart-fill"
                  style={{ marginRight: "5px" }}
                ></i>
                Cliquez ici pour accéder au market shop!
              </p>
            </div>
          )}

          {isAuthenticated && role && (
            <div className="d-flex align-items-center">
              {/* Badge Role */}
              <span className="badge">
                <FaUserShield size={28} /> {role}
              </span>

              {/* Déconnexion */}
              <button
                className="btn btn-outline-danger btn-logout"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={28} /> Se Déconnecter
              </button>

              {/* Avatar avec Initiales */}
              <div className="avatar">{initials}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
