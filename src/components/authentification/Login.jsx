import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaLock, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    status: "utilisateur",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedStatus = localStorage.getItem("userStatus");
    if (savedStatus === "club") {
      navigate("/club");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.status === "admin" &&
      formData.email !== "marie.admin@gmail.com"
    ) {
      setErrorMessage("Désolé, mais vous n'avez pas accès en tant que ADMIN");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );

      console.log(response.data);

      if (response.data && response.data.message === "Connexion réussie") {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("userStatus", formData.status);

        const sessionToken = btoa(formData.email);
        sessionStorage.setItem("authToken", sessionToken);

        // Rediriger si l'email est celui de l'admin
        if (formData.email === "marie.admin@gmail.com") {
          navigate("/database");
        } else if (formData.status === "club") {
          navigate("/club");
        } else if (formData.status === "sponsor") {
          navigate("/sponsor");
        } else {
          navigate("/sponsor");
        }
      } else {
        setErrorMessage("Erreur de connexion. Essayez à nouveau.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response ? error.response.data.message : "Erreur de connexion"
      );
    }
  };

  const isFormValid = formData.email && formData.password;

  const handleWhatsappClick = () => {
    window.open("https://wa.me/+32492837658", "_blank");
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

      {/* Logo centré */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
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
            <i className="bi bi-box-arrow-in-right"></i> Login
          </h2>

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
                id="status"
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
              <p
                style={{ fontSize: "12px" }}
                className="text-danger text-center"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!isFormValid}
            >
              <i className="bi bi-box-arrow-in-right"></i> Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
