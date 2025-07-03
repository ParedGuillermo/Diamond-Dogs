import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../assets/context/AuthContext";

export default function Trakeo() {
  const { user, loading: authLoading } = useAuth();
  const adminEmail = "walterguillermopared@gmail.com"; // tu email admin real

  const [codigo, setCodigo] = useState("");
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const buscarPedido = async () => {
    setLoading(true);
    setMensaje("");
    setPedido(null);

    const { data, error } = await supabase
      .from("pedidos")
      .select("*")
      .eq("trakeo", codigo)
      .single();

    setLoading(false);

    if (error) {
      setMensaje("No se encontró ningún pedido con ese código.");
    } else {
      setPedido(data);
    }
  };

  const actualizarEstado = async (nuevoEstado) => {
    if (!pedido) return;
    setLoading(true);
    setMensaje("");

    const { error } = await supabase
      .from("pedidos")
      .update({ estado: nuevoEstado })
      .eq("id", pedido.id);

    setLoading(false);

    if (error) {
      setMensaje("Error al actualizar estado: " + error.message);
    } else {
      setPedido({ ...pedido, estado: nuevoEstado });
      setMensaje("Estado actualizado correctamente.");
    }
  };

  const esAdmin = user?.email === adminEmail;

  return (
    <div className="max-w-xl p-6 mx-auto text-yellow-400 bg-gray-900 rounded shadow-md">
      <h2 className="mb-6 text-xl font-bold text-center">Seguimiento de Pedido</h2>

      <input
        type="text"
        placeholder="Ingresá código de seguimiento"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        className="w-full p-2 mb-4 text-yellow-300 bg-gray-800 rounded"
      />
      <button
        onClick={buscarPedido}
        disabled={!codigo.trim() || loading}
        className="w-full py-2 mb-4 text-black bg-yellow-400 rounded hover:bg-yellow-300 disabled:opacity-50"
      >
        {loading ? "Buscando..." : "Buscar Pedido"}
      </button>

      {mensaje && <p className="mb-4 text-center">{mensaje}</p>}

      {pedido && (
        <div className="p-4 bg-gray-800 rounded">
          <h3 className="mb-2 font-semibold">Pedido #{pedido.trakeo}</h3>
          <p><strong>Cliente:</strong> {pedido.cliente_nombre}</p>
          <p><strong>Teléfono:</strong> {pedido.cliente_telefono}</p>
          <p><strong>Producto:</strong> {pedido.producto_nombre}</p>
          <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
          <p><strong>Estado:</strong> {pedido.estado}</p>
          <p><strong>Observaciones:</strong> {pedido.observaciones || "-"}</p>
          <p><strong>Fecha Pedido:</strong> {new Date(pedido.fecha_pedido).toLocaleString()}</p>

          {esAdmin ? (
            <>
              <label className="block mt-4 mb-1 font-semibold">Cambiar Estado</label>
              <select
                value={pedido.estado}
                onChange={(e) => actualizarEstado(e.target.value)}
                className="w-full p-2 text-yellow-300 bg-gray-700 rounded"
                disabled={loading}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En preparación">En preparación</option>
                <option value="Enviado">Enviado</option>
                <option value="Entregado">Entregado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </>
          ) : (
            <p className="mt-4 italic text-yellow-300">Solo el administrador puede cambiar el estado.</p>
          )}
        </div>
      )}
    </div>
  );
}
