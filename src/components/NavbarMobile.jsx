import React from "react";
import { Menu, User } from "lucide-react";

export default function NavbarMobile({ setLeftOpen, setRightOpen }) {
  return (
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

      {/* Botón menú derecho (perfil) */}
      <button
        onClick={() => setRightOpen(true)}
        className="p-2 transition rounded hover:bg-yellow-400 hover:text-black"
        aria-label="Abrir menú de usuario"
      >
        <User size={24} />
      </button>
    </header>
  );
}
