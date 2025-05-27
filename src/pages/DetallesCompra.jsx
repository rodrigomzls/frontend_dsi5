import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/styleComprasD.css";

const DetallesCompra = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [detallesPorProducto, setDetallesPorProducto] = useState({});

  useEffect(() => {
    if (location.state?.productos) {
      const productos = location.state.productos;
      setProductosSeleccionados(productos);

      const detallesIniciales = {};
      productos.forEach((producto) => {
        detallesIniciales[producto.id] = {
          grupos: producto.cantidad > 1 ? [] : null,
          color: "#ffffff",
          material: "",
          talla: "", // para cantidad 1 sin grupos
          imagenes: [],
        };
      });
      setDetallesPorProducto(detallesIniciales);
    }
  }, [location]);

  const manejarCambioGrupo = (productoId, grupoIndex, campo, valor) => {
    const nuevosDetalles = { ...detallesPorProducto };
    nuevosDetalles[productoId].grupos[grupoIndex][campo] = valor;
    setDetallesPorProducto(nuevosDetalles);
  };

  const manejarCambioCampoSimple = (productoId, campo, valor) => {
    const nuevosDetalles = { ...detallesPorProducto };
    nuevosDetalles[productoId][campo] = valor;
    setDetallesPorProducto(nuevosDetalles);
  };

  const agregarGrupo = (productoId) => {
    const nuevosDetalles = { ...detallesPorProducto };
    const totalCantidadActual = obtenerCantidadTotalPorGrupos(
      nuevosDetalles[productoId].grupos
    );

    const producto = productosSeleccionados.find((p) => p.id === productoId);
    if (totalCantidadActual >= producto.cantidad) {
      alert("Ya se ha asignado la cantidad total para este producto.");
      return;
    }

    nuevosDetalles[productoId].grupos.push({
      talla: "",
      cantidad: 1,
    });
    setDetallesPorProducto(nuevosDetalles);
  };

  const eliminarGrupo = (productoId, grupoIndex) => {
    const nuevosDetalles = { ...detallesPorProducto };
    nuevosDetalles[productoId].grupos.splice(grupoIndex, 1);
    setDetallesPorProducto(nuevosDetalles);
  };

  const manejarColor = (productoId, color) => {
    const nuevosDetalles = { ...detallesPorProducto };
    nuevosDetalles[productoId].color = color;
    setDetallesPorProducto(nuevosDetalles);
  };

  const manejarMaterial = (productoId, material) => {
    const nuevosDetalles = { ...detallesPorProducto };
    nuevosDetalles[productoId].material = material;
    setDetallesPorProducto(nuevosDetalles);
  };

  const manejarImagenes = (productoId, evento) => {
    const archivos = Array.from(evento.target.files);
    const nuevosDetalles = { ...detallesPorProducto };
    nuevosDetalles[productoId].imagenes = archivos;
    setDetallesPorProducto(nuevosDetalles);
  };

  const obtenerCantidadTotalPorGrupos = (grupos) => {
    return grupos.reduce((total, grupo) => total + grupo.cantidad, 0);
  };

  const continuar = () => {
    for (const producto of productosSeleccionados) {
      const detalles = detallesPorProducto[producto.id];
      const grupos = detalles.grupos;

      if (producto.cantidad > 1) {
        const cantidadTotal = obtenerCantidadTotalPorGrupos(grupos);
        if (cantidadTotal !== producto.cantidad) {
          alert(
            `La suma de cantidades para el producto "${producto.nombre}" debe ser exactamente ${producto.cantidad}.`
          );
          return;
        }

        for (const grupo of grupos) {
          if (!grupo.talla) {
            alert(
              `Completa la talla en todos los grupos del producto "${producto.nombre}".`
            );
            return;
          }
        }
      } else {
        // cantidad 1, validar talla simple
        if (!detalles.talla) {
          alert(`Completa la talla para el producto "${producto.nombre}".`);
          return;
        }
      }

      // Validar campos específicos para polo personalizado
      if (producto.nombre.toLowerCase().includes("polo personalizado")) {
        if (!detalles.color) {
          alert(`Selecciona un color para el producto "${producto.nombre}".`);
          return;
        }
        if (!detalles.material) {
          alert(
            `Selecciona un material para el producto "${producto.nombre}".`
          );
          return;
        }
      }

      // Validar archivo (al menos 1 archivo)
      if (!detalles.imagenes || detalles.imagenes.length === 0) {
        alert(
          `Sube al menos un archivo para el producto "${producto.nombre}".`
        );
        return;
      }
    }

    const datosFinales = {
      productos: productosSeleccionados,
      detalles: detallesPorProducto,
    };
    navigate("/datos-cliente", { state: datosFinales });
  };

  return (
    <div className="detalles-background">
      <div className="overlay-content">
        <h2 className="titulo-compra">Detalles de la Compra</h2>

        {productosSeleccionados.map((producto, index) => {
          const detalles = detallesPorProducto[producto.id] || {
            grupos: producto.cantidad > 1 ? [] : null,
            color: "#ffffff",
            material: "",
            talla: "",
            imagenes: [],
          };
          const grupos = detalles.grupos;

          const esPoloPersonalizado = producto.nombre
            .toLowerCase()
            .includes("polo personalizado");

          return (
            <div key={index} className="producto-detalle">
              <h3>{producto.nombre}</h3>
              <p>
                <strong>Cantidad:</strong> {producto.cantidad}
              </p>

              {producto.cantidad > 1 ? (
                <div className="grupos-container">
                  <h4>Grupos</h4>
                  {grupos.map((grupo, idx) => (
                    <div key={idx} className="grupo-item">
                      <label>
                        Talla: 
                        <input
                          type="text"
                          value={grupo.talla}
                          onChange={(e) =>
                            manejarCambioGrupo(
                              producto.id,
                              idx,
                              "talla",
                              e.target.value
                            )
                          }
                        />
                      </label>
                      <label>
                        Cantidad:
                        <input
                          type="number"
                          min="1"
                          max={
                            producto.cantidad -
                            obtenerCantidadTotalPorGrupos(grupos) +
                            grupo.cantidad
                          }
                          value={grupo.cantidad}
                          onChange={(e) =>
                            manejarCambioGrupo(
                              producto.id,
                              idx,
                              "cantidad",
                              Math.max(1, parseInt(e.target.value) || 1)
                            )
                          }
                        />
                      </label>
                      <button
                        className="btn-delet-group"
                        onClick={() => eliminarGrupo(producto.id, idx)}
                      >
                        X
                      </button>
                    </div>
                  ))}

                  <button
                    className="btn-add-group"
                    onClick={() => agregarGrupo(producto.id)}
                  >
                    Agregar Grupo
                  </button>
                </div>
              ) : (
                <label>
                  Talla:
                  <input
                    type="text"
                    value={detalles.talla}
                    onChange={(e) =>
                      manejarCambioCampoSimple(
                        producto.id,
                        "talla",
                        e.target.value
                      )
                    }
                  />
                </label>
              )}

              {esPoloPersonalizado && (
                <>
                  <label>
                    Color:
                    <input
                      type="color"
                      value={detalles.color}
                      onChange={(e) =>
                        manejarColor(producto.id, e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Material:
                    <input
                      type="text"
                      value={detalles.material}
                      onChange={(e) =>
                        manejarMaterial(producto.id, e.target.value)
                      }
                      placeholder="Material (ej. algodón)"
                    />
                  </label>
                </>
              )}

              <label>
                Archivo{producto.cantidad > 1 ? "s" : ""}:
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => manejarImagenes(producto.id, e)}
                />
              </label>
            </div>
          );
        })}

        <button className="btn-add-group" onClick={continuar}>
          Continuar con el Pago
        </button>
      </div>
    </div>
  );
};

export default DetallesCompra;
