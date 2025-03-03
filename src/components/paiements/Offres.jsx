import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Offres = () => {
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

  const handleClose = () => setShow(false);

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
      features: ["✔ Sponsoring", "✔ Publicité ciblée", "✔ Support prioritaire"],
      icon: "bi-star text-success",
    },
    {
      title: "Offre Premium",
      price: "99€ / mois",
      features: ["✔ Sponsoring sur mesure", "✔ Analyse de performance"],
      icon: "bi-gem text-primary",
    },
  ];

  return (
    <div
      className="d-flex flex-column align-items-center p-4"
      style={{
        width: "375px",
        height: "850px",
        margin: "0 auto",
        backgroundColor: "#fff",
        border: "9px solid black",
        borderRadius: "20px",
        boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
      }}
    >
      <div className="w-100">
        <div className="row">
          {offers.map((offer, index) => (
            <div className="col-12 mb-1" key={index}>
              <div
                className="card text-center border-0 shadow-sm"
                style={{ padding: "8px", marginBottom: "-0px" }}
              >
                <div className="card-header p-1 fw-bold">{offer.title}</div>
                <div className="card-body p-2">
                  <i
                    className={`bi ${offer.icon}`}
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                  <h6 className="mt-1">{offer.price}</h6>
                  <ul
                    className="list-unstyled mb-1"
                    style={{ fontSize: "0.8rem" }}
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
                  <span className="ms-1">Choisir</span>
                </div>
                <button
                  className="btn btn-info w-100 p-1"
                  onClick={() => handleShow(offer)}
                  style={{ fontSize: "0.8rem" }}
                >
                  Voir le détail
                </button>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="mt-2 w-100 p-1"
          variant="success"
          onClick={handleValidation}
          disabled={!chosenOffer}
          style={{ fontSize: "0.9rem" }}
        >
          Valider et Payer
        </Button>
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
          bottom: "40px",
        }}
      >
        Accéder aux Services
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">{chosenOffer?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <i
            className={`bi ${chosenOffer?.icon}`}
            style={{ fontSize: "1.5rem" }}
          ></i>
          <h6 className="mt-1">{chosenOffer?.price}</h6>
          <ul className="list-unstyled" style={{ fontSize: "0.8rem" }}>
            {chosenOffer?.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="sm">
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Offres;
