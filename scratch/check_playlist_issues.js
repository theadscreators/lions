import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  // 1. Fetch matches where playlist_url is NOT NULL in database
  const { data: matchesWithDbPlaylist, error: err1 } = await supabase
    .from("matches")
    .select("id, match_date, playlist_url, home_team_name, away_team_name, clubs!home_club_id(name)")
    .not("playlist_url", "is", null);

  if (err1) console.error("Error 1:", err1);
  console.log(`\nMatches with playlist_url column set in DB: ${matchesWithDbPlaylist?.length || 0}`);
  matchesWithDbPlaylist?.forEach(m => {
    const home = m.clubs?.name || m.home_team_name;
    console.log(`- Match ID: ${m.id} | ${home} vs ${m.away_team_name} | Date: ${m.match_date} | Playlist: ${m.playlist_url}`);
  });

  // 2. Fetch matches that have 'playlist_uploaded' events
  const { data: events, error: err2 } = await supabase
    .from("match_events")
    .select("id, match_id, event_type, payload, created_at")
    .eq("event_type", "playlist_uploaded");

  if (err2) console.error("Error 2:", err2);
  console.log(`\n'playlist_uploaded' events count: ${events?.length || 0}`);
  
  for (const e of events || []) {
    const { data: m } = await supabase
      .from("matches")
      .select("id, match_date, home_team_name, away_team_name, clubs!home_club_id(name)")
      .eq("id", e.match_id)
      .single();

    const home = m?.clubs?.name || m?.home_team_name;
    console.log(`- Event ID: ${e.id} | Match: ${home} vs ${m?.away_team_name} (${m?.match_date}) | Playlist in payload: ${e.payload?.playlist_url}`);
  }
}

run();
