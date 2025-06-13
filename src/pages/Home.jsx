import React from "react";
import { useNavigate } from "react-router-dom";
import SoundOnHover from "./SoundOnHover";

const Home = () => {
  const navigate = useNavigate();

  const handleStartMission = () => {
    navigate("/loginregister");
  };

  return (
    <main
      className="relative min-h-screen px-6 py-24 flex flex-col justify-center items-center bg-cover bg-center text-mgsv-text font-poppins"
      style={{
        backgroundImage: "url('/images/snake_home.jpg')",
        filter: "brightness(0.4)",
      }}
    >
      {/* Capa oscura y ruido tipo scan */}
      <div className="absolute inset-0 bg-black opacity-80 z-0" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[url('/images/noise.png')] opacity-10" />

      <SoundOnHover>
        <section className="relative max-w-2xl text-center z-20 space-y-6">
          <img
            src="/images/logo.png"
            alt="Logo Diamond Dogs"
            className="h-28 mx-auto animate-fade-in-up"
          />

          <h1
            className="text-4xl sm:text-5xl font-anton uppercase text-mgsv-red tracking-widest animate-fade-in-up"
            style={{
              animation: "glitchFlicker 3s infinite alternate",
            }}
          >
            DIAMOND DOGS
          </h1>

          <p className="text-sm sm:text-base text-center text-gray-400 animate-fade-in-up">
            Base Central: Corrientes, Argentina
          </p>

          <p className="text-sm sm:text-base text-center text-mgsv-text leading-relaxed animate-fade-in-up">
            Arsenal táctico de vapeo:{" "}
            <span className="text-mgsv-red font-semibold">
              tecnología y precisión para tu próxima misión
            </span>
            . No es un hábito, es estrategia. 🧪⚔️
          </p>
        </section>

        <section className="relative z-20 mt-10 space-y-4 w-full max-w-sm">
          <button
            onClick={handleStartMission}
            className="w-full bg-mgsv-red hover:bg-mgsv-red-hover text-white py-3 rounded shadow-md uppercase tracking-wider transition duration-300"
          >
            Iniciar misión
          </button>

          <button className="w-full border border-mgsv-green text-mgsv-green bg-transparent py-3 rounded uppercase tracking-wider hover:bg-[#111] transition duration-300">
            Solicitar reabastecimiento
          </button>
        </section>
      </SoundOnHover>

      {/* Animaciones MGSV */}
      <style>
        {`
          @keyframes glitchFlicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
              text-shadow:
                0 0 4px #7a0000,
                0 0 10px #7a0000;
            }
            20%, 22%, 24%, 55% {
              text-shadow: none;
            }
          }

          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease forwards;
          }
        `}
      </style>
    </main>
  );
};

export default Home;
