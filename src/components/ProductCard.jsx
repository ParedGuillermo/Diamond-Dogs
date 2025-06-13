import React from 'react';
import { MGSTheme } from '../theme/mgs-theme';
import { playSound } from '../assets/sounds/sounds';

export default function ProductCard({ product }) {
  return (
    <div style={{
      background: `linear-gradient(to bottom, ${MGSTheme.colors.camoDark}, ${MGSTheme.colors.bgDark})`,
      border: `1px solid ${MGSTheme.colors.diamond}`,
      borderRadius: '5px',
      padding: '15px',
      margin: '10px 0',
      color: MGSTheme.colors.text,
      fontFamily: MGSTheme.fonts.body
    }}>
      <h3 style={{
        color: MGSTheme.colors.diamond,
        borderBottom: `1px dashed ${MGSTheme.colors.hud}`,
        paddingBottom: '5px',
        fontSize: '18px'
      }}>
        {product.name.toUpperCase()}
      </h3>
      <img 
        src={product.thumbnail} 
        alt={product.name}
        style={{
          width: '100%',
          height: 'auto',
          border: `1px solid ${MGSTheme.colors.camoLight}`,
          margin: '10px 0'
        }}
      />
      <p style={{ margin: '8px 0' }}>
        <span style={{ color: MGSTheme.colors.hud }}>PRICE:</span> 
        <span style={{ color: MGSTheme.colors.diamond }}> ${product.price}</span>
      </p>
      <button
        style={{
          background: MGSTheme.colors.camoLight,
          color: 'white',
          border: 'none',
          padding: '10px',
          width: '100%',
          fontFamily: MGSTheme.fonts.heading,
          cursor: 'pointer'
        }}
        onClick={() => playSound('beep')}
        onMouseEnter={() => playSound('hover')}
      >
        [ ADD TO LOADOUT ]
      </button>
    </div>
  );
}