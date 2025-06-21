import React from "react";
import { Link } from "react-router-dom";

export default function VapersIniciales() {
  return (
    <div className="max-w-4xl min-h-screen p-6 mx-auto text-white bg-black">
      <Link
        to="/guia-del-recluta"
        className="inline-block mb-6 text-yellow-400 hover:underline"
      >
        ← Volver a Guía del Recluta
      </Link>

      <h1 className="mb-6 text-4xl text-yellow-400 font-stencil">
        Vapers para principiantes
      </h1>

      <p className="mb-4 text-lg">
        Elegir un vaper para arrancar puede ser confuso con tanta variedad. Acá te contamos qué modelos y características buscar para no gastar de más ni perder tiempo.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Vape descartable</h2>
      <p className="mb-4 text-lg">
        Son los más fáciles para arrancar. Vienen listos para usar, no requieren mantenimiento y tienen duración limitada. Ideales para probar sin comprometerte.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Pod recargable</h2>
      <p className="mb-4 text-lg">
        Dispositivos compactos y recargables. Permiten cambiar líquidos y recargar batería. Buenos para quienes quieren un poco más de control sin complicarse.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Mods y kits avanzados (no recomendados para principiantes)</h2>
      <p className="mb-4 text-lg">
        Estos dispositivos ofrecen mucha potencia y personalización, pero requieren conocimientos para usarlos bien. No son recomendados para quienes están empezando.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Consejos para elegir</h2>
      <ul className="mb-6 list-disc list-inside">
        <li>Comprá en tiendas confiables como Diamond Dogs.</li>
        <li>Evita ofertas demasiado baratas que puedan ser truchos o inseguros.</li>
        <li>Empezá con dispositivos simples y de buena calidad.</li>
        <li>Consultá dudas en la comunidad o con expertos.</li>
      </ul>

      <Link
        to="/guia-del-recluta/errores-comunes"
        className="inline-block px-6 py-3 font-semibold text-black transition bg-yellow-400 rounded hover:bg-yellow-300"
      >
        Siguiente: Errores comunes
      </Link>
    </div>
  );
}
