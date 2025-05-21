import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/styleComprasD.css';

const DetallesCompra = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState('#ffffff');
  const [esDeportiva, setEsDeportiva] = useState(false);

  useEffect(() => {
    if (location.state?.productos) {
      const productos = location.state.productos;
      setProductosSeleccionados(productos);

      const soloDeportivos = productos.every(p =>
        ['polo deportivo', 'short deportivo'].includes(p.nombre.toLowerCase())
      );

      setEsDeportiva(soloDeportivos);

      if (soloDeportivos) {
        const total = productos.reduce((sum, p) => sum + p.cantidad, 0);
        const iniciales = Array.from({ length: total }, (_, i) => ({
          id: i + 1,
          cantidad: 1,
          talla: '',
          numero: '',
          nombre: '',
        }));
        setGrupos(iniciales);
      }
    }
  }, [location]);

  const manejarCambioGrupo = (index, campo, valor) => {
    const nuevosGrupos = [...grupos];
    nuevosGrupos[index][campo] = valor;
    setGrupos(nuevosGrupos);
  };

  const manejarCantidadGrupos = (cantidad) => {
    const totalDisponible = productosSeleccionados.reduce((sum, p) => sum + p.cantidad, 0);
    if (cantidad < 1 || cantidad > totalDisponible) return;

    const nuevosGrupos = Array.from({ length: cantidad }, (_, i) => ({
      id: i + 1,
      cantidad: 1,
      talla: '',
      numero: '',
      nombre: '',
    }));
    setGrupos(nuevosGrupos);
  };

  const manejarImagenes = (event) => {
    const archivos = Array.from(event.target.files);
    setImagenes(archivos);
  };

  const continuar = () => {
    const datosFinales = {
      productos: productosSeleccionados,
      detalles: esDeportiva ? grupos : [],
      imagenes,
      colorSeleccionado,
    };
    navigate('/pago', { state: datosFinales });
  };

  return (
    <div className="contenedor-compra">
      <h2>Detalles de la Compra</h2>

      <div className="productos">
        {productosSeleccionados.map((producto, idx) => (
          <div key={idx} className="producto">
            <p><strong>Producto:</strong> {producto.nombre}</p>
            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
          </div>
        ))}
      </div>

      {esDeportiva ? (
        <div className="secciones-deportivas">
          <div className="seccion-izquierda">
            <h3>Configurar Grupos</h3>
            <label>
              Cantidad de Grupos:
              <input
                type="number"
                min="1"
                max={productosSeleccionados.reduce((sum, p) => sum + p.cantidad, 0)}
                value={grupos.length}
                onChange={(e) => manejarCantidadGrupos(Number(e.target.value))}
              />
            </label>

            {grupos.map((grupo, index) => (
              <div key={grupo.id} className="grupo">
                <p>Grupo #{grupo.id}</p>
                <input
                  type="number"
                  min="1"
                  max={productosSeleccionados.reduce((sum, p) => sum + p.cantidad, 0)}
                  value={grupo.cantidad}
                  onChange={(e) => manejarCambioGrupo(index, 'cantidad', Number(e.target.value))}
                  placeholder="Cantidad"
                />
                <input
                  type="text"
                  value={grupo.nombre}
                  onChange={(e) => manejarCambioGrupo(index, 'nombre', e.target.value)}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  value={grupo.numero}
                  onChange={(e) => manejarCambioGrupo(index, 'numero', e.target.value)}
                  placeholder="Número"
                />
                <input
                  type="text"
                  value={grupo.talla}
                  onChange={(e) => manejarCambioGrupo(index, 'talla', e.target.value)}
                  placeholder="Talla"
                />
              </div>
            ))}
          </div>

          <div className="seccion-derecha">
            <h3>Personalización General</h3>
            <label>
              Color del Producto:
              <input
                type="color"
                value={colorSeleccionado}
                onChange={(e) => setColorSeleccionado(e.target.value)}
              />
            </label>
            <label>
              Subir Logos o Diseños:
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={manejarImagenes}
              />
            </label>

            <button className="boton-continuar" onClick={continuar}>
              Continuar con el Pago
            </button>
          </div>
        </div>
      ) : (
        <div className="normal-section">
          <h3>Personalización Opcional</h3>
          <label>
            Color del Producto:
            <input
              type="color"
              value={colorSeleccionado}
              onChange={(e) => setColorSeleccionado(e.target.value)}
            />
          </label>
          <label>
            Subir Logos o Diseños:
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={manejarImagenes}
            />
          </label>

          <button className="boton-continuar" onClick={continuar}>
            Continuar con el Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default DetallesCompra;
