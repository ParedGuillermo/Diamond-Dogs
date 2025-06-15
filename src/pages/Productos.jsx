import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);

  // Traer categorías únicas
  const fetchCategorias = async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("categoria");

    if (error) {
      console.error("Error trayendo categorías:", error);
    } else {
      // Categorías únicas usando Set para evitar duplicados
      const catsUnicos = [...new Set(data.map((item) => item.categoria))];
      setCategorias(catsUnicos);
    }
  };

  // Traer productos filtrados
  const fetchProductos = async () => {
    setLoading(true);

    let query = supabase.from("productos").select("*");

    if (categoriaSeleccionada) {
      query = query.eq("categoria", categoriaSeleccionada);
    }

    if (busqueda) {
      query = query.ilike("nombre", `%${busqueda}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error trayendo productos:", error);
    } else {
      setProductos(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [categoriaSeleccionada, busqueda]);

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Productos</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        {/* Select categorías */}
        <select
          className="p-2 border rounded"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Input búsqueda nombre */}
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          className="flex-grow p-2 border rounded"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Listado productos */}
      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="p-4 transition border rounded shadow hover:shadow-lg"
            >
              {producto.fotos && producto.fotos.length > 0 && (
                <img
                  src={producto.fotos[0]}
                  alt={producto.nombre}
                  className="object-cover w-full h-40 mb-4 rounded"
                />
              )}
              <h2 className="mb-2 text-xl font-semibold">{producto.nombre}</h2>
              <p className="mb-2 text-sm">{producto.descripcion}</p>
              <p className="mb-1 font-bold">${producto.precio.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Stock: {producto.stock}</p>
              <p className="mt-1 text-xs italic text-gray-600">
                Categoría: {producto.categoria}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
