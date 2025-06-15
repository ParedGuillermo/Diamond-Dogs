import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#111] text-white px-6 py-12 text-sm">
      <div className="grid max-w-6xl grid-cols-2 gap-6 mx-auto md:grid-cols-5">
        {/* Columna 1: Idioma */}
        <div>
          <h4 className="mb-3 font-bold">Idioma</h4>
          <ul>
            <li>Español (AR)</li>
            <li>Inglés</li>
          </ul>
        </div>

        {/* Columna 2: Información */}
        <div>
          <h4 className="mb-3 font-bold">Información</h4>
          <ul>
            <li>Sobre nosotros</li>
            <li>Términos y condiciones</li>
            <li>Privacidad</li>
          </ul>
        </div>

        {/* Columna 3: Trabajá con nosotros */}
        <div>
          <h4 className="mb-3 font-bold">Trabajá con nosotros</h4>
          <ul>
            <li>Afiliados</li>
            <li>Colaboraciones</li>
          </ul>
        </div>

        {/* Columna 4: Soporte */}
        <div>
          <h4 className="mb-3 font-bold">Soporte</h4>
          <ul>
            <li>Contacto</li>
            <li>Preguntas Frecuentes</li>
            <li>Reportar problema</li>
          </ul>
        </div>

        {/* Columna 5: Descubrí */}
        <div>
          <h4 className="mb-3 font-bold">Descubrí</h4>
          <ul>
            <li>Productos destacados</li>
            <li>Misiones especiales</li>
            <li>Ranking de usuarios</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-xs text-center opacity-50">
        <p>© Diamond Dogs Ctes, 2025. Todos los derechos reservados.</p>
        <p className="mt-2">Versión <span className="underline cursor-pointer">escritorio</span></p>
      </div>
    </footer>
  );
};

export default Footer;
