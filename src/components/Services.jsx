import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Services = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = [
    {
      title: "Offre Gratuite",
      price: "Gratuit",
      features: ["✔ Présence en ligne", "✔ Accès limité aux événements"],
      icon: "bi-box-seam text-secondary",
      border: "border-secondary",
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
      border: "border-success",
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
      border: "border-primary",
    },
  ];

  const handleShow = (offer) => {
    setSelectedOffer(offer);
    setShow(true);
  };

  const handleClose = () => setShow(false);

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
        padding: "20px",
        border: "9px solid black",
        borderRadius: "20px",
      }}
    >
      <div className="container services-container mt-5 services-page">
        <div style={{marginBottom: "120px"}} className="row mt-4 g-4">
          {offers.map((offer, index) => (
            <div
              className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
              key={index}
            >
              <div
                style={{ marginTop: "-0px" }}
                className={`card ${offer.border} text-center w-100`}
              >
                <div className="card-header bg-light text-dark">
                  {offer.title}
                </div>
                <div className="card-body">
                  <i className={offer.icon} style={{ fontSize: "2rem" }}></i>
                  <h5 className="card-title">{offer.price}</h5>
                  <ul className="list-unstyled">
                    {offer.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-info mt-auto"
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
              <Modal.Title>{selectedOffer.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <i
                className={selectedOffer.icon}
                style={{ fontSize: "2rem" }}
              ></i>
              <h5>{selectedOffer.price}</h5>
              <ul>
                {selectedOffer.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      {/* Bouton de redirection vers "/abonnement" */}
      <button
        onClick={() => navigate("/offres")}
        className="btn"
        style={{
          backgroundColor: "#00BFFF",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "30px",
          padding: "10px 30px",
          position: "absolute",
          bottom: "75px",
        }}
      >
        Accéder aux offres
      </button>
    </div>
  );
};

export default Services;
