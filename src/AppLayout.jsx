import React from 'react'
import SideBarMenu from './components/SideBarMenur'
import BotonWalkie from './components/BotonWalkie'

export default function AppLayout({ children, user, onLogout }) {
  return (
    <div
      className="
        relative min-h-screen
        bg-[url('/military-bg.png')] bg-cover bg-fixed
        font-sans text-idroid
      "
    >
      {/* Fondo oscuro superpuesto */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar user={user} onLogout={onLogout} />
        <main className="flex-grow px-4 py-6">
          {children}
        </main>
      </div>

      {/* Botón flotante */}
      <BotonWalkie />
    </div>
  )
}
