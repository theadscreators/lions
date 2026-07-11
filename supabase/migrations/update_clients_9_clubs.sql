-- ================================================================
-- LIONS SPORTS MEDIA — Actualización Masiva de Clientes
-- Generado: 29 Mayo 2026
-- 9 clubes: Chile (5) + Perú (4)
-- ESTRATEGIA: UPSERT no destructivo por club (preserva UUIDs existentes)
-- EJECUTAR EN SUPABASE → SQL Editor
-- ================================================================

BEGIN;

-- ================================================================
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


-- ================================================================
-- 1. LA SERENA (c82a2dba-14ea-4b75-baa1-968599d66fc2)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('Red Salud', 'CLUB', 2::numeric, 0::numeric),
    ('Agua Rio Cristal', 'CLUB', 1, 0),
    ('Diario El Día', 'CLUB', 1, 0),
    ('FIUME', 'CLUB', 1, 0),
    ('Recargo', 'CLUB', 1, 0),
    ('Municipalidad LS', 'CLUB', 1.5, 0),
    ('Apuesta Royal', 'CLUB', 8, 0),
    ('Celta', 'CLUB', 1.5, 0),
    ('Suerox', 'CLUB', 2, 0),
    ('Newkar', 'CLUB', 3, 0),
    ('Pilla La Vaca', 'CLUB', 2, 0),
    ('BETANO', 'LIONS', 12, 4),
    ('AP ROYAL', 'LIONS', 10, 0),
    ('COOLBET', 'LIONS', 8, 0),
    ('1XBET', 'LIONS', 8, 0),
    ('Jugabet', 'LIONS', 10, 0),
    ('LIONS', 'LIONS', 0, 0),
    ('BETCHILE', 'LIONS', 0, 0),
    ('EPICBET', 'LIONS', 2, 1),
    ('Latamwin', 'LIONS', 5, 0),
    ('Skechers', 'LIONS', 4, 0),
    ('MARATHON', 'LIONS', 0, 0),
    ('MERCADO LIBRE', 'LIONS', 4, 0),
    ('Disney', 'LIONS', 3, 0),
    ('Novibet', 'LIONS', 2, 1)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = 'c82a2dba-14ea-4b75-baa1-968599d66fc2'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT 'c82a2dba-14ea-4b75-baa1-968599d66fc2', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = 'c82a2dba-14ea-4b75-baa1-968599d66fc2'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = 'c82a2dba-14ea-4b75-baa1-968599d66fc2'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

-- ================================================================
-- 2. U. DE CONCEPCIÓN (1da5f361-b625-468f-a3d6-020271a7b7f1)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('Apuestas Royal', 'CLUB', 15::numeric, 0::numeric),
    ('PF', 'CLUB', 4.3, 0),
    ('Clínica del Sur', 'CLUB', 3.3, 0),
    ('Macron', 'CLUB', 3.3, 0),
    ('Zapping', 'CLUB', 3.3, 0),
    ('Ticketmaster', 'CLUB', 3.3, 0),
    ('Coca Cola', 'CLUB', 3, 0),
    ('Lomo Alemán', 'CLUB', 2.3, 0),
    ('Termas de Catillo', 'CLUB', 2.3, 0),
    ('Powerade', 'CLUB', 2, 0),
    ('MEDS', 'CLUB', 1.3, 0),
    ('Sabes Deportes', 'CLUB', 1.3, 0),
    ('BETANO', 'LIONS', 12, 2),
    ('AP ROYAL', 'LIONS', 10, 0),
    ('COOLBET', 'LIONS', 6, 0),
    ('1XBET', 'LIONS', 6, 0),
    ('LIONS', 'LIONS', 0, 1),
    ('BETCHILE', 'LIONS', 0, 3),
    ('EPICBET', 'LIONS', 2, 1),
    ('NOVIBET', 'LIONS', 2, 1),
    ('MERCADO LIBRE', 'LIONS', 0, 5),
    ('MARATHON', 'LIONS', 0, 2)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = '1da5f361-b625-468f-a3d6-020271a7b7f1'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT '1da5f361-b625-468f-a3d6-020271a7b7f1', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = '1da5f361-b625-468f-a3d6-020271a7b7f1'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = '1da5f361-b625-468f-a3d6-020271a7b7f1'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

