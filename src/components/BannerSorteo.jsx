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
    return <p className="font-bold text-center text-red-500">¡Sorteo finalizado!</p>;

  return (
    <p className="mt-2 font-mono text-2xl text-center text-yellow-400">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </p>
  );
}

export default function BannerSorteo() {
  const cierreSorteo = new Date("2025-07-26T00:00:00");

  return (
    <section className="max-w-4xl p-6 mx-auto my-12 rounded-lg shadow-lg bg-gradient-to-r from-red-900 via-red-700 to-red-900">
      <h2 className="mb-4 text-4xl font-bold text-center text-white">
        🎉 Sorteo Diamond Dogs 🎉
      </h2>
      <p className="max-w-xl mx-auto mb-4 text-lg tracking-wide text-center text-white">
        Registrate ahora y participá para ganar un{" "}
        <span className="font-semibold">Waka Blast 36000 puff</span>. ¡Solo hasta el 26 de julio de 2025!
      </p>
      <Countdown targetDate={cierreSorteo} />
      <div className="flex justify-center mt-6">
        <a
          href="/login"
          className="px-8 py-3 font-bold text-black transition bg-yellow-400 rounded-full hover:bg-yellow-500"
        >
          Registrarme y participar
        </a>
      </div>
    </section>
  );
}
