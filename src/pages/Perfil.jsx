import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Perfil = () => {
  const [perfil, setPerfil] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          setMessage({ type: "error", text: "Error obteniendo usuario: " + userError.message });
          setLoading(false);
          return;
        }

        if (!user) {
          setMessage({ type: "error", text: "No hay usuario logueado." });
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          setMessage({ type: "error", text: "Error cargando perfil: " + error.message });
        } else {
          setPerfil({ ...data, email: user.email });
        }
      } catch (error) {
        setMessage({ type: "error", text: "Error inesperado: " + error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  // Guardar cambios de nombres y apellidos
  const handleSave = async () => {
    if (!perfil) return;
    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("profiles")
      .update({ nombres: perfil.nombres, apellidos: perfil.apellidos })
      .eq("id", perfil.id);

    if (error) {
      setMessage({ type: "error", text: "Error al guardar cambios: " + error.message });
    } else {
      setMessage({ type: "success", text: "Perfil actualizado correctamente." });
    }

    setSaving(false);
  };

  // Subida de imagen de avatar
  const handleUpload = async () => {
    if (!avatarFile || !perfil) return;

    setSaving(true);
    setMessage(null);

    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${perfil.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Subir archivo a storage
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        upsert: true,
      });

    if (uploadError) {
      setMessage({ type: "error", text: "Error al subir la imagen: " + uploadError.message });
      setSaving(false);
      return;
    }

    // Obtener URL pública
    const { data: publicUrlData, error: urlError } = supabase.storage.from("avatars").getPublicUrl(filePath);

    if (urlError) {
      setMessage({ type: "error", text: "Error al obtener URL pública: " + urlError.message });
      setSaving(false);
      return;
    }

    // Actualizar el perfil con la URL nueva
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrlData.publicUrl })
      .eq("id", perfil.id);

    if (updateError) {
      setMessage({ type: "error", text: "Error al guardar URL en perfil: " + updateError.message });
      setSaving(false);
      return;
    }

    // Actualizar estado local con la nueva URL
    setPerfil((prev) => ({ ...prev, avatar_url: publicUrlData.publicUrl }));
    setAvatarFile(null);
    setMessage({ type: "success", text: "Imagen subida correctamente." });
    setSaving(false);
  };

  if (loading) return <p className="text-center text-white">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto text-white p-6 bg-[#0a0a0a] rounded-md">
      <h1 className="text-3xl font-bold text-[#c9b037] mb-6">Mi Perfil</h1>

      {perfil?.avatar_url && (
        <img
          src={perfil.avatar_url}
          alt="Avatar"
          className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
        />
      )}

      <p>
        <strong>Email:</strong> {perfil?.email || "Oculto"}
      </p>

      {/* Inputs editables */}
      <div className="mt-4 space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="nombres">
            Nombre
          </label>
          <input
            id="nombres"
            type="text"
            value={perfil?.nombres || ""}
            onChange={(e) =>
              setPerfil((prev) => ({ ...prev, nombres: e.target.value }))
            }
            className="w-full px-3 py-2 rounded text-black"
            disabled={saving}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="apellidos">
            Apellido
          </label>
          <input
            id="apellidos"
            type="text"
            value={perfil?.apellidos || ""}
            onChange={(e) =>
              setPerfil((prev) => ({ ...prev, apellidos: e.target.value }))
            }
            className="w-full px-3 py-2 rounded text-black"
            disabled={saving}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#c9b037] text-black font-bold py-2 px-4 rounded hover:bg-[#e6c64b] transition w-full"
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      <div className="mt-6">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setAvatarFile(e.target.files[0]);
            e.target.value = null; // limpiar para subir misma imagen otra vez
          }}
          className="mb-2"
          disabled={saving}
        />
        <button
          onClick={handleUpload}
          disabled={saving || !avatarFile}
          className="bg-[#c9b037] text-black font-bold py-2 px-4 rounded hover:bg-[#e6c64b] transition w-full"
        >
          {saving ? "Subiendo..." : "Subir nueva imagen"}
        </button>
      </div>

      {/* Mensajes de feedback */}
      {message && (
        <p
          className={`mt-4 text-center ${
            message.type === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default Perfil;
