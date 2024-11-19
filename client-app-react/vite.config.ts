import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
    // Set port
    server: {
        port: 3000,
        fs: {
            strict: false,
        },
    },
    build: {
        assetsDir: 'assets',
    },
    plugins: [react()],
});
