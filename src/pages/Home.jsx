import React from 'react';
import { MGSTheme } from '../theme/mgs-theme';
import IDroidMenu from '../components/IDroidMenu';
import logoDD from '../assets/images/logo-dd.png';

export default function Home() {
  return (
    <div style={{
      background: `linear-gradient(rgba(15, 15, 15, 0.9), rgba(15, 15, 15, 0.9)), url(${logoDD})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px',
      color: MGSTheme.colors.hud,
      fontFamily: MGSTheme.fonts.body
    }}>
      <img 
        src={logoDD} 
        alt="Diamond Dogs"
        style={{ 
          width: '80%', 
          maxWidth: '300px', 
          margin: '0 auto', 
          display: 'block',
          filter: 'drop-shadow(0 0 5px #FF8C00)'
        }}
      />
      
      <IDroidMenu />

      <div style={{
        backgroundColor: 'rgba(42, 58, 47, 0.7)',
        border: `2px solid ${MGSTheme.colors.diamond}`,
        marginTop: '30px',
        padding: '15px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        <p>STATUS: <span style={{ color: MGSTheme.colors.hud }}>ALL CLEAR</span></p>
        <p>VAPERS AVAILABLE: <span style={{ color: MGSTheme.colors.diamond }}>12 UNITS</span></p>
      </div>
    </div>
  );
}