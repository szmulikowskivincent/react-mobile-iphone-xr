import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield, FaSignOutAlt, FaDatabase, FaBell } from "react-icons/fa";
import "../../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [initials, setInitials] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

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

    const storedNotifications =
      JSON.parse(localStorage.getItem("events")) || [];
    setNotifications(storedNotifications);
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
              style={{ marginTop: "80px" }}
            >
              <Link to="/register" className="w-100 mb-3">
                <button className="btn btn-outline-success py-3 w-100 rounded-4 shadow-lg">
                  <i className="bi bi-person-plus me-2"></i> Register
                </button>
              </Link>
              <Link to="/login" className="w-100">
                <button className="btn btn-outline-primary py-3 w-100 rounded-4 shadow-lg">
                  <i className="bi bi-box-arrow-in-right me-2"></i> Login
                </button>
              </Link>
            </div>
          )}

          {isAuthenticated && role && (
            <div className="d-flex align-items-center">
              {/* Cloche de Notification */}
              <div className="position-relative notification-container">
                <FaBell
                  style={{
                    color: "red",
                    marginTop: "-170px",
                    marginLeft: "200px",
                  }}
                  size={24}
                  className="notification-bell"
                />
                {notifications.length > 0 && (
                  <div
                    style={{ marginLeft: "85px" }}
                    className="notification-message"
                  >
                    {`${notifications.length} nouvel événement`}
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="avatar">{initials}</div>

              {/* Déconnexion */}
              <button
                style={{ marginBottom: "50px" }}
                className="btn btn-outline-danger btn-logout"
                onClick={handleLogout}
              >
                <FaSignOutAlt size={28} /> Se Déconnecter
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
