import React, { useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Alert, Card } from "react-bootstrap";

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", variant: "info" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setMessage({ text: "Las contraseñas no coinciden", variant: "danger" });
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/api/v1/register", {
        name,
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setUser(decoded);
      setMessage({ 
        text: "¡Registro exitoso! Redirigiendo...", 
        variant: "success" 
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error en el registro";
      setMessage({ text: errorMessage, variant: "danger" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <Card style={{ width: "25rem" }}>
        <Card.Body>
          <Card.Title className="mb-4">Registro de Usuario</Card.Title>
          {message.text && <Alert variant={message.variant}>{message.text}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crea una contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="6"
              />
              <Form.Text className="text-muted">
                Mínimo 6 caracteres
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>
          <div className="mt-3 text-center">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;