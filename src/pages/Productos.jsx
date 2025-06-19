import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { CartContext } from "../assets/context/CartContext";
import ProductModal from "../components/ProductModal";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const { agregarAlCarrito } = useContext(CartContext);

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

  return (
    <div className="max-w-6xl min-h-screen p-6 mx-auto font-rajdhani bg-mgsv-bg text-mgsv-text">
      <h1 className="mb-8 text-4xl font-extrabold tracking-widest uppercase text-yellow-400 border-b border-yellow-600 pb-4 text-center font-orbitron drop-shadow-[0_0_10px_#FFD93B]">
        Catálogo Táctico
      </h1>

      {loading ? (
        <p className="text-center text-yellow-300">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-yellow-500">No se encontraron productos.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="p-4 transition-shadow border border-yellow-600 rounded-lg shadow-md cursor-pointer bg-mgsv-card hover:shadow-lg"
                onClick={() => setProductoSeleccionado(producto)}
              >
                {producto.fotoUrl && (
                  <img
                    src={producto.fotoUrl}
                    alt={producto.nombre}
                    className="object-cover w-full h-48 mb-4 border border-yellow-600 rounded"
                  />
                )}
                <h2 className="mb-2 text-xl font-bold tracking-wide text-yellow-300 uppercase">
                  {producto.nombre}
                </h2>
                <p className="mb-2 text-sm text-gray-300 whitespace-pre-line">
                  {producto.descripcion || "Sin descripción"}
                </p>
                <p className="font-bold text-yellow-400">
                  Precio: <span className="text-mgsv-text">${Number(producto.precio).toFixed(2)}</span>
                </p>
                <p className="text-sm text-gray-400">Stock: {producto.stock ?? 0}</p>
                <p className="mt-1 text-sm italic text-gray-500">
                  Categoría: {producto.categoria || "Sin categoría"}
                </p>
                <p className="mt-1 text-sm text-gray-500">Sabores: {producto.sabores || "N/A"}</p>
                <p className="mt-1 text-sm text-gray-500">Colores: {producto.colores || "N/A"}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    agregarAlCarrito(producto);
                  }}
                  className="w-full py-2 mt-4 font-bold tracking-wide text-black uppercase transition bg-yellow-400 rounded hover:bg-yellow-300"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>

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
