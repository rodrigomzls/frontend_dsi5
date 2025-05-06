import React, { useContext } from "react";
import { Navbar as BsNavbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../css/NavarAndFooter.css";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <BsNavbar.Brand as={Link} to="/">KYM</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/home">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/usuarios">Usuarios</Nav.Link>
                <Nav.Link as={Link} to="/clientes">Clientes</Nav.Link>
                <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link as={Link} to="/acceder">Acceder</Nav.Link>
              </>
            )}
          </Nav>

          {user && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="dropdown-user">
                {user.name?.toUpperCase()}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => alert("Sistema creado por Raúl")}>
                  Acerca de Mi APP
                </Dropdown.Item>
                <Dropdown.Item onClick={() => alert("Funcionalidad aún no implementada")}>
                  Cambiar contraseña
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
