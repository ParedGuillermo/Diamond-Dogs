import React, { useContext } from "react";
import { CartContext } from "../assets/context/CartContext"; // ajustá ruta si hace falta
import { ShoppingCart } from "lucide-react";

export default function CartIcon({ onClick }) {
  const { carrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-yellow-400 hover:text-yellow-300"
      aria-label="Abrir carrito"
    >
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-red-400 rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
}
