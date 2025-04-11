const API_URL = "http://localhost:3001/api/v1/clientes"; // Ajusta la URL según tu backend

export const obtenerClientes = async () => {
  const respuesta = await fetch(API_URL);
  const data = await respuesta.json();
  return data; 
};

export const agregarCliente = async (cliente) => {
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
};

export const actualizarCliente = async (id_cliente, cliente) => {
  await fetch(`${API_URL}/${id_cliente}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cliente),
  });
};

export const eliminarCliente = async (id_cliente) => {
  await fetch(`${API_URL}/${id_cliente}`, {
    method: "DELETE",
  });
};
