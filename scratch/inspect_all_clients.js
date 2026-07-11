import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const clubs = [
  { id: 'c82a2dba-14ea-4b75-baa1-968599d66fc2', name: 'La Serena' },
  { id: '1da5f361-b625-468f-a3d6-020271a7b7f1', name: 'U. de Concepción' },
  { id: 'ac7c7230-0540-487b-9206-9dcc2675774b', name: 'Cobresal' },
  { id: '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6', name: 'Palestino' },
  { id: '7a089cda-846f-4ee6-a867-183127b68adb', name: 'Dep. Concepción' },
  { id: 'e391e466-299a-4d7e-8b53-91157b0c4022', name: 'Alianza Atlético Sullana' },
  { id: '26a7475b-b635-4011-898c-7af3618178af', name: 'Juan Pablo II' },
  { id: 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63', name: 'FC Cajamarca' },
  { id: 'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7', name: 'Universitario' }
];

async function run() {
  for (const club of clubs) {
    const { data: clients, error } = await supabase
      .from('clients')
      .select('id, name, category, minutes, bonified')
      .eq('club_id', club.id)
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error(`Error fetching for ${club.name}:`, error);
      continue;
    }

    console.log(`\n======================================================`);
    console.log(`CLUB: ${club.name} (${club.id})`);
    console.log(`======================================================`);
    for (const c of clients) {
      console.log(`  - ID: ${c.id} | Name: "${c.name}" | Cat: ${c.category} | Min: ${c.minutes} | Bonif: ${c.bonified}`);
    }
  }
}

run();
