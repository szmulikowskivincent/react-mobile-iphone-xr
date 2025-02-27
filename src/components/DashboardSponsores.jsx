import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import CreateEvenement from "./button/CreateEvenement";

const DashboardSponsores = () => {
  const [setCompanyProfile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    type: "product",
    image: "",
  });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedProfile = sessionStorage.getItem("companyProfile");
    if (savedProfile) {
      setCompanyProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      };
      if (files[0]) {
        reader.readAsDataURL(files[0]);
      }
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image
    ) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit.");
      }

      const existingProducts =
        JSON.parse(localStorage.getItem("products")) || [];
      localStorage.setItem(
        "products",
        JSON.stringify([...existingProducts, newProduct])
      );

      setNewProduct({
        name: "",
        description: "",
        price: "",
        type: "product",
        image: "",
      });

      setNotification("Produit ajouté avec succès !");
      setTimeout(() => setNotification(""), 3000);
    } catch (error) {
      setError("Erreur lors de l'ajout du produit.");
    }
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "400px",
        height: "880px",
        backgroundColor: "#fff",
        padding: "20px",
        border: "9px solid black",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 0 20px 5px rgba(0, 255, 0, 0.3)",
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
        onClick={() => window.open("https://wa.me/+32492837658", "_blank")}
      >
        <FaWhatsapp />
      </div>
      <div style={{ textAlign: "center", marginBottom: "0px" }}>
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
      <div
        style={{ marginBottom: "190px" }}
        className="card p-4 shadow-sm w-100"
      >
        <p className="text-center mb-3">
          <i className="bi bi-plus-circle text-primary"></i>  Ajouter un
          produit ou une offre
        </p>

        {notification && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Succès !</strong> {notification}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-box"></i>
            </span>
            <input
              type="text"
              className="form-control"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Nom du produit"
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-card-text"></i>
            </span>
            <textarea
              className="form-control"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Description"
              required
            ></textarea>
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-cash-coin"></i>
            </span>
            <input
              type="number"
              className="form-control"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="Prix (€)"
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-tag"></i>
            </span>
            <select
              className="form-select"
              name="type"
              value={newProduct.type}
              onChange={handleChange}
            >
              <option value="product">Produit</option>
              <option value="sponsoring">Offre de Sponsoring</option>
            </select>
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-image"></i>
            </span>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-100">
              <i className="bi bi-save"></i> Ajouter
            </button>
          </div>
        </form>

        <br />

        {/* Modal Button to open the event creation form */}
        <Button variant="primary" onClick={handleModalShow}>
          Créer un événement
        </Button>


        {/* Modal for creating an event */}
        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateEvenement />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardSponsores;
