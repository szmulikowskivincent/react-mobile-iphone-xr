import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserNavigation from "../navigation/UserNavigation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    status: "utilisateur",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userStatus") === "club") navigate("/club");
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.status === "admin" &&
      formData.email !== "marie.admin@gmail.com"
    ) {
      setErrorMessage("Vous n'avez pas accès en tant qu'ADMIN");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      if (data?.message === "Connexion réussie") {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userStatus", formData.status);
        sessionStorage.setItem("authToken", btoa(formData.email));
        navigate(
          formData.status === "club"
            ? "/club"
            : formData.status === "sponsor"
            ? "/sponsor"
            : "/database"
        );
      } else {
        setErrorMessage("Erreur de connexion. Essayez à nouveau.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data.message || "Erreur de connexion");
    }
  };

  return (
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
      <img
        src="/logo_ZakUp_v1.webp"
        alt="Logo"
        style={{ width: "180px", borderRadius: "10px", marginTop: "50px" }}
      />
      <UserNavigation />
      <div
        className="card p-4"
        style={{
          maxWidth: "375px",
          width: "100%",
          marginTop: "0px",
          borderRadius: "15px",
          border: "transparent",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <div className="input-group-text">
              <FaEnvelope />
            </div>
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
            <div className="input-group-text">
              <FaLock />
            </div>
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
            <p className="text-danger text-center" style={{ fontSize: "12px" }}>
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-info w-100"
            disabled={!formData.email || !formData.password}
          >
            Login
          </button>
        </form>
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
          bottom: "115px",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};
export default Login;
