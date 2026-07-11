import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  // We can query pg_trigger through a function or query if we have permissions,
  // or we can run an RPC or select from pg_catalog if allowed.
  // Since we don't have direct SQL command tool, let's try to query pg_catalog tables via RPC if available,
  // or select from information_schema.triggers.
  const { data, error } = await supabase
    .from("pg_trigger")
    .select("*")
    .limit(1); // Usually pg_trigger is not exposed via PostgREST unless there is a view.
  
  if (error) {
    console.log("pg_trigger not directly queryable via PostgREST (expected):", error.message);
  }

  // Let's query information_schema.triggers via select (some DBs expose it)
  const { data: triggers, error: trigError } = await supabase
    .from("information_schema.triggers")
    .select("*")
    .limit(10);

  if (trigError) {
    console.log("information_schema.triggers error:", trigError.message);
  } else {
    console.log("Triggers:", triggers);
  }
}

run();
