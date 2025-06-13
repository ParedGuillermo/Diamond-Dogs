import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ucpsmyivlobcaayxvcjc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcHNteWl2bG9iY2FheXh2Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjMxNzEsImV4cCI6MjA2NDc5OTE3MX0.GDSAbpVbD9EA2o9rEdSpybJ5Wn4RlZ7k_UOaGmP79a0';

// Configuración mejorada del cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    storage: {
      getItem: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      },
      setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
      }
    }
  }
});

/**
 * Función de login mejorada con manejo de errores
 */
export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      // Limpiamos tokens potencialmente corruptos
      await supabase.auth.signOut();
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Función de logout mejorada con limpieza completa
 */
export const logout = async () => {
  try {
    // Limpieza progresiva
    await supabase.auth.signOut();
    
    // Limpiamos manualmente todos los items relacionados
    localStorage.removeItem('sb-auth-token');
    localStorage.removeItem('sb-ucpsmyivlobcaayxvcjc-auth-token');
    sessionStorage.removeItem('sb-auth-token');
    
    // Opcional: Limpiar solo items de Supabase sin afectar otros datos
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('sb-')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

/**
 * Verifica y refresca la sesión actual
 */
export const checkAndRefreshSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    if (!data.session) {
      await logout();
      return null;
    }
    
    return data.session;
  } catch (error) {
    await logout();
    return null;
  }
};