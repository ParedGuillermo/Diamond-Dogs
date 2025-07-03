import React, { useState, useEffect } from "react";

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft)
    return (
      <p className="font-bold tracking-wider text-center text-red-500 uppercase">
        ¡El sorteo Diamond Dogs ha finalizado!
      </p>
    );

  return (
    <p className="mt-1 font-mono text-xl tracking-widest text-center text-yellow-400">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </p>
  );
}

export default function BannerSorteo() {
  const cierreSorteo = new Date("2025-07-26T00:00:00");

  return (
    <section className="max-w-3xl p-4 mx-auto my-8 rounded-lg shadow-lg bg-gradient-to-r from-red-900 via-red-700 to-red-900">
      <h2 className="mb-3 text-2xl font-extrabold tracking-wide text-center text-white drop-shadow-lg">
        🎉 Sorteo Diamond Dogs 🎉
      </h2>
      <p className="max-w-xl mx-auto mb-4 text-sm font-semibold leading-snug tracking-wide text-center text-yellow-300">
        Registrate ahora y participá para ganar un{" "}
        <span className="font-bold text-yellow-400">Waka Blast 36000 puff</span>.
        <br />
        ¡No dejes pasar esta oportunidad! El sorteo cierra el{" "}
        <span className="italic underline">26 de julio de 2025</span>.
      </p>

      <Countdown targetDate={cierreSorteo} />

      <div className="flex justify-center mt-6">
        <a
          href="/login"
          className="px-6 py-2 text-sm font-bold tracking-wider text-black uppercase transition bg-yellow-400 rounded-full shadow-md hover:bg-yellow-500"
          aria-label="Registrarme y participar en el sorteo Diamond Dogs"
        >
          Registrarme y participar
        </a>
      </div>
    </section>
  );
}
