import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const clubIds = [
  'c82a2dba-14ea-4b75-baa1-968599d66fc2',
  '1da5f361-b625-468f-a3d6-020271a7b7f1',
  'ac7c7230-0540-487b-9206-9dcc2675774b',
  '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6',
  '7a089cda-846f-4ee6-a867-183127b68adb',
  'e391e466-299a-4d7e-8b53-91157b0c4022',
  '26a7475b-b635-4011-898c-7af3618178af',
  'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63',
  'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7'
];

async function run() {
  const { data: clients, error } = await supabase
    .from('clients')
    .select('id, club_id, name, category, minutes, bonified')
    .in('club_id', clubIds);

  if (error) {
    console.error(error);
    return;
  }

  console.log(`Found ${clients.length} clients:`);
  for (const c of clients) {
    console.log(JSON.stringify(c));
  }
}

run();
