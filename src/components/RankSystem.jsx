// src/components/RankSystem.jsx
import React from "react";

const rankData = [
  { level: 0, name: "Aspirante", description: "Sin registro", color: "gray-600" },
  { level: 1, name: "Soldado Raso", description: "Primeras misiones", color: "gray-500" },
  { level: 2, name: "Oficial", description: "Experiencia ganada", color: "green-500" },
  { level: 3, name: "Veterano", description: "Usuario leal", color: "green-600" },
  { level: 4, name: "Especialista", description: "Alta confianza", color: "yellow-500" },
  { level: 5, name: "Comandante", description: "Nivel de élite", color: "orange-500" },
  { level: 6, name: "Skulls", description: "Ultra exclusivos", color: "red-600" },
];

export default function RankSystem({ userLevel }) {
  const rank = rankData.find(r => r.level === userLevel) || rankData[0];

  return (
    <div className="p-4 rounded-lg shadow-lg bg-mgsv-card">
      <h2 className="text-xl tracking-wider text-white font-stencil">
        {rank.name}
      </h2>
      <p className={`text-${rank.color} text-sm font-semibold mt-2`}>
        {rank.description}
      </p>
      <div className="mt-3">
        <p className="font-medium text-mgsv-text">
          Puntos: <span className="text-white">{userLevel}</span>
        </p>
      </div>
    </div>
  );
}
