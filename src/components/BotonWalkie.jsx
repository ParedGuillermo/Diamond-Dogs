import React from 'react';
import useSound from '../pages/SoundOnHover'; // Asegurate que este hook esté bien exportado y funcionando

export default function BotonWalkie() {
  const [play] = useSound('/sounds/Beep.mp3');

  return (
    <button
      onMouseEnter={play}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-600 hover:bg-green-400 transition-colors shadow-lg flex items-center justify-center text-white text-xl font-bold z-50"
      aria-label="Botón Walkie"
    >
      🗣️
    </button>
  );
}
