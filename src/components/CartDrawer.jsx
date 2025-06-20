import React, { useContext } from "react";
import { CartContext } from "../assets/context/CartContext";

const whatsappNumber = "5493718652061";

export default function CartDrawer({ onClose }) {
  const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  const mensajeWhatsapp = carrito.length
    ? encodeURIComponent(
        carrito
          .map((item) => `- ${item.nombre} x${item.cantidad}`)
          .join("\n") + "\n\n¡Hola! Quiero hacer un pedido."
      )
    : "";

  const waLink = `https://wa.me/${whatsappNumber}?text=${mensajeWhatsapp}`;

  return (
    <div className="bg-black w-80 h-full p-6 shadow-lg flex flex-col text-[#FFF3DC] border-l-4 border-[#FFD93B]">
      <h2 className="mb-6 font-mono text-2xl font-extrabold tracking-widest uppercase text-[#FFD93B]">
        Carrito
      </h2>

      {carrito.length === 0 ? (
        <p className="italic text-[#7A7A7A]">Tu inventario está vacío</p>
      ) : (
        <>
          <ul className="flex-grow space-y-4 overflow-auto scrollbar-thin scrollbar-thumb-[#F4A259]/70 scrollbar-track-black">
            {carrito.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b border-[#F4A259] pb-2"
              >
                <div>
                  <p className="font-semibold uppercase">{item.nombre}</p>
                  <p className="text-sm text-[#3A5A40]">x {item.cantidad}</p>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="text-lg font-bold text-[#F4A259] hover:text-[#FFD93B]"
                  aria-label={`Eliminar ${item.nombre} del carrito`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={vaciarCarrito}
            className="mt-6 w-full py-2 bg-[#F4A259] hover:bg-[#FFD93B] rounded font-semibold tracking-wide transition-colors text-black"
          >
            Vaciar inventario
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-4 w-full py-3 rounded font-extrabold tracking-wide text-center
            ${carrito.length ? "bg-[#FFD93B] hover:bg-[#F4A259] text-black" : "bg-gray-700 cursor-not-allowed text-gray-500 pointer-events-none"}`}
            aria-disabled={carrito.length === 0}
          >
            Comprar
          </a>
        </>
      )}

      <button
        onClick={onClose}
        className="mt-6 text-[#3A5A40] hover:text-[#FFD93B] underline self-start font-mono"
      >
        Cerrar
      </button>
    </div>
  );
}
