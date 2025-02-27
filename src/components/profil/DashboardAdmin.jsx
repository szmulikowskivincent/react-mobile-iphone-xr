import React, { useState, useEffect } from "react";
import DataAdminVente from "../profil/dataVentes/DataAdminVente";
import { FaUserShield } from "react-icons/fa";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
import { FaBox, FaUsers, FaEnvelope, FaUserTie } from "react-icons/fa";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);

    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) =>
        console.error("Erreur lors du fetch (produits) :", error)
      );

    fetch("http://localhost:5000/api/contact-sponsor")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) =>
        console.error("Erreur lors du fetch (messages) :", error)
      );

    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setSponsors(data))
      .catch((error) =>
        console.error("Erreur lors du fetch (sponsors) :", error)
      );

    fetch("http://localhost:5000/api/contacts")
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) =>
        console.error("Erreur lors du fetch (membres) :", error)
      );
  }, []);

  const handleShowModal = (section) => {
    setActiveSection(section);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "380px",
        height: "875px",
        maxWidth: "390px",
        margin: "0 auto",
        backgroundColor: "#fff",
        overflow: "auto",
        padding: "10px",
        border: "9px solid black",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <div style={{ padding: "10px", backgroundColor: "#fff" }}>
        {" "}
        {/* Réduction du padding */}
        <Container fluid className="p-3">
          <img
            src="/logo_ZakUp_v1.webp"
            alt="Logo"
            className="d-flex justify-content-center"
            style={{
              width: "300px",
              height: "auto",
              position: "fixed",
              top: 50,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              marginBottom: "400px",
            }}
          />

          <DataAdminVente />

          <p
            className="text-center mb-4"
            style={{ fontSize: "16px", marginTop: "150px" }}
          >
            <FaUserShield
              size={20}
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            Dashboard Admin
          </p>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <Row className="g-2">
                {" "}
                {/* Réduction de l'espacement entre les cartes */}
                {/* Section Produits */}
                <Col xs={12} sm={6} md={6} className="text-center">
                  <Card
                    onClick={() => handleShowModal("produits")}
                    className="shadow-sm"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#d4edda",
                      marginTop: "0px",
                    }}
                  >
                    <Card.Body>
                      <FaBox size={30} />{" "}
                      {/* Ajustement de la taille de l'icône */}
                      <Card.Title>Produits en stock</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                {/* Section Messages */}
                <Col xs={12} sm={6} md={6} className="text-center">
                  <Card
                    onClick={() => handleShowModal("messages")}
                    className="shadow-sm"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f8d7da",
                    }}
                  >
                    <Card.Body>
                      <FaEnvelope size={30} />
                      <Card.Title>Messages</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                {/* Section Sponsors */}
                <Col xs={12} sm={6} md={6} className="text-center">
                  <Card
                    onClick={() => handleShowModal("sponsors")}
                    className="shadow-sm"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#cce5ff",
                    }}
                  >
                    <Card.Body>
                      <FaUserTie size={30} />
                      <Card.Title>Sponsors</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
                {/* Section Membres */}
                <Col xs={12} sm={6} md={6} className="text-center">
                  <Card
                    onClick={() => handleShowModal("members")}
                    className="shadow-sm"
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#fff3cd",
                    }}
                  >
                    <Card.Body>
                      <FaUsers size={30} />
                      <Card.Title>Membres</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Modal */}
              <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {activeSection === "produits" && (
                      <>
                        <FaBox size={20} /> Produits en stock
                      </>
                    )}
                    {activeSection === "messages" && (
                      <>
                        <FaEnvelope size={20} /> Messages
                      </>
                    )}
                    {activeSection === "sponsors" && (
                      <>
                        <FaUserTie size={20} /> Sponsors
                      </>
                    )}
                    {activeSection === "members" && (
                      <>
                        <FaUsers size={20} /> Membres
                      </>
                    )}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {activeSection === "produits" && (
                    <div>
                      <p>📦 Produits en stock</p>
                      {products.length > 0 ? (
                        products.map((product, index) => (
                          <div key={index}>
                            <p>
                              🏷️ {product.name} - {product.price} €
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>Aucun produit en stock</p>
                      )}
                    </div>
                  )}

                  {activeSection === "messages" && (
                    <div>
                      <p>✉ Messages</p>
                      {messages.length > 0 ? (
                        messages.map((message, index) => (
                          <div key={index}>
                            <p>📨 {message.content}</p>
                          </div>
                        ))
                      ) : (
                        <p>Aucun message</p>
                      )}
                    </div>
                  )}

                  {activeSection === "sponsors" && (
                    <div>
                      <p>🏷️ Sponsors</p>
                      {sponsors.length > 0 ? (
                        sponsors.map((sponsor, index) => (
                          <div key={index}>
                            <p>{sponsor.name}</p>
                          </div>
                        ))
                      ) : (
                        <p>🥇 Aucun sponsor</p>
                      )}
                    </div>
                  )}

                  {activeSection === "members" && (
                    <div>
                      <p>♠ Membres</p>
                      {members.length > 0 ? (
                        members.map((member, index) => (
                          <div key={index}>
                            <p>🎫 {member.name}</p>
                          </div>
                        ))
                      ) : (
                        <p>Aucun membre</p>
                      )}
                    </div>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    ❌ Fermer
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default DashboardAdmin;
