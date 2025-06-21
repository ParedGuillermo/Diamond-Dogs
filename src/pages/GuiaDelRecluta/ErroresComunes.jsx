import React from "react";
import { Link } from "react-router-dom";

export default function ErroresComunes() {
  return (
    <div className="max-w-4xl min-h-screen p-6 mx-auto text-white bg-black">
      <Link
        to="/guia-del-recluta"
        className="inline-block mb-6 text-yellow-400 hover:underline"
      >
        ← Volver a Guía del Recluta
      </Link>

      <h1 className="mb-6 text-4xl text-yellow-400 font-stencil">
        Errores comunes
      </h1>

      <p className="mb-4 text-lg">
        Aunque el vapeo puede ser sencillo, hay algunos errores que suelen cometerse al arrancar. Evitarlos te va a hacer la experiencia mucho más disfrutable y segura.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Comprar productos dudosos</h2>
      <p className="mb-4 text-lg">
        No te dejes llevar por precios muy bajos o productos de dudosa procedencia. Comprar en tiendas confiables como Diamond Dogs es clave para cuidar tu salud y experiencia.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Usar nicotina en exceso</h2>
      <p className="mb-4 text-lg">
        Empezar con líquidos muy fuertes puede causar molestias y rechazo. Elegí concentraciones bajas si sos principiante y subí gradualmente si hace falta.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">No mantener el equipo limpio</h2>
      <p className="mb-4 text-lg">
        La limpieza regular del vapeador evita sabores desagradables y prolonga la vida útil del dispositivo.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">No informarse antes de usar</h2>
      <p className="mb-4 text-lg">
        Consultar con expertos, leer y aprender sobre el vapeo te va a evitar muchos dolores de cabeza.
      </p>

      <h2 className="mb-3 text-2xl font-semibold">Ignorar las normas sociales</h2>
      <p className="mb-4 text-lg">
        Respetá a quienes no quieren vapor cerca y usá el vapeo en lugares permitidos.
      </p>

      <Link
        to="/guia-del-recluta"
        className="inline-block px-6 py-3 font-semibold text-black transition bg-yellow-400 rounded hover:bg-yellow-300"
      >
        Volver a Guía del Recluta
      </Link>
    </div>
  );
}
