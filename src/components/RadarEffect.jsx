import React from "react";

export default function RadarEffect() {
  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-black bg-opacity-50 rounded-full">
      {/* Círculos concéntricos */}
      <div className="absolute inset-0 border-2 rounded-full border-mgsv-green opacity-30"></div>
      <div className="absolute border-2 rounded-full inset-8 border-mgsv-green opacity-20"></div>
      <div className="absolute border-2 rounded-full inset-16 border-mgsv-green opacity-10"></div>

      {/* Barrido radar */}
      <div
        className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-mgsv-green/60 to-transparent"
        style={{
          animation: "radar-sweep 3s linear infinite",
          transformOrigin: "center center",
        }}
      />

      <style>{`
        @keyframes radar-sweep {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
