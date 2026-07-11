import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  const { data: events, error } = await supabase
    .from("match_events")
    .select("*")
    .eq("event_type", "playlist_uploaded");

  if (error) return console.error(error);
  console.log(`Found ${events.length} playlist_uploaded events:`);
  for (const e of events) {
    console.log(`Event ID: ${e.id} | Match ID: ${e.match_id} | URL: ${e.payload?.playlist_url} | Created: ${e.created_at}`);
  }
}

run();
