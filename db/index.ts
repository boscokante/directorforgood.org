import { config } from 'dotenv'
import { resolve } from 'path'

// Load .env.local file if not already loaded
if (!process.env.DATABASE_URL) {
  config({ path: resolve(process.cwd(), '.env.local') })
}

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set. Please add it to .env.local')
  }
  const client = postgres(process.env.DATABASE_URL)
  return drizzle(client, { schema })
}

export const db = getDb()

