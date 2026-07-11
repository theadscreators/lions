import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  const { data: matches, error } = await supabase
    .from("matches")
    .select(`
      id,
      match_date,
      home_team_name,
      away_team_name,
      home_club_id,
      away_club_id,
      leagues(name, countries(name))
    `);

  if (error) return console.error(error);

  const total = matches.length;
  const external = matches.filter(m => !m.home_club_id && !m.away_club_id);

  console.log(`Total matches in DB: ${total}`);
  console.log(`External matches (both home_club_id & away_club_id are NULL): ${external.length}`);

  // Group by country / league
  const groups = {};
  external.forEach(m => {
    const country = m.leagues?.countries?.name || "Desconocido";
    const league = m.leagues?.name || "Desconocida";
    const key = `${country} — ${league}`;
    groups[key] = (groups[key] || 0) + 1;
  });

  console.log("\nExternal matches breakdown by league:");
  for (const [key, count] of Object.entries(groups)) {
    console.log(`- ${key}: ${count} matches`);
  }

  // Print first 5 external matches as sample
  console.log("\nSample of 5 external matches:");
  external.slice(0, 5).forEach(m => {
    console.log(`  • [${m.leagues?.countries?.name || "?"}] ${m.home_team_name || m.home_club_id} vs ${m.away_team_name || m.away_club_id} on ${m.match_date}`);
  });
}

run();
