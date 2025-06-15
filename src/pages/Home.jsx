import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import RadarEffect from "../components/RadarEffect";
import ProductCard from "../components/ProductCard";
import RankSystem from "../components/RankSystem";
import DiamondPromo from "../components/DiamondPromo";
import Footer from "../components/Footer";

import snakeImg from "../assets/images/snake.png";

export default function Home() {
  const { user, signOut, userData } = useAuth();
  const [showSnake, setShowSnake] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowSnake(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-mgsv-bg">
      {/* Contenedor para Radar e Imagen Snake lado a lado en desktop */}
      <div className="relative z-10 flex flex-col items-center justify-between w-full max-w-6xl px-4 md:flex-row">
        {/* Radar a la izquierda */}
        <div className="mb-8 w-72 h-72 md:w-96 md:h-96 md:mb-0">
          <RadarEffect />
        </div>

        {/* Imagen Snake a la derecha (solo desktop) */}
        {showSnake && (
          <img
            src={snakeImg}
            alt="Snake"
            className="hidden pointer-events-none select-none md:block w-72 md:w-96 opacity-15"
          />
        )}
      </div>

      {/* Hero principal */}
      <div className="relative z-10 w-full max-w-xl mt-10 text-center">
        <h1 className="text-4xl tracking-widest text-white font-stencil drop-shadow-md">
          Bienvenido a <span className="text-mgsv-red">Diamond Dogs</span>
        </h1>

        {user ? (
          <>
            <p className="mt-4 text-lg text-mgsv-text font-poppins">
              ¡Bienvenido, <span className="font-bold text-white">{user.email}</span>!
            </p>
            <button
              onClick={signOut}
              className="px-6 py-3 mt-4 font-bold text-white uppercase rounded shadow-md bg-mgsv-red hover:bg-mgsv-red-hover"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-6 py-3 mt-6 font-bold tracking-wide text-white uppercase rounded shadow-md bg-mgsv-red hover:bg-mgsv-red-hover"
          >
            Iniciar Misión
          </button>
        )}
      </div>

      {/* Productos */}
      <section className="z-10 flex flex-wrap justify-center w-full max-w-6xl gap-6 px-4 mt-12">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </section>

      {/* Rangos */}
      <div className="z-10 w-full max-w-md mt-16">
        <RankSystem userLevel={userData?.nivel || 0} />
      </div>

      {/* Promo */}
      <div className="z-10 w-full max-w-xl mt-16">
        <DiamondPromo />
      </div>

      {/* Footer */}
      <div className="z-10 w-full mt-20">
        <Footer />
      </div>
    </div>
  );
}
