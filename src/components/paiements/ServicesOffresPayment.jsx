import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [show, setShow] = useState(false);
  const [chosenOffer, setChosenOffer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOffer = sessionStorage.getItem("chosenOffer");
    if (savedOffer) {
      setChosenOffer(JSON.parse(savedOffer));
    }
  }, []);

  const handleValidation = () => {
    if (chosenOffer) {
      sessionStorage.setItem("chosenOffer", JSON.stringify(chosenOffer));
      navigate("/paiement", { state: { offer: chosenOffer } });
    }
  };

  const handleShow = (offer) => {
    setChosenOffer(offer);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

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

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "10px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 0 20px 5px rgba(0, 255, 0, 0.3)",
      }}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          width: "100%",
          maxWidth: "375px",
          height: "100%",
          backgroundColor: "transparent", 
          paddingBottom: "20px",
        }}
      >
        <div style={{ marginTop: "20px", width: "100%" }}>
          <div className="row mt-3">
            {offers.map((offer, index) => (
              <div className="col-12 mb-2" key={index}>
                <div className={`card text-center ${offer.border}`}>
                  <div className="card-header" style={{ fontSize: "1rem" }}>
                    {offer.title}
                  </div>
                  <div className="card-body" style={{ padding: "10px" }}>
                    <i
                      className={`bi ${offer.icon}`}
                      style={{ fontSize: "1.1rem" }}
                    ></i>
                    <h5 style={{ fontSize: "1rem" }}>{offer.price}</h5>
                    <ul
                      className="list-unstyled"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {offer.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                    <input
                      type="radio"
                      name="offerSelection"
                      value={offer.title}
                      onChange={() => setChosenOffer(offer)}
                      checked={chosenOffer?.title === offer.title}
                    />
                    <span className="ms-2" style={{ fontSize: "0.9rem" }}>
                      Choisir
                    </span>
                  </div>
                  <button
                    className="btn btn-info w-100"
                    onClick={() => handleShow(offer)}
                    style={{ fontSize: "0.9rem" }}
                  >
                    Voir le détail
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            style={{ marginBottom: "10px", fontSize: "1rem" }}
            className="mt-3 w-100"
            variant="success"
            onClick={handleValidation}
            disabled={!chosenOffer}
          >
            Valider et Payer
          </Button>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{chosenOffer?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <i
              className={`bi ${chosenOffer?.icon}`}
              style={{ fontSize: "2rem" }}
            ></i>
            <h5>{chosenOffer?.price}</h5>
            <ul style={{ fontSize: "0.9rem" }}>
              {chosenOffer?.features.map((feature, idx) => (
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
      </div>
    </div>
  );
};

export default Services;
