import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../services/catalogoService.js";
import "../css/catalogoStyle.css";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerProductos();
      setProductos(data);
    };
    cargar();
  }, []);

  const agregarACarrito = (producto) => {
    if (!producto || isNaN(producto.precio) || producto.precio <= 0) return;
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const pagar = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío. No puedes proceder con el pago.");
      return;
    }
    console.log("Procediendo al pago con:", carrito);
  };

  const total = carrito.reduce((acc, prod) => acc + parseFloat(prod.precio), 0);

  return (
    <div className="container my-5">
      <h1 className="titulo-catalogo">CATÁLOGO</h1>

      <div className="row justify-content-center" id="catalogo">
        {productos.map((producto) => (
          <div className="producto col-md-3 m-3 text-center" key={producto.id_producto}>
            <img
              src={`/Images/ID_Producto=${producto.id_producto}.jpeg`}
              onError={(e) => (e.target.src = "/Images/default.jpeg")}
              alt={producto.producto}
              className="img-fluid"
            />
            <h2>{producto.producto}</h2>
            <p>S/. {parseFloat(producto.precio).toFixed(2)}</p>
            <button className="btn-add" onClick={() => agregarACarrito(producto)}>
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <button className="btn btn-outline-dark" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
          Carrito ({carrito.length})
        </button>

        {mostrarCarrito && (
          <div className="carrito-ventana p-3 border rounded mt-3">
            <h5>Carrito:</h5>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <>
                {carrito.map((producto, index) => (
                  <div key={index} className="producto-carrito">
                    <span>
                      <strong>{producto.producto}</strong> - S/.{" "}
                      {parseFloat(producto.precio).toFixed(2)}
                    </span>
                    <button className="btn-delet" onClick={() => eliminarDelCarrito(index)}>
                      Eliminar
                    </button>
                  </div>
                ))}
                <div className="mt-3">
                  <strong>Total: S/. {total.toFixed(2)}</strong>
                </div>
                <button className="btn-pay mt-3" onClick={pagar}>
                  Pagar
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
