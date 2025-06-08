import React from 'react'

const Contacto = () => {
  return (
    <section className="max-w-3xl mx-auto mt-12 px-6 text-center">
      <h2 className="text-3xl font-extrabold text-[#C9B037] tracking-wider mb-4 uppercase">
        Comunicación Táctica
      </h2>
      <p className="text-[#a9b1aa] mb-10 italic">
        Enlace directo con el cuartel general de Diamond Dogs Ctes.
      </p>

      <div className="bg-[#2C3E2F] p-6 rounded-lg shadow-lg space-y-6 text-lg text-left">
        <div>
          <p className="text-[#C9B037] font-bold">📡 Canal Codificado - WhatsApp</p>
          <a
            href="https://wa.me/5493794123456"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a9ff60] hover:underline ml-2 block"
          >
            +54 9 379 412-3456
          </a>
        </div>

        <div>
          <p className="text-[#C9B037] font-bold">🛰️ Visual Recon - Instagram</p>
          <a
            href="https://instagram.com/diamonddogs.ctes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a9ff60] hover:underline ml-2 block"
          >
            @diamonddogs.ctes
          </a>
        </div>

        <div>
          <p className="text-[#C9B037] font-bold">📍 Base de Operaciones</p>
          <p className="text-[#cccccc] ml-2">Corrientes Capital, Argentina</p>
        </div>
      </div>
    </section>
  )
}

export default Contacto

