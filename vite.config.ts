import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { babel } from "@rollup/plugin-babel";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [babel({ extensions: [".ts"], babelHelpers: "bundled" }), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
