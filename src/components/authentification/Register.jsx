import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../css/Register.css";

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
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem("userStatus", formData.status);
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue"
      );
    }
  };

  const isFormValid = formData.username && formData.email && formData.password;

  const handleWhatsappClick = () => {
    const phoneNumber = "+32492837658";
    const message = encodeURIComponent(
      "Bonjour, j'aimerais obtenir des informations supplémentaires."
    );

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "410px",
        height: "885px",
        margin: "0 auto",
        backgroundColor: "#fff",
        overflow: "hidden",
        padding: "20px",
        border: "9px solid black",
        borderRadius: "20px",
      }}
    >
      {/* Logo centré */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          style={{
            width: "180px",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </div>

      {/* WhatsApp Icon */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "40px",
          cursor: "pointer",
          fontSize: "30px",
          color: "green",
        }}
        onClick={handleWhatsappClick}
      >
        <FaWhatsapp />
      </div>

      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="card p-4 p-sm-5"
          style={{
            maxWidth: "375px",
            width: "100%",
            marginTop: "-120px",
            border: "transparent",
            borderRadius: "15px",
          }}
        >
          <h2 className="text-center mb-4">
            <i className="bi bi-person-plus me-2"></i> Register
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <div className="input-group-text">
                <FaUser />
              </div>
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
              <p className="text-danger text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!isFormValid}
            >
              <i className="bi bi-person-check"></i> Register
            </button>
            <p
              style={{ fontSize: "14px" }}
              className="text-danger text-center mt-3"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Si utilisateur existe déjà !
            </p>
            <Link to="/login" className="btn btn-secondary w-100">
              <i className="bi bi-box-arrow-in-right"></i> Login
            </Link>
            <p
              style={{ fontSize: "14px" }}
              className="text-primary text-center mt-3"
            >
              *Enregistrez vous et accez à notre application...
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
