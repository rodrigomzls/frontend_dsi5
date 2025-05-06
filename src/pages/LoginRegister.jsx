import React, { useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/LoginRegisterStyle.css";

const LoginRegister = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [message, setMessage] = useState({ text: "", type: "" });

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    setMessage({ text: "", type: "" }); // Limpia mensajes al alternar
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/register", {
        name,
        email,
        password,
        dni
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setMessage({ text: "¡Registro exitoso! Redirigiendo...", type: "success" });

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Error en el registro", type: "error" });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setMessage({ text: "¡Bienvenido!", type: "success" });

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage({ text: "Credenciales incorrectas", type: "error" });
    }
  };

  return (
    <div className=" body container mt-3 flex-fill">
    <div className={`container-form ${isLoginActive ? "login" : "register"}`}>
      <div className="information">
        <div className="info-childs">
          <h2>{isLoginActive ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}</h2>
          <input
            type="button"
            value={isLoginActive ? "Registrarse" : "Iniciar Sesión"}
            onClick={toggleForm}
          />
        </div>
      </div>

      <div className="form-information">
        <div className="form-information-childs">
          <h2>{isLoginActive ? "Iniciar Sesión" : "Crear una Cuenta"}</h2>
          {message.text && (
            <div className={`alert ${message.type === "error" ? "alert-danger" : "alert-success"}`}>
              {message.text}
            </div>
          )}
          <form className="form" onSubmit={isLoginActive ? handleLogin : handleRegister}>
            {!isLoginActive && (
              <>
                <label>
                  <i className="bx bx-user"></i>
                  <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <i className="bx bx-id-card"></i>
                  <input
                    type="text"
                    placeholder="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <i className="bx bx-envelope"></i>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <i className="bx bx-lock-alt"></i>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </label>
                <label>
                  <i className="bx bx-key"></i>
                  <input
                    type="number"
                    placeholder="Código de Verificación"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </label>
              </>
            )}
            {isLoginActive && (
              <>
                <label>
                  <i className="bx bx-envelope"></i>
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  <i className="bx bx-lock-alt"></i>
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </>
            )}
            <input type="submit" value={isLoginActive ? "Iniciar Sesión" : "Registrarse"} />
            {isLoginActive && (
              <div className="text-center">
                <a className="small" href="/recuperar">¿Olvidaste tu contraseña?</a>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginRegister;
