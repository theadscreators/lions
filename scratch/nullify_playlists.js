import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: "admin@lionssportsmedia.com",
    password: "lions2026"
  });
  if (authError) return console.error("Auth error:", authError.message);
  console.log("✅ Authenticated as admin.");

  // Nullify playlist_url for all matches
  const { data, error } = await supabase
    .from("matches")
    .update({ playlist_url: null })
    .neq("id", "00000000-0000-0000-0000-000000000000"); // Update all matches

  if (error) {
    console.error("❌ Error setting playlist_url to null:", error.message);
  } else {
    console.log("✅ Successfully nullified matches.playlist_url for all matches.");
  }
}

run();
