import React, { useEffect, useState } from "react";
import { useAuth } from "../assets/context/AuthContext";
import logo from "../assets/images/logo-dd.png";
import { supabase } from "../supabaseClient";

export default function MiPerfil() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [avatarFiles, setAvatarFiles] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener URL pública de un avatar en storage
  const getAvatarUrl = (fileName) => {
    if (!fileName) return null;
    const cleanFileName = fileName.startsWith("/") ? fileName.slice(1) : fileName;
    const encodedFileName = encodeURIComponent(cleanFileName);
    const { data } = supabase.storage.from("avatars").getPublicUrl(encodedFileName);
    return data.publicUrl || null;
  };

  // Traer datos usuario y avatar al cargar
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

      if (data.avatar_url) {
        setAvatarUrl(getAvatarUrl(data.avatar_url));
        setSelectedAvatar(data.avatar_url);
      }
    };

    fetchUsuario();
  }, [user]);

  // Cargar lista de avatars disponibles en storage
  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.storage.from("avatars").list("", {
        limit: 100,
        offset: 0,
      });
      if (error) {
        console.error("Error cargando avatars:", error.message);
        setAvatarFiles([]);
        return;
      }
      setAvatarFiles(data || []);
    };
    fetchAvatars();
  }, []);

  // Actualizar avatar seleccionado en la DB
  const updateAvatar = async (avatarName) => {
    if (!user) return;
    setLoadingAvatar(true);
    setError(null);
    try {
      const { error } = await supabase
        .from("usuarios")
        .update({ avatar_url: avatarName })
        .eq("id", user.id);

      if (error) throw error;

      setSelectedAvatar(avatarName);
      setAvatarUrl(getAvatarUrl(avatarName));
      setUsuarioInfo((prev) => ({ ...prev, avatar_url: avatarName }));
    } catch (err) {
      console.error("Error actualizando avatar:", err.message);
      setError("No se pudo actualizar el avatar.");
    } finally {
      setLoadingAvatar(false);
    }
  };

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

        <div className="mb-6 space-y-2 text-sm tracking-wide text-gray-300">
          <p>
            <span className="font-semibold text-yellow-400">Operador: </span>
            {usuarioInfo?.correo || user?.email}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Nombre: </span>
            {usuarioInfo?.nombre} {usuarioInfo?.apellido}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Apodo: </span>
            {usuarioInfo?.apodo || "Sin apodo"}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Teléfono: </span>
            {usuarioInfo?.telefono || "No registrado"}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Nivel: </span>
            {usuarioInfo?.nivel || "No asignado"}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Puntos: </span>
            {usuarioInfo?.puntos || 0}
          </p>
          <p>
            <span className="font-semibold text-yellow-400">Suscripción: </span>
            {usuarioInfo?.suscripcion || "Sin suscripción"}
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
            {user?.email === "walterguillermopared@gmail.com" ? "Total" : "Restringido"}
          </p>
        </div>

        {/* Selector de avatar */}
        <div className="mb-4">
          <p className="mb-2 font-semibold text-yellow-400">Elegí un avatar:</p>
          <div className="flex flex-wrap gap-2 p-2 overflow-y-auto bg-gray-900 border border-yellow-600 rounded max-h-48">
            {avatarFiles.length === 0 && (
              <p className="text-sm text-gray-400">No hay avatars disponibles</p>
            )}
            {avatarFiles.map((file) => {
              const publicURL = getAvatarUrl(file.name);
              const isSelected = file.name === selectedAvatar;
              return (
                <button
                  key={file.name}
                  type="button"
                  onClick={() => updateAvatar(file.name)}
                  disabled={loadingAvatar}
                  className={`border-2 rounded cursor-pointer w-16 h-16 p-1 ${
                    isSelected ? "border-yellow-400" : "border-transparent"
                  } ${loadingAvatar ? "opacity-50 pointer-events-none" : ""}`}
                  title={file.name}
                >
                  <img
                    src={publicURL}
                    alt={file.name}
                    className="object-cover w-full h-full rounded"
                  />
                </button>
              );
            })}
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
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
