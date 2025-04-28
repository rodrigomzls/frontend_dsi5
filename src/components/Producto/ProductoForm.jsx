import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ProductoForm = ({
  show,
  handleClose,
  agregar,
  actualizar,
  productoSeleccionado,
}) => {
  const [producto, setProducto] = useState({
    Nombre_Producto: "",
    Precio_Unitario: 0,
    Descripcion: "",
  });

  useEffect(() => {
    if (productoSeleccionado) {
      setProducto(productoSeleccionado);
    } else {
      setProducto({
        Nombre_Producto: "",
        Precio_Unitario: 0,
        Descripcion: "",
      });
    }
  }, [productoSeleccionado, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: name === "Precio_Unitario" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productoSeleccionado) {
      actualizar(productoSeleccionado.ID_Producto, producto);
    } else {
      agregar(producto);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {productoSeleccionado ? "Editar Producto" : "Agregar Producto"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="Nombre_Producto"
              value={producto.Nombre_Producto}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              name="Precio_Unitario"
              value={producto.Precio_Unitario}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="Descripcion"
              value={producto.Descripcion}
              onChange={handleChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {productoSeleccionado ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductoForm;