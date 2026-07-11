import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  const { data: clubs, error: clubErr } = await supabase
    .from("clubs")
    .select("id, name")
    .ilike("name", "%Concepción%");

  if (clubErr) return console.error(clubErr);
  console.log("Clubs found:", clubs);

  for (const c of clubs) {
    const { data: matches, error } = await supabase
      .from("matches")
      .select("id, match_date, api_match_id, playlist_url, created_at, updated_at, status")
      .eq("home_club_id", c.id)
      .order("match_date", { ascending: true });

    if (error) return console.error(error);
    console.log(`\nFound ${matches.length} matches for ${c.name} (ID: ${c.id}):`);
    for (const m of matches) {
      console.log(`Match ID: ${m.id}`);
      console.log(`  Date: ${m.match_date}`);
      console.log(`  api_match_id: ${m.api_match_id}`);
      console.log(`  status: ${m.status}`);
      console.log(`  playlist_url: ${m.playlist_url}`);
      console.log(`  created_at: ${m.created_at}`);
      console.log(`  updated_at: ${m.updated_at}`);
    }
  }
}

run();
