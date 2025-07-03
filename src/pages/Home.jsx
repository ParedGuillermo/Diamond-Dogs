import React, { useEffect, useState } from "react";
import { useAuth } from "../assets/context/AuthContext";
import RadarEffect from "../components/RadarEffect";
import logo from "../assets/images/logo-dd.png";
import { supabase } from "../supabaseClient";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import BannerSorteo from "../components/BannerSorteo";

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

      // Mezclar y mostrar 3 destacados
      const shuffled = productosConFoto.sort(() => 0.5 - Math.random());
      setProductos(shuffled.slice(0, 3));
      setLoading(false);
    }
    fetchProductos();
  }, []);

  function SocialLinks() {
    return (
      <section className="flex justify-center gap-10 mt-12 mb-10">
        <a
          href="https://www.instagram.com/diamond_dogs_ctes"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-yellow-400 transition hover:text-yellow-300"
        >
          <Instagram size={30} />
        </a>
        <a
          href="https://www.facebook.com/DiamondDogsCtes"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-yellow-400 transition hover:text-yellow-300"
        >
          <Facebook size={30} />
        </a>
        <a
          href="https://chat.whatsapp.com/LCCF0t611dPAVHnGH9G6xn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Comunidad WhatsApp"
          className="text-yellow-400 transition hover:text-yellow-300"
        >
          <MessageCircle size={30} />
        </a>
      </section>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-5 py-10 overflow-hidden select-none bg-mgsv-bg text-mgsv-text font-rajdhani">
      <div className="absolute inset-0 -z-10 opacity-10">
        <RadarEffect />
      </div>

      <header className="z-10 w-full max-w-xl text-center">
        <img
          src={logo}
          alt="Diamond Dogs Logo"
          className="mx-auto mb-5 w-20 drop-shadow-[0_0_10px_rgba(255,217,59,0.7)]"
        />

        <h1 className="text-4xl md:text-5xl font-anton text-mgsv-text drop-shadow-[0_0_8px_#FFD93B] mb-5 tracking-wide">
          DIAMOND DOGS Ctes
        </h1>

        <p className="mb-6 text-base md:text-lg text-[#e2e2c0] tracking-wide leading-relaxed">
          Tu arsenal premium de vapeo, con la modalidad más estratégica:{" "}
          productos listos para entrega inmediata y otros bajo pedido directo,{" "}
          para que siempre tengas la mejor opción y el mejor precio. Compra con
          total confianza y transparencia, inspirado en el modelo que
          revolucionó las compras online.
        </p>

        {user ? (
          <>
            <p className="mb-3 text-xs tracking-widest uppercase break-words">
              Operador activo:{" "}
              <span className="text-yellow-400">{user.email}</span>
            </p>
            <button
              onClick={signOut}
              className="px-6 py-2 text-sm font-bold tracking-wide text-black uppercase transition bg-yellow-400 border-2 border-yellow-400 rounded hover:bg-yellow-300 hover:shadow-lg"
            >
              Terminar misión
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => (window.location.href = "/productos")}
              className="mb-3 w-full md:w-auto px-8 py-2 text-black text-sm md:text-base font-bold tracking-wide uppercase bg-yellow-400 border-2 border-yellow-400 rounded hover:bg-yellow-300 hover:shadow-[0_0_12px_#FFD93B] transition"
            >
              Explorar el Arsenal
            </button>

            <button
              onClick={() => (window.location.href = "/guia-del-recluta")}
              className="w-full md:w-auto px-8 py-2 text-black text-sm md:text-base font-bold tracking-wide uppercase bg-yellow-400 border-2 border-yellow-400 rounded hover:bg-yellow-300 hover:shadow-[0_0_12px_#FFD93B] transition"
            >
              Manual del Aspirante
            </button>
          </>
        )}
      </header>

      {/* Banner del sorteo */}
      <BannerSorteo />

      <section className="z-10 w-full max-w-5xl mt-16">
        <h2 className="mb-5 text-2xl font-semibold tracking-wide text-center text-yellow-400 md:text-3xl">
          Productos Estrella para tu Táctica
        </h2>

        {loading ? (
          <p className="italic text-center text-gray-500">
            Cargando el mejor arsenal para vos...
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {productos.map((prod) => {
              const mensaje =
                prod.disponibilidad === "a_pedido"
                  ? `Hola! Quiero hacer un pedido del producto: ${prod.nombre}${
                      prod.sabores ? ` (sabor: ${prod.sabores})` : ""
                    }`
                  : `Hola! Quiero comprar el producto: ${prod.nombre}`;

              const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                mensaje
              )}`;

              return (
                <div
                  key={prod.id}
                  className="flex flex-col items-center p-3 transition-shadow border border-yellow-400 rounded-md shadow-md bg-mgsv-card hover:shadow-lg"
                >
                  {prod.fotoUrl && (
                    <img
                      src={prod.fotoUrl}
                      alt={prod.nombre}
                      className="object-cover w-full mb-2 border border-yellow-400 rounded-md h-36"
                    />
                  )}
                  <h3 className="w-full mb-1 text-lg font-semibold text-center text-yellow-300 truncate">
                    {prod.nombre}
                  </h3>
                  <p className="w-full mb-2 text-xs text-center text-gray-300 truncate">
                    {prod.descripcion || "Sin descripción"}
                  </p>
                  <p className="mb-3 text-lg font-bold text-yellow-400">${prod.precio}</p>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-3 py-1 text-sm font-semibold text-black uppercase transition bg-yellow-400 rounded hover:bg-yellow-300"
                  >
                    {prod.disponibilidad === "a_pedido"
                      ? "Hacer pedido"
                      : "Comprar Ahora"}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <SocialLinks />

      <footer className="fixed bottom-0 left-0 right-0 p-3 text-xs text-center text-[#888] bg-[#0a0a0a] border-t border-yellow-400 tracking-wide" />
    </div>
  );
}
