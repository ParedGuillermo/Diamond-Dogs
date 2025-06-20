import React, { useContext, useState } from "react";
import { Menu, User, ShoppingCart } from "lucide-react";
import { CartContext } from "../assets/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function NavbarMobile({ setLeftOpen, setRightOpen }) {
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const { carrito } = useContext(CartContext);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 text-yellow-400 bg-black shadow-md">
        {/* Botón menú izquierdo */}
        <button
          onClick={() => setLeftOpen(true)}
          className="p-2 transition rounded hover:bg-yellow-400 hover:text-black"
          aria-label="Abrir menú principal"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg font-bold tracking-wider">Diamond Dogs</h1>

        {/* Íconos a la derecha */}
        <div className="flex items-center gap-3">
          {/* Carrito con contador */}
          <button
            onClick={() => setMostrarCarrito(true)}
            className="relative p-2 transition rounded hover:bg-yellow-400 hover:text-black"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                {totalItems}
              </span>
            )}
          </button>

          {/* Usuario */}
          <button
            onClick={() => setRightOpen(true)}
            className="p-2 transition rounded hover:bg-yellow-400 hover:text-black"
            aria-label="Abrir menú de usuario"
          >
            <User size={24} />
          </button>
        </div>
      </header>

      {/* Drawer del carrito */}
      {mostrarCarrito && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-grow bg-black bg-opacity-50"
            onClick={() => setMostrarCarrito(false)}
          />
          <CartDrawer onClose={() => setMostrarCarrito(false)} />
        </div>
      )}
    </>
  );
}
