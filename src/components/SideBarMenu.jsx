import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const SidebarMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false)

  const tabs = [
    { name: 'Mother Base', to: '/' },
    { name: 'Arsenal', to: '/productos' },
    { name: 'Codecs', to: '/contacto' },
    { name: 'Misión', to: '/nosotros' },
    { name: 'Big Boss', to: '/admin', requireAdmin: true },
    { name: 'Mi Perfil', to: '/perfil', requireAuth: true },
    { name: 'Iniciar Misión', to: '/loginregister', hideIfAuth: true },
  ]

  const closeMenu = () => setOpen(false)

  return (
    <>
      {/* Navbar con botón hamburguesa */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-sm z-50 border-b border-[#D96F1A] flex items-center justify-between px-4 py-3">
        <h1 className="text-[#D96F1A] font-stencil font-bold tracking-widest text-lg">
          Diamond Dogs
        </h1>

        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className="text-[#D96F1A] focus:outline-none"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black bg-opacity-95 backdrop-blur-md z-60 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#D96F1A]">
          <h2 className="text-[#D96F1A] font-stencil font-bold tracking-widest text-xl">
            Menú
          </h2>
          <button
            onClick={closeMenu}
            aria-label="Cerrar menú"
            className="text-[#D96F1A] focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-4 py-6 space-y-3">
          {tabs.map(({ name, to, requireAdmin, requireAuth, hideIfAuth }) => {
            if (requireAdmin && user?.role !== 'admin') return null
            if (requireAuth && !user) return null
            if (hideIfAuth && user) return null

            return (
              <NavLink
                key={to}
                to={to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `uppercase font-stencil font-semibold tracking-widest text-[#D96F1A] text-lg px-3 py-2 rounded transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#D96F1A] text-black shadow-[0_0_8px_#D96F1A]'
                      : 'hover:bg-[#D96F1A] hover:text-black'
                  }`
                }
              >
                {name}
              </NavLink>
            )
          })}

          {user && (
            <button
              onClick={() => {
                onLogout()
                closeMenu()
              }}
              className="mt-6 bg-[#D96F1A] text-black font-stencil font-semibold px-4 py-2 rounded shadow hover:brightness-110 transition duration-300"
              aria-label="Cerrar sesión"
            >
              Logout
            </button>
          )}
        </nav>
      </aside>
    </>
  )
}

export default SidebarMenu
