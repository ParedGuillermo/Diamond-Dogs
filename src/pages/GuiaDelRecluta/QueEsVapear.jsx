import React from "react";
import { Link } from "react-router-dom";

export default function QueEsVapear() {
  return (
    <div className="max-w-4xl min-h-screen p-6 mx-auto text-white bg-black">
      <Link
        to="/guia-del-recluta"
        className="inline-block mb-6 text-yellow-400 hover:underline"
      >
        ← Volver a Guía del Recluta
      </Link>

      <h1 className="mb-6 text-4xl text-yellow-400 font-stencil">
        ¿Qué es vapear?
      </h1>

      <p className="mb-4 text-lg">
        Vapear es la acción de inhalar vapor producido por un dispositivo electrónico llamado vapeador o vaper. A diferencia del cigarrillo tradicional que quema tabaco, el vapeador calienta un líquido especial que genera vapor, evitando la combustión y gran parte de las sustancias tóxicas del humo.
      </p>

      <p className="mb-4 text-lg">
        Los líquidos para vapear, conocidos como e-líquidos, pueden contener diferentes concentraciones de nicotina, además de saborizantes y otras sustancias. Entre los tipos más comunes están las sales de nicotina y la base libre, cada una con características distintas en cuanto a sabor y absorción.
      </p>

      <p className="mb-4 text-lg">
        Vapear es considerado por muchos como una alternativa menos dañina que fumar cigarrillos, aunque no está exento de riesgos. Es importante informarse bien antes de empezar y elegir productos de calidad.
      </p>

      <p className="mb-4 text-lg italic font-semibold text-yellow-400">
        En resumen: vapear es inhalar vapor de líquidos con o sin nicotina, usando dispositivos electrónicos, y es diferente a fumar porque no hay combustión ni humo.
      </p>

      <p className="mb-6 text-lg">
        En esta guía vamos a ayudarte a entender todo lo necesario para empezar con el pie derecho y sin mandarte ninguna cagada.
      </p>

      <Link
        to="/guia-del-recluta/como-empezar"
        className="inline-block px-6 py-3 font-semibold text-black transition bg-yellow-400 rounded hover:bg-yellow-300"
      >
        Siguiente: Cómo empezar
      </Link>
    </div>
  );
}
