import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form } from "react-bootstrap";

const DashboardSportClub = () => {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    seats: "",
    price: "",
  });

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
      alert("Veuillez remplir tous les champs.");
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
  };

  const containerStyle = {
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const formContainerStyle = {
    maxWidth: "350px",
    width: "140%",
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const formControlStyle = {
    fontSize: "14px",
    paddingLeft: "30px",
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    fontSize: "16px",
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  };

  const eventsListContainerStyle = {
    marginTop: "40px",
  };

  const eventCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const redTextStyle = {
    color: "red",
  };

  return (
    <Container style={containerStyle}>
      {/* Formulaire pour ajouter un événement */}
      <div style={formContainerStyle}>
        <Card className="p-3 mb-4">
          <Card.Body>
            <Form>
              <Form.Group className="mb-3 position-relative">
                <i className="bi bi-card-text position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  type="text"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  placeholder="Nom de l'événement"
                  style={formControlStyle}
                />
              </Form.Group>

              <Form.Group className="mb-3 position-relative">
                <i className="bi bi-calendar-date position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                <Form.Control
                  type="date"
                  name="date"
                  value={eventData.date}
                  onChange={handleInputChange}
                  placeholder="Date"
                  style={formControlStyle}
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
                  placeholder="Nombre de places disponibles"
                  style={formControlStyle}
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
                  placeholder="Prix (€)"
                  style={formControlStyle}
                />
              </Form.Group>

              <Button
                variant="outline-primary"
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

      {/* Liste des événements */}
      <div style={eventsListContainerStyle}>
        {events.map((event, index) => (
          <Card key={index} className="mb-2 p-3" style={eventCardStyle}>
            <Card.Body>
              <p># {index + 1}</p>

              <Card.Title style={redTextStyle}>
                <i className="bi bi-calendar-event me-2"></i>
                {event.name}
              </Card.Title>

              <p style={redTextStyle}>
                <i className="bi bi-clock me-2"></i>
                Date: {event.date}
              </p>

              <p style={redTextStyle}>
                <i className="bi bi-person-check me-2"></i>
                Places disponibles: {event.seats}
              </p>

              <p style={redTextStyle}>
                <i className="bi bi-cash-coin me-2"></i>
                Prix: {event.price} €
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DashboardSportClub;
