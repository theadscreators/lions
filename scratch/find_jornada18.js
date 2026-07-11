import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

async function check() {
  // Find ALL Ecuador matches with round 18 or api_match_ids from Jornada 18
  const j18Ids = ['1000009009','1000009010','1000009011','1000009012','1000009013','1000009014','1000009015','1000009016'];
  
  console.log("=== Buscando partidos con api_match_id de Jornada 18 ===");
  const { data: byId, error: e1 } = await supabase
    .from("matches")
    .select("id, match_date, round, round_name, api_match_id, home_club:clubs!home_club_id(name), away_club:clubs!away_club_id(name), away_team_name")
    .in("api_match_id", j18Ids);
  
  if (e1) console.error("Error:", e1);
  console.log(`  Encontrados: ${byId?.length || 0}`);
  for (const m of (byId || [])) {
    const home = m.home_club?.name || "???";
    const away = m.away_club?.name || m.away_team_name || "???";
    console.log(`  ${m.match_date} | ${home} vs ${away} | round: ${m.round || m.round_name || '-'} | api_id: ${m.api_match_id}`);
  }

  // Find ALL Ecuador matches with round "18" or round_name "18"
  console.log("\n=== Buscando partidos con round=18 ===");
  const { data: byRound } = await supabase
    .from("matches")
    .select("id, match_date, round, round_name, api_match_id, home_club:clubs!home_club_id(name), away_club:clubs!away_club_id(name), away_team_name")
    .eq("round", "18");
  
  console.log(`  Encontrados: ${byRound?.length || 0}`);
  for (const m of (byRound || [])) {
    const home = m.home_club?.name || "???";
    const away = m.away_club?.name || m.away_team_name || "???";
    console.log(`  ${m.match_date} | ${home} vs ${away} | api_id: ${m.api_match_id}`);
  }

  // Find Emelec vs Barcelona in any form
  console.log("\n=== Buscando Emelec vs Barcelona (cualquier fecha) ===");
  const { data: emelec } = await supabase
    .from("matches")
    .select("id, match_date, round, api_match_id, home_club:clubs!home_club_id(name), away_club:clubs!away_club_id(name), away_team_name")
    .or("away_team_name.ilike.%emelec%,away_team_name.ilike.%barcelona%")
    .order("match_date", { ascending: true });
  
  console.log(`  Encontrados: ${emelec?.length || 0}`);
  for (const m of (emelec || [])) {
    const home = m.home_club?.name || "???";
    const away = m.away_club?.name || m.away_team_name || "???";
    console.log(`  ${m.match_date} | ${home} vs ${away} | round: ${m.round || '-'} | api_id: ${m.api_match_id || '-'}`);
  }

  // Check all Ecuador matches around early July (Jun 28 - Jul 14)
  console.log("\n=== TODOS los partidos Ecuador en DB (Jun 28 - Jul 14) ===");
  const { data: leagues } = await supabase.from("leagues").select("id").eq("fotmob_id", 246);
  const ecLeagueId = leagues?.[0]?.id;
  
  if (ecLeagueId) {
    const { data: ecMatches } = await supabase
      .from("matches")
      .select("id, match_date, round, round_name, api_match_id, home_club:clubs!home_club_id(name), away_club:clubs!away_club_id(name), away_team_name")
      .eq("league_id", ecLeagueId)
      .gte("match_date", "2026-06-28T00:00:00Z")
      .lte("match_date", "2026-07-14T23:59:59Z")
      .order("match_date", { ascending: true });
    
    console.log(`  Ecuador league_id: ${ecLeagueId} | Partidos: ${ecMatches?.length || 0}`);
    for (const m of (ecMatches || [])) {
      const home = m.home_club?.name || "???";
      const away = m.away_club?.name || m.away_team_name || "???";
      const dt = new Date(m.match_date);
      const dateStr = dt.toLocaleString('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      console.log(`  ${dateStr} | ${home} vs ${away} | round: ${m.round || '-'} | api_id: ${m.api_match_id || '-'}`);
    }
  }
}

check();
