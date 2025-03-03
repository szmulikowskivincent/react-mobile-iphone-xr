import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";

const DashboardSportClub = () => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    seats: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [showEvents, setShowEvents] = useState(true);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]:
        name === "seats" || name === "price" ? value.replace(/\D/, "") : value,
    });
  };

  const handleAddEvent = () => {
    const { name, date, seats, price } = eventData;

    if (!name || !date || !seats || !price) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    if (events.length >= 2) {
      setError("Vous pouvez ajouter un maximum de 2 événements.");
      return;
    }

    const newEvent = {
      name,
      date,
      seats: parseInt(seats, 10),
      price: parseFloat(price),
    };

    const newEvents = [...events, newEvent];
    setEvents(newEvents);
    localStorage.setItem("events", JSON.stringify(newEvents));
    setEventData({ name: "", date: "", seats: "", price: "" });
    setError("");
  };

  const handleCloseEvents = () => {
    setShowEvents(false);
  };

  const handleShowEvents = () => {
    setShowEvents(true);
  };

  const formContainerStyle = {
    maxWidth: "450px",
    width: "170%",
    backgroundColor: "transparent",
    padding: "30px",
    borderRadius: "10px",
    marginLeft: "-80px",
    boxShadow: "transparent",
    position: "relative",
    zIndex: 1,
  };

  const overlayStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2,
    overflowY: "auto",
    padding: "20px",
    borderRadius: "10px",
  };

  const buttonStyle = {
    fontSize: "16px",
  };

  const tableStyle = {
    marginTop: "40px",
    width: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  };

  return (
    <Container style={{ marginLeft: "10px" }}>
      {showEvents && (
        <div style={overlayStyle}>
          <div className="d-flex justify-content-between">
            <Button
              variant="light"
              onClick={handleCloseEvents}
              className="btn-sm"
              style={{ fontSize: "12px", marginTop: "5px" }}
            >
              Fermer
            </Button>
          </div>
          <br />
          {events.length > 0 ? (
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              {events.map((event, index) => (
                <Card
                  key={index}
                  className="p-3 shadow-sm border-0 event-card"
                  style={{
                    width: "280px",
                    marginBottom: "20px",
                  }}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar-event me-2 text-primary fs-5"></i>
                      <span className="fw-bold">{event.name}</span>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-calendar-date me-2 text-info fs-5"></i>
                      <span>{event.date}</span>
                    </div>

                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-person-check me-2 text-success fs-5"></i>
                      <span className="badge bg-success">
                        {event.seats} places
                      </span>
                    </div>

                    <div className="d-flex align-items-center">
                      <i className="bi bi-currency-euro me-2 text-warning fs-5"></i>
                      <span className="badge bg-warning text-dark">
                        {event.price} €
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Alert
              style={{ textAlign: "center", marginLeft: "-0px" }}
              variant="info"
            >
              Aucun événement créé pour le moment.
            </Alert>
          )}
        </div>
      )}

      <div style={formContainerStyle}>
        <Card className="p-3 mb-4">
          <Card.Body>
            {error && (
              <Alert style={{ textAlign: "center" }} variant="danger">
                {error}
              </Alert>
            )}
            <Form>
              <Form.Group className="mb-3 position-relative">
                <i className="bi bi-card-text position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  placeholder="&#160;&#160;&#160;&#160;&#160;Nom de l'événement :"
                />
              </Form.Group>

              <Form.Group className="mb-3 position-relative">
                <i
                  className="bi bi-calendar-date position-absolute top-50 start-0 translate-middle-y ms-3"
                  style={{ left: "30px" }}
                ></i>
                <Form.Control
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  placeholder="&#160;&#160;&#160;&#160;&#160;&#160;&#160;Date :"
                  style={{ paddingLeft: "35px" }}
                />
              </Form.Group>

              <Form.Group className="mb-3 position-relative">
                <i className="bi bi-people position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  type="number"
                  name="seats"
                  min="1"
                  value={eventData.seats}
                  onChange={handleInputChange}
                  placeholder="&#160;&#160;&#160;&#160;&#160;Nombre de places disponibles :"
                />
              </Form.Group>

              <Form.Group className="mb-3 position-relative">
                <i className="bi bi-currency-euro position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={eventData.price}
                  onChange={handleInputChange}
                  placeholder="&#160;&#160;&#160;&#160;&#160;Prix (€) :"
                />
              </Form.Group>

              <Button
                variant="info"
                className="btn-lg w-100"
                onClick={handleAddEvent}
                style={buttonStyle}
              >
                <i className="bi bi-plus-lg me-3"></i>
                Ajouter
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>

      {!showEvents && (
        <Button
          variant="secondary"
          onClick={handleShowEvents}
          className="mt-3"
          style={{ fontSize: "14px", marginTop: "20px", marginLeft: "20px" }}
        >
          <i className="bi bi-eye me-2"></i>
          Voir les événements
        </Button>
      )}
    </Container>
  );
};

export default DashboardSportClub;
