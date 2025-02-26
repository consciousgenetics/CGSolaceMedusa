import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// Load environment variables based on NODE_ENV
const NODE_ENV = process.env.NODE_ENV || 'development'
console.log(`Running in ${NODE_ENV} mode`)

loadEnv(NODE_ENV, process.cwd())

// Log environment variables for debugging (without sensitive data)
console.log(`REDIS_URL set: ${!!process.env.REDIS_URL}`)
console.log(`DATABASE_URL set: ${!!process.env.DATABASE_URL}`)
console.log(`DATABASE_TYPE: ${process.env.DATABASE_TYPE || 'postgres'}`)

const DATABASE_URL = process.env.DATABASE_URL
const REDIS_URL = process.env.REDIS_URL

if (!DATABASE_URL) {
  console.error("No database URL specified. Please set the DATABASE_URL environment variable.")
  process.exit(1)
}

if (!REDIS_URL) {
  console.warn("No Redis URL specified. Using a fake Redis instance. This is not recommended for production.")
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
