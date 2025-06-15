import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // para que sea accesible en la red local
    port: 5173, // podés cambiar el puerto si querés
  },
});
