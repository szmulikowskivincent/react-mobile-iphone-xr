import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaDatabase,
  FaBell,
  FaUserPlus,
  FaSignInAlt,
  FaInfoCircle,
  FaDollarSign,
  FaEnvelope,
  FaStore,
  FaUser,
  FaTachometerAlt,
} from "react-icons/fa";
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

        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul style={{ marginLeft: "15px" }} className="navbar-nav me-auto">
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/abonnement">
                    <FaDollarSign /> Abonnement
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/objectifs">
                    <FaInfoCircle /> Notre objectif
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/store">
                <FaStore /> Store
              </Link>
            </li>
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    <FaUserPlus /> S'enregistrer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <FaSignInAlt /> Se connecter
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <FaEnvelope /> Contact
              </Link>
            </li>
            {isAuthenticated && role && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <FaUser /> Mon profil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/ajouterProduit">
                    <FaTachometerAlt /> Ajouter un produit
                  </Link>
                </li>
                {role === "Admin" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/database">
                      <FaDatabase /> Accès Database
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          <Link
            title="Home"
            className="navbar-brand d-flex align-items-center"
            to="/"
          >
            <img
              style={{ marginTop: "10px" }}
              src="/logo_ZakUp_v1.webp"
              alt="Logo"
            />
          </Link>

          {isAuthenticated && role && (
            <div className="d-flex align-items-center">
              <div className="position-relative notification-container">
                {notifications.length > 0 && (
                  <div
                    style={{ marginLeft: "80px" }}
                    className="notification-message"
                  >
                    {`${notifications.length} 🔔 nouvel événement`}
                  </div>
                )}
              </div>
              <button
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
