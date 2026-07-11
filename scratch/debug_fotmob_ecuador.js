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

async function debug() {
  // 1. Check what leagues are in the database and their fotmob_ids
  console.log("=== 1. LIGAS EN LA DB CON fotmob_id ===");
  const { data: leagues, error: lErr } = await supabase
    .from("leagues")
    .select("id, name, fotmob_id, country_id, countries(name, code)")
    .not("fotmob_id", "is", null);
  
  if (lErr) { console.error("Error:", lErr); return; }
  
  for (const l of leagues) {
    const country = Array.isArray(l.countries) ? l.countries[0] : l.countries;
    console.log(`  Liga: ${l.name} | fotmob_id: ${l.fotmob_id} | País: ${country?.name || '?'} (${country?.code || '?'})`);
  }

  // 2. Check all leagues (even without fotmob_id)
  console.log("\n=== 2. TODAS LAS LIGAS ===");
  const { data: allLeagues } = await supabase
    .from("leagues")
    .select("id, name, fotmob_id, api_id, country_id, countries(name, code)");
  
  for (const l of allLeagues) {
    const country = Array.isArray(l.countries) ? l.countries[0] : l.countries;
    console.log(`  Liga: ${l.name} | fotmob_id: ${l.fotmob_id || 'NULL'} | api_id: ${l.api_id || 'NULL'} | País: ${country?.name || '?'} (${country?.code || '?'})`);
  }

  // 3. Now query FotMob for league 246 (Ecuador Liga Pro) to see the REAL upcoming fixtures
  console.log("\n=== 3. FotMob Liga 246 (Ecuador Liga Pro) — Partidos Próximos ===");
  try {
    const res = await fetch(`${FOTMOB_BASE}/leagues?id=246&tab=matches&season=2026`, { headers: HEADERS });
    const data = await res.json();
    
    console.log(`  Estructura raíz: ${Object.keys(data).join(", ")}`);
    
    if (data.matches) {
      console.log(`  data.matches keys: ${Object.keys(data.matches).join(", ")}`);
      if (data.matches.allMatches) {
        console.log(`  allMatches count: ${data.matches.allMatches.length}`);
        // Show next 10
        const now = new Date();
        const upcoming = data.matches.allMatches
          .filter(m => new Date(m.status?.utcTime) >= new Date(now.getTime() - 24*60*60*1000))
          .slice(0, 10);
        for (const m of upcoming) {
          console.log(`    ${m.home?.name} vs ${m.away?.name} | ${m.status?.utcTime} | Round: ${m.round}`);
        }
      }
    }
    
    if (data.fixtures) {
      console.log(`  data.fixtures keys: ${typeof data.fixtures === 'object' ? Object.keys(data.fixtures).join(", ") : 'not object'}`);
    }

    if (data.overview) {
      console.log(`  data.overview keys: ${Object.keys(data.overview).join(", ")}`);
    }
  } catch (e) { console.error("Error 246:", e.message); }

  // 4. Also check what FotMob returns with the OLD API endpoint used by syncFotMob.js
  console.log("\n=== 4. FotMob /data/leagues endpoint ===");
  for (const league of leagues) {
    try {
      const res = await fetch(`${FOTMOB_BASE}/data/leagues?id=${league.fotmob_id}`, { headers: HEADERS });
      const data = await res.json();
      
      let fixtures = [];
      if (data.fixtures) {
        if (Array.isArray(data.fixtures)) fixtures = data.fixtures;
        else if (data.fixtures.allMatches) fixtures = data.fixtures.allMatches;
        else if (data.fixtures.fixtures) fixtures = data.fixtures.fixtures;
      }
      if (fixtures.length === 0 && data.overview?.fixtures) {
        fixtures = data.overview.fixtures;
      }
      
      console.log(`  ${league.name} (fotmob_id=${league.fotmob_id}): ${fixtures.length} fixtures found`);
      
      // Show first 5 upcoming
      const now = new Date();
      let shown = 0;
      for (const item of fixtures) {
        const matchList = item.matches || [item];
        for (const m of matchList) {
          if (!m?.home || !m?.away) continue;
          const dt = m.status?.utcTime || m.utcTime;
          if (dt && new Date(dt) >= new Date(now.getTime() - 24*60*60*1000) && shown < 8) {
            console.log(`    ${m.home.name} vs ${m.away.name} | ${dt} | id: ${m.id}`);
            shown++;
          }
        }
      }
    } catch (e) { console.error(`  Error ${league.name}:`, e.message); }
  }

  // 5. Check the new /leagues endpoint (FotMob may have changed their API)
  console.log("\n=== 5. FotMob /leagues endpoint (new API) for Ecuador ===");
  for (const fid of [246, 268]) {
    try {
      const res = await fetch(`${FOTMOB_BASE}/leagues?id=${fid}`, { headers: HEADERS });
      const data = await res.json();
      
      console.log(`  Liga ${fid}: ${data.details?.name || 'unknown'} (${data.details?.country || 'unknown'})`);
      console.log(`    Keys: ${Object.keys(data).join(", ")}`);
      
      if (data.matches?.allMatches) {
        const now = new Date();
        const upcoming = data.matches.allMatches
          .filter(m => new Date(m.status?.utcTime) >= new Date(now.getTime() - 24*60*60*1000))
          .slice(0, 8);
        console.log(`    Upcoming matches (${upcoming.length}):`);
        for (const m of upcoming) {
          console.log(`      ${m.home?.name} vs ${m.away?.name} | ${m.status?.utcTime} | round: ${m.round}`);
        }
      }
    } catch (e) { console.error(`  Error ${fid}:`, e.message); }
  }
}

debug();
