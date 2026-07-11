import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const targets = {
  'c82a2dba-14ea-4b75-baa1-968599d66fc2': [
    { name: 'Red Salud', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Agua Rio Cristal', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'Diario El Día', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'FIUME', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'Recargo', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'Municipalidad LS', category: 'CLUB', minutes: 1.5, bonified: 0 },
    { name: 'Apuesta Royal', category: 'CLUB', minutes: 8, bonified: 0 },
    { name: 'Celta', category: 'CLUB', minutes: 1.5, bonified: 0 },
    { name: 'Suerox', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Newkar', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'Pilla La Vaca', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'BETANO', category: 'LIONS', minutes: 12, bonified: 4 },
    { name: 'AP ROYAL', category: 'LIONS', minutes: 10, bonified: 0 },
    { name: 'COOLBET', category: 'LIONS', minutes: 8, bonified: 0 },
    { name: '1XBET', category: 'LIONS', minutes: 8, bonified: 0 },
    { name: 'Jugabet', category: 'LIONS', minutes: 10, bonified: 0 },
    { name: 'LIONS', category: 'LIONS', minutes: 0, bonified: 0 },
    { name: 'BETCHILE', category: 'LIONS', minutes: 0, bonified: 0 },
    { name: 'EPICBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'Latamwin', category: 'LIONS', minutes: 5, bonified: 0 },
    { name: 'Skechers', category: 'LIONS', minutes: 4, bonified: 0 },
    { name: 'MARATHON', category: 'LIONS', minutes: 0, bonified: 0 },
    { name: 'MERCADO LIBRE', category: 'LIONS', minutes: 4, bonified: 0 },
    { name: 'Disney', category: 'LIONS', minutes: 3, bonified: 0 },
    { name: 'Novibet', category: 'LIONS', minutes: 2, bonified: 1 }
  ],
  '1da5f361-b625-468f-a3d6-020271a7b7f1': [
    { name: 'Apuestas Royal', category: 'CLUB', minutes: 15, bonified: 0 },
    { name: 'PF', category: 'CLUB', minutes: 4.3, bonified: 0 },
    { name: 'Clínica del Sur', category: 'CLUB', minutes: 3.3, bonified: 0 },
    { name: 'Macron', category: 'CLUB', minutes: 3.3, bonified: 0 },
    { name: 'Zapping', category: 'CLUB', minutes: 3.3, bonified: 0 },
    { name: 'Ticketmaster', category: 'CLUB', minutes: 3.3, bonified: 0 },
    { name: 'Coca Cola', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'Lomo Alemán', category: 'CLUB', minutes: 2.3, bonified: 0 },
    { name: 'Termas de Catillo', category: 'CLUB', minutes: 2.3, bonified: 0 },
    { name: 'Powerade', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'MEDS', category: 'CLUB', minutes: 1.3, bonified: 0 },
    { name: 'Sabes Deportes', category: 'CLUB', minutes: 1.3, bonified: 0 },
    { name: 'BETANO', category: 'LIONS', minutes: 12, bonified: 2 },
    { name: 'AP ROYAL', category: 'LIONS', minutes: 10, bonified: 0 },
    { name: 'COOLBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: '1XBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: 'LIONS', category: 'LIONS', minutes: 0, bonified: 1 },
    { name: 'BETCHILE', category: 'LIONS', minutes: 0, bonified: 3 },
    { name: 'EPICBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'NOVIBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'MERCADO LIBRE', category: 'LIONS', minutes: 0, bonified: 5 },
    { name: 'MARATHON', category: 'LIONS', minutes: 0, bonified: 2 }
  ],
  'ac7c7230-0540-487b-9206-9dcc2675774b': [
    { name: 'TecRapol', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'Rodastock', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'Apuestas Royal', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'KS7', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'Anakena', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'Codelco', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Bailac', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Kawaskar', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Shimin', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'R&R Mining', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Pullman Bus', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'Casino Cobresal', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'Kryzpo', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'Unimarc', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'BETANO', category: 'LIONS', minutes: 12, bonified: 4 },
    { name: 'AP ROYAL', category: 'LIONS', minutes: 12, bonified: 0 },
    { name: 'COOLBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: '1XBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: 'LIONS', category: 'LIONS', minutes: 0, bonified: 2 },
    { name: 'BETCHILE', category: 'LIONS', minutes: 0, bonified: 3 },
    { name: 'EPICBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'NOVIBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'MERCADO LIBRE', category: 'LIONS', minutes: 0, bonified: 5 },
    { name: 'MARATHON', category: 'LIONS', minutes: 0, bonified: 2 }
  ],
  '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6': [
    { name: 'BOP', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'San Jorge', category: 'CLUB', minutes: 9, bonified: 0 },
    { name: 'Kayser', category: 'CLUB', minutes: 6, bonified: 0 },
    { name: 'Capelli', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'Marley', category: 'CLUB', minutes: 5, bonified: 0 },
    { name: 'Apuestas Royal', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'Jorge Zamorano', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'Kryzpo', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'MEDS', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'Ironside', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'Belen 2000', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Tienda Palestino', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Wonder', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'BETANO', category: 'LIONS', minutes: 12, bonified: 2 },
    { name: 'AP ROYAL', category: 'LIONS', minutes: 11, bonified: 0 },
    { name: 'COOLBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: '1XBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: 'LIONS', category: 'LIONS', minutes: 0, bonified: 1 },
    { name: 'BETCHILE', category: 'LIONS', minutes: 0, bonified: 3 },
    { name: 'EPICBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'NOVIBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'MERCADO LIBRE', category: 'LIONS', minutes: 0, bonified: 5 },
    { name: 'MARATHON', category: 'LIONS', minutes: 0, bonified: 2 }
  ],
  '7a089cda-846f-4ee6-a867-183127b68adb': [
    { name: 'Apuestas Royal', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'Keime', category: 'CLUB', minutes: 5, bonified: 0 },
    { name: 'EVM', category: 'CLUB', minutes: 6, bonified: 0 },
    { name: 'Kaiyi', category: 'CLUB', minutes: 6, bonified: 0 },
    { name: 'Passline', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'Sanatorio', category: 'CLUB', minutes: 5, bonified: 0 },
    { name: 'CMPC', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'CBM', category: 'CLUB', minutes: 5, bonified: 0 },
    { name: 'Sodimac', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'CC Zero Azucar', category: 'CLUB', minutes: 0, bonified: 0 },
    { name: 'Epicbet', category: 'CLUB', minutes: 5, bonified: 0 },
    { name: 'Redbull', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'El Conce', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'Chile Pastos', category: 'CLUB', minutes: 4, bonified: 0 },
    { name: 'BETANO', category: 'LIONS', minutes: 12, bonified: 4 },
    { name: 'AP ROYAL', category: 'LIONS', minutes: 12, bonified: 0 },
    { name: 'COOLBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: '1XBET', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: 'LIONS', category: 'LIONS', minutes: 0, bonified: 1 },
    { name: 'BETCHILE', category: 'LIONS', minutes: 0, bonified: 3 },
    { name: 'EPICBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'NOVIBET', category: 'LIONS', minutes: 2, bonified: 1 },
    { name: 'MARATHON', category: 'LIONS', minutes: 0, bonified: 0 }
  ],
  'e391e466-299a-4d7e-8b53-91157b0c4022': [
    { name: 'BETANO', category: 'LIONS', minutes: 20, bonified: 8 },
    { name: 'PROSEGUR', category: 'LIONS', minutes: 5, bonified: 1 },
    { name: 'JETSMART', category: 'LIONS', minutes: 5, bonified: 1 },
    { name: 'IPESA', category: 'LIONS', minutes: 4, bonified: 1 },
    { name: 'FRIDAYS', category: 'LIONS', minutes: 3, bonified: 0 },
    { name: 'SKY', category: 'LIONS', minutes: 5, bonified: 2 },
    { name: 'CHEMA', category: 'LIONS', minutes: 3, bonified: 1 },
    { name: 'LIONS', category: 'LIONS', minutes: 3, bonified: 1 },
    { name: 'ICOCERT', category: 'LIONS', minutes: 1.5, bonified: 1.5 },
    { name: 'Sporade', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Nobavision', category: 'CLUB', minutes: 5, bonified: 0 },
    { name: 'Walon', category: 'CLUB', minutes: 6, bonified: 0 },
    { name: 'Manitsa', category: 'CLUB', minutes: 7, bonified: 0 },
    { name: 'Animación Club', category: 'CLUB', minutes: 0, bonified: 4 }
  ],
  '26a7475b-b635-4011-898c-7af3618178af': [
    { name: 'BETANO', category: 'LIONS', minutes: 20, bonified: 7 },
    { name: 'PROSEGUR', category: 'LIONS', minutes: 5, bonified: 2 },
    { name: 'JETSMART', category: 'LIONS', minutes: 5, bonified: 2 },
    { name: 'IPESA', category: 'LIONS', minutes: 4, bonified: 2 },
    { name: 'FRIDAYS', category: 'LIONS', minutes: 3, bonified: 0 },
    { name: 'SKY', category: 'LIONS', minutes: 5, bonified: 2 },
    { name: 'CHEMA', category: 'LIONS', minutes: 3, bonified: 2 },
    { name: 'LIONS', category: 'LIONS', minutes: 3, bonified: 2 },
    { name: 'ICOCERT', category: 'LIONS', minutes: 1.5, bonified: 2.5 },
    { name: 'AT', category: 'CLUB', minutes: 9, bonified: 0 },
    { name: 'TECNOGRAS', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'ALTOS', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'USS', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'POWERLYTE', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'HOT BEC', category: 'CLUB', minutes: 2, bonified: 1 }
  ],
  'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63': [
    { name: 'BETANO', category: 'LIONS', minutes: 30, bonified: 0 },
    { name: 'PROSEGUR', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: 'JETSMART', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: 'IPESA', category: 'LIONS', minutes: 5, bonified: 0 },
    { name: 'FRIDAYS', category: 'LIONS', minutes: 4, bonified: 0 },
    { name: 'SKY', category: 'LIONS', minutes: 7, bonified: 0 },
    { name: 'CHEMA', category: 'LIONS', minutes: 4, bonified: 0 },
    { name: 'LIONS', category: 'LIONS', minutes: 4, bonified: 0 },
    { name: 'ICOCERT', category: 'LIONS', minutes: 2, bonified: 0 },
    { name: 'Bitel', category: 'CLUB', minutes: 8, bonified: 0 },
    { name: 'Jorgito Luna', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'IRZA Ingenieros', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Clínica Limatambo', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Sporade', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Convert', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Transporte Dias', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'Hotel Puñunka', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'HES', category: 'CLUB', minutes: 2, bonified: 0 }
  ],
  'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7': [
    { name: 'APUESTA TOTAL', category: 'LIONS', minutes: 34, bonified: 0 },
    { name: 'PROSEGUR', category: 'LIONS', minutes: 5, bonified: 1 },
    { name: 'JETSMART', category: 'LIONS', minutes: 5, bonified: 1 },
    { name: 'IPESA', category: 'LIONS', minutes: 4, bonified: 0 },
    { name: 'FRIDAYS', category: 'LIONS', minutes: 3, bonified: 0 },
    { name: 'SKY', category: 'LIONS', minutes: 6, bonified: 0 },
    { name: 'CHEMA', category: 'LIONS', minutes: 3, bonified: 0 },
    { name: 'LIONS', category: 'LIONS', minutes: 3, bonified: 0 },
    { name: 'ICOCERT', category: 'LIONS', minutes: 1.5, bonified: 0.5 },
    { name: 'APUESTA TOTAL', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'JETOUR', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'MARATHON', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'BITEL', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'MOVISUN', category: 'CLUB', minutes: 3, bonified: 0 },
    { name: 'OPALUX', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'ALTOS', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'ELECTROLIGHT', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'KLAR', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'SKY CLUB', category: 'CLUB', minutes: 2, bonified: 0 },
    { name: 'MODA', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'BACKUS', category: 'CLUB', minutes: 1, bonified: 0 },
    { name: 'ESAN', category: 'CLUB', minutes: 1, bonified: 0 }
  ]
};

const renames = [
  // La Serena
  { clubId: 'c82a2dba-14ea-4b75-baa1-968599d66fc2', from: 'Agua Río Cristal', to: 'Agua Rio Cristal', category: 'CLUB' },
  // U de Concepcion
  { clubId: '1da5f361-b625-468f-a3d6-020271a7b7f1', from: 'Royal', to: 'Apuestas Royal', category: 'CLUB' },
  { clubId: '1da5f361-b625-468f-a3d6-020271a7b7f1', from: 'Coca-Cola', to: 'Coca Cola', category: 'CLUB' },
  // Cobresal
  { clubId: 'ac7c7230-0540-487b-9206-9dcc2675774b', from: 'Casino Cobres', to: 'Casino Cobresal', category: 'CLUB' },
  { clubId: 'ac7c7230-0540-487b-9206-9dcc2675774b', from: 'Kwaskar', to: 'Kawaskar', category: 'CLUB' },
  // Palestino
  { clubId: '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6', from: 'AP ROYAL', to: 'Apuestas Royal', category: 'CLUB' },
  { clubId: '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6', from: 'KRYSPO', to: 'Kryzpo', category: 'CLUB' },
  // Dep Concepcion
  { clubId: '7a089cda-846f-4ee6-a867-183127b68adb', from: 'AP ROYAL', to: 'Apuestas Royal', category: 'CLUB' },
  { clubId: '7a089cda-846f-4ee6-a867-183127b68adb', from: 'KELME', to: 'Keime', category: 'CLUB' },
  { clubId: '7a089cda-846f-4ee6-a867-183127b68adb', from: 'CHILE PASTO', to: 'Chile Pastos', category: 'CLUB' },
  { clubId: '7a089cda-846f-4ee6-a867-183127b68adb', from: 'Epic Bet', to: 'Epicbet', category: 'CLUB' },
  // Alianza Atletico Sullana
  { clubId: 'e391e466-299a-4d7e-8b53-91157b0c4022', from: 'ANIMACION CLUB', to: 'Animación Club', category: 'CLUB' }
];

async function run() {
  for (const clubId of Object.keys(targets)) {
    const { data: dbClients, error } = await supabase
      .from('clients')
      .select('id, name, category, minutes, bonified')
      .eq('club_id', clubId);

    if (error) {
      console.error(`Error for ${clubId}:`, error);
      continue;
    }

    console.log(`\n======================================================`);
    console.log(`CLUB ID: ${clubId}`);
    console.log(`======================================================`);

    // Apply simulation renames to dbClients list
    const mappedDbClients = dbClients.map(c => {
      const rename = renames.find(r => r.clubId === clubId && r.from.toLowerCase() === c.name.toLowerCase() && r.category === c.category);
      return rename ? { ...c, name: rename.to } : c;
    });

    const targetList = targets[clubId];

    // Check updates & deletes & inserts
    const updates = [];
    const inserts = [];
    const deletes = [];

    // Find updates and inserts
    for (const t of targetList) {
      const match = mappedDbClients.find(c => c.name.toLowerCase() === t.name.toLowerCase() && c.category === t.category);
      if (match) {
        updates.push({
          id: match.id,
          name: t.name,
          category: t.category,
          minutes: t.minutes,
          bonified: t.bonified,
          oldMinutes: match.minutes,
          oldBonified: match.bonified,
          oldName: match.name
        });
      } else {
        inserts.push(t);
      }
    }

    // Find deletes
    for (const c of mappedDbClients) {
      const match = targetList.find(t => t.name.toLowerCase() === c.name.toLowerCase() && t.category === c.category);
      if (!match) {
        deletes.push(c);
      }
    }

    console.log(`UPDATES: ${updates.length}`);
    for (const u of updates) {
      console.log(`  - Update "${u.oldName}" -> "${u.name}" (UUID: ${u.id}). Min: ${u.oldMinutes}->${u.minutes}, Bonif: ${u.oldBonified}->${u.bonified}`);
    }
    console.log(`INSERTS: ${inserts.length}`);
    for (const i of inserts) {
      console.log(`  - Insert "${i.name}" (${i.category}). Min: ${i.minutes}, Bonif: ${i.bonified}`);
    }
    console.log(`DELETES: ${deletes.length}`);
    for (const d of deletes) {
      console.log(`  - Delete "${d.name}" (${d.category}) (UUID: ${d.id})`);
    }
  }
}

run();
