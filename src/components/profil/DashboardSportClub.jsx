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

const DashboardSportClub = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [stats, setStats] = useState([]);
  const [clubProfile, setClubProfile] = useState({});
  const [events, setEvents] = useState([
    { name: "Barbecue", date: "2025-03-09", seats: 0, price: 12 },
  ]);
  const [, setTotalSeats] = useState(0);

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

    doc.setLineWidth(0.5);
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

    doc.setLineWidth(0.5);
    doc.line(
      20,
      doc.autoTable.previous.finalY + 50,
      200,
      doc.autoTable.previous.finalY + 50
    );

    const currentDate = new Date().toLocaleDateString();
    doc.text(`Date: ${currentDate}`, 20, doc.autoTable.previous.finalY + 70);
    doc.text(
      "Signature: __________________",
      20,
      doc.autoTable.previous.finalY + 80
    );

    doc.save("events_statistiques.pdf");
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
        overflow: "auto",
        padding: "20px",
        border: "9px solid black",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <Container fluid className="p-3" style={{ maxHeight: "100%" }}>
        <img
          src="/logo_ZakUp_v1.webp"
          alt="Logo"
          className="d-flex justify-content-center"
          style={{
            width: "200px",
            height: "auto",
            margin: "0 auto",
            marginBottom: "0px",
          }}
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
                      marginLeft: "25px",
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
              <p className="text-center">
                <i className="bi bi-graph-up-arrow me-2"></i> Statistiques des
                Événements
              </p>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={events}
                    dataKey="seats"
                    nameKey="name"
                    cx="50%"
                    cy="20%"
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

            {/* Modal */}
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              dialogClassName="modal-dialog-centered"
            >
              <Modal.Header closeButton>
                <Modal.Title>{activeSection?.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>{activeSection?.details}</div>
              </Modal.Body>
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
