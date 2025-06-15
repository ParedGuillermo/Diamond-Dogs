import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function AdminUsuarios() {
  const { user } = useAuth();  // Solo user, no userData
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Control de acceso por email
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
      // Refrescar lista de usuarios
      const { data } = await supabase.from("usuarios").select("*");
      setUsuarios(data);
    }
  };

  // Control de acceso: si el usuario no es el autorizado, mostramos mensaje
  if (!user || user.email !== "walterguillermopared@gmail.com") {
    return (
      <div className="p-10 text-lg text-center text-red-600">
        No tenés permisos para acceder a esta sección.
      </div>
    );
  }

  if (loading) return <div className="p-10">Cargando usuarios...</div>;

  return (
    <div className="max-w-6xl p-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Administración de Usuarios</h1>
      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="text-left bg-gray-100">
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
                <tr key={u.id} className="border-t">
                  <td className="p-2">
                    <input
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-black bg-white border border-gray-400 rounded"
                      style={{ outlineColor: "#2563eb" }}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-black bg-white border border-gray-400 rounded"
                      style={{ outlineColor: "#2563eb" }}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      name="apodo"
                      value={formData.apodo || ""}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-black bg-white border border-gray-400 rounded"
                      style={{ outlineColor: "#2563eb" }}
                    />
                  </td>
                  <td className="p-2">{u.correo}</td>
                  <td className="p-2">
                    <input
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-black bg-white border border-gray-400 rounded"
                      style={{ outlineColor: "#2563eb" }}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="nivel"
                      value={formData.nivel}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-black bg-white border border-gray-400 rounded"
                      style={{ outlineColor: "#2563eb" }}
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      name="puntos"
                      value={formData.puntos}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-black bg-white border border-gray-400 rounded"
                      style={{ outlineColor: "#2563eb" }}
                    />
                  </td>
                  <td className="p-2">
                    <select
                      name="suscripcion"
                      value={formData.suscripcion}
                      onChange={handleChange}
                      className="w-full px-2 py-1 text-black bg-white border border-gray-400 rounded"
                      style={{ outlineColor: "#2563eb" }}
                    >
                      <option value="Aspirante">Aspirante</option>
                      <option value="Diamond">Diamond</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 mr-2 text-white transition bg-green-600 rounded hover:bg-green-700"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditUser(null)}
                      className="px-3 py-1 text-white transition bg-gray-400 rounded hover:bg-gray-500"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={u.id} className="border-t">
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
                      className="px-3 py-1 text-white transition bg-blue-600 rounded hover:bg-blue-700"
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
