import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  useEffect(() => {
    const savedMessages =
      JSON.parse(sessionStorage.getItem("sentMessages")) || [];
    setSentMessages(savedMessages);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/contact-sponsor",
        formData
      );
      setAlertMessage(response.data.message);
      setAlertType("success");

      const newMessages = [...sentMessages, formData];
      setSentMessages(newMessages);
      sessionStorage.setItem("sentMessages", JSON.stringify(newMessages));
      setFormData({ name: "", email: "", phone: "", message: "" });

      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      setAlertMessage("Une erreur est survenue. Veuillez réessayer.");
      setAlertType("danger");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  const handleWhatsappClick = () => {
    const phoneNumber = "+32492837658";
    const message = encodeURIComponent("Bonjour, j'aimerais vous contacter.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: "380px",
          height: "830px",
          backgroundColor: "transparent",
          padding: "20px",
          border: "none",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          border: "9px solid black",
          boxShadow: "0 0 15px 3px rgba(0, 176, 240, 0.7)",
        }}
      >
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          className="w-50 mb-3"
          style={{ width: "250px" }}
        />

        <img
          src="https://static.vecteezy.com/system/resources/previews/020/009/614/original/email-and-mail-icon-black-free-png.png"
          alt="Email Icon"
          className="mb-3"
          style={{ width: "20%" }}
        />

        {alertMessage && (
          <div className={`alert alert-${alertType}`} role="alert">
            {alertMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-light p-3 rounded">
          {["name", "email", "phone"].map((field) => (
            <div key={field} className="mb-2 input-group">
              <span className="input-group-text">
                <i
                  className={`bi bi-${
                    field === "name"
                      ? "person-fill"
                      : field === "email"
                      ? "envelope-fill"
                      : "telephone-fill"
                  }`}
                ></i>
              </span>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="form-control"
                placeholder={`${
                  field.charAt(0).toUpperCase() + field.slice(1)
                } :`}
                required
                {...(field === "phone" && { pattern: "[0-9]+" })}
              />
            </div>
          ))}

          <div className="mb-2">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              placeholder="Votre message :"
              required
              rows={3}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-info w-100">
            <i className="bi bi-send-fill"></i> Envoyer
          </button>
        </form>

        <div className="mt-3 text-center">
          <h5>
            <i className="bi bi-chat-left-dots-fill"></i>
          </h5>
          {sentMessages.length === 0 ? (
            <p className="text-muted">ⓘ Aucun message envoyé.</p>
          ) : (
            <ul className="list-group">
              {sentMessages.map((msg, index) => (
                <li key={index} className="list-group-item border-0">
                  <strong>
                    <i className="bi bi-person-circle"></i> {msg.name}
                  </strong>{" "}
                  ({msg.phone}) - {msg.email}
                  <p>
                    <i className="bi bi-chat-dots"></i> {msg.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
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
          marginTop: "730px",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};

export default Contact;
