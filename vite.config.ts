import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react(
            {
                babel: {
                    parserOpts: {
                        plugins: ['decorators-legacy', 'classProperties']
                    }
                }
            }
        ),
    ],
    server: {
        port: 3000
    }
});
