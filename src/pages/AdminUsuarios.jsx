import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../assets/context/AuthContext";

export default function AdminUsuarios() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({});

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

  const handleEditClick = (usuario) => {
    setEditUser(usuario);
    setFormData(usuario);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  if (!user || user.email !== "walterguillermopared@gmail.com") {
    return (
      <div className="p-10 text-lg text-center" style={{ color: "#D94545" }}>
        No tenés permisos para acceder a esta sección.
      </div>
    );
  }

  if (loading) return <div className="p-10 text-gray-400">Cargando usuarios...</div>;

  return (
    <div
      className="max-w-6xl p-10 mx-auto"
      style={{ backgroundColor: "#1A1A1A", color: "#B0B0B0", fontFamily: "Consolas, monospace" }}
    >
      <h1 className="mb-6 text-3xl font-bold" style={{ color: "#C2B280" }}>
        Administración de Usuarios
      </h1>
      <div className="overflow-auto" style={{ border: "1px solid #555555", borderRadius: 6 }}>
        <table className="min-w-full bg-[#2E2E2E] rounded shadow-md">
          <thead className="text-left" style={{ backgroundColor: "#555555", color: "#C2B280" }}>
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="p-3">Apodo</th>
              <th className="p-3">Correo</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3">Nivel</th>
              <th className="p-3">Puntos</th>
              <th className="p-3">Suscripción</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) =>
              editUser && editUser.id === u.id ? (
                <tr key={u.id} style={{ borderTop: "1px solid #555555" }}>
                  {[
                    "nombre",
                    "apellido",
                    "apodo",
                    "telefono",
                    "nivel",
                    "puntos",
                  ].map((field) => (
                    <td className="p-2" key={field}>
                      <input
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        style={{
                          width: "100%",
                          padding: "6px 8px",
                          backgroundColor: "#2E2E2E",
                          color: "#B0B0B0",
                          border: "1px solid #555555",
                          borderRadius: 4,
                          fontFamily: "Consolas, monospace",
                        }}
                      />
                    </td>
                  ))}
                  <td className="p-2">{u.correo}</td>
                  <td className="p-2">
                    <select
                      name="suscripcion"
                      value={formData.suscripcion}
                      onChange={handleChange}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        backgroundColor: "#2E2E2E",
                        color: "#B0B0B0",
                        border: "1px solid #555555",
                        borderRadius: 4,
                        fontFamily: "Consolas, monospace",
                      }}
                    >
                      <option value="Aspirante" style={{ backgroundColor: "#2E2E2E", color: "#B0B0B0" }}>
                        Aspirante
                      </option>
                      <option value="Diamond" style={{ backgroundColor: "#2E2E2E", color: "#B0B0B0" }}>
                        Diamond
                      </option>
                    </select>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={handleSave}
                      style={{
                        padding: "6px 12px",
                        marginRight: 8,
                        backgroundColor: "#556B2F",
                        color: "#fff",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontWeight: "bold",
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
                        padding: "6px 12px",
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
                  </td>
                </tr>
              ) : (
                <tr key={u.id} style={{ borderTop: "1px solid #555555" }}>
                  <td className="p-2">{u.nombre}</td>
                  <td className="p-2">{u.apellido}</td>
                  <td className="p-2">{u.apodo}</td>
                  <td className="p-2">{u.correo}</td>
                  <td className="p-2">{u.telefono}</td>
                  <td className="p-2">{u.nivel}</td>
                  <td className="p-2">{u.puntos}</td>
                  <td className="p-2">{u.suscripcion}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEditClick(u)}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: "#D94545",
                        color: "#fff",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontFamily: "Consolas, monospace",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E05A5A")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#D94545")}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
