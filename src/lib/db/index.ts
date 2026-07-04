import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("WARNING: DATABASE_URL is not set.");
}

// Disable prefetch as it is not supported for pooled connections (like Supabase Transaction pooler)
const client = postgres(connectionString || "", { prepare: false });
export const db = drizzle(client, { schema });
