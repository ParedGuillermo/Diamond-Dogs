import React from 'react'
import { useCart } from '../context/CartContext'

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart } = useCart()

  const total = cartItems.reduce((acc, item) => acc + parseFloat(item.precio), 0)

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center text-[#c9b037] bg-[#0a0a0a] min-h-screen font-stencil">
        <h2 className="text-3xl mb-4 uppercase">Tu arsenal está vacío</h2>
        <p>Agregá productos desde la tienda para comenzar.</p>
      </div>
    )
  }

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen text-[#c9b037] font-stencil">
      <h2 className="text-3xl mb-6 uppercase text-center">Tu arsenal</h2>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border border-[#c9b037] p-4 rounded-lg bg-[#1c1c1c]"
          >
            <div>
              <h3 className="text-xl text-[#f9f9d1]">{item.nombre}</h3>
              <p className="text-sm text-[#d9d7a1]">{item.precio}</p>
            </div>
            <button
              onClick={() => removeFromCart(item)}
              className="bg-red-600 hover:bg-red-800 text-white py-1 px-3 rounded-md text-sm"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-2xl mb-4 text-[#f9f9d1]">Total: ${total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="bg-[#c9b037] hover:bg-[#a69125] text-[#0a0a0a] font-bold py-2 px-6 rounded-md tracking-widest"
        >
          Vaciar Arsenal
        </button>
      </div>
    </div>
  )
}

export default Carrito
