// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard() {
  return (
    <div className="p-4 transition-all duration-300 border-2 rounded-lg shadow-md bg-mgsv-card border-mgsv-red text-mgsv-text w-72 hover:shadow-lg">
      <div className="mb-4">
        <div className="flex items-center justify-center w-full h-40 text-sm text-gray-500 bg-gray-800 rounded-md">
          Imagen del producto
        </div>
      </div>
      <h3 className="text-lg font-bold tracking-wide text-white font-stencil">
        VAPE GX-9
      </h3>
      <p className="mt-1 text-sm text-mgsv-text font-poppins">
        Potente, duradero y edición táctica limitada.
      </p>
      <p className="mt-2 font-bold text-md text-mgsv-red">Precio: $12.000</p>
      <button className="w-full py-2 mt-4 font-bold text-black transition rounded bg-mgsv-red hover:bg-mgsv-red-hover">
        Ver más
      </button>
    </div>
  );
}
