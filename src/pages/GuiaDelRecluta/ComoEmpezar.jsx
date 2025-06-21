import React from "react";
import { Link } from "react-router-dom";

export default function ComoEmpezar() {
  return (
    <div className="max-w-4xl min-h-screen p-6 mx-auto text-white bg-black">
      <Link
        to="/guia-del-recluta"
        className="inline-block mb-6 text-yellow-400 hover:underline"
      >
        ← Volver a Guía del Recluta
      </Link>

      <h1 className="mb-6 text-4xl text-yellow-400 font-stencil">Cómo empezar</h1>

      <p className="mb-4 text-lg">
        Arrancar en el mundo del vapeo puede parecer complicado, pero no hace falta mandarse ninguna. Acá te contamos los básicos para que el primer contacto sea tranqui.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Elegí el equipo que más te sirva</h2>
      <p className="mb-4 text-lg">
        Si sos nuevo, te conviene arrancar con un <strong>vape descartable</strong> o un <strong>pod recargable</strong>. Los descartables son fáciles, vienen listos para usar y no necesitan mantenimiento. Los pods recargables permiten cambiar líquidos y suelen tener más potencia.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Entendé qué líquido vas a usar</h2>
      <p className="mb-4 text-lg">
        Hay líquidos con <em>sal de nicotina</em> y otros con <em>base libre</em>. Las sales penetran rápido y son para quienes buscan un golpe de nicotina más suave y rápido. La base libre tiene más vapor y sabor, ideal para usuarios con experiencia.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">No te mandes solo</h2>
      <p className="mb-4 text-lg">
        Preguntá a quien entienda, leé, consultá en lugares confiables. No compres cualquier cosa por moda o por precios bajos que te pueden cagar la experiencia o la salud.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Primeros pasos para vapear</h2>
      <p className="mb-4 text-lg">
        Aprendé a inhalar despacio, sin hacer fuerza, y no te asustes si toses al principio. No es como fumar un cigarro. Andá probando con paciencia.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Consejos de oro</h2>
      <ul className="mb-6 list-disc list-inside">
        <li>No fumes ni vapees en exceso.</li>
        <li>Mantené tus dispositivos limpios y cargados.</li>
        <li>Usá líquidos de calidad.</li>
        <li>Respetá espacios y personas que no quieren vapor cerca.</li>
      </ul>

      <Link
        to="/guia-del-recluta/vapers-iniciales"
        className="inline-block px-6 py-3 font-semibold text-black transition bg-yellow-400 rounded hover:bg-yellow-300"
      >
        Siguiente: Vapers para principiantes
      </Link>
    </div>
  );
}
