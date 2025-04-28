import React from "react";
import { Table, Button } from "react-bootstrap";

const ProductoList = ({ productos, seleccionar, eliminar }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.ID_Producto}>
            <td>{producto.Nombre_Producto}</td>
            <td>{producto.simbolo || 'S/.'}{producto.Precio_Unitario}</td>
            <td>
              <Button
                variant="warning"
                className="me-2"
                onClick={() => seleccionar(producto)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                onClick={() => eliminar(producto.ID_Producto)}
              >
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductoList;