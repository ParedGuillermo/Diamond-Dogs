import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function SidebarLeft({ isOpen, setIsOpen }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-black text-yellow-300 z-40 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b border-yellow-400">
        <h2 className="text-xl font-bold">Diamond Dogs</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-yellow-400 transition hover:text-red-400"
          aria-label="Cerrar menú"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-3 p-4">
        <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">
          Inicio
        </Link>

        <Link to="/productos" onClick={() => setIsOpen(false)} className="hover:underline">
          Productos
        </Link>

        {/* Solo muestra Panel Admin si el usuario tiene email autorizado */}
        <Link to="/admin" onClick={() => setIsOpen(false)} className="hover:underline">
          Panel Admin
        </Link>
        
        <Link to="/adminproductos" onClick={() => setIsOpen(false)} className="hover:underline">
          Cargar Productos
        </Link>
      </nav>
    </div>
  );
}
