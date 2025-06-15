import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const emailAutorizado = "walterguillermopared@gmail.com";

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
    setMenuOpen(false);
  };

  useEffect(() => {
    if (!loading) {
      console.log("Navbar -> user:", user);
    }
  }, [loading, user]);

  return (
    <>
      {/* Botón hamburguesa fijo arriba a la izquierda */}
      <div className="fixed z-50 top-4 left-4">
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 text-yellow-400 transition bg-black rounded-md hover:bg-yellow-400 hover:text-black"
          aria-label="Abrir menú"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menú deslizable */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-black text-yellow-300 z-40 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-yellow-400">
          <h2 className="text-xl font-bold">Diamond Dogs</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-yellow-400 transition hover:text-red-400"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        {!loading ? (
          <nav className="flex flex-col gap-3 p-4">
            <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline">
              Inicio
            </Link>

            <Link to="/productos" onClick={() => setMenuOpen(false)} className="hover:underline">
              Productos
            </Link>

            {/* Sólo muestra Panel Admin si email autorizado */}
            {user?.email === emailAutorizado && (
              <>
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="hover:underline">
                  Panel Admin
                </Link>

                <Link to="/adminproductos" onClick={() => setMenuOpen(false)} className="hover:underline">
                  Cargar Productos
                </Link>
              </>
            )}

            {user ? (
              <>
                <span className="px-2 text-sm text-yellow-500">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 mt-4 text-black bg-yellow-400 rounded hover:bg-yellow-300"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:underline">
                Iniciar sesión
              </Link>
            )}
          </nav>
        ) : (
          <div className="p-4 text-yellow-400">Cargando menú...</div>
        )}
      </div>

      {/* Fondo semi-transparente cuando el menú está abierto */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
