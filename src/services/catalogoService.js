// catalogoService.js

const API_URL = "http://localhost:3001/api/v1/productos"; // Cambia la URL a la ruta correspondiente a productos

export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return [];
  }
};

export const agregarProducto = async (producto) => {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
  } catch (error) {
    console.error("Error al agregar producto:", error);
  }
};

export const actualizarProducto = async (id_producto, producto) => {
  try {
    await fetch(`${API_URL}/${id_producto}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
};

export const eliminarProducto = async (id_producto) => {
  try {
    await fetch(`${API_URL}/${id_producto}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
};
