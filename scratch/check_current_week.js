import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const FOTMOB_BASE = "https://www.fotmob.com/api";
const HEADERS = {
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  "Referer": "https://www.fotmob.com/"
};

async function check() {
  // 1. What's in the DB for Ecuador this week (July 7-14)?
  console.log("=== 1. PARTIDOS ECUADOR EN LA DB (Julio 7-14) ===");
  const { data: dbMatches, error: dbErr } = await supabase
    .from("matches")
    .select(`
      id, match_date, away_team_name, round, round_name, api_match_id,
      home_club:clubs!home_club_id(name),
      away_club:clubs!away_club_id(name),
      leagues(name, fotmob_id)
    `)
    .gte("match_date", "2026-07-07T00:00:00Z")
    .lte("match_date", "2026-07-15T00:00:00Z")
    .order("match_date", { ascending: true });

  if (dbErr) { console.error("DB Error:", dbErr); return; }
  
  console.log(`  Total partidos encontrados: ${dbMatches.length}`);
  for (const m of dbMatches) {
    const league = Array.isArray(m.leagues) ? m.leagues[0] : m.leagues;
    const home = m.home_club?.name || "???";
    const away = m.away_club?.name || m.away_team_name || "???";
    const dt = new Date(m.match_date);
    const dateStr = dt.toLocaleString('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    console.log(`  ${dateStr} | ${home} vs ${away} | Liga: ${league?.name || '?'} | Round: ${m.round_name || m.round || '-'} | api_id: ${m.api_match_id || '-'}`);
  }

  // 2. What does FotMob API say for Ecuador right now?
  console.log("\n=== 2. FotMob API /data/leagues?id=246 — Próximos partidos ===");
  try {
    const res = await fetch(`${FOTMOB_BASE}/data/leagues?id=246`, { headers: HEADERS });
    const data = await res.json();
    
    let fixtures = [];
    if (data.fixtures?.allMatches) fixtures = data.fixtures.allMatches;
    else if (data.fixtures?.fixtures) fixtures = data.fixtures.fixtures;
    else if (Array.isArray(data.fixtures)) fixtures = data.fixtures;
    if (fixtures.length === 0 && data.overview?.fixtures) fixtures = data.overview.fixtures;
    
    console.log(`  Total fixtures en API: ${fixtures.length}`);
    
    const now = new Date();
    let shown = 0;
    for (const item of fixtures) {
      const matchList = item.matches || [item];
      for (const m of matchList) {
        if (!m?.home || !m?.away) continue;
        const dt = m.status?.utcTime || m.utcTime;
        if (dt) {
          const matchDate = new Date(dt);
          // Show matches from July 7 to July 20
          if (matchDate >= new Date("2026-07-07T00:00:00Z") && matchDate <= new Date("2026-07-20T00:00:00Z") && shown < 20) {
            const dateStr = matchDate.toLocaleString('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
            console.log(`  ${dateStr} | ${m.home.name} vs ${m.away.name} | id: ${m.id} | round: ${m.round || m.roundText || '-'}`);
            shown++;
          }
        }
      }
    }
  } catch (e) { console.error("FotMob API Error:", e.message); }

  // 3. Check what the sync button in App.jsx calls
  console.log("\n=== 3. RESUMEN ===");
  console.log("  Si los partidos de Jornada 18 (Emelec vs Barcelona, Cuenca vs Aucas, etc.)");
  console.log("  NO aparecen en la DB con las fechas correctas (Jul 10-12),");
  console.log("  entonces el admin necesita ejecutar el sync de nuevo.");
}

check();
