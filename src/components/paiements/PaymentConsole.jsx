import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import {
  faPaypal,
  faCcVisa,
  faCcMastercard,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaWhatsapp } from "react-icons/fa";

export default function PaymentConsole() {
  const [formData, setFormData] = useState({
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    email: "",
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [cart, setCart] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const isFormValid =
    formData.paymentMethod &&
    formData.cardNumber &&
    formData.expiryDate &&
    formData.cvv &&
    formData.email;

  useEffect(() => {
    if (isFormValid) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  }, [formData]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("paymentData", JSON.stringify(formData));
    setShowConfirmation(true);
  };

  const handlePaymentMethodChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleConfirmPayment = () => {
    localStorage.removeItem("cart");

    toast.success("Paiement réussi !", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      theme: "colored",
      style: {
        backgroundColor: "#A8E6A1",
        fontSize: "14px",
        width: "300px",
      },
    });

    setCart([]);
    setShowConfirmation(false);

    setTimeout(() => {
      window.location.href = "http://localhost:3000";
    }, 3000);
  };

  const handleCancelPayment = () => {
    setShowConfirmation(false);
  };

  const handleWhatsappClick = () => {
    setIsConnected(!isConnected);
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
        backgroundColor: "transparent",
        overflow: "hidden",
        padding: "20px",
        border: "9px solid black",
        borderRadius: "20px",
        transformOrigin: "top",
        boxShadow: "0 0 20px 5px rgba(0, 255, 0, 0.3)",
      }}
    >
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
          {isConnected ? "Connecté" : "Déconnecté"} {/* Texte dynamique */}
        </span>
      </div>

      <div
        style={{
          marginTop: "0px",
          backgroundColor: "transparent",
          marginLeft: "15px",
        }}
        className="container-fluid d-flex flex-column min-vh-100"
      >
        <div className="row flex-grow-1 w-100 justify-content-center align-items-center">
          <div
            className="col-12 col-md-6"
            style={{ marginTop: "0px", backgroundColor: "transparent" }}
          >
            <div
              className="card shadow-none"
              style={{
                borderRadius: "10px",
                backgroundColor: "transparent",
                padding: "20px",
                border: "none",
              }}
            >
              <div className="card-header bg-primary text-white text-center">
                <h5>
                  <i className="bi bi-wallet2"></i> Payer ici
                </h5>
              </div>

              {/* Charte de sécurité */}
              <div className="alert alert-info mt-3">
                <p align="center" className="alert-heading">
                  🔒 Politique de Sécurité.
                </p>
                <p className="mb-0">
                  En utilisant cette page, vous acceptez notre politique de
                  confidentialité et les termes et conditions de paiement.
                </p>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>💶 Méthode de Paiement</label>
                    <div className="d-flex flex-column">
                      {[
                        { value: "paypal", label: "PayPal", icon: faPaypal },
                        { value: "visa", label: "Visa", icon: faCcVisa },
                        {
                          value: "mastercard",
                          label: "MasterCard",
                          icon: faCcMastercard,
                        },
                      ].map((option) => (
                        <div key={option.value} className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="paymentMethod"
                            id={option.value}
                            value={option.value}
                            checked={formData.paymentMethod === option.value}
                            onChange={handlePaymentMethodChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={option.value}
                          >
                            <FontAwesomeIcon icon={option.icon} />{" "}
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="cardNumber">💳 Numéro de Carte</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="expiryDate">📅 Date d'Expiration</label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiryDate"
                      placeholder="MM/AA"
                      value={formData.expiryDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="cvv">🔢 CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="email">📧 Adresse Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="exemple@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mt-3 w-100"
                    disabled={!isFormValid}
                  >
                    <FontAwesomeIcon icon={faCreditCard} /> Payer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div
            className="confirmation-modal"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(233, 189, 185, 0.9)",
              padding: "20px",
              borderRadius: "10px",
              fontSize: "14px",
              color: "white",
              textAlign: "center",
              zIndex: 1000,
            }}
          >
            <h4>Êtes-vous sûr de vouloir valider le paiement ?</h4>
            <button
              onClick={handleConfirmPayment}
              className="btn btn-light mr-2"
              aria-label="Confirmer le paiement"
            >
              Oui
            </button>
            <button
              onClick={handleCancelPayment}
              className="btn btn-dark"
              aria-label="Annuler le paiement"
            >
              Non
            </button>
          </div>
        )}

        <ToastContainer
          style={{
            marginTop: "75px",
          }}
        />
      </div>
    </div>
  );
}
