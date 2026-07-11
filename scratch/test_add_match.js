import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

async function testAddMatch() {
  // Auth as admin
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: "admin@lionssportsmedia.com",
    password: "lions2026"
  });
  if (authErr) { console.error("Auth error:", authErr.message); return; }
  console.log("✅ Auth OK");

  // Get first club to use as home
  const { data: clubs } = await supabase.from("clubs").select("id, name").limit(1);
  const homeClub = clubs?.[0];
  if (!homeClub) { console.error("No clubs found"); return; }
  console.log(`Using home club: ${homeClub.name} (${homeClub.id})`);

  // Test the EXACT same insert that addMatch() does
  const matchData = {
    home_club_id: homeClub.id,
    away_team_name: "Test Visitante",
    match_date: "2026-07-20T21:00:00-03:00",
    venue: "Estadio Test",
    operational_notes: "Test notes",
    current_status: "scheduled",
    pauta_override: "default"
  };

  console.log("\nInserting with data:", JSON.stringify(matchData, null, 2));
  
  const { data, error } = await supabase.from("matches").insert(matchData).select();
  
  if (error) {
    console.error("\n❌ INSERT ERROR:", JSON.stringify(error, null, 2));
    
    // Now try without current_status (it doesn't exist in schema — it's "status")
    console.log("\nRetrying without current_status...");
    const { data: data2, error: error2 } = await supabase.from("matches").insert({
      home_club_id: homeClub.id,
      away_team_name: "Test Visitante 2",
      match_date: "2026-07-20T21:00:00-03:00",
      venue: "Estadio Test",
      operational_notes: "Test notes",
      pauta_override: "default"
    }).select();
    
    if (error2) {
      console.error("❌ Still failing:", JSON.stringify(error2, null, 2));
    } else {
      console.log("✅ Insert without current_status WORKED:", data2);
      // Cleanup
      await supabase.from("matches").delete().eq("id", data2[0].id);
      console.log("🧹 Test match deleted");
    }
  } else {
    console.log("✅ INSERT OK:", data);
    // Cleanup
    await supabase.from("matches").delete().eq("id", data[0].id);
    console.log("🧹 Test match deleted");
  }

  // Also check the actual columns of matches table
  console.log("\n=== Checking matches table columns via a real match ===");
  const { data: sample } = await supabase.from("matches").select("*").limit(1);
  if (sample?.[0]) {
    console.log("Columns in matches table:", Object.keys(sample[0]).join(", "));
  }
}

testAddMatch();
