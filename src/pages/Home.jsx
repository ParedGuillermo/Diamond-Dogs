import React from 'react';
import { Link } from 'react-router-dom'; // por si usás rutas

const Home = () => {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-black">
      {/* Fondo con camuflaje y capa oscura */}
      <div className="absolute inset-0 bg-[url('/camuflaje.png')] bg-cover opacity-10 z-0" />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Contenido */}
      <div className="relative z-10 max-w-3xl animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 tracking-widest mb-4 font-stencil">
          BIENVENIDOS A DIAMOND DOGS CTES
        </h2>
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          Desde la base en Corrientes, te equipamos con la mejor tecnología de vapeo para tus misiones diarias. 🧪⚔️
        </p>

        <Link
          to="/productos"
          className="inline-block bg-yellow-400 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition"
        >
          Ver Arsenal
        </Link>
      </div>

      {/* Tarjetas tácticas */}
      <div className="relative z-10 mt-14 flex flex-wrap justify-center gap-8 max-w-5xl animate-fade-in-up-delay">
        {[
          {
            titulo: "Vape Gear",
            texto: "Equipamiento descartable y recargable para misiones prolongadas.",
          },
          {
            titulo: "Soporte táctico",
            texto: "Siempre listos para cubrir tus necesidades en el campo.",
          },
          {
            titulo: "Reabastecimiento rápido",
            texto: "Envíos express en Corrientes y alrededores.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-[#2e3b2f] border border-gray-700 hover:border-yellow-400 p-6 rounded-xl shadow-lg w-72 transition-all"
          >
            <h3 className="text-white font-semibold text-xl mb-2">{item.titulo}</h3>
            <p className="text-sm text-gray-400">{item.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
