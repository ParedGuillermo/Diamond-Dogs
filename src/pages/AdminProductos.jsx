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
  const [subiendo, setSubiendo] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const { data, error } = await supabase.from("productos").select("*");
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

    const { error } = await supabase.storage.from("productos").upload(fileName, file);
    if (error) {
      console.error("Error subiendo imagen:", error);
      return null;
    }

    const { data: publicURL } = supabase.storage.from("productos").getPublicUrl(fileName);
    return publicURL.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubiendo(true);

    try {
      const imagenURL = await subirImagen();

      const { error } = await supabase.from("productos").insert([
        {
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: parseFloat(producto.precio),
          stock: parseInt(producto.stock),
          sabores: producto.sabores,
          colores: producto.colores,
          categoria: producto.categoria,
          fotos: imagenURL ? [imagenURL] : [],
        },
      ]);

      if (error) throw error;

      alert("Producto cargado con éxito");
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

      fetchProductos();
    } catch (error) {
      console.error("Error al cargar el producto:", error);
      alert("Error al cargar el producto");
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

  if (loading)
    return (
      <div className="max-w-3xl p-6 mx-auto">
        <p className="text-xl font-semibold text-yellow-400">Cargando información...</p>
      </div>
    );

  if (!user || !authorizedEmails.includes(user.email)) {
    return (
      <div className="max-w-3xl p-6 mx-auto">
        <h2 className="text-2xl font-bold text-red-500">
          No estás autorizado para acceder a esta página.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-yellow-400">Cargar nuevo producto</h1>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="p-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded"
          required
        />

        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="p-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded"
          rows={4}
        />

        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          placeholder="Precio"
          className="p-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded"
          required
          min="0"
          step="0.01"
        />

        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="p-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded"
          min="0"
        />

        <input
          type="text"
          name="sabores"
          value={producto.sabores}
          onChange={handleChange}
          placeholder="Sabores"
          className="p-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded"
        />

        <input
          type="text"
          name="colores"
          value={producto.colores}
          onChange={handleChange}
          placeholder="Colores"
          className="p-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded"
        />

        <input
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          className="p-2 text-black placeholder-gray-400 bg-white border border-gray-300 rounded"
        />

        <input
          type="file"
          name="imagen"
          onChange={handleChange}
          accept="image/*"
          className="p-2 text-black bg-white border border-gray-300 rounded"
        />

        <button
          type="submit"
          disabled={subiendo}
          className="px-4 py-2 font-bold text-black bg-yellow-400 rounded hover:bg-yellow-300 disabled:opacity-50"
        >
          {subiendo ? "Subiendo..." : "Cargar producto"}
        </button>
      </form>

      <h2 className="mt-10 mb-4 text-2xl font-bold">Productos existentes</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {productos.map((p) => (
          <div key={p.id} className="p-4 bg-white border rounded shadow">
            <p className="font-semibold text-black">{p.nombre}</p>
            <p className="text-sm text-gray-700">{p.descripcion}</p>
            {p.fotos?.[0] && (
              <img
                src={p.fotos[0]}
                alt={p.nombre}
                className="object-cover w-full h-40 mt-2 rounded"
              />
            )}
            <button
              onClick={() => handleDelete(p.id)}
              className="px-3 py-1 mt-4 text-sm font-bold text-white bg-red-500 rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
