import React, { useEffect, useState, useRef } from "react";
import { obtenerProductos } from "../services/catalogoService.js";
import "../css/catalogoStyle.css";
import { BsCart4 } from "react-icons/bs"; 

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const carritoRef = useRef(null); 

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerProductos();
      setProductos(data);
    };
    cargar();
  }, []);

  // Detectar clics fuera del carrito
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (carritoRef.current && !carritoRef.current.contains(event.target)) {
        setMostrarCarrito(false);
      }
    };

    if (mostrarCarrito) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarCarrito]);

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
    <div className="container my-5 position-relative">
      {/* Carrito flotante */}
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <button className="btn btn-outline-dark m-2 d-flex align-items-center" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
          <BsCart4 size={20} className="me-2" /> {/* Ícono de carrito */}
          Carrito ({carrito.length})
        </button>

        {mostrarCarrito && (
          <div ref={carritoRef} className="carrito-ventana bg-white p-3 border rounded shadow" style={{ width: "300px" }}>
            <h5>Carrito:</h5>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <>
                {carrito.map((producto, index) => (
                  <div key={index} className="producto-carrito d-flex justify-content-between align-items-center mb-2">
                    <span>
                      <strong>{producto.producto}</strong><br/>
                      S/. {parseFloat(producto.precio).toFixed(2)}
                    </span>
                    <button className="btn btn-sm btn-danger" onClick={() => eliminarDelCarrito(index)}>
                      X
                    </button>
                  </div>
                ))}
                <div className="mt-3">
                  <strong>Total: S/. {total.toFixed(2)}</strong>
                </div>
                <button className="btn btn-success btn-block mt-3" onClick={pagar}>
                  Pagar
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Título */}
      <h1 className="titulo-catalogo text-center mb-4">CATÁLOGO</h1>

      {/* Productos */}
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
    </div>
  );
};

export default Catalogo;
