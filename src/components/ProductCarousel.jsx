import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ProductCarousel({
  categoria,
  productos,
  onSeleccionar,
  agregarAlCarrito,
}) {
  const [sliderRef] = useKeenSlider({
    loop: false,
    slides: {
      perView: 1.5,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.8 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4 },
      },
    },
  });

  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-bold tracking-wide text-yellow-300 uppercase border-b border-yellow-600">
        {categoria}
      </h2>
      <div ref={sliderRef} className="keen-slider">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="p-3 transition-shadow border border-yellow-600 rounded-md shadow-sm cursor-pointer keen-slider__slide bg-mgsv-card hover:shadow-md"
            onClick={() => onSeleccionar(producto)}
          >
            {producto.fotoUrl && (
              <img
                src={producto.fotoUrl}
                alt={producto.nombre}
                className="object-cover w-full mb-2 border border-yellow-600 rounded h-36"
              />
            )}
            <h2 className="mb-1 text-base font-semibold text-yellow-300 uppercase truncate">
              {producto.nombre}
            </h2>
            <p className="text-xs text-gray-400 truncate">Sabor: {producto.sabores || "N/A"}</p>
            <p className="text-xs text-gray-400 truncate">
              Categoría: {producto.categoria || "Sin categoría"}
            </p>
            <p className="mt-1 text-sm font-bold text-yellow-400">
              ${Number(producto.precio).toFixed(2)}
            </p>

            {producto.disponibilidad === "en_stock" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  agregarAlCarrito(producto);
                }}
                className="w-full py-1 mt-2 text-sm font-semibold text-black uppercase transition bg-yellow-400 rounded hover:bg-yellow-300"
              >
                Agregar
              </button>
            ) : (
              <a
                href={`https://wa.me/5493718652061?text=${encodeURIComponent(
                  `Hola, quiero hacer un pedido del producto: ${producto.nombre}.\nSabor: ${producto.sabores || "No especificado"}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block w-full py-1 mt-2 text-sm font-semibold text-center text-black uppercase transition bg-green-400 rounded hover:bg-green-300"
              >
                Pedir
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
