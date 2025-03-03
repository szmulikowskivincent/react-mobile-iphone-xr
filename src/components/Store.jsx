import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/DashboardVenteAchat.css";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [currentPageProduct, setCurrentPageProduct] = useState(1);
  const [productsPerPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [setModalImage] = useState(null);
  const [showPaymentToast, setShowPaymentToast] = useState(false);

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

  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    return (total * 1.05).toFixed(2);
  };

  const handlePayment = () => {
    setShowPaymentToast(true);
    setTimeout(() => {
      setShowPaymentToast(false);
      navigate("/paiement");
    }, 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "350px",
        height: "810px",
        margin: "0 auto",
        backgroundColor: "#fff",
        overflow: "hidden",
        padding: "20px",
        borderRadius: "20px",
        position: "relative",
        boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
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
              color: "red",
            }}
          >
            {cart.length}
          </span>
        )}
      </div>
      {cart.length > 0 && (
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <i
            className="bi bi-credit-card"
            style={{ fontSize: "24px", cursor: "pointer" }}
            title={`Payer ${calculateTotal()} €`}
            onClick={handlePayment}
          ></i>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              display: "block",
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            {calculateTotal()} €
          </span>
        </div>
      )}
      {showToast && (
        <div
          className="toast show position-fixed text-white p-3 rounded"
          style={{
            zIndex: 1050,
            bottom: "100px",
            right: "100px",
            width: "255px",
            opacity: 0.8,
            transform: "translate(18px, 32px)",
            backgroundColor: "#90EE90",
          }}
        >
          {toastMessage}
        </div>
      )}
      {showPaymentToast && (
        <div
          className="toast show position-fixed text-white p-3 rounded"
          style={{
            zIndex: 1050,
            bottom: "100px",
            right: "100px",
            width: "255px",
            opacity: 0.8,
            transform: "translate(18px, 32px)",
            backgroundColor: "#90EE90",
          }}
        >
          Redirection vers le paiement...
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
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
                backgroundColor: "#fff",
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
              <div className="card-body">
                <p className="card-title">
                  <i className="bi bi-gift"></i> {product.name}
                </p>
                <p className="card-text" style={{ fontSize: "0.8rem" }}>
                  {" "}
                  {product.description.length > 50
                    ? product.description.substring(0, 50) + "..."
                    : product.description}
                </p>
                <p className="card-text">
                  <strong> Prix:</strong> {product.price} €
                </p>
                <span
                  className="badge bg-success p-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  Produit
                </span>
                <br />
                <br />
                <div className="mt-2">
                  <button
                    className="btn btn-sm"
                    style={{ backgroundColor: "#00BFFF", color: "white" }}
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
      <br />
      <div style={{ marginTop: "40px" }} className="pagination">
        <button
          className="btn btn-secondary btn-sm me-2"
          onClick={() => setCurrentPageProduct((prev) => Math.max(prev - 1, 1))}
          disabled={currentPageProduct === 1}
          style={{ backgroundColor: "rgba(108, 117, 125, 0.6)", color: "#fff" }}
        >
          Précédent
        </button>
        <span> Page {currentPageProduct} </span>
        <button
          className="btn btn-secondary btn-sm ms-2"
          onClick={() =>
            setCurrentPageProduct((prev) =>
              Math.min(prev + 1, Math.ceil(products.length / productsPerPage))
            )
          }
          disabled={
            currentPageProduct === Math.ceil(products.length / productsPerPage)
          }
          style={{ backgroundColor: "rgba(108, 117, 125, 0.6)", color: "#fff" }}
        >
          Suivant
        </button>
      </div>
      <br />
      <br /> <br />
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
          bottom: "100px",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};

export default Store;
