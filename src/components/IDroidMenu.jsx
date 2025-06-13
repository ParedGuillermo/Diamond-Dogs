import React from 'react';
import { useNavigate } from 'react-router-dom';
import { playSound } from '../assets/sounds/sounds';
import { MGSTheme } from '../theme/mgs-theme';

export default function IDroidMenu() {
  const navigate = useNavigate();
  const menuItems = [
    { name: 'MOTHER BASE', route: '/' },
    { name: 'VAPERS', route: '/vapers' },
    { name: 'CODEC', route: '/codec' }
  ];

  return (
    <div style={{
      background: 'rgba(42, 58, 47, 0.8)',
      border: `2px solid ${MGSTheme.colors.diamond}`,
      borderRadius: '8px',
      padding: '15px',
      margin: '20px auto',
      width: '90%',
      maxWidth: '400px'
    }}>
      {menuItems.map((item) => (
        <div
          key={item.name}
          style={{
            padding: '12px',
            margin: '8px 0',
            borderBottom: '1px dashed #FF8C00',
            color: MGSTheme.colors.text,
            fontFamily: MGSTheme.fonts.body,
            cursor: 'pointer'
          }}
          onClick={() => {
            playSound('beep');
            navigate(item.route);
          }}
          onMouseEnter={() => playSound('hover')}
        >
          <span style={{ color: MGSTheme.colors.diamond }}>■</span> {item.name}
        </div>
      ))}
    </div>
  );
}