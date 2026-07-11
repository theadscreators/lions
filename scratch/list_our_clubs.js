import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function run() {
  const { data: clubs, error } = await supabase
    .from("clubs")
    .select("id, name, status, fotmob_id");

  if (error) return console.error(error);

  console.log(`Found ${clubs.length} clubs:`);
  clubs.forEach(c => {
    console.log(`- [${c.id}] ${c.name} (Status: ${c.status || 'None'}, FotMob ID: ${c.fotmob_id || 'None'})`);
  });
}

run();
