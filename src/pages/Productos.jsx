import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { CartContext } from "../assets/context/CartContext";
import ProductModal from "../components/ProductModal";
import ProductCarousel from "../components/ProductCarousel";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todos");

  const { agregarAlCarrito } = useContext(CartContext);

  // Traer productos
  const fetchProductos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("productos").select("*");
    if (error) {
      console.error("Error trayendo productos:", error);
      setProductos([]);
      setLoading(false);
      return;
    }
    const productosConFoto = data.map((producto) => ({
      ...producto,
      fotoUrl: Array.isArray(producto.fotos) ? producto.fotos[0] : null,
    }));
    setProductos(productosConFoto);
    setLoading(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // Filtrar por búsqueda y categoría
  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "Todos" || producto.categoria === filtroCategoria;
    return coincideNombre && coincideCategoria;
  });

  // Categorías únicas para filtro
  const categoriasUnicas = [
    "Todos",
    ...new Set(productos.map((p) => p.categoria).filter(Boolean)),
  ];

  // Agrupar productos por categoría
  const productosPorCategoria = productosFiltrados.reduce((acc, prod) => {
    const cat = prod.categoria || "Sin categoría";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(prod);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl min-h-screen p-5 mx-auto font-rajdhani bg-mgsv-bg text-mgsv-text">
      <h1 className="mb-6 text-3xl font-extrabold tracking-widest uppercase text-yellow-400 border-b border-yellow-600 pb-3 text-center font-orbitron drop-shadow-[0_0_10px_#FFD93B]">
        Catálogo Táctico
      </h1>

      {/* Banner explicativo compacto y atractivo */}
      <div className="max-w-3xl p-3 mx-auto mb-6 text-sm font-semibold text-center text-yellow-300 bg-yellow-900 border border-yellow-600 rounded bg-opacity-20 md:text-base">
        <p>
          💥 Explora nuestro Catálogo Táctico: combinación única de productos en stock y pedidos especiales. 
          Variedad, calidad y precios justos sin cargar inventario pesado. <br />
          🚀 ¿Querés algo bajo pedido? Tocá "Hacer pedido" y coordinamos rápido vía WhatsApp.
        </p>
      </div>

      {/* Buscador y filtro */}
      <div className="flex flex-col gap-3 mb-6 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 bg-[#1a1a1a] border border-yellow-500 rounded text-yellow-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 bg-[#1a1a1a] border border-yellow-500 rounded text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          {categoriasUnicas.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Productos agrupados en carruseles */}
      {loading ? (
        <p className="text-center text-yellow-300">Cargando productos...</p>
      ) : productosFiltrados.length === 0 ? (
        <p className="text-center text-yellow-500">No se encontraron productos.</p>
      ) : (
        <>
          {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
            <ProductCarousel
              key={categoria}
              categoria={categoria}
              productos={productos}
              onSeleccionar={setProductoSeleccionado}
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}

          {productoSeleccionado && (
            <ProductModal
              producto={productoSeleccionado}
              onClose={() => setProductoSeleccionado(null)}
            />
          )}
        </>
      )}
    </div>
  );
}
