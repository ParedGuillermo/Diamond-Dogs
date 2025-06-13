import React, { useState, useEffect } from 'react';
import { supabase } from '../context/supabaseClient';
import ProductCard from '../components/ProductCard';
import { MGSTheme } from '../theme/mgs-theme';

export default function Vapers() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from('products')
        .select('*');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div style={{
      background: MGSTheme.colors.bgDark,
      minHeight: '100vh',
      padding: '20px 10px',
      color: MGSTheme.colors.text
    }}>
      <h2 style={{ 
        color: MGSTheme.colors.diamond,
        borderBottom: `2px dashed ${MGSTheme.colors.hud}`,
        paddingBottom: '10px',
        textAlign: 'center',
        fontFamily: MGSTheme.fonts.heading
      }}>
        [ VAPERS INVENTORY ]
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}