import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  const authorizedEmails = [
    "walterguillermopared@gmail.com",
  ];

  if (loading) {
    return <div className="p-6 text-yellow-400">Cargando acceso...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!authorizedEmails.includes(user.email)) {
    return (
      <div className="p-6 font-semibold text-red-500">
        No estás autorizado para ver esta sección.
      </div>
    );
  }

  // Autorizado
  return children;
}
