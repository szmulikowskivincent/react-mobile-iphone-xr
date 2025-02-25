import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const PaginationRouter = () => {
  return (
    <div className="pagination-container d-flex justify-content-center">
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/" className="pagination-link">
            1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/register" className="pagination-link">
            2
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/login" className="pagination-link">
            3
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/abonnement" className="pagination-link">
            4
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/about" className="pagination-link">
            5
          </Nav.Link>
        </Nav.Item>
        {/* Ajoute d'autres liens selon les composants */}
      </Nav>
    </div>
  );
};

export default PaginationRouter;
