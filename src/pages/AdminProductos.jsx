import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AdminProductos = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: '',
    sabores: '',
    colores: '',
    stock: ''
  });

  const [listaProductos, setListaProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [stockEditado, setStockEditado] = useState({});

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const precioNum = parseFloat(producto.precio);
    if (isNaN(precioNum) || precioNum <= 0) {
      setErrorMsg('Por favor, ingresá un precio válido mayor a cero.');
      return;
    }

    const stockNum = parseInt(producto.stock);
    if (isNaN(stockNum) || stockNum < 0) {
      setErrorMsg('Por favor, ingresá un valor válido para el stock.');
      return;
    }

    if (!isValidURL(producto.imagen)) {
      setErrorMsg('Por favor, ingresá una URL válida para la imagen.');
      return;
    }

    setLoading(true);

    const nuevoProducto = {
      nombre: producto.nombre.trim(),
      descripcion: producto.descripcion.trim(),
      precio: precioNum,
      imagen: producto.imagen.trim(),
      sabores: producto.sabores
        ? producto.sabores.split(',').map(s => s.trim()).filter(Boolean)
        : [],
      colores: producto.colores
        ? producto.colores.split(',').map(c => c.trim()).filter(Boolean)
        : [],
      stock: stockNum
    };

    const { error } = await supabase.from('productos').insert([nuevoProducto]);

    if (error) {
      setErrorMsg('Error al guardar: ' + error.message);
    } else {
      alert('Producto guardado en Supabase');
      fetchProductos();
      setProducto({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen: '',
        sabores: '',
        colores: '',
        stock: ''
      });
    }

    setLoading(false);
  };

  const fetchProductos = async () => {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setErrorMsg('Error al cargar productos: ' + error.message);
    }
    if (data) {
      setListaProductos(data);
      const nuevosStocks = {};
      data.forEach((p) => {
        nuevosStocks[p.id] = p.stock;
      });
      setStockEditado(nuevosStocks);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de que querés eliminar este producto?');
    if (!confirmar) return;

    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (error) {
      alert('Error al eliminar: ' + error.message);
    } else {
      alert('Producto eliminado correctamente');
      fetchProductos();
    }
  };

  const handleStockChange = (id, value) => {
    setStockEditado({ ...stockEditado, [id]: value });
  };

  const actualizarStock = async (id) => {
    const nuevoStock = parseInt(stockEditado[id]);
    if (isNaN(nuevoStock) || nuevoStock < 0) {
      alert('Stock inválido');
      return;
    }

    const { error } = await supabase.from('productos').update({ stock: nuevoStock }).eq('id', id);
    if (error) {
      alert('Error al actualizar stock: ' + error.message);
    } else {
      alert('Stock actualizado');
      fetchProductos();
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-[#2C3E2F] text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#C9B037] mb-6 text-center">Panel de Administración - Añadir Producto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nombre" placeholder="Nombre" value={producto.nombre} onChange={handleChange} required className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white" />
        <input type="text" name="descripcion" placeholder="Descripción" value={producto.descripcion} onChange={handleChange} required className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white" />
        <input type="text" name="precio" placeholder="Precio (ej: 1500)" value={producto.precio} onChange={handleChange} required className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white" />
        <input type="text" name="imagen" placeholder="URL de imagen" value={producto.imagen} onChange={handleChange} required className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white" />
        <input type="text" name="sabores" placeholder="Sabores (coma)" value={producto.sabores} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white" />
        <input type="text" name="colores" placeholder="Colores (coma)" value={producto.colores} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white" />
        <input type="number" name="stock" placeholder="Stock disponible" value={producto.stock} onChange={handleChange} className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white" />

        {errorMsg && <p className="text-red-500 font-semibold">{errorMsg}</p>}

        <button type="submit" disabled={loading} className={`bg-[#C9B037] text-black font-bold px-4 py-2 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-400'}`}>
          {loading ? 'Guardando...' : 'Guardar producto'}
        </button>
      </form>

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Productos guardados:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listaProductos.map((p) => (
            <div key={p.id} className="border border-[#C9B037] rounded p-4 bg-[#1f2d1f]">
              <img src={p.imagen} alt={p.nombre} className="w-full h-32 object-cover rounded mb-2" />
              <h4 className="text-lg font-bold text-[#C9B037]">{p.nombre}</h4>
              <p className="text-sm italic text-gray-300">{p.descripcion}</p>
              <p className="text-green-300">${p.precio}</p>
              <p><span className="text-white">Sabores:</span> {p.sabores?.join(', ')}</p>
              <p><span className="text-white">Colores:</span> {p.colores?.join(', ')}</p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number"
                  value={stockEditado[p.id]}
                  onChange={(e) => handleStockChange(p.id, e.target.value)}
                  className="w-20 p-1 rounded bg-gray-800 border border-gray-600 text-white text-sm"
                />
                <button
                  onClick={() => actualizarStock(p.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded"
                >
                  Actualizar stock
                </button>
              </div>
              <button
                onClick={() => handleEliminar(p.id)}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProductos;
