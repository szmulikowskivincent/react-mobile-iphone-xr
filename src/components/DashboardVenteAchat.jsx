import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/DashboardVenteAchat.css";
import Like from "../components/Like";

const DashboardVenteAchat = () => {
  const [products, setProducts] = useState([]);
  const [currentPageProduct, setCurrentPageProduct] = useState(1);
  const [productsPerPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const indexOfLastProduct = currentPageProduct * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
    setToastMessage(`${product.name} ajouté au panier!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const nextPage = () => {
    if (currentPageProduct < Math.ceil(products.length / productsPerPage)) {
      setCurrentPageProduct(currentPageProduct + 1);
    }
  };

  const prevPage = () => {
    if (currentPageProduct > 1) {
      setCurrentPageProduct(currentPageProduct - 1);
    }
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
        padding: "20px",
        border: "9px solid black",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        <i className="bi bi-cart-fill" style={{ fontSize: "24px" }}></i>
        {cart.length > 0 && (
          <span
            className="badge"
            style={{
              position: "absolute",
              top: "0px",
              right: "-50px",
              fontSize: "18px",
              color: "red"
            }}
          >
             {cart.length}
          </span>
        )}
      </div>

      {showToast && (
        <div
          className="toast show position-fixed text-white bg-danger p-3 rounded"
          style={{
            zIndex: 1050,
            bottom: "50px",
            right: "50px",
            opacity: 0.8,
            transform: "translate(18px, 32px)",
          }}
        >
          {toastMessage}
        </div>
      )}

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "0px" }}
      >
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          style={{ width: "200px", height: "auto" }}
        />
      </div>

      <div className="row">
        {currentProducts.map((product) => (
          <div key={product.id} className="col-12 mb-3">
            <div
              className="card shadow-sm p-2"
              style={{
                fontSize: "0.9rem",
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease-in-out",
                  transform:
                    hoveredProduct === product.id ? "scale(1.1)" : "scale(1)",
                }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={() => setModalImage(product.image)}
              />
              <br />
              <div className="card-body">
                <p className="card-title">
                  <i className="bi bi-gift"></i> {product.name}
                </p>
                <p className="card-text" style={{ fontSize: "0.8rem" }}>
                📌 {product.description.length > 50
                    ? product.description.substring(0, 50) + "..."
                    : product.description}
                </p>
                <p className="card-text">
                  <strong>📌 Prix:</strong> {product.price} €
                </p>
                <span
                  className="badge bg-success p-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  Produit
                </span>
                <div className="mt-2">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(product)}
                  >
                    🗑️ Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />

      <div style={{ marginTop: "50px" }} className="pagination">
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={prevPage}
          disabled={currentPageProduct === 1}
        >
          Précédent
        </button>
        <span> Page {currentPageProduct} </span>
        <button
          className="btn btn-secondary btn-sm ms-2"
          onClick={nextPage}
          disabled={
            currentPageProduct === Math.ceil(products.length / productsPerPage)
          }
        >
          Suivant
        </button>
      </div>
      <br />

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
          bottom: "115px",
        }}
      >
        Accéder aux Services
      </button>
      <Like />
    </div>
  );
};

export default DashboardVenteAchat;