-- ================================================================
-- 3. COBRESAL (ac7c7230-0540-487b-9206-9dcc2675774b)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('TecRapol', 'CLUB', 4::numeric, 0::numeric),
    ('Rodastock', 'CLUB', 3, 0),
    ('Apuestas Royal', 'CLUB', 4, 0),
    ('KS7', 'CLUB', 4, 0),
    ('Anakena', 'CLUB', 3, 0),
    ('Codelco', 'CLUB', 2, 0),
    ('Bailac', 'CLUB', 2, 0),
    ('Kawaskar', 'CLUB', 2, 0),
    ('Shimin', 'CLUB', 2, 0),
    ('R&R Mining', 'CLUB', 2, 0),
    ('Pullman Bus', 'CLUB', 1, 0),
    ('Casino Cobresal', 'CLUB', 1, 0),
    ('Kryzpo', 'CLUB', 1, 0),
    ('Unimarc', 'CLUB', 1, 0),
    ('BETANO', 'LIONS', 12, 4),
    ('AP ROYAL', 'LIONS', 12, 0),
    ('COOLBET', 'LIONS', 6, 0),
    ('1XBET', 'LIONS', 6, 0),
    ('LIONS', 'LIONS', 0, 2),
    ('BETCHILE', 'LIONS', 0, 3),
    ('EPICBET', 'LIONS', 2, 1),
    ('NOVIBET', 'LIONS', 2, 1),
    ('MERCADO LIBRE', 'LIONS', 0, 5),
    ('MARATHON', 'LIONS', 0, 2)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = 'ac7c7230-0540-487b-9206-9dcc2675774b'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT 'ac7c7230-0540-487b-9206-9dcc2675774b', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = 'ac7c7230-0540-487b-9206-9dcc2675774b'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = 'ac7c7230-0540-487b-9206-9dcc2675774b'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

