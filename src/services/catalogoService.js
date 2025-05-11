import axios from "axios";

// Base URL de la API
const API_URL = "http://localhost:3001/api/v1";

// Obtener todos los productos del catálogo
export const obtenerCatalogo = async () => {
  try {
    const response = await axios.get(`${API_URL}/productoscatalogo`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos del catálogo:", error);
    return [];
  }
};

// Obtener productos filtrados por estado
export const obtenerProductosPorEstado = async (estado) => {
  try {
    const response = await axios.get(`${API_URL}/productosestado/${estado}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos por estado:", error);
    return [];
  }
};

// Obtener productos filtrados por categoría
export const obtenerProductosPorCategoria = async (categoria) => {
  try {
    const response = await axios.get(`${API_URL}/productoscategoria/${categoria}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    return [];
  }
};

// Obtener productos filtrados por estado y categoría
export const obtenerProductosPorEstadoYCategoria = async (estado, categoria) => {
  try {
    const response = await axios.get(`${API_URL}/productosfiltrar`, {
      params: { estado, categoria },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos por estado y categoría:", error);
    return [];
  }
};

// Obtener todos los productos con total de stock
export const obtenerProductosConStock = async () => {
  try {
    const response = await axios.get(`${API_URL}/productostock`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos con stock:", error);
    return [];
  }
};
