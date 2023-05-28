import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import { r3f } from "@react-three/editor/vite"




// https://vitejs.dev/config/
export default defineConfig((env) => (
  {
    plugins: [env.command === 'build' ? react() : r3f(), glsl()]
  }))
