import React, { useState } from "react";
import NavbarMobile from "./NavbarMobile";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

export default function LayoutMobile({ children }) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
      {/* Header con botones para abrir menús */}
      <NavbarMobile setLeftOpen={setLeftOpen} setRightOpen={setRightOpen} />

      {/* Menú lateral izquierdo */}
      <SidebarLeft isOpen={leftOpen} setIsOpen={setLeftOpen} />

      {/* Menú lateral derecho */}
      <SidebarRight isOpen={rightOpen} setIsOpen={setRightOpen} />

      {/* Overlay para cerrar menús si se clickea afuera */}
      {(leftOpen || rightOpen) && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => {
            setLeftOpen(false);
            setRightOpen(false);
          }}
        />
      )}

      {/* Contenido principal con padding para header y footer */}
      <main className="flex-1 px-4 pt-12 pb-16 overflow-auto">{children}</main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 text-xs text-center text-gray-400 bg-gray-900 select-none">
        © 2025 Diamond Dogs. Todos los derechos reservados.
      </footer>
    </div>
  );
}
