import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../assets/context/AuthContext";

export default function SidebarRight({ isOpen, setIsOpen }) {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
    setIsOpen(false);
  };

  const handleVerPerfil = () => {
    navigate("/mi-perfil");
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-black text-yellow-300 z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Encabezado con botón cerrar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-yellow-400">
        <h2 className="text-xl font-bold">Mi Perfil</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 transition rounded-full hover:text-red-400 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          aria-label="Cerrar menú"
        >
          <X size={28} className="text-yellow-400" />
        </button>
      </div>

      {/* Contenido */}
      {!loading ? (
        <div className="flex flex-col gap-4 p-4">
          {user ? (
            <>
              <span className="text-sm text-yellow-500">
                Sesión: {user.email}
              </span>

              <button
                onClick={handleVerPerfil}
                className="px-4 py-2 text-black bg-yellow-400 rounded hover:bg-yellow-300"
              >
                Ver Perfil
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 mt-1 text-black bg-yellow-400 rounded hover:bg-yellow-300"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-center text-black bg-yellow-400 rounded hover:bg-yellow-300"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      ) : (
        <div className="p-4">Cargando usuario...</div>
      )}
    </div>
  );
}
