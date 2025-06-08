import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import AdminProductos from './pages/AdminProductos' // 🔥 NUEVO

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-military bg-cover bg-fixed text-white">
        {/* Overlay oscuro semitransparente */}
        {/* <div className="absolute inset-0 bg-black/70 z-0"></div> */}

        <div className="relative z-10">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/admin" element={<AdminProductos />} /> {/* 🔥 NUEVO */}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
