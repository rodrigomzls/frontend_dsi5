// App.js
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Clientes from "./pages/Clientes";
import Catalogo from "./pages/Catalogo";
import Pago from "./pages/Pago";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import LoginRegister from "./pages/LoginRegister";
import AuthRequired from './pages/AuthRequired';
import DetallesCompra from './pages/DetallesCompra';
import DatosCliente from './pages/DatosCliente';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const AppContent = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="mt-3 flex-fill">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/acceder" />} />
          <Route path="/usuarios" element={user ? <Usuarios /> : <Navigate to="/acceder" />} />
          <Route path="/clientes" element={user ? <Clientes /> : <Navigate to="/acceder" />} />
          <Route path="/acceder" element={!user ? <LoginRegister /> : <Navigate to="/" />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/pago" element={user ? <Pago /> : <Navigate to="/auth-required" />} />
          <Route path="/auth-required" element={<AuthRequired />} />
          <Route path="/detalles-compra" element={<DetallesCompra />} />
          <Route path="/datos-cliente" element={<DatosCliente />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
