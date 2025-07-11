import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { X, ShoppingCart } from "lucide-react";
import { CartContext } from "../assets/context/CartContext";
import { useAuth } from "../assets/context/AuthContext";
import CartDrawer from "./CartDrawer";

export default function SidebarLeft({ isOpen, setIsOpen }) {
  const { carrito } = useContext(CartContext);
  const { user } = useAuth();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const adminEmail = "walterguillermopared@gmail.com"; // Tu mail de admin

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-yellow-300 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Encabezado con botón de cierre */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-yellow-400">
          <h2 className="text-xl font-bold">Diamond Dogs</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 transition rounded-full hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Cerrar menú"
          >
            <X size={28} className="text-yellow-400" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-3 p-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:underline">
            Inicio
          </Link>

          <Link to="/productos" onClick={() => setIsOpen(false)} className="hover:underline">
            Productos
          </Link>

          <Link
            to="/guia-del-recluta"
            onClick={() => setIsOpen(false)}
            className="font-semibold text-yellow-400 hover:underline"
          >
            Guía del Aspirante
          </Link>

          <Link
            to="/trakeo"
            onClick={() => setIsOpen(false)}
            className="hover:underline"
          >
            Seguimiento de Pedido
          </Link>

          {/* Secciones exclusivas para el admin */}
          {user?.email === adminEmail && (
            <>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="hover:underline">
                Panel Admin
              </Link>

              <Link to="/adminproductos" onClick={() => setIsOpen(false)} className="hover:underline">
                Cargar Productos
              </Link>

              <Link to="/pedidos" onClick={() => setIsOpen(false)} className="hover:underline">
                Pedidos
              </Link>
            </>
          )}

          {/* Botón carrito */}
          <button
            onClick={() => setMostrarCarrito(true)}
            className="relative flex items-center gap-2 px-3 py-2 mt-4 text-black bg-yellow-400 rounded hover:bg-yellow-300"
            aria-label="Abrir carrito"
          >
            <ShoppingCart size={20} />
            Carrito
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-black bg-red-400 rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>

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
