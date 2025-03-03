import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Abonnements = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = [
    {
      title: "Offre Gratuite",
      price: "Gratuit",
      features: ["✔ Présence en ligne", "✔ Accès limité aux événements"],
      icon: "bi-box-seam text-secondary",
    },
    {
      title: "Offre Standard",
      price: "49€ / mois",
      features: [
        "✔ Sponsoring d'événements",
        "✔ Publicité ciblée",
        "✔ Support prioritaire",
      ],
      icon: "bi-star text-success",
    },
    {
      title: "Offre Premium",
      price: "99€ / mois",
      features: [
        "✔ Sponsoring sur mesure",
        "✔ Analyse de performance",
        "✔ Accompagnement personnalisé",
      ],
      icon: "bi-gem text-primary",
    },
  ];

  const handleShow = (offer) => {
    setSelectedOffer(offer);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div
      className="w-100"
      style={{
        maxWidth: "390px",
        height: "850px",
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
      <div className="container mt-3">
        <div className="row g-2">
          {offers.map((offer, index) => (
            <div className="col-12" key={index}>
              <div className="card text-center border-0 shadow-sm p-2">
                <div
                  className="card-header text-dark fw-bold"
                  style={{ fontSize: "14px", padding: "6px" }}
                >
                  {offer.title}
                </div>
                <div className="card-body p-2">
                  <i className={offer.icon} style={{ fontSize: "18px" }}></i>
                  <h6 className="mt-1 fw-bold">{offer.price}</h6>
                  <ul
                    className="list-unstyled"
                    style={{ fontSize: "12px", marginBottom: "4px" }}
                  >
                    {offer.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleShow(offer)}
                  >
                    Voir le détail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedOffer && (
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title style={{ fontSize: "16px" }}>
                {selectedOffer.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <i
                className={selectedOffer.icon}
                style={{ fontSize: "1.5rem" }}
              ></i>
              <h6 className="mt-2">{selectedOffer.price}</h6>
              <ul className="list-unstyled" style={{ fontSize: "14px" }}>
                {selectedOffer.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" size="sm" onClick={handleClose}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>

      <button
        onClick={() => navigate("/offres")}
        className="btn"
        style={{
          backgroundColor: "#00BFFF",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "30px",
          padding: "8px 25px",
          position: "absolute",
          bottom: "80px",
          fontSize: "14px",
        }}
      >
        Accéder aux offres
      </button>
    </div>
  );
};

export default Abonnements;
