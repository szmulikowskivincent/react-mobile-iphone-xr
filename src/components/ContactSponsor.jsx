import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa"; 

const ContactSponsor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [isConnected] = useState(false);

  useEffect(() => {
    const savedMessages =
      JSON.parse(sessionStorage.getItem("sentMessages")) || [];
    setSentMessages(savedMessages);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div
        style={{
          width: "390px",
          height: "880px",
          backgroundColor: "#fff",
          padding: "20px",
          border: "9px solid black",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
          boxShadow: "0 0 20px 5px rgba(0, 255, 0, 0.3)",
        }}
      >
        {/* Logo */}
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          style={{ width: "180px", marginBottom: "20px", marginTop: "50px" }}
        />

        {/* WhatsApp Icon in top right */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "180px",
            cursor: "pointer",
            fontSize: "30px",
            color: isConnected ? "green" : "gray",
          }}
          onClick={handleWhatsappClick}
        >
          <FaWhatsapp />
          <span style={{ marginLeft: "8px" }}>
            {isConnected ? "Connecté" : "Déconnecté"}
          </span>
        </div>

        {/* Icône email */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/020/009/614/original/email-and-mail-icon-black-free-png.png"
          width="20%"
          alt="Email Icon"
          style={{ marginBottom: "20px" }}
        />

        {/* Formulaire */}
        <div style={{ width: "90%" }}>
          {alertMessage && (
            <div className={`alert alert-${alertType}`} role="alert">
              {alertMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-light p-3 rounded shadow">
            <p className="text-center mb-3">
              <i className="bi bi-envelope-fill"></i>  Contact Sponsor
            </p>

            <div className="mb-2 input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Nom :"
                required
              />
            </div>

            <div className="mb-2 input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email :"
                required
              />
            </div>

            <div className="mb-2 input-group">
              <span className="input-group-text">
                <i className="bi bi-telephone-fill"></i>
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Téléphone :"
                required
              />
            </div>

            <div className="mb-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Votre message :"
                required
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              <i className="bi bi-send-fill"></i> Envoyer
            </button>
          </form>

          {/* Liste des messages envoyés */}
          <div className="mt-3 text-center">
            <h5>
              <i className="bi bi-chat-left-dots-fill"></i>
            </h5>
            {sentMessages.length === 0 ? (
              <p className="text-muted">ⓘ Aucun message envoyé.</p>
            ) : (
              <ul className="list-group">
                {sentMessages.map((msg, index) => (
                  <li key={index} className="list-group-item">
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
      </div>
    </div>
  );
};

export default ContactSponsor;
