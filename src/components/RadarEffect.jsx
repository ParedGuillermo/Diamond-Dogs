import React from "react";

export default function RadarEffect() {
  return (
    <div className="relative w-48 h-48 rounded-full bg-gradient-radial from-green-900 via-transparent to-transparent opacity-40">
      {/* Líneas radiales minimalistas */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-green-600"
          style={{
            width: 2,
            height: "50%",
            top: "50%",
            left: "50%",
            transformOrigin: "bottom center",
            transform: `rotate(${(360 / 8) * i}deg) translateX(-1px) translateY(-50%)`,
            opacity: 0.2,
          }}
        />
      ))}

      {/* Barrido animado */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-green-500/30 to-transparent"
        style={{
          animation: "radar-sweep 8s linear infinite",
          transformOrigin: "center center",
        }}
      />

      <style>{`
        @keyframes radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
