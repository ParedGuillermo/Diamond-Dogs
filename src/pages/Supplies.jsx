import React, { useState, useEffect } from 'react';
import { supabase } from '../context/supabaseClient';
import ProductCard from '../components/ProductCard';
import { MGSTheme } from '../theme/mgs-theme';

export default function Supplies() {
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
      color: MGSTheme.colors.hud
    }}>
      <h2 style={{ 
        borderBottom: '2px dashed #FF8C00',
        paddingBottom: '10px',
        textAlign: 'center'
      }}>
        [ ARSENAL INVENTORY ]
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px',
        marginTop: '20px'
      }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}