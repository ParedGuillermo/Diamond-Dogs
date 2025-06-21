import React from "react";
import { Link } from "react-router-dom";

export default function GuiaRecluta() {
  const temas = [
    {
      id: "que-es-vapear",
      titulo: "¿Qué es vapear?",
      resumen:
        "Todo lo que tenés que saber antes de tocar un vaper. Diferencias con el cigarrillo, tipos de líquidos y más.",
    },
    {
      id: "como-empezar",
      titulo: "Cómo empezar",
      resumen:
        "Equipos, líquidos y consejos para no mandarte cualquiera al arrancar en el mundo del vapeo.",
    },
    {
      id: "vapers-iniciales",
      titulo: "Vapers para principiantes",
      resumen:
        "Te contamos cuáles convienen (y cuáles no) para que no pierdas plata ni tiempo.",
    },
    {
      id: "errores-comunes",
      titulo: "Errores comunes",
      resumen:
        "Lo que nadie te dice pero todos hacen mal al empezar a vapear.",
    },
  ];

  return (
    <div className="min-h-screen p-6 text-white bg-black">
      <h1 className="mb-6 text-4xl text-yellow-400 font-stencil">
        Guía del Aspirante
      </h1>
      <p className="max-w-xl mb-12">
        Bienvenido al cuartel general del vapeo. Acá vas a encontrar todo lo que
        necesitás para arrancar y no mandarte ninguna reclutada.
      </p>

      <div className="grid max-w-5xl gap-8 md:grid-cols-2">
        {temas.map(({ id, titulo, resumen }) => (
          <div
            key={id}
            className="p-6 transition border-2 border-yellow-400 rounded-lg cursor-pointer hover:shadow-lg"
          >
            <h2 className="mb-4 text-2xl font-stencil">{titulo}</h2>
            <p className="mb-6">{resumen}</p>
            <Link
              to={`/guia-del-recluta/${id}`}
              className="inline-block px-4 py-2 font-semibold text-black transition bg-yellow-400 rounded hover:bg-yellow-300"
            >
              Leer más
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
