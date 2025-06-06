import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  obtenerUsuarios,
  agregarUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../services/usuarioService";
import UsuarioList from "../components/Usuarios/UsuarioList";
import UsuarioForm from "../components/Usuarios/UsuarioForm";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const datos = await obtenerUsuarios();
    setUsuarios(datos);
  };

  const agregar = async (usuario) => {
    await agregarUsuario(usuario);
    cargarUsuarios();
    setMostrarModal(false);
  };

  const actualizar = async (id_usuario, usuario) => {
    await actualizarUsuario(id_usuario, usuario);
    cargarUsuarios();
    setUsuarioSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminar = async (id_usuario) => {
    await eliminarUsuario(id_usuario);
    cargarUsuarios();
  };

  const seleccionarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  };

  return (
    <div className="container-admin">
      <h2 className="admin-title">
        GESTIÓN DE USUARIOS
      </h2>
      <Button
        className="mb-3 btn-add-primary"
        onClick={() => {
          setUsuarioSeleccionado(null);
          setMostrarModal(true);
        }}
      >
        Agregar Usuario
      </Button>
      
      <UsuarioList
        usuarios={usuarios}
        seleccionar={seleccionarUsuario}
        eliminar={eliminar}
      />
      <UsuarioForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        usuarioSeleccionado={usuarioSeleccionado}
      />
    </div>
  );
};

export default Usuarios;
