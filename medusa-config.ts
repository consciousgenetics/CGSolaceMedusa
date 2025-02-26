import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const DATABASE_URL = process.env.DATABASE_URL
const REDIS_URL = process.env.REDIS_URL

if (!DATABASE_URL) {
  console.error("No database URL specified. Please set the DATABASE_URL environment variable.")
  process.exit(1)
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: DATABASE_URL,
    redisUrl: REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  }
})
