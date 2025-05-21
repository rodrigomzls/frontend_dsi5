import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../css/styleLogin.css";

const LoginRegister = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoginActive, setIsLoginActive] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const registerParam = searchParams.get("register");
    if (registerParam === "true") {
      setIsLoginActive(false);
    }
  }, [location.search]);

  const [user, setUserRegister] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    setMessage({ text: "", type: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/v1/register", {
        user,
        email,
        password,
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
    <div className="body">
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
                      placeholder="Usuario"
                      value={user}
                      onChange={(e) => setUserRegister(e.target.value)}
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
