import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

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
    const stockNum = parseInt(producto.stock);

    if (isNaN(precioNum) || precioNum <= 0) {
      setErrorMsg('Ingresá un precio válido.');
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      setErrorMsg('Stock inválido.');
      return;
    }

    if (!isValidURL(producto.imagen)) {
      setErrorMsg('URL de imagen inválida.');
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
      toast.error('Error al guardar: ' + error.message);
    } else {
      toast.success('Producto guardado correctamente');
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
    const confirmar = window.confirm('¿Eliminar este producto?');
    if (!confirmar) return;

    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (error) {
      toast.error('Error al eliminar: ' + error.message);
    } else {
      toast.success('Producto eliminado');
      fetchProductos();
    }
  };

  const handleStockChange = (id, value) => {
    setStockEditado({ ...stockEditado, [id]: value });
  };

  const actualizarStock = async (id) => {
    const nuevoStock = parseInt(stockEditado[id]);
    if (isNaN(nuevoStock) || nuevoStock < 0) {
      toast.error('Stock inválido');
      return;
    }

    const { error } = await supabase.from('productos').update({ stock: nuevoStock }).eq('id', id);
    if (error) {
      toast.error('Error al actualizar stock: ' + error.message);
    } else {
      toast.success('Stock actualizado');
      fetchProductos();
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-[#1A1A1A] text-white rounded-xl shadow-2xl border border-[#333] font-['Poppins']">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-[#E74C3C] mb-6 text-center uppercase tracking-widest">
        Admin de Productos - Diamond Dogs
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'descripcion', 'precio', 'imagen', 'sabores', 'colores', 'stock'].map((campo) => (
          <input
            key={campo}
            type={campo === 'precio' || campo === 'stock' ? 'number' : 'text'}
            name={campo}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={producto[campo]}
            onChange={handleChange}
            required={['nombre', 'descripcion', 'precio', 'imagen'].includes(campo)}
            className="w-full p-2 rounded-sm border border-[#444] bg-[#0F0F0F] text-[#ECF0F1] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E74C3C]"
          />
        ))}

        {errorMsg && <p className="text-red-500 font-semibold">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-[#C0392B] text-white font-bold px-6 py-2 rounded-sm uppercase tracking-widest transition ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E74C3C]'
          }`}
        >
          {loading ? 'Guardando...' : 'Guardar producto'}
        </button>
      </form>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4 text-[#ECF0F1]">Productos guardados:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listaProductos.map((p) => (
            <div key={p.id} className="border border-[#444] rounded-sm p-4 bg-[#0F0F0F] shadow-md hover:shadow-lg transition-all">
              <img src={p.imagen} alt={p.nombre} className="w-full h-40 object-cover rounded mb-3 border border-[#222]" />
              <h4 className="text-lg font-bold text-[#E74C3C]">{p.nombre}</h4>
              <p className="text-sm italic text-gray-400">{p.descripcion}</p>
              <p className="text-green-400 font-semibold">${p.precio}</p>
              <p className="text-gray-300"><span className="text-white">Sabores:</span> {p.sabores?.join(', ')}</p>
              <p className="text-gray-300"><span className="text-white">Colores:</span> {p.colores?.join(', ')}</p>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="number"
                  value={stockEditado[p.id]}
                  onChange={(e) => handleStockChange(p.id, e.target.value)}
                  className="w-20 p-1 rounded-sm bg-gray-800 border border-gray-600 text-white text-sm"
                />
                <button
                  onClick={() => actualizarStock(p.id)}
                  className="bg-[#34495E] hover:bg-[#2C3E50] text-white text-xs px-3 py-1 rounded-sm uppercase tracking-wide"
                >
                  Actualizar stock
                </button>
              </div>
              <button
                onClick={() => handleEliminar(p.id)}
                className="mt-3 bg-[#922B21] hover:bg-[#C0392B] text-white text-xs px-3 py-1 rounded-sm"
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
