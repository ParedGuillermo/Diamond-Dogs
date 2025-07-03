import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../assets/context/AuthContext";

export default function AdminUsuarios() {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!user) return;

    async function fetchUserPermisos() {
      const { data, error } = await supabase
        .from("usuarios")
        .select("puntos")
        .eq("correo", user.email)
        .single();

      if (error || !data) {
        setError("No se pudo verificar permisos");
        setLoading(false);
        return;
      }

      if (data.puntos < 150000) {
        setError("No tenés permisos para acceder a esta página");
        setLoading(false);
        return;
      }

      fetchUsuarios();
    }

    async function fetchUsuarios() {
      const { data, error } = await supabase.from("usuarios").select("*");
      if (error) setError(error.message);
      else setUsuarios(data);
      setLoading(false);
    }

    fetchUserPermisos();
  }, [user]);

  const handleEditClick = (usuario) => {
    setEditUser(usuario);
    setFormData(usuario);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

    if (error) alert("Error al guardar: " + error.message);
    else {
      alert("Usuario actualizado");
      setEditUser(null);
      // Refrescar lista
      const { data } = await supabase.from("usuarios").select("*");
      setUsuarios(data);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
      <h1>Administración de Usuarios</h1>
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Apodo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Nivel</th>
            <th>Puntos</th>
            <th>Suscripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) =>
            editUser && editUser.id === u.id ? (
              <tr key={u.id}>
                <td>
                  <input
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="apodo"
                    value={formData.apodo || ""}
                    onChange={handleChange}
                  />
                </td>
                <td>{u.correo}</td>
                <td>
                  <input
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="nivel"
                    value={formData.nivel}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="puntos"
                    value={formData.puntos}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <select
                    name="suscripcion"
                    value={formData.suscripcion}
                    onChange={handleChange}
                  >
                    <option value="Aspirante">Aspirante</option>
                    <option value="Diamond">Diamond</option>
                  </select>
                </td>
                <td>
                  <button onClick={handleSave}>Guardar</button>
                  <button onClick={() => setEditUser(null)}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.apellido}</td>
                <td>{u.apodo}</td>
                <td>{u.correo}</td>
                <td>{u.telefono}</td>
                <td>{u.nivel}</td>
                <td>{u.puntos}</td>
                <td>{u.suscripcion}</td>
                <td>
                  <button onClick={() => handleEditClick(u)}>Editar</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
