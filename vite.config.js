import {defineConfig} from "vite";
import tailwindcss from '@tailwindcss/vite'
import fullReload from 'vite-plugin-full-reload'

export default defineConfig(async () => ({
    root: "src/",
    clearScreen: false,
    plugins: [
        tailwindcss(),
        fullReload(['src/**/*.html'])
    ],
    build: {
        outDir: '../dist',
        emptyOutDir: true
    },
    server: {
        host: '0.0.0.0',
        port: 5173
    },
}));
