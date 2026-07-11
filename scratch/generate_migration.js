import fs from 'fs';
import path from 'path';

const inputPath = 'c:/Users/Dani/lions-dashboard/supabase/migrations/update_clients_9_clubs.sql';
const outputPath = 'c:/Users/Dani/lions-dashboard/supabase/migrations/update_clients_9_clubs.sql';

const content = fs.readFileSync(inputPath, 'utf8');

// We will split the file by BEGIN; and COMMIT;
// Let's parse the file club by club.
// Each club block starts with a comment like:
// -- 1. LA SERENA (...)
// and ends before the next club block.

const clubBlocks = [
  { id: 'c82a2dba-14ea-4b75-baa1-968599d66fc2', name: 'LA SERENA', index: 1 },
  { id: '1da5f361-b625-468f-a3d6-020271a7b7f1', name: 'U. DE CONCEPCIÓN', index: 2 },
  { id: 'ac7c7230-0540-487b-9206-9dcc2675774b', name: 'COBRESAL', index: 3 },
  { id: '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6', name: 'PALESTINO', index: 4 },
  { id: '7a089cda-846f-4ee6-a867-183127b68adb', name: 'DEP. CONCEPCIÓN', index: 5 },
  { id: 'e391e466-299a-4d7e-8b53-91157b0c4022', name: 'ALIANZA ATLÉTICO SULLANA', index: 6 },
  { id: '26a7475b-b635-4011-898c-7af3618178af', name: 'JUAN PABLO II', index: 7 },
  { id: 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63', name: 'FC CAJAMARCA', index: 8 },
  { id: 'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7', name: 'UNIVERSITARIO', index: 9 }
];

// Let's write a parser that finds the INSERT values for each club
function extractValuesForClub(clubId) {
  const regex = new RegExp(`\\('${clubId}'\\s*,\\s*'([^']*)'\\s*,\\s*'([^']*)'\\s*,\\s*([0-9.]+)\\s*,\\s*([0-9.]+)\\)`, 'g');
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push({
      name: match[1],
      category: match[2],
      minutes: match[3],
      bonified: match[4]
    });
  }
  return matches;
}

const renamesSql = `-- ================================================================
-- 0. PRE-REQUISITO: Alinear nombres de marcas con ligeras diferencias
--    para conservar sus UUIDs existentes.
-- ================================================================
-- La Serena
UPDATE clients SET name = 'Agua Rio Cristal' WHERE club_id = 'c82a2dba-14ea-4b75-baa1-968599d66fc2' AND name = 'Agua Río Cristal' AND category = 'CLUB';

-- U de Concepcion
UPDATE clients SET name = 'Apuestas Royal' WHERE club_id = '1da5f361-b625-468f-a3d6-020271a7b7f1' AND name = 'Royal' AND category = 'CLUB';
UPDATE clients SET name = 'Coca Cola' WHERE club_id = '1da5f361-b625-468f-a3d6-020271a7b7f1' AND name = 'Coca-Cola' AND category = 'CLUB';

-- Cobresal
UPDATE clients SET name = 'Casino Cobresal' WHERE club_id = 'ac7c7230-0540-487b-9206-9dcc2675774b' AND name = 'Casino Cobres' AND category = 'CLUB';
UPDATE clients SET name = 'Kawaskar' WHERE club_id = 'ac7c7230-0540-487b-9206-9dcc2675774b' AND name = 'Kwaskar' AND category = 'CLUB';

-- Palestino
UPDATE clients SET name = 'Apuestas Royal' WHERE club_id = '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6' AND name = 'AP ROYAL' AND category = 'CLUB';

-- Dep Concepcion
UPDATE clients SET name = 'Apuestas Royal' WHERE club_id = '7a089cda-846f-4ee6-a867-183127b68adb' AND name = 'AP ROYAL' AND category = 'CLUB';
UPDATE clients SET name = 'Keime' WHERE club_id = '7a089cda-846f-4ee6-a867-183127b68adb' AND name = 'KELME' AND category = 'CLUB';
UPDATE clients SET name = 'Chile Pastos' WHERE club_id = '7a089cda-846f-4ee6-a867-183127b68adb' AND name = 'CHILE PASTO' AND category = 'CLUB';
UPDATE clients SET name = 'Epicbet' WHERE club_id = '7a089cda-846f-4ee6-a867-183127b68adb' AND name = 'Epic Bet' AND category = 'CLUB';

-- Alianza Atletico Sullana
UPDATE clients SET name = 'Animación Club' WHERE club_id = 'e391e466-299a-4d7e-8b53-91157b0c4022' AND name = 'ANIMACION CLUB' AND category = 'CLUB';
`;

let outputSql = `-- ================================================================
-- LIONS SPORTS MEDIA — Actualización Masiva de Clientes
-- Generado: 29 Mayo 2026
-- 9 clubes: Chile (5) + Perú (4)
-- ESTRATEGIA: UPSERT no destructivo por club (preserva UUIDs existentes)
-- EJECUTAR EN SUPABASE → SQL Editor
-- ================================================================

BEGIN;

${renamesSql}
`;

// Helper to generate the CTE blocks
function generateClubCte(club) {
  const clients = extractValuesForClub(club.id);
  if (clients.length === 0) {
    throw new Error(`No clients found for club ${club.name} (${club.id})`);
  }

  const valuesStr = clients.map((c, i) => {
    const isFirst = i === 0;
    const nameEscaped = c.name.replace(/'/g, "''");
    const minSuffix = isFirst ? '::numeric' : '';
    const bonSuffix = isFirst ? '::numeric' : '';
    return `    ('${nameEscaped}', '${c.category}', ${c.minutes}${minSuffix}, ${c.bonified}${bonSuffix})`;
  }).join(',\n');

  return `
-- ================================================================
-- ${club.index}. ${club.name} (${club.id})
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
${valuesStr}
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = '${club.id}'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT '${club.id}', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = '${club.id}'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = '${club.id}'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );
`;
}

for (const club of clubBlocks) {
  outputSql += generateClubCte(club);

  // Keep specific club updates (like notes/status)
  if (club.id === '26a7475b-b635-4011-898c-7af3618178af') {
    outputSql += `
UPDATE clubs SET
  notes = null,
  updated_at = NOW()
WHERE id = '26a7475b-b635-4011-898c-7af3618178af';
`;
  } else if (club.id === 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63') {
    outputSql += `
UPDATE clubs SET
  status = 'activo',
  notes = 'SKY: Kick-off',
  updated_at = NOW()
WHERE id = 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63';
`;
  }
}

outputSql += `
COMMIT;
`;

fs.writeFileSync(outputPath, outputSql, 'utf8');
console.log('Successfully generated migration file!');
