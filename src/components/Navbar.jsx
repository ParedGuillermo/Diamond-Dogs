import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ user, onLogout }) => {
  const tabs = [
    { name: 'Mother Base', to: '/' },
    { name: 'Arsenal', to: '/productos' },
    { name: 'Codecs', to: '/contacto' },
    { name: 'Misión', to: '/nosotros' },
    { name: 'Big Boss', to: '/admin', requireAdmin: true },
    { name: 'Mi Perfil', to: '/perfil', requireAuth: true },
    { name: 'Iniciar Misión', to: '/loginregister', hideIfAuth: true },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-sm z-50 border-b border-[#D96F1A]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Navigation Links */}
        <div className="flex flex-1 justify-center gap-2 sm:gap-4">
          {tabs.map(({ name, to, requireAdmin, requireAuth, hideIfAuth }) => {
            if (requireAdmin && user?.role !== 'admin') return null
            if (requireAuth && !user) return null
            if (hideIfAuth && user) return null

            return (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `uppercase font-stencil font-semibold tracking-widest text-sm sm:text-base px-3 py-2 rounded transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#D96F1A] text-black shadow-[0_0_8px_#D96F1A]'
                      : 'text-[#D96F1A] hover:bg-[#D96F1A] hover:text-black'
                  }`
                }
              >
                {name}
              </NavLink>
            )
          })}
        </div>

        {/* Logout Button */}
        {user && (
          <button
            onClick={onLogout}
            className="ml-4 bg-[#D96F1A] text-black font-stencil font-semibold px-4 py-2 rounded shadow hover:brightness-110 transition duration-300"
            aria-label="Cerrar sesión"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
