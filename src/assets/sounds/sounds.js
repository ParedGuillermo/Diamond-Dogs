import beepSound from './beep.ogg';
import alertSound from './alert.ogg';

export const playSound = (type) => {
  const sounds = {
    beep: beepSound,
    alert: alertSound,
    hover: beepSound
  };
  const audio = new Audio(sounds[type]);
  audio.volume = 0.3;
  audio.play().catch(e => console.log("Error de sonido:", e));
};