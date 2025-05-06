import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Clientes from "./pages/Clientes";
import Catalogo from "./pages/Catalogo";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import LoginRegister from "./pages/LoginRegister"; 
import { AuthContext } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);

  return (
    <>
      <Navbar />
      <div className="container mt-3 flex-fill">
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/acceder" />}
          />
          <Route
            path="/usuarios"
            element={user ? <Usuarios /> : <Navigate to="/acceder" />}
          />
          <Route
            path="/clientes"
            element={user ? <Clientes /> : <Navigate to="/acceder" />}
          />
          <Route
            path="/acceder"
            element={!user ? <LoginRegister /> : <Navigate to="/home" />}
          />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