-- ================================================================
-- 4. PALESTINO (2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('BOP', 'CLUB', 4::numeric, 0::numeric),
    ('San Jorge', 'CLUB', 9, 0),
    ('Kayser', 'CLUB', 6, 0),
    ('Capelli', 'CLUB', 4, 0),
    ('Marley', 'CLUB', 5, 0),
    ('Apuestas Royal', 'CLUB', 3, 0),
    ('Jorge Zamorano', 'CLUB', 1, 0),
    ('Kryzpo', 'CLUB', 1, 0),
    ('MEDS', 'CLUB', 3, 0),
    ('Ironside', 'CLUB', 3, 0),
    ('Belen 2000', 'CLUB', 2, 0),
    ('Tienda Palestino', 'CLUB', 2, 0),
    ('Wonder', 'CLUB', 1, 0),
    ('BETANO', 'LIONS', 12, 2),
    ('AP ROYAL', 'LIONS', 11, 0),
    ('COOLBET', 'LIONS', 6, 0),
    ('1XBET', 'LIONS', 6, 0),
    ('LIONS', 'LIONS', 0, 1),
    ('BETCHILE', 'LIONS', 0, 3),
    ('EPICBET', 'LIONS', 2, 1),
    ('NOVIBET', 'LIONS', 2, 1),
    ('MERCADO LIBRE', 'LIONS', 0, 5),
    ('MARATHON', 'LIONS', 0, 2)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = '2b4a0d3a-51f3-46ba-8d12-5cf7470e7ac6'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

-- ================================================================
-- 5. DEP. CONCEPCIÓN (7a089cda-846f-4ee6-a867-183127b68adb)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('Apuestas Royal', 'CLUB', 4::numeric, 0::numeric),
    ('Keime', 'CLUB', 5, 0),
    ('EVM', 'CLUB', 6, 0),
    ('Kaiyi', 'CLUB', 6, 0),
    ('Passline', 'CLUB', 4, 0),
    ('Sanatorio', 'CLUB', 5, 0),
    ('CMPC', 'CLUB', 3, 0),
    ('CBM', 'CLUB', 5, 0),
    ('Sodimac', 'CLUB', 2, 0),
    ('CC Zero Azucar', 'CLUB', 0, 0),
    ('Epicbet', 'CLUB', 5, 0),
    ('Redbull', 'CLUB', 2, 0),
    ('El Conce', 'CLUB', 4, 0),
    ('Chile Pastos', 'CLUB', 4, 0),
    ('BETANO', 'LIONS', 12, 4),
    ('AP ROYAL', 'LIONS', 12, 0),
    ('COOLBET', 'LIONS', 6, 0),
    ('1XBET', 'LIONS', 6, 0),
    ('LIONS', 'LIONS', 0, 1),
    ('BETCHILE', 'LIONS', 0, 3),
    ('EPICBET', 'LIONS', 2, 1),
    ('NOVIBET', 'LIONS', 2, 1),
    ('MARATHON', 'LIONS', 0, 0)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = '7a089cda-846f-4ee6-a867-183127b68adb'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT '7a089cda-846f-4ee6-a867-183127b68adb', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = '7a089cda-846f-4ee6-a867-183127b68adb'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = '7a089cda-846f-4ee6-a867-183127b68adb'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

-- ================================================================
-- 6. ALIANZA ATLÉTICO SULLANA (e391e466-299a-4d7e-8b53-91157b0c4022)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('BETANO', 'LIONS', 20::numeric, 8::numeric),
    ('PROSEGUR', 'LIONS', 5, 1),
    ('JETSMART', 'LIONS', 5, 1),
    ('IPESA', 'LIONS', 4, 1),
    ('FRIDAYS', 'LIONS', 3, 0),
    ('SKY', 'LIONS', 5, 2),
    ('CHEMA', 'LIONS', 3, 1),
    ('LIONS', 'LIONS', 3, 1),
    ('ICOCERT', 'LIONS', 1.5, 1.5),
    ('Sporade', 'CLUB', 2, 0),
    ('Nobavision', 'CLUB', 5, 0),
    ('Walon', 'CLUB', 6, 0),
    ('Manitsa', 'CLUB', 7, 0),
    ('Animación Club', 'CLUB', 0, 4)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = 'e391e466-299a-4d7e-8b53-91157b0c4022'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT 'e391e466-299a-4d7e-8b53-91157b0c4022', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = 'e391e466-299a-4d7e-8b53-91157b0c4022'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = 'e391e466-299a-4d7e-8b53-91157b0c4022'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

-- ================================================================
-- 7. JUAN PABLO II (26a7475b-b635-4011-898c-7af3618178af)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('BETANO', 'LIONS', 20::numeric, 7::numeric),
    ('PROSEGUR', 'LIONS', 5, 2),
    ('JETSMART', 'LIONS', 5, 2),
    ('IPESA', 'LIONS', 4, 2),
    ('FRIDAYS', 'LIONS', 3, 0),
    ('SKY', 'LIONS', 5, 2),
    ('CHEMA', 'LIONS', 3, 2),
    ('LIONS', 'LIONS', 3, 2),
    ('ICOCERT', 'LIONS', 1.5, 2.5),
    ('AT', 'CLUB', 9, 0),
    ('TECNOGRAS', 'CLUB', 3, 0),
    ('ALTOS', 'CLUB', 3, 0),
    ('USS', 'CLUB', 2, 0),
    ('POWERLYTE', 'CLUB', 2, 0),
    ('HOT BEC', 'CLUB', 2, 1)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = '26a7475b-b635-4011-898c-7af3618178af'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT '26a7475b-b635-4011-898c-7af3618178af', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = '26a7475b-b635-4011-898c-7af3618178af'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = '26a7475b-b635-4011-898c-7af3618178af'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

UPDATE clubs SET
  notes = null,
  updated_at = NOW()
WHERE id = '26a7475b-b635-4011-898c-7af3618178af';

-- ================================================================
-- 8. FC CAJAMARCA (fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('BETANO', 'LIONS', 30::numeric, 0::numeric),
    ('PROSEGUR', 'LIONS', 6, 0),
    ('JETSMART', 'LIONS', 6, 0),
    ('IPESA', 'LIONS', 5, 0),
    ('FRIDAYS', 'LIONS', 4, 0),
    ('SKY', 'LIONS', 7, 0),
    ('CHEMA', 'LIONS', 4, 0),
    ('LIONS', 'LIONS', 4, 0),
    ('ICOCERT', 'LIONS', 2, 0),
    ('Bitel', 'CLUB', 8, 0),
    ('Jorgito Luna', 'CLUB', 3, 0),
    ('IRZA Ingenieros', 'CLUB', 2, 0),
    ('Clínica Limatambo', 'CLUB', 2, 0),
    ('Sporade', 'CLUB', 2, 0),
    ('Convert', 'CLUB', 2, 0),
    ('Transporte Dias', 'CLUB', 2, 0),
    ('Hotel Puñunka', 'CLUB', 2, 0),
    ('HES', 'CLUB', 2, 0)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

UPDATE clubs SET
  status = 'activo',
  notes = 'SKY: Kick-off',
  updated_at = NOW()
WHERE id = 'fd1b5c18-f8b4-41a3-bd92-6a10afaf2f63';

-- ================================================================
-- 9. UNIVERSITARIO (b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7)
-- ================================================================
WITH target(name, category, minutes, bonified) AS (
  VALUES
    ('APUESTA TOTAL', 'LIONS', 34::numeric, 0::numeric),
    ('PROSEGUR', 'LIONS', 5, 1),
    ('JETSMART', 'LIONS', 5, 1),
    ('IPESA', 'LIONS', 4, 0),
    ('FRIDAYS', 'LIONS', 3, 0),
    ('SKY', 'LIONS', 6, 0),
    ('CHEMA', 'LIONS', 3, 0),
    ('LIONS', 'LIONS', 3, 0),
    ('ICOCERT', 'LIONS', 1.5, 0.5),
    ('APUESTA TOTAL', 'CLUB', 3, 0),
    ('JETOUR', 'CLUB', 3, 0),
    ('MARATHON', 'CLUB', 2, 0),
    ('BITEL', 'CLUB', 3, 0),
    ('MOVISUN', 'CLUB', 3, 0),
    ('OPALUX', 'CLUB', 2, 0),
    ('ALTOS', 'CLUB', 1, 0),
    ('ELECTROLIGHT', 'CLUB', 2, 0),
    ('KLAR', 'CLUB', 2, 0),
    ('SKY CLUB', 'CLUB', 2, 0),
    ('MODA', 'CLUB', 1, 0),
    ('BACKUS', 'CLUB', 1, 0),
    ('ESAN', 'CLUB', 1, 0)
),
upd AS (
  UPDATE clients c
  SET name = t.name,
      minutes = t.minutes,
      bonified = t.bonified,
      updated_at = NOW()
  FROM target t
  WHERE c.club_id = 'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7'
    AND LOWER(c.name) = LOWER(t.name)
    AND c.category = t.category
  RETURNING c.name
),
ins AS (
  INSERT INTO clients (club_id, name, category, minutes, bonified)
  SELECT 'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7', t.name, t.category, t.minutes, t.bonified
  FROM target t
  WHERE NOT EXISTS (
    SELECT 1 FROM clients c
    WHERE c.club_id = 'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7'
      AND LOWER(c.name) = LOWER(t.name)
      AND c.category = t.category
  )
)
DELETE FROM clients c
WHERE c.club_id = 'b9b6ccbf-bf2b-48e8-b67b-4b6fb4fc3ce7'
  AND NOT EXISTS (
    SELECT 1 FROM target t
    WHERE LOWER(t.name) = LOWER(c.name)
      AND t.category = c.category
  );

COMMIT;
