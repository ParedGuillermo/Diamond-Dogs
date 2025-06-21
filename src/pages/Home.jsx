import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import RadarEffect from "../components/RadarEffect";
import logo from "../assets/images/logo-dd.png";
import { supabase } from "../supabaseClient";

export default function Home() {
  const { user, signOut } = useAuth();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const whatsappNumber = "5493718652061";

  useEffect(() => {
    async function fetchProductos() {
      setLoading(true);
      const { data, error } = await supabase.from("productos").select("*");
      if (error) {
        console.error("Error cargando productos:", error);
        setLoading(false);
        return;
      }

      const productosConFoto = data.map((prod) => ({
        ...prod,
        fotoUrl: Array.isArray(prod.fotos) ? prod.fotos[0] : null,
      }));

      const shuffled = productosConFoto.sort(() => 0.5 - Math.random());
      setProductos(shuffled.slice(0, 3));
      setLoading(false);
    }

    fetchProductos();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-12 overflow-hidden select-none bg-mgsv-bg text-mgsv-text font-rajdhani">
      <div className="absolute inset-0 -z-10 opacity-10">
        <RadarEffect />
      </div>

      <header className="z-10 w-full max-w-xl text-center">
        <img
          src={logo}
          alt="Diamond Dogs Logo"
          className="mx-auto mb-6 w-24 drop-shadow-[0_0_12px_rgba(255,217,59,0.8)]"
        />

        <h1 className="text-5xl md:text-6xl font-anton text-mgsv-text drop-shadow-[0_0_10px_#FFD93B] mb-6 tracking-wide">
          DIAMOND DOGS Ctes
        </h1>

        <p className="mb-8 text-lg md:text-xl text-[#e2e2c0] tracking-wide">
          Equipá tu arsenal con tecnología de vapeo de precisión táctica.
          Convertite en un verdadero profesional del vapeo con estilo militar y sigilo total.
        </p>

        {user ? (
          <>
            <p className="mb-4 text-sm tracking-widest uppercase">
              Operador activo: <span className="text-yellow-400">{user.email}</span>
            </p>
            <button
              onClick={signOut}
              className="px-8 py-3 font-bold tracking-wider text-black uppercase transition bg-yellow-400 border-2 border-yellow-400 rounded hover:bg-yellow-300 hover:shadow-lg"
            >
              Terminar misión
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => (window.location.href = "/productos")}
              className="mb-3 px-10 py-3 text-black text-sm md:text-base font-bold tracking-wider uppercase bg-yellow-400 border-2 border-yellow-400 rounded hover:bg-yellow-300 hover:shadow-[0_0_14px_#FFD93B] transition"
            >
              Acceder al arsenal
            </button>

            <button
              onClick={() => (window.location.href = "/guia-del-recluta")}
              className="px-10 py-3 text-black text-sm md:text-base font-bold tracking-wider uppercase bg-yellow-400 border-2 border-yellow-400 rounded hover:bg-yellow-300 hover:shadow-[0_0_14px_#FFD93B] transition"
            >
              Instructivo para el Aspirante
            </button>
          </>
        )}
      </header>

      <section className="z-10 w-full max-w-5xl mt-20">
        <h2 className="mb-6 text-3xl font-semibold tracking-wide text-center text-yellow-400">
          Productos Destacados
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {productos.map((prod) => {
              const text = encodeURIComponent(`Hola! Quiero comprar el producto: ${prod.nombre}`);
              const waLink = `https://wa.me/${whatsappNumber}?text=${text}`;

              return (
                <div
                  key={prod.id}
                  className="flex flex-col items-center p-4 border border-yellow-400 rounded-lg shadow-lg bg-mgsv-card"
                >
                  {prod.fotoUrl && (
                    <img
                      src={prod.fotoUrl}
                      alt={prod.nombre}
                      className="object-cover w-full h-48 mb-3 border border-yellow-400 rounded-md"
                    />
                  )}
                  <h3 className="mb-1 text-lg font-bold text-yellow-300">{prod.nombre}</h3>
                  <p className="mb-2 text-sm text-center text-gray-300">{prod.descripcion}</p>
                  <p className="mb-4 text-lg font-semibold text-yellow-400">${prod.precio}</p>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 font-semibold text-black transition bg-yellow-400 rounded hover:bg-yellow-300"
                  >
                    Comprar Ahora
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <footer className="fixed bottom-0 left-0 right-0 p-3 text-xs text-center text-[#888] bg-[#0a0a0a] border-t border-yellow-400 tracking-wide">
        © 2025 Diamond Dogs. Todos los derechos reservados.
      </footer>
    </div>
  );
}
