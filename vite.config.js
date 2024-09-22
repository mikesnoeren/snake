import {defineConfig} from "vite";
import fullReload from 'vite-plugin-full-reload'

export default defineConfig(async () => ({
    root: "src/",
    clearScreen: false,
    plugins: [
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
