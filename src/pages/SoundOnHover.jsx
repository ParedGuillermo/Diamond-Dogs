import React, { useRef, useEffect } from 'react';

const SoundOnHover = ({ children }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Ajuste de volumen y compatibilidad
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        // En algunos navegadores el audio requiere interacción del usuario
        console.warn("No se pudo reproducir el sonido:", err);
      });
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/sounds/Beep.mp3" preload="auto" />
      <div onMouseEnter={playSound}>
        {children}
      </div>
    </>
  );
};

export default SoundOnHover;
