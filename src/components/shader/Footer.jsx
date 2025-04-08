import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Grupo Patosaurios</h5>
            <p>BrayanPato, DennysPato, JudigoPato, MaycolNepato</p>
          </Col>
          <Col md={6}>
            <Nav className="justify-content-end">

            </Nav>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; 2025 Mi App. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
