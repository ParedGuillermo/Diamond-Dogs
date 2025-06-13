import React from "react";
import { useNavigate } from "react-router-dom"; // IMPORT
import SoundOnHover from "./SoundOnHover";

const Home = () => {
  const navigate = useNavigate(); // hook para navegación

  const handleStartMission = () => {
    navigate("/loginregister"); // ruta a login/signup, ajustá según tu ruta real
  };

  return (
    <main
      className="relative min-h-screen text-[#c9b037] font-stencil tracking-widest px-6 py-32 flex flex-col justify-center items-center bg-no-repeat bg-center bg-repeat"
      style={{
        backgroundImage: "url('/images/snake_home.jpg')",
        filter: "brightness(0.9)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-75 pointer-events-none z-0"></div>

      <SoundOnHover>
        <section className="relative max-w-4xl text-center mb-20 z-10">
          <img
            src="/images/logo.png"
            alt="Logo Diamond Dogs"
            className="h-36 mx-auto mb-10 drop-shadow-[0_0_10px_rgba(201,176,55,0.8)] animate-fade-in-up"
          />
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 uppercase drop-shadow-[0_0_12px_rgba(201,176,55,0.9)] animate-fade-in-up-delay">
            Diamond Dogs
          </h1>
          <p className="text-lg sm:text-xl mb-4 text-[#f9f9d1] italic animate-fade-in-up-delay">
            Base Central: Corrientes, Argentina
          </p>
          <p className="text-md sm:text-lg mb-10 text-[#f9f9d1]">
            Equipando a los soldados del vapeo con{" "}
            <span className="text-[#c9b037] font-bold">
              arsenal de última generación
            </span>
            . Tecnología, estilo y precisión: tu próxima misión empieza acá. 🧪⚔️
          </p>
        </section>

        <section className="relative max-w-4xl text-center flex flex-col gap-y-12 z-10">
          <button
            onClick={handleStartMission} // asigno el evento
            className="bg-[#c9b037] text-[#0a0a0a] font-bold uppercase tracking-widest py-3 px-8 rounded-lg shadow-lg hover:bg-[#d0b94a] transition-colors duration-300 animate-fade-in-up"
          >
            Iniciar misión
          </button>
          <button className="border-2 border-[#c9b037] text-[#c9b037] font-bold uppercase tracking-widest py-3 px-8 rounded-lg shadow-lg hover:bg-[#c9b037] hover:text-[#0a0a0a] transition-colors duration-300 animate-fade-in-up-delay">
            Solicitar reabastecimiento
          </button>
        </section>
      </SoundOnHover>
    </main>
  );
};

export default Home;
