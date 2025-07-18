import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../assets/context/AuthContext";

export default function AdminUsuarios() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [avatarFiles, setAvatarFiles] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    if (!user || user.email !== "walterguillermopared@gmail.com") return;

    const fetchUsuarios = async () => {
      const { data, error } = await supabase.from("usuarios").select("*");
      if (error) {
        console.error("Error al traer usuarios:", error.message);
      } else {
        setUsuarios(data);
      }
      setLoading(false);
    };

    fetchUsuarios();
  }, [user]);

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .list("", { limit: 100, offset: 0 });

      if (error) {
        console.error("Error cargando avatars:", error.message);
        setAvatarFiles([]);
        return;
      }

      setAvatarFiles(data || []);
    };

    fetchAvatars();
  }, []);

  const handleEditClick = (usuario) => {
    setEditUser(usuario);
    setFormData(usuario);
    setSelectedAvatar(usuario.avatar_url || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (fileName) => {
    setSelectedAvatar(fileName);
    setFormData((prev) => ({ ...prev, avatar_url: fileName }));
  };

  const getAvatarUrl = (fileName) => {
    if (!fileName) return "/default-avatar.png";
    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
    return data.publicUrl || data.publicURL || "";
  };

  const handleSave = async () => {
    const { error } = await supabase
      .from("usuarios")
      .update({
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
        apodo: formData.apodo,
        nivel: formData.nivel,
        puntos: formData.puntos,
        suscripcion: formData.suscripcion,
        avatar_url: formData.avatar_url,
      })
      .eq("id", formData.id);

    if (error) {
      alert("Error al guardar: " + error.message);
    } else {
      alert("Usuario actualizado correctamente");
      setEditUser(null);
      const { data } = await supabase.from("usuarios").select("*");
      setUsuarios(data);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("¿Querés eliminar este usuario?")) return;

    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) {
      alert("Error al eliminar usuario: " + error.message);
    } else {
      alert("Usuario eliminado correctamente");
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
  };

  if (!user || user.email !== "walterguillermopared@gmail.com") {
    return (
      <div className="p-10 text-lg text-center" style={{ color: "#D94545" }}>
        No tenés permisos para acceder a esta sección.
      </div>
    );
  }

  if (loading)
    return <div className="p-10 text-gray-400">Cargando usuarios...</div>;

  return (
    <div
      className="max-w-3xl p-6 mx-auto"
      style={{
        backgroundColor: "#1A1A1A",
        color: "#B0B0B0",
        fontFamily: "Consolas, monospace",
      }}
    >
      <h1 className="mb-6 text-3xl font-bold" style={{ color: "#C2B280" }}>
        Administración de Usuarios
      </h1>

      {usuarios.map((u) =>
        editUser && editUser.id === u.id ? (
          <div
            key={u.id}
            className="p-4 mb-6 border border-yellow-700 rounded"
            style={{ backgroundColor: "#2E2E2E" }}
          >
            {[
              "nombre",
              "apellido",
              "apodo",
              "telefono",
              "nivel",
              "puntos",
            ].map((field) => (
              <div key={field} className="mb-3">
                <label
                  htmlFor={field}
                  style={{ display: "block", marginBottom: 4, color: "#C2B280" }}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  id={field}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "6px 8px",
                    backgroundColor: "#1E1E1E",
                    color: "#B0B0B0",
                    border: "1px solid #555555",
                    borderRadius: 4,
                    fontFamily: "Consolas, monospace",
                  }}
                />
              </div>
            ))}

            <div className="mb-3">
              <label
                htmlFor="suscripcion"
                style={{ display: "block", marginBottom: 4, color: "#C2B280" }}
              >
                Suscripción:
              </label>
              <select
                id="suscripcion"
                name="suscripcion"
                value={formData.suscripcion}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  backgroundColor: "#1E1E1E",
                  color: "#B0B0B0",
                  border: "1px solid #555555",
                  borderRadius: 4,
                  fontFamily: "Consolas, monospace",
                }}
              >
                <option
                  value="Aspirante"
                  style={{ backgroundColor: "#1E1E1E", color: "#B0B0B0" }}
                >
                  Aspirante
                </option>
                <option
                  value="Diamond"
                  style={{ backgroundColor: "#1E1E1E", color: "#B0B0B0" }}
                >
                  Diamond
                </option>
              </select>
            </div>

            <div className="mb-3">
              <p className="mb-2 font-semibold text-yellow-400">Elegí avatar:</p>
              <div
                className="flex flex-wrap gap-2 p-2 overflow-y-auto bg-gray-900 border border-yellow-600 rounded max-h-48"
                style={{ maxHeight: 200 }}
              >
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
                      onClick={() => handleAvatarSelect(file.name)}
                      className={`border-2 rounded cursor-pointer w-16 h-16 p-1 ${
                        isSelected ? "border-yellow-400" : "border-transparent"
                      }`}
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
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSave}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#556B2F",
                  color: "#fff",
                  borderRadius: 4,
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontFamily: "Consolas, monospace",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#728C4B")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#556B2F")}
              >
                Guardar
              </button>
              <button
                onClick={() => setEditUser(null)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#555555",
                  color: "#B0B0B0",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "Consolas, monospace",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#777777")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#555555")}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div
            key={u.id}
            className="flex flex-col gap-2 p-4 mb-6 border border-yellow-700 rounded"
            style={{ backgroundColor: "#2E2E2E" }}
          >
            <img
              src={getAvatarUrl(u.avatar_url)}
              alt={`${u.nombre} avatar`}
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: 8,
              }}
            />
            <p>
              <strong>Nombre:</strong> {u.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {u.apellido}
            </p>
            <p>
              <strong>Apodo:</strong> {u.apodo}
            </p>
            <p>
              <strong>Correo:</strong> {u.correo}
            </p>
            <p>
              <strong>Teléfono:</strong> {u.telefono}
            </p>
            <p>
              <strong>Nivel:</strong> {u.nivel}
            </p>
            <p>
              <strong>Puntos:</strong> {u.puntos}
            </p>
            <p>
              <strong>Suscripción:</strong> {u.suscripcion}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEditClick(u)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  backgroundColor: "#D94545",
                  color: "#fff",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontFamily: "Consolas, monospace",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#E05A5A")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#D94545")
                }
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteUser(u.id)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  backgroundColor: "#555555",
                  color: "#B0B0B0",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontFamily: "Consolas, monospace",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#777777")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#555555")
                }
              >
                Borrar
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
