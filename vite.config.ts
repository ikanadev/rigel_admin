import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			// @ts-ignore
			{ find: 'src', replacement: path.resolve(__dirname, 'src') },
		],
	},
});
