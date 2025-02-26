import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// Load environment variables
const nodeEnv = process.env.NODE_ENV || 'development'
console.log(`Running in ${nodeEnv} mode`)
loadEnv(nodeEnv, process.cwd())

// Force disable workflows
process.env.MEDUSA_FF_WORKFLOWS = "false"

// Get database and Redis URLs
const DATABASE_URL = process.env.DATABASE_URL
const REDIS_URL = process.env.REDIS_URL

// Log configuration for debugging
console.log(`Database URL configured: ${DATABASE_URL ? 'Yes' : 'No'}`)
console.log(`Redis URL configured: ${REDIS_URL ? 'Yes' : 'No'}`)
console.log(`STORE_CORS: ${process.env.STORE_CORS}`)
console.log(`ADMIN_CORS: ${process.env.ADMIN_CORS}`)
console.log(`AUTH_CORS: ${process.env.AUTH_CORS}`)
console.log(`Workflows feature flag: ${process.env.MEDUSA_FF_WORKFLOWS}`)

// Validate required configuration
if (!DATABASE_URL) {
  console.error("No database URL specified. Please set the DATABASE_URL environment variable.")
  process.exit(1)
}

if (!REDIS_URL) {
  console.warn("No Redis URL specified. Using a fake Redis instance. This is not recommended for production.")
}

// Export configuration
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
  },
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL
      }
    }
  }
})
