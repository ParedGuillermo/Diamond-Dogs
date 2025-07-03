import React, { useEffect, useState } from "react";
import { useAuth } from "../assets/context/AuthContext";
import logo from "../assets/images/logo-dd.png";
import { supabase } from "../supabaseClient";

export default function MiPerfil() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [usuarioInfo, setUsuarioInfo] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error obteniendo datos de usuario:", error.message);
        return;
      }

      setUsuarioInfo(data);

      // ✅ Usar directamente el avatar_url porque ya es una URL completa
      if (data.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    };

    fetchUsuario();
  }, [user]);

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen px-6 py-12 bg-mgsv-bg text-mgsv-text font-rajdhani">
      {/* Fondo tipo radar */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="w-full h-full bg-repeat bg-radar-pattern opacity-20" />
      </div>

      {/* Header táctico */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={logo}
          alt="Logo"
          className="w-20 mb-4 drop-shadow-[0_0_12px_rgba(255,217,59,0.8)]"
        />
        <h1 className="text-4xl font-bold tracking-widest text-yellow-400 uppercase">
          Ficha de Operador
        </h1>
        <p className="mt-2 text-sm tracking-wide text-gray-400">
          Información clasificada - acceso autorizado
        </p>
      </div>

      {/* Card de perfil */}
      <div className="w-full max-w-md p-6 border-2 border-yellow-400 rounded-lg shadow-xl bg-mgsv-card">
       <div className="flex flex-col items-center mb-6">
  {avatarUrl ? (
    <img
      src={avatarUrl}
      alt="Avatar"
      className="object-cover border-4 border-yellow-400 rounded-full shadow-md"
      style={{ width: 168, height: 168 }}
    />
  ) : (
    <div
      className="flex items-center justify-center text-xs text-yellow-400 bg-gray-600 border-4 border-yellow-400 rounded-full"
      style={{ width: 168, height: 168 }}
    >
      Sin avatar
    </div>
  )}
</div>


        <h2 className="mb-4 text-xl font-bold text-yellow-300 uppercase">
          Identificación
        </h2>

        <div className="space-y-2 text-sm tracking-wide text-gray-300">
          <p>
            <span className="font-semibold text-yellow-400">Operador: </span>
            {usuarioInfo?.correo || user?.email}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Nombre: </span>
            {usuarioInfo?.nombre} {usuarioInfo?.apellido}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Rol asignado: </span>
            {usuarioInfo?.rol || "Usuario"}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Estado: </span>
            Activo en misión
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Nivel de acceso: </span>
            {user?.email === "walterguillermopared@gmail.com"
              ? "Total"
              : "Restringido"}
          </p>
        </div>

        <div className="pt-4 mt-6 text-xs text-gray-500 border-t border-yellow-400">
          <p>
            Si detectás actividad sospechosa en tu cuenta, contactá a tu supervisor táctico.
          </p>
        </div>
      </div>
    </div>
  );
}
