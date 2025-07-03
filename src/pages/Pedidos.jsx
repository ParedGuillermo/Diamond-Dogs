import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function Pedidos() {
  // Estados para crear pedido
  const [clienteNombre, setClienteNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [productoId, setProductoId] = useState("");
  const [productoNombre, setProductoNombre] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [estado, setEstado] = useState("Pendiente");
  const [observaciones, setObservaciones] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);

  // Estados para listar pedidos
  const [pedidos, setPedidos] = useState([]);
  const [loadingPedidos, setLoadingPedidos] = useState(false);
  const [errorPedidos, setErrorPedidos] = useState(null);

  // Cargar productos para el select al montar
  useEffect(() => {
    async function fetchProductos() {
      const { data, error } = await supabase
        .from("productos")
        .select("id, nombre, sabores, colores, categoria")
        .order("nombre", { ascending: true });

      if (error) {
        console.error("Error cargando productos:", error);
        setMensaje("Error al cargar productos.");
        return;
      }

      setProductos(data || []);
      if (data && data.length > 0) {
        setProductoId(data[0].id);
        setProductoNombre(data[0].nombre);
      }
    }
    fetchProductos();
  }, []);

  // Actualizar nombre producto cuando cambia productoId
  useEffect(() => {
    const prod = productos.find((p) => p.id === productoId);
    setProductoNombre(prod ? prod.nombre : "");
  }, [productoId, productos]);

  // Cargar pedidos al montar y cuando cambie algo
  useEffect(() => {
    fetchPedidos();
  }, []);

  async function fetchPedidos() {
    setLoadingPedidos(true);
    setErrorPedidos(null);

    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .order("fecha_pedido", { ascending: false });

    if (error) {
      console.error("Error cargando pedidos:", error);
      setErrorPedidos("Error al cargar pedidos.");
      setLoadingPedidos(false);
      return;
    }

    setPedidos(data || []);
    setLoadingPedidos(false);
  }

  // Crear pedido y generar código único
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteNombre.trim() || !telefono.trim()) {
      setMensaje("Por favor completá los campos obligatorios.");
      return;
    }

    if (!productoId) {
      setMensaje("Seleccioná un producto.");
      return;
    }

    if (cantidad < 1) {
      setMensaje("La cantidad debe ser al menos 1.");
      return;
    }

    setLoading(true);
    setMensaje("");

    // Generar código pedido DD-XXXXXX con letras y números
    const generarCodigoPedido = () => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let codigo = "DD-";
      for (let i = 0; i < 6; i++) {
        codigo += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return codigo;
    };

    const codigoPedido = generarCodigoPedido();

    const { error } = await supabase.from("pedidos").insert([
      {
        cliente_nombre: clienteNombre.trim(),
        cliente_telefono: telefono.trim(),
        producto_id: productoId,
        producto_nombre: productoNombre,
        cantidad,
        estado,
        observaciones: observaciones.trim(),
        fecha_pedido: new Date(),
        codigo: codigoPedido,
      },
    ]);

    setLoading(false);

    if (error) {
      setMensaje(`Error: ${error.message}`);
    } else {
      setMensaje("✅ Pedido creado con éxito!");
      // Limpiar formulario
      setClienteNombre("");
      setTelefono("");
      setProductoId(productos.length > 0 ? productos[0].id : "");
      setCantidad(1);
      setEstado("Pendiente");
      setObservaciones("");
      // Recargar pedidos
      fetchPedidos();
    }
  };

  // Cambiar estado pedido en base de datos
  const cambiarEstadoPedido = async (id, nuevoEstado) => {
    const { error } = await supabase
      .from("pedidos")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      alert("Error al actualizar estado: " + error.message);
      return;
    }

    // Actualizar localmente para mejor UX
    setPedidos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  return (
    <div className="max-w-5xl p-6 mx-auto text-yellow-400 bg-gray-900 rounded shadow-md">
      {/* FORMULARIO CREAR PEDIDO */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mb-8"
        aria-label="Formulario para crear nuevo pedido"
      >
        <h2 className="mb-6 text-xl font-bold text-center">Nuevo Pedido</h2>

        <label htmlFor="clienteNombre" className="block mb-1 font-semibold">
          Nombre del Cliente *
        </label>
        <input
          id="clienteNombre"
          type="text"
          value={clienteNombre}
          onChange={(e) => setClienteNombre(e.target.value)}
          className="w-full p-2 mb-4 text-yellow-300 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Ej: Juan Pérez"
          required
          autoComplete="name"
        />

        <label htmlFor="telefono" className="block mb-1 font-semibold">
          Teléfono *
        </label>
        <input
          id="telefono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="w-full p-2 mb-4 text-yellow-300 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Ej: +54 9 371 1234567"
          required
          autoComplete="tel"
        />

        <label htmlFor="producto" className="block mb-1 font-semibold">
          Producto *
        </label>
        <select
          id="producto"
          value={productoId}
          onChange={(e) => setProductoId(e.target.value)}
          className="w-full p-2 mb-4 text-yellow-300 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        >
          {productos.length === 0 && (
            <option value="">Cargando productos...</option>
          )}
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre}
            </option>
          ))}
        </select>

        <label htmlFor="cantidad" className="block mb-1 font-semibold">
          Cantidad *
        </label>
        <input
          id="cantidad"
          type="number"
          min={1}
          value={cantidad}
          onChange={(e) => {
            const val = Number(e.target.value);
            setCantidad(val > 0 ? val : 1);
          }}
          className="w-full p-2 mb-4 text-yellow-300 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />

        <label htmlFor="estado" className="block mb-1 font-semibold">
          Estado
        </label>
        <select
          id="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full p-2 mb-4 text-yellow-300 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En preparación">En preparación</option>
          <option value="Enviado">Enviado</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>

        <label htmlFor="observaciones" className="block mb-1 font-semibold">
          Observaciones (opcional)
        </label>
        <textarea
          id="observaciones"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          className="w-full p-2 mb-6 text-yellow-300 bg-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rows={3}
          placeholder="Ej: Entregar en horario de la tarde"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-bold text-black uppercase rounded transition ${
            loading ? "bg-yellow-300 cursor-not-allowed" : "bg-yellow-400 hover:bg-yellow-300"
          }`}
          aria-busy={loading}
        >
          {loading ? "Creando pedido..." : "Crear Pedido"}
        </button>

        {mensaje && (
          <p
            className={`mt-4 text-center ${
              mensaje.startsWith("Error") ? "text-red-500" : "text-green-400"
            }`}
            role="alert"
          >
            {mensaje}
          </p>
        )}
      </form>

      {/* LISTADO DE PEDIDOS */}
      <section>
        <h2 className="mb-4 text-xl font-bold text-center">Pedidos Existentes</h2>

        {loadingPedidos && <p className="text-center">Cargando pedidos...</p>}
        {errorPedidos && <p className="text-center text-red-500">{errorPedidos}</p>}

        {!loadingPedidos && !errorPedidos && pedidos.length === 0 && (
          <p className="text-center">No hay pedidos aún.</p>
        )}

        {!loadingPedidos && !errorPedidos && pedidos.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-yellow-400 rounded table-auto">
              <thead>
                <tr className="text-black bg-yellow-400">
                  <th className="px-2 py-1 border">Código</th>
                  <th className="px-2 py-1 border">Cliente</th>
                  <th className="px-2 py-1 border">Teléfono</th>
                  <th className="px-2 py-1 border">Producto</th>
                  <th className="px-2 py-1 border">Cantidad</th>
                  <th className="px-2 py-1 border">Estado</th>
                  <th className="px-2 py-1 border">Fecha Pedido</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="odd:bg-gray-800 even:bg-gray-700">
                    <td className="px-2 py-1 font-mono text-center border">{pedido.codigo}</td>
                    <td className="px-2 py-1 border">{pedido.cliente_nombre}</td>
                    <td className="px-2 py-1 border">{pedido.cliente_telefono}</td>
                    <td className="px-2 py-1 border">{pedido.producto_nombre}</td>
                    <td className="px-2 py-1 text-center border">{pedido.cantidad}</td>
                    <td className="px-2 py-1 text-center border">
                      <select
                        value={pedido.estado}
                        onChange={(e) =>
                          cambiarEstadoPedido(pedido.id, e.target.value)
                        }
                        className="p-1 text-yellow-300 bg-gray-800 rounded"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En preparación">En preparación</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="px-2 py-1 text-center border">
                      {new Date(pedido.fecha_pedido).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
