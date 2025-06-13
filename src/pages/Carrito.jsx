import React from 'react'
import { useCart } from '../context/CartContext'

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart } = useCart()

  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.precio), 0)

  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center text-[#c9b037] bg-[#0a0a0a] min-h-screen font-stencil">
        <h2 className="text-4xl mb-4 uppercase tracking-wider">Tu arsenal está vacío</h2>
        <p className="text-[#e0e0b8]">Agregá productos desde la tienda para comenzar la misión.</p>
      </div>
    )
  }

  return (
    <div className="p-10 bg-[#0a0a0a] min-h-screen text-[#c9b037] font-stencil">
      <h2 className="text-4xl mb-8 uppercase text-center tracking-widest">Tu arsenal</h2>

      <div className="grid gap-5 max-w-3xl mx-auto">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-[#c9b037] p-4 rounded-lg bg-[#1c1c1c] shadow-md hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-2xl text-[#f9f9d1]">{item.nombre}</h3>
              <p className="text-sm text-[#d9d7a1]">${item.precio}</p>
            </div>
            <button
              onClick={() => removeFromCart(item)}
              className="bg-red-700 hover:bg-red-900 text-white py-1 px-4 rounded-md text-sm transition"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <p className="text-3xl mb-6 text-[#f9f9d1]">Total: ${total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="bg-[#c9b037] hover:bg-[#a69125] text-[#0a0a0a] font-black py-3 px-8 rounded-md tracking-widest uppercase transition"
        >
          Vaciar Arsenal
        </button>
      </div>
    </div>
  )
}

export default Carrito
