import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

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
        width: "355px",
        height: "815px",
        maxWidth: "390px",
        margin: "0 auto",
        backgroundColor: "#fff",
        overflow: "auto",
        padding: "10px",
        border: "9px solid black",
        borderRadius: "20px",
        position: "relative",
        boxShadow: "0 0 20px 5px rgba(0, 176, 240, 0.8)",
      }}
    >
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

        <p
          className="text-center mb-4"
          style={{ fontSize: "16px", marginTop: "0px" }}
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
                    <FaBox size={30} />
                    <Card.Title>Produits en stock</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
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

            <Modal
              style={{ marginLeft: "20px", backgroundColor: "transparent" }}
              show={showModal}
              onHide={handleCloseModal}
              centered
            >
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
                      <Row className="g-3">
                        {products.map((product, index) => (
                          <Col xs={12} key={index}>
                            <Card className="border shadow-sm p-2">
                              <Card.Body className="d-flex align-items-center">
                                <FaBox
                                  size={24}
                                  className="me-3 text-success"
                                />
                                <div>
                                  <Card.Title className="mb-1">
                                    {product.name}
                                  </Card.Title>
                                  <Card.Text className="text-muted">
                                    💰 {product.price} €
                                  </Card.Text>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <p>Aucun produit en stock</p>
                    )}
                  </div>
                )}

                {activeSection === "messages" && (
                  <div>
                    <p>✉ Messages</p>
                    {messages.length > 0 ? (
                      <Row className="g-3">
                        {messages.map((message, index) => (
                          <Col xs={12} key={index}>
                            <Card className="border shadow-sm p-2">
                              <Card.Body>
                                <div className="d-flex align-items-center">
                                  <FaEnvelope
                                    size={24}
                                    className="me-3 text-primary"
                                  />
                                  <div>
                                    <Card.Title className="mb-1">
                                      {message.sender}
                                    </Card.Title>
                                    <Card.Text className="text-muted">
                                      📨 {message.content}
                                    </Card.Text>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <p>Aucun message</p>
                    )}
                  </div>
                )}

                {activeSection === "sponsors" && (
                  <div>
                    <p>🏆 Sponsors</p>
                    {sponsors.length > 0 ? (
                      <Row className="g-3">
                        {sponsors.map((sponsor, index) => (
                          <Col xs={12} key={index}>
                            <Card className="border shadow-sm p-2">
                              <Card.Body>
                                <div className="d-flex align-items-center">
                                  <FaUserTie
                                    size={24}
                                    className="me-3 text-warning"
                                  />
                                  <div>
                                    <Card.Title className="mb-1">
                                      {sponsor.name}
                                    </Card.Title>
                                    <Card.Text className="text-muted">
                                      📧 {sponsor.email}
                                    </Card.Text>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <p>Aucun sponsor</p>
                    )}
                  </div>
                )}

                {activeSection === "members" && (
                  <div>
                    <p>♠ Membres</p>
                    {members.length > 0 ? (
                      <Row className="g-3">
                        {members.map((member, index) => (
                          <Col xs={12} key={index}>
                            <Card className="border shadow-sm p-2">
                              <Card.Body className="d-flex align-items-center">
                                <FaUsers
                                  size={24}
                                  className="me-3 text-primary"
                                />
                                <div>
                                  <Card.Title className="mb-1">
                                    {member.name}
                                  </Card.Title>
                                  <Card.Text className="text-muted">
                                    <FaEnvelope className="me-2" />{" "}
                                    {member.email}
                                  </Card.Text>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
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
          bottom: "75px",
        }}
      >
        Accéder aux Services
      </button>
    </div>
  );
};

export default DashboardAdmin;
