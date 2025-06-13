import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useCart } from '../context/CartContext' // Importamos el hook

const supabaseUrl = 'https://ucpsmyivlobcaayxvcjc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcHNteWl2bG9iY2FheXh2Y2pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMjMxNzEsImV4cCI6MjA2NDc5OTE3MX0.GDSAbpVbD9EA2o9rEdSpybJ5Wn4RlZ7k_UOaGmP79a0'

const supabase = createClient(supabaseUrl, supabaseKey)

const Productos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  const { addToCart } = useCart() // Usamos el hook

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('productos').select('*')

      if (error) {
        console.error('Error trayendo productos:', error)
      } else {
        setProductos(data)
      }
      setLoading(false)
    }

    fetchProductos()
  }, [])

  const handleWhatsApp = (productoNombre) => {
    const phone = '54937918652061' // tu número real
    const message = `Hola! Quiero comprar el producto: ${productoNombre}`
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-[#c9b037] font-stencil tracking-widest">
        <p className="animate-pulse text-xl uppercase">Cargando productos...</p>
      </div>
    )

  if (!productos.length)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a] text-[#c9b037] font-stencil tracking-widest">
        <p className="text-xl uppercase">No hay productos para mostrar.</p>
      </div>
    )

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] px-8 py-12 font-stencil text-[#c9b037] tracking-widest">
      {/* Overlay radar animado tipo iDroid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9b037] opacity-20 animate-pulse-radar"></div>
        <div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9b037] opacity-10 animate-pulse-radar"
          style={{ animationDelay: '1.5s' }}
        ></div>
      </div>

      <h2 className="relative text-4xl uppercase mb-12 text-[#f9f9d1] text-center drop-shadow-[0_0_6px_rgba(201,176,55,0.9)]">
        ARSENAL DE PRODUCTOS
      </h2>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-[#1c1c1c] border-2 border-[#c9b037] rounded-lg shadow-lg p-6 flex flex-col items-center hover:scale-[1.04] transition-transform duration-300"
          >
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-44 object-cover rounded-md border border-[#7a6e1d] mb-4"
            />
            <h3 className="text-xl font-bold mb-2 text-[#f9f9d1] tracking-widest">
              {producto.nombre}
            </h3>
            <p className="text-sm italic text-[#d9d7a1] mb-3 text-center whitespace-pre-wrap">
              {producto.descripcion}
            </p>
            <p className="text-lg font-extrabold mb-4 text-[#c9b037]">{producto.precio}</p>

            <ul className="text-sm text-[#d9d7a1] mb-4 space-y-1 w-full">
              {producto.sabores && (
                <li>
                  <span className="font-semibold text-[#f9f9d1]">Sabores:</span>{' '}
                  {Array.isArray(producto.sabores)
                    ? producto.sabores.join(', ')
                    : producto.sabores}
                </li>
              )}
              {producto.colores && (
                <li>
                  <span className="font-semibold text-[#f9f9d1]">Colores:</span>{' '}
                  {Array.isArray(producto.colores)
                    ? producto.colores.join(', ')
                    : producto.colores}
                </li>
              )}
            </ul>

            <button
              onClick={() => handleWhatsApp(producto.nombre)}
              className="w-full bg-[#c9b037] hover:bg-[#a69125] text-[#0a0a0a] font-bold py-2 rounded-md shadow-lg tracking-widest transition-colors duration-200 select-none"
              aria-label={`Añadir ${producto.nombre} al arsenal`}
            >
              AÑADIR AL ARSENAL
            </button>

            {/* Botón para agregar al carrito */}
            <button
              onClick={() => addToCart(producto)}
              className="w-full mt-2 bg-transparent border border-[#c9b037] text-[#c9b037] hover:bg-[#c9b037] hover:text-[#0a0a0a] font-bold py-2 rounded-md shadow-md tracking-widest transition-all duration-200 select-none"
              aria-label={`Agregar ${producto.nombre} al carrito`}
            >
              AGREGAR AL CARRITO
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Productos
