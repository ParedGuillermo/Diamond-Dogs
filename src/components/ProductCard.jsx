import React from "react";

export default function ProductCard({ producto }) {
  if (!producto) return null;

  return (
    <div className="p-4 transition-all duration-300 border-2 rounded-lg shadow-md bg-mgsv-card border-mgsv-red text-mgsv-text w-72 hover:shadow-lg">
      <div className="mb-4">
        <div className="flex items-center justify-center w-full h-40 text-sm text-gray-500 bg-gray-800 rounded-md">
          {producto.fotoUrl ? (
            <img
              src={producto.fotoUrl}
              alt={producto.nombre}
              className="object-cover w-full h-40 rounded-md"
            />
          ) : (
            "Sin imagen"
          )}
        </div>
      </div>
      <h3 className="text-lg font-bold tracking-wide text-white font-stencil">
        {producto.nombre}
      </h3>
      <p className="mt-1 text-sm text-mgsv-text font-poppins">
        {producto.descripcion}
      </p>
      <p className="mt-2 font-bold text-md text-mgsv-red">
        Precio: ${Number(producto.precio).toFixed(2)}
      </p>
      <button className="w-full py-2 mt-4 font-bold text-black transition rounded bg-mgsv-red hover:bg-mgsv-red-hover">
        Ver producto
      </button>
    </div>
  );
}
