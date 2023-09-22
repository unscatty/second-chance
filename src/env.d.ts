/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DOGS_ENDPOINT: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
