import React from "react";

export default function ProductModal({ producto, onClose }) {
  if (!producto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      onClick={onClose}
    >
      <div
        className="bg-[#1A1A1A] max-w-xl w-full p-6 rounded shadow-lg overflow-auto max-h-[80vh] border-l-4 border-yellow-400"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-3xl font-extrabold tracking-widest uppercase font-rajdhani text-yellow-400 drop-shadow-[0_0_10px_#FFD93B]">
          {producto.nombre}
        </h2>

        <div className="flex mb-6 space-x-3 overflow-x-auto">
          {producto.fotos && producto.fotos.length > 0 ? (
            producto.fotos.map((foto, idx) => (
              <img
                key={idx}
                src={foto}
                alt={`${producto.nombre} foto ${idx + 1}`}
                className="object-cover border border-yellow-400 rounded w-28 h-28"
              />
            ))
          ) : (
            <div className="flex items-center justify-center text-yellow-200 bg-yellow-600 rounded w-28 h-28 font-rajdhani">
              Sin imagen
            </div>
          )}
        </div>

        <p className="mb-4 text-gray-300 whitespace-pre-line font-rajdhani">
          {producto.descripcion}
        </p>

        <p className="mb-2 text-lg font-bold text-yellow-400 font-rajdhani">
          Precio: <span className="text-gray-100">${Number(producto.precio).toFixed(2)}</span>
        </p>
        <p className="mb-2 text-yellow-300 font-rajdhani">
          Stock: <span className="text-gray-300">{producto.stock ?? 0}</span>
        </p>
        <p className="mb-2 text-yellow-300 font-rajdhani">
          Categoría: <span className="text-gray-300">{producto.categoria || "Sin categoría"}</span>
        </p>
        <p className="mb-2 text-yellow-300 font-rajdhani">
          Sabores: <span className="text-gray-300">{producto.sabores || "N/A"}</span>
        </p>
        <p className="mb-4 text-yellow-300 font-rajdhani">
          Colores: <span className="text-gray-300">{producto.colores || "N/A"}</span>
        </p>

        <button
          onClick={onClose}
          className="px-6 py-2 mt-4 tracking-wide text-black transition-colors bg-yellow-400 rounded hover:bg-yellow-300 font-rajdhani"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
