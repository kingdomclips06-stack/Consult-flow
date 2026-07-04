import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!connectionString) {
  console.warn("WARNING: DATABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set.");
}

// Disable prefetch as it is not supported for pooled connections (like Supabase Transaction pooler)
const client = postgres(connectionString || "", { prepare: false });
export const db = drizzle(client, { schema });
