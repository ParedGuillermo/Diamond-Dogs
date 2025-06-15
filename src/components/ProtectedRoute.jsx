import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Cargando sesión...</p>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
