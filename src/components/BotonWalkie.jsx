import React, { useRef } from 'react';

export default function BotonWalkie() {
  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // El audio no pudo reproducirse sin interacción explícita del usuario
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/sounds/Beep.mp3" preload="auto" />
      <button
        onMouseEnter={playSound}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-green-600 hover:bg-green-400 transition-colors shadow-lg flex items-center justify-center text-white text-xl font-bold z-50"
        aria-label="Botón Walkie"
      >
        🗣️
      </button>
    </>
  );
}
