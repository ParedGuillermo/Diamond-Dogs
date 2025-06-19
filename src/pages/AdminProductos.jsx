import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function AdminProductos() {
  const { user, loading } = useAuth();
  const authorizedEmails = ["walterguillermopared@gmail.com"];

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    sabores: "",
    colores: "",
    categoria: "",
    imagen: null,
  });
  const [editandoId, setEditandoId] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error al obtener productos:", error);
      return;
    }
    setProductos(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setProducto((prev) => ({ ...prev, imagen: files[0] || null }));
    } else {
      setProducto((prev) => ({ ...prev, [name]: value }));
    }
  };

  const subirImagen = async () => {
    if (!producto.imagen) return null;
    const file = producto.imagen;
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("productos")
      .upload(fileName, file);
    if (error) {
      console.error("Error subiendo imagen:", error);
      return null;
    }
    const { data: publicURL } = supabase.storage
      .from("productos")
      .getPublicUrl(fileName);
    return publicURL.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubiendo(true);
    try {
      const imagenURL = await subirImagen();

      const productoData = {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock),
        sabores: producto.sabores,
        colores: producto.colores,
        categoria: producto.categoria,
      };

      if (imagenURL) {
        productoData.fotos = [imagenURL];
      }

      let error;
      if (editandoId) {
        const { error: updateError } = await supabase
          .from("productos")
          .update(productoData)
          .eq("id", editandoId);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("productos")
          .insert([{ ...productoData, fotos: imagenURL ? [imagenURL] : [] }]);
        error = insertError;
      }

      if (error) throw error;
      alert(editandoId ? "Producto actualizado" : "Producto cargado con éxito");

      setProducto({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        sabores: "",
        colores: "",
        categoria: "",
        imagen: null,
      });
      setEditandoId(null);
      fetchProductos();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Ocurrió un error al guardar el producto.");
    } finally {
      setSubiendo(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este producto?");
    if (!confirmar) return;
    try {
      const { error } = await supabase.from("productos").delete().eq("id", id);
      if (error) throw error;
      alert("Producto eliminado correctamente");
      fetchProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("Ocurrió un error al intentar eliminar el producto.");
    }
  };

  const handleEdit = (p) => {
    setProducto({
      nombre: p.nombre || "",
      descripcion: p.descripcion || "",
      precio: p.precio?.toString() || "",
      stock: p.stock?.toString() || "",
      sabores: p.sabores || "",
      colores: p.colores || "",
      categoria: p.categoria || "",
      imagen: null,
    });
    setEditandoId(p.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="max-w-3xl p-6 mx-auto text-yellow-400 font-rajdhani">
        <p className="text-xl font-semibold">Cargando información...</p>
      </div>
    );

  if (!user || !authorizedEmails.includes(user.email)) {
    return (
      <div className="max-w-3xl p-6 mx-auto font-rajdhani">
        <h2 className="text-2xl font-bold text-red-500">
          No estás autorizado para acceder a esta página.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl p-6 mx-auto text-mgsv-text bg-mgsv-bg font-rajdhani">
      <h1 className="mb-6 text-3xl font-bold text-yellow-400 drop-shadow-[0_0_12px_#FFD93B] uppercase tracking-widest">
        {editandoId ? "Editar producto" : "Cargar nuevo producto"}
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {[
          { name: "nombre", placeholder: "Nombre" },
          { name: "precio", placeholder: "Precio", type: "number" },
          { name: "stock", placeholder: "Stock", type: "number" },
          { name: "sabores", placeholder: "Sabores" },
          { name: "colores", placeholder: "Colores" },
          { name: "categoria", placeholder: "Categoría" },
        ].map(({ name, placeholder, type = "text" }) => (
          <input
            key={name}
            type={type}
            name={name}
            value={producto[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="p-2 placeholder-gray-500 border border-yellow-500 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required={name === "nombre" || name === "precio"}
            min={type === "number" ? "0" : undefined}
            step={type === "number" ? "0.01" : undefined}
          />
        ))}

        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="p-2 placeholder-gray-500 border border-yellow-500 rounded bg-mgsv-card text-mgsv-text focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows={4}
        />

        <input
          type="file"
          name="imagen"
          onChange={handleChange}
          accept="image/*"
          className="p-2 border border-yellow-500 rounded bg-mgsv-bg text-mgsv-text file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-400"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={subiendo}
            className="px-4 py-2 font-bold text-black bg-yellow-400 rounded hover:bg-yellow-300 disabled:opacity-50"
          >
            {subiendo ? "Guardando..." : editandoId ? "Actualizar producto" : "Cargar producto"}
          </button>

          {editandoId && (
            <button
              type="button"
              onClick={() => {
                setEditandoId(null);
                setProducto({
                  nombre: "",
                  descripcion: "",
                  precio: "",
                  stock: "",
                  sabores: "",
                  colores: "",
                  categoria: "",
                  imagen: null,
                });
              }}
              className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </form>

      <h2 className="mt-10 mb-4 text-2xl font-bold text-yellow-400">Productos existentes</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {productos.map((p) => (
          <div key={p.id} className="p-4 border border-yellow-600 rounded shadow bg-mgsv-card">
            <p className="font-semibold text-yellow-300">{p.nombre}</p>
            <p className="text-sm text-mgsv-text">{p.descripcion}</p>
            {p.fotos?.[0] && (
              <img
                src={p.fotos[0]}
                alt={p.nombre}
                className="object-cover w-full h-40 mt-2 rounded"
              />
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
