import React, { useEffect, useState, useRef } from "react";
import { obtenerProductos } from "../services/catalogoService.js";
import "../css/catalogoStyle.css";
import { BsCart4 } from "react-icons/bs"; 

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const carritoRef = useRef(null); 

  // Estado para manejar cantidades seleccionadas para cada producto en el catálogo
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerProductos();
      setProductos(data);
      // Inicializar cantidades en 1 para cada producto
      const initialCantidades = {};
      data.forEach(p => { initialCantidades[p.id_producto] = 1; });
      setCantidades(initialCantidades);
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

  const agregarACarrito = (producto, cantidad) => {
    if (!producto || isNaN(producto.precio) || producto.precio <= 0 || cantidad <= 0) return;

    const existingProductIndex = carrito.findIndex(item => item.producto.id_producto === producto.id_producto);
    
    if (existingProductIndex > -1) {
      // Si el producto ya existe en el carrito, solo actualizamos la cantidad
      const nuevoCarrito = [...carrito];
      nuevoCarrito[existingProductIndex].cantidad += cantidad;
      setCarrito(nuevoCarrito);
    } else {
      // Si el producto no existe, lo agregamos al carrito
      setCarrito([...carrito, { producto, cantidad }]);
    }
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

  const total = carrito.reduce((acc, item) => acc + parseFloat(item.producto.precio) * item.cantidad, 0);

  const manejarCambioCantidad = (id_producto, valor) => {
    const cantidadNum = parseInt(valor);
    if (isNaN(cantidadNum) || cantidadNum < 1) return; // No permitir cantidades menores a 1 ni NaN
    
    // Buscar producto para obtener el stock disponible
    const producto = productos.find(p => p.id_producto === id_producto);
    if (!producto) return;

    const maxCantidad = Math.min(10, producto.cantidad);

    if (cantidadNum > maxCantidad) {
      setCantidades({
        ...cantidades,
        [id_producto]: maxCantidad,
      });
    } else {
      setCantidades({
        ...cantidades,
        [id_producto]: cantidadNum,
      });
    }
  };

  return (
    <div className="catalogo-background">
      <div className="container mt-3 flex-fill">
      <div className="container my-5 position-relative">
        
        {/* Carrito flotante */}
        <div style={{ position: "absolute", top: 0, right: 0 }}>
          <br></br>
          <button className="btn-carrito align-items-center" onClick={() => setMostrarCarrito(!mostrarCarrito)}>
            <BsCart4 size={20} className="me-2" /> {/* Ícono de carrito */}
            Carrito ({carrito.length})
          </button>

          {mostrarCarrito && (
            <div ref={carritoRef} className="carrito-ventana">
              {carrito.length === 0 ? (
                <p>Tu carrito está vacío</p>
              ) : (
                <>
                  {carrito.map((item, index) => (
                    <div key={index} className="producto-carrito">
                      <span>
                        <strong>{item.producto.producto}: S/. {parseFloat(item.producto.precio).toFixed(2)} ({item.cantidad}) </strong><br/>
                        <strong>S/. {(item.cantidad * parseFloat(item.producto.precio)).toFixed(2)}</strong>

                      </span>
                      <button className="btn-delet" onClick={() => eliminarDelCarrito(index)}>
                        X
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

        {/* Título */}
        <br></br>
        <h1 className="titulo-catalogo text-center mb-4">CATÁLOGO</h1>

        {/* Productos */}
        <div className="row justify-content-center" id="catalogo">
          {productos.map((producto) => {
            const maxCantidad = Math.min(10, producto.cantidad);
            return (
            <div className="producto col-md-3 m-4 text-center" key={producto.id_producto}>
              <img
                src={`/Images/ID_Producto=${producto.id_producto}.jpeg`}
                onError={(e) => (e.target.src = "/Images/default.jpeg")}
                alt={producto.producto}
                className="img-fluid"
              />
              <h2>{producto.producto}</h2>
              <p>S/. {parseFloat(producto.precio).toFixed(2)}</p>
              <div  className="d-flex justify-content-center align-items-center mb-2">
                <label htmlFor={`cantidad-${producto.id_producto}`} className="me-2">Cantidad:</label>
                <input
                  id={`cantidad-${producto.id_producto}`}
                  type="number"
                  min="1"
                  max={maxCantidad}
                  value={cantidades[producto.id_producto] || 1}
                  onChange={(e) => manejarCambioCantidad(producto.id_producto, e.target.value)}
                  style={{ width: "60px", textAlign: "center" }}
                />
              </div>
              <button className="btn-add" onClick={() => agregarACarrito(producto, cantidades[producto.id_producto] || 1)}>
                Añadir al Carrito
              </button>
            </div>
          )})}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Catalogo;
