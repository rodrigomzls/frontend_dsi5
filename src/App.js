import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/shader/Navbar";
import Footer from "./components/shader/Footer";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuario";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
