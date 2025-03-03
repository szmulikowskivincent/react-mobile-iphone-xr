import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateEvenement from "./button/CreateEvenement";

const AjouterUnProduit = () => {
  const [companyProfile, setCompanyProfile] = useState(null);
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
  const navigate = useNavigate();

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
      reader.onloadend = () =>
        setNewProduct((prev) => ({ ...prev, image: reader.result }));
      if (files[0]) reader.readAsDataURL(files[0]);
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout du produit.");

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
      className="container d-flex flex-column align-items-center justify-content-center"
      style={{
        width: "355px",
        height: "815px",
        padding: "20px",
        border: "9px solid black",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
      }}
    >
      <div className="text-center mb-4">
        <img src="/logo_ZakUp_v1.webp" alt="Logo" style={{ width: "200px" }} />
      </div>
      <div className="card p-4 shadow-sm w-100">
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

          <div
            style={{ border: "none", boxShadow: "none" }}
            className="mb-3 input-group"
          >
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
            />
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
            <button type="submit" className="btn btn-info w-100">
              <i className="bi bi-save"></i> Ajouter
            </button>
          </div>
        </form>

        <br />

        <Button variant="info" onClick={handleModalShow}>
          Créer un événement
        </Button>

        <Modal
          style={{ marginLeft: "-0px" }}
          show={showModal}
          onHide={handleModalClose}
          centered
        >
          <Modal.Header closeButton />
          <Modal.Body>
            <CreateEvenement />
          </Modal.Body>
        </Modal>
      </div>

      <button
        onClick={() => navigate("/")}
        className="btn"
        style={{
          backgroundColor: "#00BFFF",
          marginTop: "720px",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "30px",
          padding: "10px 30px",
          position: "absolute",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};

export default AjouterUnProduit;
