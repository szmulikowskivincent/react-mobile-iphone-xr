import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Button,
  Modal,
} from "react-bootstrap";
import {
  FaTrophy,
  FaUserFriends,
  FaCalendarAlt,
  FaMedal,
  FaFileAlt,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const DashboardSportClub = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [stats, setStats] = useState([]);
  const [clubProfile, setClubProfile] = useState({});
  const [events, setEvents] = useState([
    { name: "Barbecue", date: "2025-03-09", seats: 0, price: 12 },
  ]);
  const [totalSeats, setTotalSeats] = useState(0);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      const eventsData = JSON.parse(storedEvents);
      setEvents(eventsData);

      const total = eventsData.reduce((sum, event) => sum + event.seats, 0);
      setTotalSeats(total);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);

    fetch("/stats.json")
      .then((response) => response.json())
      .then((data) => setStats(data))
      .catch((error) =>
        console.error("Erreur de chargement des statistiques", error)
      );

    const storedClubProfile = sessionStorage.getItem("clubProfile");
    if (storedClubProfile) setClubProfile(JSON.parse(storedClubProfile));
  }, []);

  const handleShowModal = (section) => {
    setActiveSection(section);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    if (clubProfile.clubName) {
      doc.text(`Club: ${clubProfile.clubName}`, 195, 20, { align: "right" });
    }

    const eventData = stats.map((stat) => [
      stat.eventName,
      stat.date,
      stat.participants,
      stat.duration,
    ]);

    doc.autoTable({
      head: [["Événement", "Date", "Participants", "Durée"]],
      body: eventData,
      startY: 40,
    });

    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 20, doc.autoTable.previous.finalY + 70);
    doc.text(
      "Signature: __________________",
      20,
      doc.autoTable.previous.finalY + 80
    );

    doc.save("events_statistiques.pdf");
  };

  const sections = [
    {
      title: "Événements",
      icon: <FaCalendarAlt size={40} />,
      color: "primary",
      details: "Détails des événements du club...",
    },
    {
      title: "Membres",
      icon: <FaUserFriends size={40} />,
      color: "warning",
      details: "Liste des membres et leurs informations...",
    },
    {
      title: "Récompenses",
      icon: <FaTrophy size={40} />,
      color: "danger",
      details: "Historique des récompenses du club...",
    },
    {
      title: "Documents",
      icon: <FaFileAlt size={40} />,
      color: "info",
      details: (
        <div>
          <p>Document d'adhésion</p>
          <p>Documents des événements</p>
          <p>Documents des sponsors</p>
        </div>
      ),
    },
  ];

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
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          className="d-block mx-auto"
          style={{ width: "200px", height: "auto", marginBottom: "0px" }}
        />

        <p className="text-center mb-4" style={{ fontSize: "18px" }}>
          <FaMedal className="me-2" /> Dashboard Club de Sport
        </p>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Row className="g-3">
              {sections.map((section, index) => (
                <Col key={index} xs={12} sm={6} md={4} className="text-center">
                  <Card
                    className={`border-${section.color} p-2 shadow-sm`}
                    onClick={() => handleShowModal(section)}
                    style={{
                      cursor: "pointer",
                      width: "85%",
                      margin: "0 auto",
                    }}
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

            <Button
              variant="danger"
              className="mt-4 d-block mx-auto"
              onClick={generatePDF}
            >
              💾 Télécharger en PDF
            </Button>

            <div className="mt-5">
              <p className="text-center">📊 Statistiques des Événements</p>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={events}
                    dataKey="seats"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    label
                  >
                    {events.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.seats ? "#8884d8" : "#ff7300"}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
                marginLeft: "30px",
              }}
            >
              Accéder aux Services
            </button>

            <Modal
              style={{ marginLeft: "0px" }}
              show={showModal}
              onHide={handleCloseModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>{activeSection?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{activeSection?.details}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Fermer
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
    </div>
  );
};

export default DashboardSportClub;
