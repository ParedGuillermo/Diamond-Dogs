import React from 'react';
import { MGSTheme } from '../theme/mgs-theme';
import { playSound } from '../assets/sounds/sounds';

export default function Codec() {
  return (
    <div style={{
      background: 'black',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: MGSTheme.fonts.body,
      color: MGSTheme.colors.hud
    }}>
      <div style={{
        border: `1px solid ${MGSTheme.colors.hud}`,
        padding: '20px',
        height: '70vh',
        overflow: 'hidden'
      }}>
        <h2 style={{ color: MGSTheme.colors.diamond }}>{'>_ CODEC CHANNEL'}</h2>
        
        <p style={{ animation: 'blink 1s infinite' }}>
          FREQ: 140.85 | ENCRYPTION: XOF
        </p>

        <div style={{ marginTop: '30px' }}>
          <input 
            type="text" 
            placeholder="CODENAME" 
            style={inputStyle}
            onFocus={() => playSound('beep')}
          />
          <input 
            type="email" 
            placeholder="FREQUENCY (EMAIL)" 
            style={inputStyle}
            onFocus={() => playSound('beep')}
          />
          <textarea 
            placeholder="MESSAGE" 
            style={{ ...inputStyle, height: '100px' }}
            onFocus={() => playSound('beep')}
          />
          <button 
            style={buttonStyle}
            onClick={() => playSound('alert')}
            onMouseEnter={() => playSound('hover')}
          >
            [ SEND ]
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  background: 'transparent',
  border: `1px solid ${MGSTheme.colors.hud}`,
  color: MGSTheme.colors.text,
  fontFamily: MGSTheme.fonts.body
};

const buttonStyle = {
  background: MGSTheme.colors.camoDark,
  color: 'white',
  border: 'none',
  padding: '12px',
  width: '100%',
  marginTop: '10px',
  cursor: 'pointer',
  fontFamily: MGSTheme.fonts.heading
};