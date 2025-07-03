import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LoginRegister() {
  const [mode, setMode] = useState("login"); // "login" o "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [apodo, setApodo] = useState("");
  const [telefono, setTelefono] = useState("");

  // Estado usuario y perfil
  const [user, setUser] = useState(null);
  const [usuarioInfo, setUsuarioInfo] = useState(null);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) setUser(session.user);
        else {
          setUser(null);
          setUsuarioInfo(null);
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUsuarioInfo = async () => {
      if (!user) {
        setUsuarioInfo(null);
        return;
      }

      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116" || error.message.includes("No rows found")) {
          setUsuarioInfo(null);
        } else {
          console.error("Error cargando perfil usuario:", error.message);
          setUsuarioInfo(null);
        }
      } else {
        setUsuarioInfo(data);
      }
    };

    fetchUsuarioInfo();
  }, [user]);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const limpiarCampos = () => {
    setEmail("");
    setPassword("");
    setNombre("");
    setApellido("");
    setApodo("");
    setTelefono("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email.trim() || !password) {
      setError("Email y contraseña son obligatorios.");
      return;
    }

    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;

        setUser(data.user);
        setMessage("Ingreso exitoso!");
        limpiarCampos();
      } else {
        if (!nombre.trim() || !apellido.trim()) {
          setError("Nombre y apellido son obligatorios.");
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              nombre: nombre.trim(),
              apellido: apellido.trim(),
              apodo: apodo.trim() || null,
              telefono: telefono.trim() || null,
              avatar_url: "default-avatar.png", // Avatar por defecto
              nivel: 1,
              puntos: 0,
              suscripcion: "Aspirante",
            },
          },
        });
        if (error) throw error;
        if (!data.user) {
          setError("No se pudo crear el usuario.");
          return;
        }
        const { id } = data.user;

        const { data: exists, error: existsError } = await supabase
          .from("usuarios")
          .select("id")
          .eq("id", id)
          .single();

        if (existsError) {
          if (
            existsError.code !== "PGRST116" &&
            !existsError.message.includes("No rows found")
          ) {
            throw existsError;
          }
        }

        if (!exists) {
          const { error: insertError } = await supabase.from("usuarios").insert([
            {
              id,
              correo: email.trim(),
              nombre: nombre.trim(),
              apellido: apellido.trim(),
              apodo: apodo?.trim() || null,
              telefono: telefono?.trim() || null,
              avatar_url: "default-avatar.png", // Avatar por defecto
              nivel: 1,
              puntos: 0,
              suscripcion: "Aspirante",
            },
          ]);
          if (insertError) throw insertError;
        }

        setMessage("Registro exitoso! Revisa tu correo para confirmar tu cuenta.");
        limpiarCampos();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error inesperado. Revisá la consola.");
    }
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-12 border border-yellow-600 rounded-lg shadow-md bg-mgsv-bg font-rajdhani text-mgsv-text">
      <h2 className="mb-6 text-3xl text-center uppercase font-orbitron tracking-widest text-yellow-400 drop-shadow-[0_0_10px_#FFD93B]">
        {mode === "login" ? "Ingreso táctico" : "Alta en escuadrón"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" autoComplete="off">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 placeholder-gray-500 border border-yellow-600 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 placeholder-gray-500 border border-yellow-600 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
        />

        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="p-2 placeholder-gray-500 border border-yellow-600 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
              autoComplete="given-name"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="p-2 placeholder-gray-500 border border-yellow-600 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
              autoComplete="family-name"
            />
            <input
              type="text"
              placeholder="Apodo (opcional)"
              value={apodo}
              onChange={(e) => setApodo(e.target.value)}
              className="p-2 placeholder-gray-500 border border-yellow-600 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
              autoComplete="nickname"
            />
            <input
              type="tel"
              placeholder="Teléfono (opcional)"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="p-2 placeholder-gray-500 border border-yellow-600 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
              autoComplete="tel"
            />
          </>
        )}

        <button
          type="submit"
          className="p-2 font-bold tracking-widest text-black uppercase transition-all bg-yellow-400 rounded hover:bg-yellow-300"
        >
          {mode === "login" ? "Iniciar misión" : "Registrarse"}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-center text-red-500">{error}</p>}
      {message && <p className="mt-3 text-sm text-center text-green-400">{message}</p>}

      <p className="mt-6 text-sm text-center text-mgsv-text">
        {mode === "login"
          ? "¿No estás enlistado? "
          : "¿Ya sos parte del escuadrón? "}
        <button
          onClick={() => {
            setError(null);
            setMessage(null);
            setMode(mode === "login" ? "register" : "login");
            limpiarCampos();
          }}
          className="font-semibold text-yellow-300 underline hover:text-yellow-200"
          type="button"
        >
          {mode === "login" ? "Registrate" : "Ingresá"}
        </button>
      </p>
    </div>
  );
}
