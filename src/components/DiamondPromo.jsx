// src/components/DiamondPromo.jsx

import React from "react";

export default function DiamondPromo() {
  return (
    <section className="p-6 text-center text-black bg-yellow-400 rounded-lg shadow-md diamond-promo">
      <h2 className="mb-2 text-2xl font-bold">¡Promo exclusiva Diamond Dogs!</h2>
      <p className="text-lg">
        Aprovechá descuentos únicos y productos premium solo para clientes especiales.
      </p>
      <button className="px-4 py-2 mt-4 font-semibold text-yellow-400 transition bg-black rounded hover:bg-gray-800">
        Ver más
      </button>
    </section>
  );
}
