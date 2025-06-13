import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MGSTheme } from '../theme/mgs-theme';
import { playSound } from '../assets/sounds/sounds';

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    codename: ''
  });
  const [error, setError] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound('beep');
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.codename);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
      playSound('alert');
    }
  };

  return (
    <div style={{
      background: `linear-gradient(rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.9))`,
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: MGSTheme.fonts.body
    }}>
      <div style={{
        border: `2px solid ${MGSTheme.colors.diamond}`,
        borderRadius: '8px',
        padding: '30px',
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(42, 58, 47, 0.8)',
        boxShadow: `0 0 15px ${MGSTheme.colors.diamond}`
      }}>
        <h2 style={{
          color: MGSTheme.colors.hud,
          textAlign: 'center',
          marginBottom: '30px',
          borderBottom: `1px dashed ${MGSTheme.colors.diamond}`,
          paddingBottom: '10px'
        }}>
          {isLogin ? '[ ACCESO A MOTHER BASE ]' : '[ NUEVO RECLUTA ]'}
        </h2>

        {error && (
          <div style={{
            color: '#FF3333',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '1px solid #FF3333'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: MGSTheme.colors.hud,
              marginBottom: '8px'
            }}>
              FREQUENCY (EMAIL):
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={() => playSound('hover')}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: MGSTheme.colors.hud,
              marginBottom: '8px'
            }}>
              PASSWORD:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={() => playSound('hover')}
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: MGSTheme.colors.hud,
                marginBottom: '8px'
              }}>
                CODENAME:
              </label>
              <input
                type="text"
                name="codename"
                value={formData.codename}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={() => playSound('hover')}
              />
            </div>
          )}

          <button
            type="submit"
            style={{
              ...buttonStyle,
              backgroundColor: MGSTheme.colors.diamond
            }}
            onMouseEnter={() => playSound('hover')}
          >
            {isLogin ? '[ ACCEDER ]' : '[ REGISTRAR ]'}
          </button>
        </form>

        <button
          onClick={() => {
            playSound('beep');
            setIsLogin(!isLogin);
            setError('');
          }}
          style={{
            ...buttonStyle,
            marginTop: '15px',
            backgroundColor: 'transparent',
            border: `1px solid ${MGSTheme.colors.hud}`
          }}
          onMouseEnter={() => playSound('hover')}
        >
          {isLogin ? '[ ¿NUEVO RECLUTA? ]' : '[ ¿YA TIENES CUENTA? ]'}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  border: `1px solid ${MGSTheme.colors.hud}`,
  color: MGSTheme.colors.text,
  fontFamily: '"Courier New", monospace',
  borderRadius: '4px'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontFamily: '"Agency FB", sans-serif',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease'
};