import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Ajustá ruta si hace falta

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  // Función para hacer login
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    if (data.user) {
      // Traer perfil
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        setErrorMsg('Error al obtener perfil');
        return;
      }

      if (profile.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/perfil');
      }
    }
  };

  // Función para registrar
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!nombre || !apellido) {
      setErrorMsg('Completa nombre y apellido');
      return;
    }
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    if (data.user) {
      // Crear perfil
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, nombres: nombre, apellidos: apellido, role: 'user' }]);
      if (profileError) {
        setErrorMsg('Error al crear perfil');
        return;
      }
      // Redirigir a perfil tras registro
      navigate('/perfil');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col justify-center px-6 py-16 text-[#c9b037] font-stencil tracking-widest">
      <div className="flex justify-center mb-6 gap-8">
        <button
          onClick={() => setIsLogin(true)}
          className={`px-4 py-2 font-bold border-b-4 ${
            isLogin ? 'border-[#c9b037]' : 'border-transparent opacity-60'
          } transition`}
        >
          Ingresar
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`px-4 py-2 font-bold border-b-4 ${
            !isLogin ? 'border-[#c9b037]' : 'border-transparent opacity-60'
          } transition`}
        >
          Registrarse
        </button>
      </div>

      {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}

      {isLogin ? (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-[#1a1a1a] text-[#c9b037] border border-[#c9b037]"
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-[#1a1a1a] text-[#c9b037] border border-[#c9b037]"
          />
          <button
            type="submit"
            className="bg-[#c9b037] text-[#0a0a0a] py-3 rounded font-bold hover:bg-[#d0b94a] transition"
          >
            Ingresar
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-3 rounded bg-[#1a1a1a] text-[#c9b037] border border-[#c9b037]"
          />
          <input
            type="text"
            placeholder="Apellido"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="p-3 rounded bg-[#1a1a1a] text-[#c9b037] border border-[#c9b037]"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-[#1a1a1a] text-[#c9b037] border border-[#c9b037]"
          />
          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-[#1a1a1a] text-[#c9b037] border border-[#c9b037]"
          />
          <button
            type="submit"
            className="bg-[#c9b037] text-[#0a0a0a] py-3 rounded font-bold hover:bg-[#d0b94a] transition"
          >
            Registrarse
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginRegister;
