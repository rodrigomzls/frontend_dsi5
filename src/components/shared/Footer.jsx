
import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light text-dark py-3 mt-auto">
      <Container className="text-center">
        <small>
          <h5>Grupo Patosaurios</h5> <p>BrayanPato, DennysPato, JudigoPato, MaycolNepato</p>
          &copy; {new Date().getFullYear()} 
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
