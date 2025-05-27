import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../css/Global.css";

const UsuarioForm = ({
  show,
  handleClose,
  agregar,
  actualizar,
  usuarioSeleccionado,
}) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (usuarioSeleccionado) {
      setUser(usuarioSeleccionado.user);
      setEmail(usuarioSeleccionado.email);
      setPassword(""); // no se muestra ni se edita la contraseña
    } else {
      setUser("");
      setEmail("");
      setPassword("");
    }
    setErrores({});
  }, [usuarioSeleccionado]);

  const validar = () => {
    const nuevosErrores = {};
    if (!user.trim()) nuevosErrores.user = "Usuario obligatorio";
    if (!email.trim() || !email.includes("@"))
      nuevosErrores.email = "Email inválido";
    if (!usuarioSeleccionado && (!password || password.length < 6)) {
      nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire({
        icon: "error",
        title: "Campos inválidos",
        text: "Por favor revisa los datos ingresados",
        customClass: {
          confirmButton: "swal-confirm-btn",
        },
      });
      return;
    }

    const nuevoUsuario = { user, email };
    if (password) nuevoUsuario.password = password;

    if (usuarioSeleccionado) {
      actualizar(usuarioSeleccionado.id_usuario, nuevoUsuario);
    } else {
      agregar(nuevoUsuario);
    }

    setUser("");
    setEmail("");
    setPassword("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {usuarioSeleccionado ? "Editar Usuario" : "Agregar Usuario"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              isInvalid={!!errores.user}
            />
            <Form.Control.Feedback type="invalid">
              {errores.user}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errores.email}
            />
            <Form.Control.Feedback type="invalid">
              {errores.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Mostrar contraseña solo al agregar usuario */}
          {!usuarioSeleccionado && (
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errores.password}
              />
              <Form.Control.Feedback type="invalid">
                {errores.password}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Button className="btn-add-primary" type="submit">
            {usuarioSeleccionado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UsuarioForm;
