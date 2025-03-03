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
import UserNavigation from "../navigation/UserNavigation";

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

  const isFormValid = Object.values(formData).every(Boolean);

  useEffect(() => {
    setIsConnected(isFormValid);
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

  return (
    <div className="payment-console" style={styles.container}>
      <UserNavigation />
      <div className="card" style={styles.card}>
        <div className="card-header bg-info text-white d-flex align-items-center">
          <i
            className="bi bi-credit-card"
            style={{ fontSize: "1.2rem", marginRight: "10px" }}
          ></i>
          <h5>Payer ici</h5>
        </div>

        <div className="alert alert-info" style={styles.alert}>
          <p>🔒 Politique de Sécurité</p>
          <p>
            En utilisant cette page, vous acceptez notre politique de
            confidentialité et les termes et conditions de paiement.
          </p>
        </div>

        <div className="card-body" style={{ textAlign: "left" }}>
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
                      value={option.value}
                      checked={formData.paymentMethod === option.value}
                      onChange={handlePaymentMethodChange}
                    />
                    <label className="form-check-label">
                      <FontAwesomeIcon icon={option.icon} /> {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <br />

            <div className="form-group">
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

            <br />

            <div className="form-group">
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

            <br />

            <div className="form-group">
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

            <br />

            <div className="form-group">
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

            <br />

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={!isFormValid}
            >
              <FontAwesomeIcon icon={faCreditCard} /> Payer
            </button>
          </form>
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal" style={styles.confirmationModal}>
          <h4>Êtes-vous sûr de vouloir valider le paiement ?</h4>
          <button onClick={handleConfirmPayment} className="btn btn-light">
            Oui
          </button>
          &#160; &#160;
          <button onClick={handleCancelPayment} className="btn btn-dark">
            Non
          </button>
        </div>
      )}

      <ToastContainer style={styles.toastContainer} />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "355px",
    height: "835px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "20px",
    transformOrigin: "top",
    backgroundColor: "#fff",
    overflow: "hidden",
    border: "9px solid black",
    boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
  },
  card: {
    borderRadius: "10px",
    backgroundColor: "transparent",
    padding: "20px",
    border: "none",
  },
  alert: {
    marginTop: "20px",
  },
  confirmationModal: {
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
  },
  toastContainer: {
    marginTop: "50px",
  },
};
