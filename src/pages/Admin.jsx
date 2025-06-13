import React from 'react';
import { MGSTheme } from '../theme/mgs-theme';

export default function Admin() {
  return (
    <div style={{
      padding: '20px',
      color: MGSTheme.colors.hud,
      fontFamily: MGSTheme.fonts.body,
      minHeight: '100vh'
    }}>
      <h2 style={{ color: MGSTheme.colors.diamond }}>
        [ BIG BOSS CONTROL PANEL ]
      </h2>
      
      <div style={{
        marginTop: '30px',
        border: `2px dashed ${MGSTheme.colors.hud}`,
        padding: '20px'
      }}>
        <h3>ADMINISTRACIÓN</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>• Gestionar productos</li>
          <li style={{ margin: '10px 0' }}>• Ver estadísticas</li>
          <li style={{ margin: '10px 0' }}>• Configurar sistema</li>
        </ul>
      </div>
    </div>
  );
}