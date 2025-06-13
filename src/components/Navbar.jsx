import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importa íconos de react-icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white p-4">
      {/* Botón para móviles */}
      <button 
        className="md:hidden text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú (visible en desktop, oculto en móviles hasta hacer clic) */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <ul className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          <li><a href="/" className="hover:text-yellow-400">Inicio</a></li>
          <li><a href="/products" className="hover:text-yellow-400">Productos</a></li>
        </ul>
      </div>
    </nav>
  );
}