import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: /@(?:app)/,
                replacement: '/src/app'
            },
            {
                find: /@(?:entities)/,
                replacement: '/src/entities'
            },
            {
                find: /@(?:features)/,
                replacement: '/src/features'
            },
            {
                find: /@(?:pages)/,
                replacement: '/src/pages'
            },
            {
                find: /@(?:shared)/,
                replacement: '/src/shared'
            },
            {
                find: /@(?:widgets)/,
                replacement: '/src/widgets'
            }
            ,
            {
                find: /@(?:utils)/,
                replacement: '/src/utils'
            }
        ]
    },
    server: {
        port: 3000,
        open: true
    },
    define: {
        "process.env": JSON.stringify(process.env),
        __IS_DEV__: JSON.stringify(true),
        __PROJECT__: JSON.stringify("frontend"),
    }
})