import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BlinkingButton = () => {
  const [isBlack, setIsBlack] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userEmail")) {
      setIsVisible(false);
    }

    const interval = setInterval(() => {
      setIsBlack((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    navigate("/dashboard-vente-achat");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="position-fixed top-50 start-50 translate-middle"
      style={{ zIndex: 1050 }}
    >
      <button
        onClick={handleClick}
        className="btn fw-bold fs-5 border border-2 border-primary d-flex justify-content-center align-items-center"
        style={{
          width: "155px",
          height: "55px",
          backgroundColor: isBlack ? "black" : "deepskyblue",
          color: "white",
          transition: "background-color 0.3s ease",
          borderRadius: "8px",
          marginLeft: "2400px",
          marginTop: "-650px",
        }}
      >
        <i title="🖱️ clic ici!" className="bi bi-shop me-2"></i> Market
      </button>
    </div>
  );
};

export default BlinkingButton;
