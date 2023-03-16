/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_ENCRYPT_SECRET_KEY: string
  readonly VITE_CLOUDINARY_CLOUD_NAME: string
  readonly VITE_CLOUDINARY_UPLOAD_PRESET_USERS: string
  readonly VITE_NOVU_APP_IDENTIFIER: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
