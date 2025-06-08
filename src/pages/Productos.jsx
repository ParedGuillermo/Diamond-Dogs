import React from 'react';

const productos = [
  {
    id: 1,
    nombre: "Vape X",
    descripcion: "Vape recargable con sabores intensos",
    precio: "$1500",
    imagen: "/img/vape1.jpg",
    sabores: ["Menta", "Frutilla"],
    colores: ["Negro", "Dorado"]
  },
  {
    id: 2,
    nombre: "Vape Y",
    descripcion: "Modelo compacto y elegante",
    precio: "$1200",
    imagen: "/img/vape2.jpg",
    sabores: ["Durazno", "Manzana"],
    colores: ["Blanco", "Azul"]
  }
];

const Productos = () => {
  const handleWhatsApp = (productoNombre) => {
    const phone = '5493718652061'; // reemplazá con tu número real
    const message = `Hola! Quiero comprar el producto: ${productoNombre}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="max-w-6xl mx-auto mt-12 px-6" id="productos">
      <h2 className="text-3xl font-extrabold text-[#C9B037] tracking-wider uppercase text-center mb-10">
        Arsenal de Productos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productos.map(producto => (
          <div
            key={producto.id}
            className="bg-[#2C3E2F] border border-[#C9B037] rounded-xl p-4 shadow-md text-white hover:scale-105 transition-transform duration-300"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-40 object-cover rounded-md mb-4 border border-gray-700"
            />
            <h3 className="text-xl font-bold text-[#C9B037]">{producto.nombre}</h3>
            <p className="text-sm text-gray-300 italic">{producto.descripcion}</p>
            <p className="mt-2 text-[#a9ff60] font-semibold">{producto.precio}</p>

            <ul className="text-sm text-gray-400 mt-2">
              {producto.sabores && (
                <li>
                  <span className="font-semibold text-white">Sabores:</span>{' '}
                  {producto.sabores.join(', ')}
                </li>
              )}
              {producto.colores && (
                <li>
                  <span className="font-semibold text-white">Colores:</span>{' '}
                  {producto.colores.join(', ')}
                </li>
              )}
            </ul>

            <button
              onClick={() => handleWhatsApp(producto.nombre)}
              className="mt-4 w-full bg-[#C9B037] text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
            >
              Añadir al arsenal
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Productos;
