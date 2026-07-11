import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  const start = '2026-05-21T00:00:00.000Z';
  const end = '2026-05-27T23:59:59.999Z';

  console.log(`Checking matches in DB between ${start} and ${end}...`);

  const { data: matches, error } = await supabase
    .from("matches")
    .select(`
      id,
      match_date,
      home_team_name,
      away_team_name,
      home_club_id,
      away_club_id,
      leagues(name)
    `)
    .gte("match_date", start)
    .lte("match_date", end);

  if (error) return console.error(error);

  console.log(`\nFound ${matches.length} matches in this range:`);
  matches.forEach(m => {
    console.log(`- [${m.match_date}] ${m.home_team_name} (home_club_id: ${m.home_club_id}) vs ${m.away_team_name} (away_club_id: ${m.away_club_id}) [League: ${m.leagues?.name}]`);
  });
}

run();
