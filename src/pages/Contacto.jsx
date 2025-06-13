import React from 'react'
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa'

const Contacto = () => {
  return (
    <section className="max-w-3xl mx-auto mt-12 px-6 text-center">
      <h2 className="text-3xl font-extrabold text-[#C9B037] tracking-wider mb-4 uppercase">
        Comunicación Táctica
      </h2>
      <p className="text-[#a9b1aa] mb-10 italic">
        Enlace directo con el cuartel general de Diamond Dogs Ctes.
      </p>

      <div className="bg-[#2C3E2F] p-6 rounded-lg shadow-lg space-y-6 text-left text-lg">
        <div>
          <p className="text-[#C9B037] font-bold flex items-center">
            <FaWhatsapp className="mr-2 text-[#C9B037]" />
            Canal Codificado - WhatsApp
          </p>
          <a
            href="https://wa.me/5493794123456"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enlace a WhatsApp de Diamond Dogs Ctes"
            title="Contactar por WhatsApp"
            className="text-[#a9ff60] hover:underline ml-6 block transition-colors duration-200"
          >
            +54 9 379 412-3456
          </a>
        </div>

        <div>
          <p className="text-[#C9B037] font-bold flex items-center">
            <FaInstagram className="mr-2 text-[#C9B037]" />
            Visual Recon - Instagram
          </p>
          <a
            href="https://instagram.com/diamond_dogs_ctes"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enlace al Instagram de Diamond Dogs Ctes"
            title="Ver Instagram"
            className="text-[#a9ff60] hover:underline ml-6 block transition-colors duration-200"
          >
            @diamond_dogs_ctes
          </a>
        </div>

        <div>
          <p className="text-[#C9B037] font-bold flex items-center">
            <FaMapMarkerAlt className="mr-2 text-[#C9B037]" />
            Base de Operaciones
          </p>
          <p className="text-[#cccccc] ml-6">Corrientes Capital, Argentina</p>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-400 italic text-center">
        “Estamos listos para desplegarnos. Comunicate con el escuadrón.”
      </p>
    </section>
  )
}

export default Contacto
