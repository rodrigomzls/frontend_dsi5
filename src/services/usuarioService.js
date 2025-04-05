// src/services/usuarioService.js
const API_URL = "http://localhost:3001/api/v1/usuarios"; // Cambia esta URL si es distinta

export const obtenerUsuarios = async () => {
  const respuesta = await fetch(API_URL);
  const data = await respuesta.json();
  return data; // Se espera un array de objetos con { id, user, correo }
};

export const agregarUsuario = async (usuario) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
};

export const actualizarUsuario = async (id_usuario, usuario) => {
  await fetch(`${API_URL}/${id_usuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
};

export const eliminarUsuario = async (id_usuario) => {
  await fetch(`${API_URL}/${id_usuario}`, {
    method: "DELETE",
  });
};
