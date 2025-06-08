import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-black border-b-2 border-yellow-400 flex justify-between items-center shadow-md relative z-10">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></span>
        <Link to="/" className="text-yellow-400 text-2xl font-stencil tracking-widest uppercase">
          Diamond Dogs
        </Link>
      </div>

      <ul className="flex gap-6 text-white text-lg font-stencil tracking-wide uppercase">
        <li className="relative group">
          <Link to="/productos" className="hover:text-yellow-400 transition duration-200">
            Productos
          </Link>
          <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </li>
        <li className="relative group">
          <Link to="/nosotros" className="hover:text-yellow-400 transition duration-200">
            Nosotros
          </Link>
          <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </li>
        <li className="relative group">
          <Link to="/contacto" className="hover:text-yellow-400 transition duration-200">
            Contacto
          </Link>
          <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </li>
        <li className="relative group">
          <Link to="/admin" className="hover:text-yellow-400 transition duration-200">
            Admin
          </Link>
          <div className="absolute left-0 -bottom-1 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar // ← ESTA LÍNEA ES CLAVE
