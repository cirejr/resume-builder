import { defineNitroConfig } from 'nitropack'
import { resolve } from 'path'

export default defineNitroConfig({
  srcDir: 'src',
  runtimeConfig: {
    databasePath: './resumes.db'
  },
  compatibilityDate: '2026-01-30',
  externals: {
    external: ['@clerk/clerk-sdk-node', 'pg']
  },
  alias: {
    '~': resolve(__dirname, 'src')
  }
})