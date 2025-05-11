import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/stylePago.css";

const Pago = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productos, total } = location.state || { productos: [], total: 0 };
  const [qrEscaneado, setQrEscaneado] = useState(false);

  if (!productos.length || !total) {
    return (
      <div className="pago-container">
        <h2>No se han recibido datos del carrito.</h2>
        <button onClick={() => navigate("/")}>Volver al Catálogo</button>
      </div>
    );
  }

  const obtenerFechaVencimiento = () => {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    const diaSemana = dias[hoy.getDay()];
    const dia = hoy.getDate().toString().padStart(2, "0");
    const mes = (hoy.getMonth() + 1).toString().padStart(2, "0");
    const año = hoy.getFullYear();
    return `Paga antes del ${diaSemana} ${dia}/${mes}/${año} - 8:00 PM`;
  };

  return (
    <div className="pagobody">
      <div className="checkout-container">
        {/* Columna Izquierda */}
        <div className="checkout-left">
          <div className="checkout-section">
            <h3>Dirección de entrega</h3>
            <p><strong>Juan Carlos Pérez Gómez</strong> +51 987654321</p>
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
                <img src={p.imagen || "/Images/default.png"} alt={p.nombre} />
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
              disabled={!qrEscaneado}
              onClick={() => alert("Gracias por tu pago :)")}
            >
              Pagar ahora
            </button>
            <p className="fecha-vencimiento">{obtenerFechaVencimiento()}</p>
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
