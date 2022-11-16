/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIRE_API_KEY: string
    readonly VITE_FIRE_AUTH_DOMAIN: string
    readonly VITE_FIRE_PROJECT_ID: string
    readonly VITE_FIRE_STORAGE_BUCKET: string
    readonly VITE_FIRE_MESSAGING_SENDER_ID: string
    readonly VITE_FIRE_APP_ID: string
    readonly VITE_FIRE_MEASUREMENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
