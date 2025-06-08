import React, { useState } from 'react';

const AdminProductos = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    sabores: '',
    colores: ''
  });

  const [listaProductos, setListaProductos] = useState([]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      ...producto,
      id: Date.now(),
      sabores: producto.sabores.split(',').map(s => s.trim()),
      colores: producto.colores.split(',').map(c => c.trim())
    };

    setListaProductos([...listaProductos, nuevoProducto]);
    setProducto({ nombre: '', descripcion: '', precio: '', imagen: '', sabores: '', colores: '' });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#2C3E2F] text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#C9B037] mb-6 text-center">Panel de Administración - Añadir Producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={producto.nombre}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={producto.descripcion}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="precio"
          placeholder="Precio (ej: $1500)"
          value={producto.precio}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="sabores"
          placeholder="Sabores (separados por coma)"
          value={producto.sabores}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />
        <input
          type="text"
          name="colores"
          placeholder="Colores (separados por coma)"
          value={producto.colores}
          onChange={handleChange}
          className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
        />

        <button type="submit" className="bg-[#C9B037] text-black font-bold px-4 py-2 rounded hover:bg-yellow-400 transition">
          Guardar producto
        </button>
      </form>

      {/* Vista previa */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Productos añadidos:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listaProductos.map((p) => (
            <div key={p.id} className="border border-[#C9B037] rounded p-4 bg-[#1f2d1f]">
              <img src={p.imagen} alt={p.nombre} className="w-full h-32 object-cover rounded mb-2" />
              <h4 className="text-lg font-bold text-[#C9B037]">{p.nombre}</h4>
              <p className="text-sm italic text-gray-300">{p.descripcion}</p>
              <p className="text-green-300">{p.precio}</p>
              <p><span className="text-white">Sabores:</span> {p.sabores.join(', ')}</p>
              <p><span className="text-white">Colores:</span> {p.colores.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductos;

