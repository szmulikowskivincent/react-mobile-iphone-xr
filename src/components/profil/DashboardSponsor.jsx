import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cell, PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Modal,
  Button,
} from "react-bootstrap";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import { Box, Wallet, Star, FileText } from "react-bootstrap-icons";
import "../../css/DashboardSponsor.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const sections = [
  { title: "Ventes", color: "primary", icon: <Box /> },
  { title: "Comptabilité", color: "success", icon: <Wallet /> },
  { title: "Favoris", color: "danger", icon: <Star /> },
  { title: "Documents", color: "warning", icon: <FileText /> },
];

const DashboardSponsor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    fetch("/stats.json")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) => console.error("Erreur de chargement", error));
  }, []);

  const handleSectionClick = (sectionTitle) => {
    setModalContent(sectionTitle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "355px",
        height: "815px",
        margin: "0 auto",
        backgroundColor: "#fff",
        overflow: "auto",
        padding: "20px",
        border: "9px solid black",
        borderRadius: "20px",
        position: "relative",
        boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
      }}
    >
      <Container fluid className="p-3" style={{ maxHeight: "100%" }}>
        <div className="d-flex justify-content-center">
          <img
            src="/logo_ZakUp_v1.webp"
            alt="Logo"
            style={{
              width: "200px",
              height: "auto",
              marginBottom: "20px",
            }}
          />
        </div>

        <h2 className="text-center mb-3">
          <FaChartBar className="me-2" /> Dashboard Sponsor
        </h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </Spinner>
          </div>
        ) : (
          <Row className="g-3">
            {sections.map((section, index) => (
              <Col key={index} xs={12} sm={6} md={4} className="text-center">
                <Card
                  className={`border-${section.color} p-2 shadow-sm`}
                  onClick={() => handleSectionClick(section.title)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title className="fs-5">
                      {section.icon} {section.title}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Modal
        style={{ marginLeft: "20px" }}
        show={showModal}
        onHide={handleCloseModal}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent === "Ventes" && stats.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats}
                  dataKey="quantite"
                  nameKey="produit"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {stats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>Contenu dynamique pour la section "{modalContent}".</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

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
          bottom: "50px",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};

export default DashboardSponsor;
