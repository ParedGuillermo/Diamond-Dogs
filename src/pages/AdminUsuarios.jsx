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

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Estás seguro que querés eliminar este usuario?");
    if (!confirmar) return;

    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) {
      alert("Error al eliminar usuario: " + error.message);
    } else {
      alert("Usuario eliminado correctamente");
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      if (editUser && editUser.id === id) setEditUser(null);
    }
  };

  if (!user || user.email !== "walterguillermopared@gmail.com") {
    return (
      <div className="p-10 text-lg text-center text-red-600">
        No tenés permisos para acceder a esta sección.
      </div>
    );
  }

  if (loading)
    return <div className="p-10 text-gray-400">Cargando usuarios...</div>;

  return (
    <div
      className="max-w-6xl p-4 mx-auto"
      style={{ backgroundColor: "#1A1A1A", color: "#B0B0B0", fontFamily: "Consolas, monospace" }}
    >
      <h1 className="mb-6 text-3xl font-bold text-center text-yellow-400">
        Administración de Usuarios
      </h1>

      {/* Tabla para desktop y scroll horizontal en móviles */}
      <div className="overflow-x-auto border border-gray-700 rounded">
        <table className="min-w-full bg-[#2E2E2E] rounded shadow-md text-sm md:text-base">
          <thead className="text-yellow-400 bg-gray-600">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Apellido</th>
              <th className="hidden p-3 sm:table-cell">Apodo</th>
              <th className="p-3">Correo</th>
              <th className="hidden p-3 sm:table-cell">Teléfono</th>
              <th className="hidden p-3 md:table-cell">Nivel</th>
              <th className="hidden p-3 md:table-cell">Puntos</th>
              <th className="hidden p-3 md:table-cell">Suscripción</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) =>
              editUser && editUser.id === u.id ? (
                <tr key={u.id} className="border-t border-gray-700">
                  {[
                    "nombre",
                    "apellido",
                    "apodo",
                    "telefono",
                    "nivel",
                    "puntos",
                  ].map((field) => (
                    <td
                      key={field}
                      className={`p-2 ${
                        (field === "apodo" || field === "telefono") ? "hidden sm:table-cell" : ""
                      } ${
                        (field === "nivel" || field === "puntos") ? "hidden md:table-cell" : ""
                      }`}
                    >
                      <input
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        className="w-full p-1 bg-[#2E2E2E] text-[#B0B0B0] border border-gray-600 rounded font-mono text-sm"
                      />
                    </td>
                  ))}
                  <td className="p-2">{u.correo}</td>
                  <td className="p-2">
                    <select
                      name="suscripcion"
                      value={formData.suscripcion}
                      onChange={handleChange}
                      className="w-full p-1 bg-[#2E2E2E] text-[#B0B0B0] border border-gray-600 rounded font-mono text-sm"
                    >
                      <option value="Aspirante">Aspirante</option>
                      <option value="Diamond">Diamond</option>
                    </select>
                  </td>
                  <td className="flex flex-wrap gap-2 p-2">
                    <button
                      onClick={handleSave}
                      className="px-3 py-1 text-sm font-bold bg-green-700 rounded hover:bg-green-600"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditUser(null)}
                      className="px-3 py-1 font-mono text-sm bg-gray-700 rounded hover:bg-gray-600"
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={u.id} className="border-t border-gray-700">
                  <td className="p-2">{u.nombre}</td>
                  <td className="p-2">{u.apellido}</td>
                  <td className="hidden p-2 sm:table-cell">{u.apodo}</td>
                  <td className="p-2">{u.correo}</td>
                  <td className="hidden p-2 sm:table-cell">{u.telefono}</td>
                  <td className="hidden p-2 md:table-cell">{u.nivel}</td>
                  <td className="hidden p-2 md:table-cell">{u.puntos}</td>
                  <td className="hidden p-2 md:table-cell">{u.suscripcion}</td>
                  <td className="flex flex-wrap gap-1 p-2">
                    <button
                      onClick={() => handleEditClick(u)}
                      className="px-3 py-1 text-sm font-bold bg-red-600 rounded hover:bg-red-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="px-3 py-1 text-sm font-bold bg-gray-800 rounded hover:bg-gray-900"
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Version tarjetas para móviles (opcional) */}
      <div className="block mt-6 space-y-4 sm:hidden">
        {usuarios.map((u) =>
          editUser && editUser.id === u.id ? (
            <div
              key={u.id}
              className="p-4 bg-[#2E2E2E] rounded shadow-md space-y-2"
              style={{ fontFamily: "Consolas, monospace" }}
            >
              {[
                "nombre",
                "apellido",
                "apodo",
                "telefono",
                "nivel",
                "puntos",
              ].map((field) => (
                <div key={field}>
                  <label className="block mb-1 text-xs font-bold text-yellow-400 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                    className="w-full p-2 bg-[#1A1A1A] text-[#B0B0B0] border border-gray-600 rounded font-mono text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="block mb-1 text-xs font-bold text-yellow-400">
                  Correo
                </label>
                <div>{u.correo}</div>
              </div>
              <div>
                <label className="block mb-1 text-xs font-bold text-yellow-400">
                  Suscripción
                </label>
                <select
                  name="suscripcion"
                  value={formData.suscripcion}
                  onChange={handleChange}
                  className="w-full p-2 bg-[#1A1A1A] text-[#B0B0B0] border border-gray-600 rounded font-mono text-sm"
                >
                  <option value="Aspirante">Aspirante</option>
                  <option value="Diamond">Diamond</option>
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleSave}
                  className="flex-1 px-3 py-2 text-sm font-bold bg-green-700 rounded hover:bg-green-600"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setEditUser(null)}
                  className="flex-1 px-3 py-2 font-mono text-sm bg-gray-700 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div
              key={u.id}
              className="p-4 bg-[#2E2E2E] rounded shadow-md space-y-1"
              style={{ fontFamily: "Consolas, monospace" }}
            >
              <p>
                <span className="font-bold text-yellow-400">Nombre: </span>
                {u.nombre} {u.apellido}
              </p>
              <p>
                <span className="font-bold text-yellow-400">Apodo: </span>
                {u.apodo}
              </p>
              <p>
                <span className="font-bold text-yellow-400">Correo: </span>
                {u.correo}
              </p>
              <p>
                <span className="font-bold text-yellow-400">Teléfono: </span>
                {u.telefono}
              </p>
              <p>
                <span className="font-bold text-yellow-400">Nivel: </span>
                {u.nivel}
              </p>
              <p>
                <span className="font-bold text-yellow-400">Puntos: </span>
                {u.puntos}
              </p>
              <p>
                <span className="font-bold text-yellow-400">Suscripción: </span>
                {u.suscripcion}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEditClick(u)}
                  className="flex-1 px-3 py-2 text-sm font-bold bg-red-600 rounded hover:bg-red-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="flex-1 px-3 py-2 text-sm font-bold bg-gray-800 rounded hover:bg-gray-900"
                >
                  Borrar
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
