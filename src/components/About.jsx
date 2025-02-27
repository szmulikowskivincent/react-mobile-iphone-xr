import React, { useState } from "react";
import "../css/About.css";

const AboutCard = ({ icon, title, text, className }) => (
  <div className="about-card">
    <p className={className}>
      <i className={`bi ${icon}`}></i> {title}
    </p>
    <p>{text}</p>
  </div>
);

const About = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "390px",
        height: "880px",
        margin: "0 auto",
        backgroundColor: "#fff",
        overflow: "hidden",
        padding: "0px",
        border: "9px solid black",
        borderRadius: "20px",
        boxShadow: "0 0 20px 5px rgba(0, 255, 0, 0.3)",
      }}
    >
      {/* Logo centré */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "-95px",
        }}
      >
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          style={{
            width: "150px",
            height: "auto", 
            borderRadius: "10px", 
          }}
        />
      </div>

      <div className="about-container">
        <div className="white-box">
          <div className="about-header text-center">
            <br /> <br /> <br />
            <p>
              <i className="bi bi-info-circle-fill text-primary"></i>  À propos
              de nous
            </p>
          </div>

          <div className="about-section-container">
            <AboutCard
              icon="bi-bullseye"
              title="Notre mission"
              text="Offrir des solutions de haute qualité adaptées aux besoins de chaque utilisateur, tout en favorisant une collaboration fluide et accessible."
              className="text-success"
            />

            <AboutCard
              icon="bi-eye"
              title="Notre vision"
              text="Créer un environnement connecté où vendeurs, sponsors et utilisateurs peuvent collaborer pour améliorer l'accessibilité et la distribution de produits."
              className="text-info"
            />
          </div>

          <AboutCard
            icon="bi-flag"
            title="Nos valeurs"
            text="Nous croyons en la transparence, la solidarité et l'engagement. Notre plateforme favorise la confiance et la collaboration entre utilisateurs."
            className="text-warning"
          />

          <div className="faq-section">
            <p>
              <i className="bi bi-question-circle-fill text-primary"></i> 
              Foire aux questions (FAQ)
            </p>
            <div className="list-group">
              <button
                className="list-group-item"
                onClick={() => openModal("Comment devenir sponsor sur MyApp ?")}
              >
                Comment devenir sponsor?
              </button>
              <button
                className="list-group-item"
                onClick={() =>
                  openModal("Services offerts aux acheteurs ?")
                }
              >
                Services offerts aux acheteurs?
              </button>
              <button
                className="list-group-item"
                onClick={() =>
                  openModal("La sécutité des transactions ?")
                }
              >
                Sécurité des transactions?
              </button>
            </div>
          </div>

          {showModal && (
            <div
              className="modal-overlay"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="modal-content text-center"
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "80%",
                  maxWidth: "500px",
                  border: "1px solid black",
                }}
              >
                <h5>Question</h5>
                <p>{modalContent}</p>
                <button
                  className="btn btn-secondary"
                  onClick={closeModal}
                  style={{ marginTop: "20px" }}
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
