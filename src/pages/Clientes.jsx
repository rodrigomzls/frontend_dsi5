import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  obtenerClientes,
  agregarCliente,
  actualizarCliente,
  eliminarCliente,
} from "../services/clienteService"; 
import ClienteList from "../components/Clientes/ClienteList"; 
import ClienteForm from "../components/Clientes/ClienteForm"; 


const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    const datos = await obtenerClientes();
    setClientes(datos);
  };

  const agregar = async (cliente) => {
    await agregarCliente(cliente);
    cargarClientes();
    setMostrarModal(false);
  };

  const actualizar = async (id_cliente, cliente) => {
    await actualizarCliente(id_cliente, cliente);
    cargarClientes();
    setClienteSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminar = async (id_cliente) => {
    await eliminarCliente(id_cliente);
    cargarClientes();
  };

  const seleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModal(true);
  };

  return (
    <div class="container mt-3 flex-fill">
      <h2>GESTIÓN DE CLIENTES</h2>
      <Button
        className="btn mb-3"
        onClick={() => {
          setClienteSeleccionado(null);
          setMostrarModal(true);
        }}
      >
        Agregar Cliente
      </Button>

      <ClienteList
        clientes={clientes}
        seleccionar={seleccionarCliente}
        eliminar={eliminar}
      />
      <ClienteForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        clienteSeleccionado={clienteSeleccionado}
      />
    </div>
  );
};

export default Clientes;
