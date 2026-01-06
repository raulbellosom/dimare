import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@ui": resolve(__dirname, "./src/components/ui"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@views": resolve(__dirname, "./src/views"),
      "@hooks": resolve(__dirname, "./src/hooks"),
      "@utils": resolve(__dirname, "./src/utils"),
      "@assets": resolve(__dirname, "./src/assets"),
      "@styles": resolve(__dirname, "./src/styles"),
    },
  },
});
