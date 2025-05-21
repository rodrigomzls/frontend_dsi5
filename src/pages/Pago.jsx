import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/stylePago.css";
import { useAuth } from "../context/AuthContext";

const Pago = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productos, total, cliente, detalles, imagenes } = location.state || {
    productos: [],
    total: 0,
    cliente: {},
    detalles: {},
    imagenes: {},
  };
  const [qrEscaneado, setQrEscaneado] = useState(false);
  const [procesando, setProcesando] = useState(false);

  const procesarPago = async () => {
    if (!user?.id) {
      alert("Usuario no autenticado");
      return;
    }

    if (!cliente?.direccion || cliente.direccion.trim() === "") {
      alert("Falta la dirección del cliente");
      return;
    }

    if (!Array.isArray(productos) || productos.length === 0) {
      alert("No hay productos para procesar");
      return;
    }

    if (!qrEscaneado) {
      alert("Debes escanear el código QR antes de pagar");
      return;
    }

    if (!cliente?.nombre || cliente.nombre.trim() === "") {
      alert("Falta el nombre del cliente");
      return;
    }

    if (!cliente?.telefono || cliente.telefono.trim() === "") {
      alert("Falta el número de teléfono del cliente");
      return;
    }

    setProcesando(true);
    try {
      const response = await fetch("/api/v1/ventas/completa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id_usuario: user.id,
          productos: productos.map((p) => ({
            id: p.id,
            cantidad: p.cantidad,
            precio: p.precio,
          })),
          detalles,
          imagenes,
          total,
          direccion: cliente.direccion,
          cliente: cliente // ← Asegúrate de enviar todo esto también
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Error en el pago");

      navigate("/confirmacion", {
        state: {
          venta: data,
          cliente,
          productos,
          total,
        },
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="pagobody">
      <div className="checkout-container">
        {/* Columna Izquierda */}
        <div className="checkout-left">
          <div className="checkout-section">
            <h3>Dirección de entrega</h3>
            <p>
              <strong>Juan Carlos Pérez Gómez</strong> +51 987654321
            </p>
            <p>Av. Ejemplo 123, Lima, Perú</p>
            <a href="#">Modificar</a>
          </div>

          <div className="checkout-section">
            <h3>Método de pago</h3>
            <p>💳 Visa **** **** 1234</p>
            <a href="#">Cambiar</a>
          </div>

          <div className="checkout-section">
            <h3>Método de envío</h3>
            <p>Envío: PEN 7.47</p>
            <p>Entrega estimada: 23 MAY. - 04 JUN.</p>
          </div>

          <div className="checkout-section">
            <h3>Detalle del artículo</h3>
            {productos.map((p, idx) => (
              <div key={idx} className="item-detalle">
                <img
                  src={p.imagen || "/Images/ID_Producto.jpeg"}
                  alt={p.nombre}
                />
                <div>
                  <p>{p.nombre}</p>
                  <p>PEN {parseFloat(p.precio).toFixed(2)}</p>
                  <p>Cantidad: {p.cantidad}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha */}
        <div className="checkout-right">
          <div className="resumen-section">
            <h3>Resumen</h3>
            <div className="resumen-linea">
              <span>Subtotal</span>
              <span>PEN {parseFloat(total - 7.47).toFixed(2)}</span>
            </div>
            <div className="resumen-linea">
              <span>Gastos de envío</span>
              <span>PEN 7.47</span>
            </div>
            <hr />
            <div className="resumen-linea total">
              <span>Total</span>
              <span>PEN {parseFloat(total).toFixed(2)}</span>
            </div>
            {!qrEscaneado && (
              <button className="btn-qr" onClick={() => setQrEscaneado(true)}>
                Ya escaneé el QR
              </button>
            )}
            <button
              className="btn-pagar"
              disabled={procesando}
              onClick={procesarPago}
            >
              {procesando ? "Procesando..." : "Pagar ahora"}
            </button>

            {/* <p className="fecha-vencimiento">{obtenerFechaVencimiento()}</p> */}
          </div>
          <div className="qr-section">
            <img src="/Images/qr.jpeg" alt="QR" />
            <p>Escanea con tu billetera favorita</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pago;
