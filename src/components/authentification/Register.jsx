import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Register.css";
import UserNavigation from "../navigation/UserNavigation";

const API_URL = "http://localhost:5000/register";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    status: "sponsor",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("userStatus", formData.status);
      const { data } = await axios.post(API_URL, formData);
      alert(data.message);
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue"
      );
    }
  };

  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  return (
    <div className="cover">
      <div
        className="d-flex flex-column align-items-center p-4"
        style={{
          width: "375px",
          height: "835px",
          margin: "0 auto",
          backgroundColor: "#fff",
          border: "9px solid black",
          borderRadius: "20px",
          boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
        }}
      >
        <div className="register-container">
          <div align="center" className="logo-container mb-4">
            <img
              src="/logo_ZakUp_v1.webp"
              alt="Logo"
              className="logo"
              style={{ width: "210px", marginTop: "50px" }}
            />
          </div>
          <UserNavigation />

          <div style={{ marginTop: "150px" }} className="register-card w-100">
            <h2 className="text-center mb-4">
              <i className="bi bi-person-plus me-2"></i> Register
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="sponsor">Sponsor</option>
                  <option value="admin">Admin</option>
                  <option value="club">Club</option>
                </select>
              </div>
              {errorMessage && (
                <p className="text-danger text-center">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="btn btn-info w-100"
                disabled={!isFormValid}
              >
                <i className="bi bi-person-check"></i> Register
              </button>
              <p className="text-danger text-center mt-3">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Si utilisateur existe déjà !
              </p>
              <Link to="/login" className="btn btn-secondary w-100">
                <i className="bi bi-box-arrow-in-right"></i> Login
              </Link>
            </form>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="btn"
        style={{
          backgroundColor: "#00BFFF",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "30px",
          padding: "10px 30px",
          position: "absolute",
          marginLeft: "75px",
          bottom: "75px",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};

export default Register;
