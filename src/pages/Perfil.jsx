import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Perfil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);

      try {
        // Obtener usuario autenticado
        const user = supabase.auth.user();
        if (!user) {
          setError('No hay usuario autenticado');
          setLoading(false);
          return;
        }

        // Traer datos del perfil extendido desde tabla 'profiles'
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setUserData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-green-400 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Perfil de Usuario</h1>
      <p><strong>Nombre:</strong> {userData?.full_name || 'No disponible'}</p>
      <p><strong>Email:</strong> {userData?.email || 'No disponible'}</p>
      <p><strong>Teléfono:</strong> {userData?.phone || 'No disponible'}</p>
    </div>
  );
}
