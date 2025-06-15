import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const { signIn, signUp, user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login o register
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      // Si hay usuario logueado, redirigir a "/"
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email || !password) {
      setError("Email y contraseña son obligatorios.");
      return;
    }

    if (mode === "login") {
      const { error } = await signIn(email.trim(), password);
      if (error) setError(error.message);
      else setMessage("Ingreso exitoso!");
    } else {
      const { error } = await signUp(email.trim(), password);
      if (error) setError(error.message);
      else setMessage("Registro exitoso! Revisa tu correo para confirmar.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  if (user)
    return (
      <div>
        <p>Bienvenido, {user.email}</p>
        <button onClick={signOut}>Cerrar sesión</button>
      </div>
    );

  return (
    <div className="max-w-md p-4 mx-auto">
      <h2 className="mb-4 text-2xl">{mode === "login" ? "Ingresar" : "Registrarse"}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 text-white bg-blue-600 rounded">
          {mode === "login" ? "Ingresar" : "Registrarse"}
        </button>
      </form>

      {error && <p className="mt-2 text-red-600">{error}</p>}
      {message && <p className="mt-2 text-green-600">{message}</p>}

      <p className="mt-4 text-center">
        {mode === "login" ? "No tenés cuenta? " : "Ya tenés cuenta? "}
        <button
          onClick={() => {
            setError(null);
            setMessage(null);
            setMode(mode === "login" ? "register" : "login");
          }}
          className="text-blue-600 underline"
        >
          {mode === "login" ? "Registrate" : "Ingresá"}
        </button>
      </p>
    </div>
  );
}
