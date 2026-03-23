-- ═══════════════════════════════════════════════════════════════════════════
--  Muscu Tracker — Seed exercices
--  Migration 002 — Épaules, Biceps, Triceps, Jambes, Abdominaux & Tronc
-- ═══════════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════
-- ÉPAULES (Shoulders) — Parents
-- ═══════════════════════════════════════

INSERT INTO exercises (name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  ('Overhead Press',         'Développé militaire',            'overhead-press',    'shoulders', '{"triceps","traps"}',              'vertical_push', 'barbell',    'none', 'none', 'none', 'bilateral', true,  2),
  ('Lateral Raise',          'Élévation latérale',             'lateral-raise',     'shoulders', '{"traps"}',                        'isolation',     'dumbbell',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Front Raise',            'Élévation frontale',             'front-raise',       'shoulders', '{"traps","chest"}',                'isolation',     'dumbbell',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Reverse Fly',            'Oiseau',                         'reverse-fly',       'shoulders', '{"traps","rhomboids"}',            'horizontal_pull','dumbbell',  'none', 'none', 'none', 'bilateral', false, 2),
  ('Upright Row',            'Rowing menton',                  'upright-row',       'shoulders', '{"traps","biceps"}',               'vertical_pull', 'barbell',    'none', 'none', 'none', 'bilateral', true,  2),
  ('Arnold Press',           'Développé Arnold',               'arnold-press',      'shoulders', '{"triceps","traps"}',              'vertical_push', 'dumbbell',   'none', 'none', 'none', 'bilateral', true,  2),
  ('Shrug',                  'Haussement d''épaules',          'shrug',             'traps',     '{"shoulders"}',                   'isolation',     'barbell',    'none', 'none', 'none', 'bilateral', false, 1)
;

-- ═══════════════════════════════════════
-- ÉPAULES (Shoulders) — Variants
-- ═══════════════════════════════════════

INSERT INTO exercises (parent_exercise_id, name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  -- Overhead Press variants
  ((SELECT id FROM exercises WHERE slug = 'overhead-press'), 'Barbell Overhead Press Standing',         'Développé militaire barre debout',              'overhead-press-barbell-standing',          'shoulders', '{"triceps","traps"}',       'vertical_push', 'barbell',      'pronated', 'medium', 'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'overhead-press'), 'Barbell Overhead Press Seated',           'Développé militaire barre assis',               'overhead-press-barbell-seated',            'shoulders', '{"triceps","traps"}',       'vertical_push', 'barbell',      'pronated', 'medium', 'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'overhead-press'), 'Dumbbell Overhead Press Standing',        'Développé militaire haltères debout',           'overhead-press-dumbbell-standing',         'shoulders', '{"triceps","traps"}',       'vertical_push', 'dumbbell',     'neutral',  'medium', 'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'overhead-press'), 'Dumbbell Overhead Press Seated',          'Développé militaire haltères assis',            'overhead-press-dumbbell-seated',           'shoulders', '{"triceps","traps"}',       'vertical_push', 'dumbbell',     'neutral',  'medium', 'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'overhead-press'), 'Dumbbell Alternating Overhead Press',     'Développé militaire haltères alterné',          'overhead-press-dumbbell-alternating',      'shoulders', '{"triceps","traps"}',       'vertical_push', 'dumbbell',     'neutral',  'medium', 'none', 'unilateral', true,  2),
  ((SELECT id FROM exercises WHERE slug = 'overhead-press'), 'Smith Machine Overhead Press',            'Développé militaire Smith machine',             'overhead-press-smith-machine',             'shoulders', '{"triceps","traps"}',       'vertical_push', 'smith_machine','pronated', 'medium', 'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'overhead-press'), 'Behind The Neck Barbell Press',           'Développé nuque barre',                         'overhead-press-behind-neck-barbell',       'shoulders', '{"triceps","traps"}',       'vertical_push', 'barbell',      'pronated', 'wide',   'none', 'bilateral',  true,  3),

  -- Lateral Raise variants
  ((SELECT id FROM exercises WHERE slug = 'lateral-raise'),  'Dumbbell Lateral Raise Bilateral',        'Élévation latérale haltères bilatérale',        'lateral-raise-dumbbell-bilateral',         'shoulders', '{"traps"}',                 'isolation',     'dumbbell',     'neutral',  'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'lateral-raise'),  'Dumbbell Lateral Raise Unilateral',       'Élévation latérale haltère unilatérale',        'lateral-raise-dumbbell-unilateral',        'shoulders', '{"traps"}',                 'isolation',     'dumbbell',     'neutral',  'none',   'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'lateral-raise'),  'Cable Lateral Raise Bilateral',           'Élévation latérale poulie bilatérale',          'lateral-raise-cable-bilateral',            'shoulders', '{"traps"}',                 'isolation',     'cable',        'neutral',  'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'lateral-raise'),  'Cable Lateral Raise Unilateral',          'Élévation latérale poulie unilatérale',         'lateral-raise-cable-unilateral',           'shoulders', '{"traps"}',                 'isolation',     'cable',        'neutral',  'none',   'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'lateral-raise'),  'Machine Lateral Raise',                   'Élévation latérale machine',                    'lateral-raise-machine',                    'shoulders', '{"traps"}',                 'isolation',     'machine',      'neutral',  'none',   'none', 'bilateral',  false, 1),

  -- Front Raise variants
  ((SELECT id FROM exercises WHERE slug = 'front-raise'),    'Dumbbell Front Raise Bilateral',          'Élévation frontale haltères bilatérale',        'front-raise-dumbbell-bilateral',           'shoulders', '{"traps","chest"}',         'isolation',     'dumbbell',     'pronated', 'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'front-raise'),    'Dumbbell Front Raise Alternating',        'Élévation frontale haltères alternée',          'front-raise-dumbbell-alternating',         'shoulders', '{"traps","chest"}',         'isolation',     'dumbbell',     'pronated', 'none',   'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'front-raise'),    'Barbell Front Raise',                     'Élévation frontale barre',                      'front-raise-barbell',                      'shoulders', '{"traps","chest"}',         'isolation',     'barbell',      'pronated', 'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'front-raise'),    'Cable Front Raise',                       'Élévation frontale poulie',                     'front-raise-cable',                        'shoulders', '{"traps","chest"}',         'isolation',     'cable',        'pronated', 'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'front-raise'),    'Plate Front Raise',                       'Élévation frontale disque',                     'front-raise-plate',                        'shoulders', '{"traps","chest"}',         'isolation',     'other',        'neutral',  'none',   'none', 'bilateral',  false, 1),

  -- Reverse Fly variants
  ((SELECT id FROM exercises WHERE slug = 'reverse-fly'),    'Dumbbell Bent-Over Reverse Fly',          'Oiseau haltères penché',                        'reverse-fly-dumbbell-bent-over',           'shoulders', '{"traps","rhomboids"}',     'horizontal_pull','dumbbell',    'neutral',  'none',   'none', 'bilateral',  false, 2),
  ((SELECT id FROM exercises WHERE slug = 'reverse-fly'),    'Cable Reverse Fly Bilateral',             'Oiseau poulie bilatéral',                       'reverse-fly-cable-bilateral',              'shoulders', '{"traps","rhomboids"}',     'horizontal_pull','cable',       'neutral',  'none',   'none', 'bilateral',  false, 2),
  ((SELECT id FROM exercises WHERE slug = 'reverse-fly'),    'Cable Reverse Fly Unilateral',            'Oiseau poulie unilatéral',                      'reverse-fly-cable-unilateral',             'shoulders', '{"traps","rhomboids"}',     'horizontal_pull','cable',       'neutral',  'none',   'none', 'unilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'reverse-fly'),    'Machine Reverse Pec Deck',                'Pec deck inversé machine',                      'reverse-fly-machine-pec-deck',             'shoulders', '{"traps","rhomboids"}',     'horizontal_pull','machine',     'neutral',  'none',   'none', 'bilateral',  false, 1),

  -- Upright Row variants
  ((SELECT id FROM exercises WHERE slug = 'upright-row'),    'Barbell Upright Row Wide Grip',           'Rowing menton barre prise large',               'upright-row-barbell-wide',                 'shoulders', '{"traps","biceps"}',        'vertical_pull', 'barbell',      'pronated', 'wide',   'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'upright-row'),    'Barbell Upright Row Close Grip',          'Rowing menton barre prise serrée',              'upright-row-barbell-close',                'shoulders', '{"traps","biceps"}',        'vertical_pull', 'barbell',      'pronated', 'close',  'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'upright-row'),    'Dumbbell Upright Row',                    'Rowing menton haltères',                        'upright-row-dumbbell',                     'shoulders', '{"traps","biceps"}',        'vertical_pull', 'dumbbell',     'pronated', 'none',   'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'upright-row'),    'Cable Upright Row',                       'Rowing menton poulie',                          'upright-row-cable',                        'shoulders', '{"traps","biceps"}',        'vertical_pull', 'cable',        'pronated', 'medium', 'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'upright-row'),    'EZ Bar Upright Row',                      'Rowing menton barre EZ',                        'upright-row-ez-bar',                       'shoulders', '{"traps","biceps"}',        'vertical_pull', 'other',        'neutral',  'close',  'none', 'bilateral',  true,  2),

  -- Arnold Press variants
  ((SELECT id FROM exercises WHERE slug = 'arnold-press'),   'Arnold Press Seated',                     'Développé Arnold assis',                        'arnold-press-seated',                      'shoulders', '{"triceps","traps"}',       'vertical_push', 'dumbbell',     'neutral',  'none',   'none', 'bilateral',  true,  2),
  ((SELECT id FROM exercises WHERE slug = 'arnold-press'),   'Arnold Press Standing',                   'Développé Arnold debout',                       'arnold-press-standing',                    'shoulders', '{"triceps","traps"}',       'vertical_push', 'dumbbell',     'neutral',  'none',   'none', 'bilateral',  true,  3),
  ((SELECT id FROM exercises WHERE slug = 'arnold-press'),   'Arnold Press Unilateral',                 'Développé Arnold unilatéral',                   'arnold-press-unilateral',                  'shoulders', '{"triceps","traps"}',       'vertical_push', 'dumbbell',     'neutral',  'none',   'none', 'unilateral', true,  2),

  -- Shrug variants
  ((SELECT id FROM exercises WHERE slug = 'shrug'),          'Barbell Shrug',                           'Haussement d''épaules barre',                   'shrug-barbell',                            'traps',     '{"shoulders"}',             'isolation',     'barbell',      'pronated', 'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'shrug'),          'Dumbbell Shrug',                          'Haussement d''épaules haltères',                'shrug-dumbbell',                           'traps',     '{"shoulders"}',             'isolation',     'dumbbell',     'neutral',  'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'shrug'),          'Cable Shrug',                             'Haussement d''épaules poulie',                  'shrug-cable',                              'traps',     '{"shoulders"}',             'isolation',     'cable',        'pronated', 'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'shrug'),          'Trap Bar Shrug',                          'Haussement d''épaules trap bar',                'shrug-trap-bar',                           'traps',     '{"shoulders"}',             'isolation',     'trap_bar',     'neutral',  'none',   'none', 'bilateral',  false, 1)
;

-- ═══════════════════════════════════════
-- BICEPS — Parents
-- ═══════════════════════════════════════

INSERT INTO exercises (name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  ('Bicep Curl',        'Curl biceps',               'bicep-curl',        'biceps', '{"forearms"}',          'isolation', 'barbell',  'none', 'none', 'none', 'bilateral', false, 1),
  ('Hammer Curl',       'Curl marteau',              'hammer-curl',       'biceps', '{"forearms","brachialis"}', 'isolation', 'dumbbell', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Concentration Curl','Curl concentré',            'concentration-curl','biceps', '{"forearms"}',          'isolation', 'dumbbell', 'none', 'none', 'none', 'unilateral', false, 1),
  ('Preacher Curl',     'Curl pupitre',              'preacher-curl',     'biceps', '{"forearms"}',          'isolation', 'barbell',  'none', 'none', 'none', 'bilateral', false, 2),
  ('Cable Curl',        'Curl poulie',               'cable-curl',        'biceps', '{"forearms"}',          'isolation', 'cable',    'none', 'none', 'none', 'bilateral', false, 1),
  ('Spider Curl',       'Curl araignée',             'spider-curl',       'biceps', '{"forearms"}',          'isolation', 'barbell',  'none', 'none', 'none', 'bilateral', false, 2),
  ('Reverse Curl',      'Curl inversé',              'reverse-curl',      'forearms','{"biceps"}',           'isolation', 'barbell',  'none', 'none', 'none', 'bilateral', false, 1)
;

-- ═══════════════════════════════════════
-- BICEPS — Variants
-- ═══════════════════════════════════════

INSERT INTO exercises (parent_exercise_id, name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  -- Bicep Curl variants
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'Barbell Curl Standing',                  'Curl barre debout',                             'bicep-curl-barbell-standing',              'biceps', '{"forearms"}',          'isolation', 'barbell',  'supinated', 'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'Barbell Curl Seated',                    'Curl barre assis',                              'bicep-curl-barbell-seated',                'biceps', '{"forearms"}',          'isolation', 'barbell',  'supinated', 'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'Dumbbell Curl Standing',                 'Curl haltères debout',                          'bicep-curl-dumbbell-standing',             'biceps', '{"forearms"}',          'isolation', 'dumbbell', 'supinated', 'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'Dumbbell Curl Alternating',              'Curl haltères alterné',                         'bicep-curl-dumbbell-alternating',          'biceps', '{"forearms"}',          'isolation', 'dumbbell', 'supinated', 'none',   'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'Dumbbell Curl Seated',                   'Curl haltères assis',                           'bicep-curl-dumbbell-seated',               'biceps', '{"forearms"}',          'isolation', 'dumbbell', 'supinated', 'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'Incline Dumbbell Curl',                  'Curl haltères incliné',                         'bicep-curl-dumbbell-incline',              'biceps', '{"forearms"}',          'isolation', 'dumbbell', 'supinated', 'none', 'incline', 'bilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'EZ Bar Curl Standing',                   'Curl barre EZ debout',                          'bicep-curl-ez-bar-standing',               'biceps', '{"forearms"}',          'isolation', 'other',    'supinated', 'close',  'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'bicep-curl'), 'EZ Bar Curl Seated',                     'Curl barre EZ assis',                           'bicep-curl-ez-bar-seated',                 'biceps', '{"forearms"}',          'isolation', 'other',    'supinated', 'close',  'none', 'bilateral',  false, 1),

  -- Hammer Curl variants
  ((SELECT id FROM exercises WHERE slug = 'hammer-curl'), 'Dumbbell Hammer Curl Bilateral',        'Curl marteau haltères bilatéral',               'hammer-curl-dumbbell-bilateral',           'biceps', '{"forearms","brachialis"}', 'isolation', 'dumbbell', 'neutral', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'hammer-curl'), 'Dumbbell Hammer Curl Alternating',      'Curl marteau haltères alterné',                 'hammer-curl-dumbbell-alternating',         'biceps', '{"forearms","brachialis"}', 'isolation', 'dumbbell', 'neutral', 'none', 'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'hammer-curl'), 'Cable Rope Hammer Curl',                'Curl marteau corde poulie',                     'hammer-curl-cable-rope',                   'biceps', '{"forearms","brachialis"}', 'isolation', 'cable',    'neutral', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'hammer-curl'), 'Cross-Body Hammer Curl',                'Curl marteau croix du corps',                   'hammer-curl-cross-body',                   'biceps', '{"forearms","brachialis"}', 'isolation', 'dumbbell', 'neutral', 'none', 'none', 'unilateral', false, 1),

  -- Concentration Curl variants
  ((SELECT id FROM exercises WHERE slug = 'concentration-curl'), 'Dumbbell Concentration Curl Seated', 'Curl concentré haltère assis',              'concentration-curl-dumbbell-seated',       'biceps', '{"forearms"}',          'isolation', 'dumbbell', 'supinated', 'none', 'none', 'unilateral', false, 1),

  -- Preacher Curl variants
  ((SELECT id FROM exercises WHERE slug = 'preacher-curl'), 'Barbell Preacher Curl',               'Curl pupitre barre',                            'preacher-curl-barbell',                    'biceps', '{"forearms"}',          'isolation', 'barbell',  'supinated', 'medium', 'none', 'bilateral',  false, 2),
  ((SELECT id FROM exercises WHERE slug = 'preacher-curl'), 'Dumbbell Preacher Curl',              'Curl pupitre haltère',                          'preacher-curl-dumbbell',                   'biceps', '{"forearms"}',          'isolation', 'dumbbell', 'supinated', 'none',   'none', 'unilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'preacher-curl'), 'EZ Bar Preacher Curl',                'Curl pupitre barre EZ',                         'preacher-curl-ez-bar',                     'biceps', '{"forearms"}',          'isolation', 'other',    'supinated', 'close',  'none', 'bilateral',  false, 2),
  ((SELECT id FROM exercises WHERE slug = 'preacher-curl'), 'Machine Preacher Curl',               'Curl pupitre machine',                          'preacher-curl-machine',                    'biceps', '{"forearms"}',          'isolation', 'machine',  'supinated', 'none',   'none', 'bilateral',  false, 1),

  -- Cable Curl variants
  ((SELECT id FROM exercises WHERE slug = 'cable-curl'), 'Cable Curl Straight Bar',                'Curl poulie barre droite',                      'cable-curl-straight-bar',                  'biceps', '{"forearms"}',          'isolation', 'cable',    'supinated', 'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'cable-curl'), 'Cable Curl Rope',                        'Curl poulie corde',                             'cable-curl-rope',                          'biceps', '{"forearms"}',          'isolation', 'cable',    'neutral',   'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'cable-curl'), 'Cable Curl Single Arm',                  'Curl poulie bras unique',                       'cable-curl-single-arm',                    'biceps', '{"forearms"}',          'isolation', 'cable',    'supinated', 'none',   'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'cable-curl'), 'Low Pulley Cable Curl Supinated',        'Curl poulie basse supination',                  'cable-curl-low-supinated',                 'biceps', '{"forearms"}',          'isolation', 'cable',    'supinated', 'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'cable-curl'), 'Low Pulley Cable Curl Pronated',         'Curl poulie basse pronation',                   'cable-curl-low-pronated',                  'forearms','{"biceps"}',           'isolation', 'cable',    'pronated',  'none',   'none', 'bilateral',  false, 1),

  -- Spider Curl variants
  ((SELECT id FROM exercises WHERE slug = 'spider-curl'), 'Barbell Spider Curl',                   'Curl araignée barre',                           'spider-curl-barbell',                      'biceps', '{"forearms"}',          'isolation', 'barbell',  'supinated', 'medium', 'none', 'bilateral',  false, 2),
  ((SELECT id FROM exercises WHERE slug = 'spider-curl'), 'Dumbbell Spider Curl',                  'Curl araignée haltères',                        'spider-curl-dumbbell',                     'biceps', '{"forearms"}',          'isolation', 'dumbbell', 'supinated', 'none',   'none', 'bilateral',  false, 2),

  -- Reverse Curl variants
  ((SELECT id FROM exercises WHERE slug = 'reverse-curl'), 'Barbell Reverse Curl',                 'Curl inversé barre',                            'reverse-curl-barbell',                     'forearms','{"biceps"}',           'isolation', 'barbell',  'pronated',  'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'reverse-curl'), 'EZ Bar Reverse Curl',                  'Curl inversé barre EZ',                         'reverse-curl-ez-bar',                      'forearms','{"biceps"}',           'isolation', 'other',    'pronated',  'close',  'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'reverse-curl'), 'Cable Reverse Curl',                   'Curl inversé poulie',                           'reverse-curl-cable',                       'forearms','{"biceps"}',           'isolation', 'cable',    'pronated',  'medium', 'none', 'bilateral',  false, 1)
;

-- ═══════════════════════════════════════
-- TRICEPS — Parents
-- ═══════════════════════════════════════

INSERT INTO exercises (name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  ('Triceps Pushdown',              'Extension triceps poulie haute',   'triceps-pushdown',          'triceps', '{"forearms"}',          'isolation',      'cable',      'none', 'none', 'none', 'bilateral', false, 1),
  ('Skull Crusher',                 'Barre au front',                   'skull-crusher',             'triceps', '{"forearms"}',          'isolation',      'barbell',    'none', 'none', 'flat', 'bilateral', false, 2),
  ('Overhead Triceps Extension',    'Extension triceps au-dessus tête', 'overhead-triceps-extension','triceps', '{"forearms"}',          'isolation',      'dumbbell',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Triceps Dip',                   'Dips triceps',                     'triceps-dip',               'triceps', '{"chest","shoulders"}', 'horizontal_push','bodyweight', 'none', 'none', 'none', 'bilateral', true,  2),
  ('Close Grip Bench Press',        'Développé serré',                  'close-grip-bench-press',    'triceps', '{"chest","shoulders"}', 'horizontal_push','barbell',    'none', 'none', 'flat', 'bilateral', true,  2),
  ('Triceps Kickback',              'Kickback triceps',                 'triceps-kickback',          'triceps', '{"forearms"}',          'isolation',      'dumbbell',   'none', 'none', 'none', 'unilateral',false, 1)
;

-- ═══════════════════════════════════════
-- TRICEPS — Variants
-- ═══════════════════════════════════════

INSERT INTO exercises (parent_exercise_id, name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  -- Triceps Pushdown variants
  ((SELECT id FROM exercises WHERE slug = 'triceps-pushdown'), 'Triceps Pushdown Cable Bar Pronated',   'Extension triceps poulie barre pronation',    'triceps-pushdown-bar-pronated',            'triceps', '{"forearms"}', 'isolation', 'cable', 'pronated',  'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'triceps-pushdown'), 'Triceps Pushdown Cable Bar Supinated',  'Extension triceps poulie barre supination',   'triceps-pushdown-bar-supinated',           'triceps', '{"forearms"}', 'isolation', 'cable', 'supinated', 'medium', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'triceps-pushdown'), 'Triceps Pushdown Rope',                 'Extension triceps poulie corde',              'triceps-pushdown-rope',                    'triceps', '{"forearms"}', 'isolation', 'cable', 'neutral',   'none',   'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'triceps-pushdown'), 'Triceps Pushdown Single Arm',           'Extension triceps poulie bras unique',        'triceps-pushdown-single-arm',              'triceps', '{"forearms"}', 'isolation', 'cable', 'pronated',  'none',   'none', 'unilateral', false, 1),

  -- Skull Crusher variants
  ((SELECT id FROM exercises WHERE slug = 'skull-crusher'), 'Barbell Skull Crusher Flat',              'Barre au front plat',                         'skull-crusher-barbell-flat',               'triceps', '{"forearms"}', 'isolation', 'barbell',  'pronated', 'medium', 'flat',    'bilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'skull-crusher'), 'Barbell Skull Crusher Decline',           'Barre au front décliné',                      'skull-crusher-barbell-decline',            'triceps', '{"forearms"}', 'isolation', 'barbell',  'pronated', 'medium', 'decline', 'bilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'skull-crusher'), 'EZ Bar Skull Crusher',                    'Barre au front barre EZ',                     'skull-crusher-ez-bar',                     'triceps', '{"forearms"}', 'isolation', 'other',    'neutral',  'close',  'flat',    'bilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'skull-crusher'), 'Dumbbell Skull Crusher',                  'Barre au front haltères',                     'skull-crusher-dumbbell',                   'triceps', '{"forearms"}', 'isolation', 'dumbbell', 'neutral',  'none',   'flat',    'bilateral', false, 2),

  -- Overhead Triceps Extension variants
  ((SELECT id FROM exercises WHERE slug = 'overhead-triceps-extension'), 'Overhead Triceps Extension Dumbbell Bilateral',  'Extension triceps tête haltères bilatéral',  'overhead-triceps-extension-dumbbell-bilateral', 'triceps', '{"forearms"}', 'isolation', 'dumbbell', 'neutral', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'overhead-triceps-extension'), 'Overhead Triceps Extension Dumbbell Unilateral', 'Extension triceps tête haltère unilatéral', 'overhead-triceps-extension-dumbbell-unilateral','triceps', '{"forearms"}', 'isolation', 'dumbbell', 'neutral', 'none', 'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'overhead-triceps-extension'), 'Overhead Triceps Extension EZ Bar',              'Extension triceps tête barre EZ',            'overhead-triceps-extension-ez-bar',            'triceps', '{"forearms"}', 'isolation', 'other',    'neutral', 'close','none', 'bilateral',  false, 2),
  ((SELECT id FROM exercises WHERE slug = 'overhead-triceps-extension'), 'Overhead Triceps Extension Cable Rope',          'Extension triceps tête corde poulie',        'overhead-triceps-extension-cable-rope',        'triceps', '{"forearms"}', 'isolation', 'cable',    'neutral', 'none', 'none', 'bilateral',  false, 1),

  -- Triceps Dip variants
  ((SELECT id FROM exercises WHERE slug = 'triceps-dip'), 'Triceps Dip Bench',                         'Dips triceps banc',                           'triceps-dip-bench',                        'triceps', '{"chest","shoulders"}', 'horizontal_push', 'bodyweight', 'neutral', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'triceps-dip'), 'Triceps Dip Parallel Bars',                 'Dips triceps barres parallèles',              'triceps-dip-parallel-bars',                'triceps', '{"chest","shoulders"}', 'horizontal_push', 'bodyweight', 'neutral', 'none', 'none', 'bilateral', true,  2),
  ((SELECT id FROM exercises WHERE slug = 'triceps-dip'), 'Assisted Triceps Dip',                      'Dips triceps assisté machine',                'triceps-dip-assisted',                     'triceps', '{"chest","shoulders"}', 'horizontal_push', 'machine',    'neutral', 'none', 'none', 'bilateral', true,  1),

  -- Close Grip Bench Press variants
  ((SELECT id FROM exercises WHERE slug = 'close-grip-bench-press'), 'Close Grip Bench Press Barbell Flat',    'Développé serré barre plat',             'close-grip-bench-press-barbell-flat',      'triceps', '{"chest","shoulders"}', 'horizontal_push', 'barbell',      'pronated', 'close', 'flat', 'bilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'close-grip-bench-press'), 'Close Grip Bench Press Smith Machine',   'Développé serré Smith machine',          'close-grip-bench-press-smith-machine',     'triceps', '{"chest","shoulders"}', 'horizontal_push', 'smith_machine','pronated', 'close', 'flat', 'bilateral', true, 2),

  -- Kickback variants
  ((SELECT id FROM exercises WHERE slug = 'triceps-kickback'), 'Dumbbell Kickback Unilateral',          'Kickback haltère unilatéral',                'triceps-kickback-dumbbell-unilateral',     'triceps', '{"forearms"}', 'isolation', 'dumbbell', 'neutral', 'none', 'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'triceps-kickback'), 'Cable Kickback Unilateral',             'Kickback poulie unilatéral',                 'triceps-kickback-cable-unilateral',        'triceps', '{"forearms"}', 'isolation', 'cable',    'neutral', 'none', 'none', 'unilateral', false, 1)
;

-- ═══════════════════════════════════════
-- JAMBES (Legs) — Parents
-- ═══════════════════════════════════════

INSERT INTO exercises (name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  ('Squat',              'Squat',                        'squat',              'quads',      '{"glutes","hamstrings","lower_back"}', 'squat',   'barbell',    'none', 'none', 'none', 'bilateral', true,  2),
  ('Leg Press',          'Presse à cuisses',             'leg-press',          'quads',      '{"glutes","hamstrings"}',             'squat',   'machine',    'none', 'none', 'none', 'bilateral', true,  1),
  ('Lunge',              'Fente',                        'lunge',              'quads',      '{"glutes","hamstrings"}',             'lunge',   'bodyweight', 'none', 'none', 'none', 'unilateral',true,  2),
  ('Bulgarian Split Squat','Squat bulgare',              'bulgarian-split-squat','quads',    '{"glutes","hamstrings"}',             'lunge',   'bodyweight', 'none', 'none', 'none', 'unilateral',true,  3),
  ('Leg Extension',      'Extension jambes',             'leg-extension',      'quads',      '{}',                                  'isolation','machine',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Leg Curl',           'Curl jambes',                  'leg-curl',           'hamstrings', '{"glutes","calves"}',                 'isolation','machine',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Hip Thrust',         'Hip thrust',                   'hip-thrust',         'glutes',     '{"hamstrings","lower_back"}',         'hinge',   'barbell',    'none', 'none', 'none', 'bilateral', true,  2),
  ('Glute Bridge',       'Pont fessier',                 'glute-bridge',       'glutes',     '{"hamstrings","lower_back"}',         'hinge',   'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Calf Raise',         'Extension mollets',            'calf-raise',         'calves',     '{}',                                  'isolation','machine',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Step Up',            'Montée sur banc',              'step-up',            'quads',      '{"glutes","hamstrings"}',             'lunge',   'dumbbell',   'none', 'none', 'none', 'unilateral',true,  2),
  ('Sumo Squat',         'Squat sumo',                   'sumo-squat',         'quads',      '{"glutes","hamstrings","adductors"}', 'squat',   'barbell',    'none', 'none', 'none', 'bilateral', true,  2),
  ('Wall Sit',           'Chaise murale',                'wall-sit',           'quads',      '{"glutes","hamstrings"}',             'squat',   'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Box Jump',           'Saut sur box',                 'box-jump',           'quads',      '{"glutes","hamstrings","calves"}',    'squat',   'bodyweight', 'none', 'none', 'none', 'bilateral', true,  2),
  ('Adductor Machine',   'Machine adducteurs',           'adductor-machine',   'quads',      '{}',                                  'isolation','machine',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Abductor Machine',   'Machine abducteurs',           'abductor-machine',   'glutes',     '{}',                                  'isolation','machine',   'none', 'none', 'none', 'bilateral', false, 1),
  ('Romanian Deadlift Dumbbell','Soulevé de terre roumain haltères','rdl-dumbbell','hamstrings','{"glutes","lower_back"}',          'hinge',   'dumbbell',   'none', 'none', 'none', 'bilateral', true,  2)
;

-- ═══════════════════════════════════════
-- JAMBES (Legs) — Variants
-- ═══════════════════════════════════════

INSERT INTO exercises (parent_exercise_id, name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  -- Squat variants
  ((SELECT id FROM exercises WHERE slug = 'squat'), 'Barbell Squat High Bar',              'Squat barre haute',                          'squat-barbell-high-bar',                   'quads',      '{"glutes","hamstrings","lower_back"}', 'squat', 'barbell',      'pronated', 'wide',   'none', 'bilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'squat'), 'Barbell Squat Low Bar',               'Squat barre basse',                          'squat-barbell-low-bar',                    'quads',      '{"glutes","hamstrings","lower_back"}', 'squat', 'barbell',      'pronated', 'wide',   'none', 'bilateral', true, 3),
  ((SELECT id FROM exercises WHERE slug = 'squat'), 'Goblet Squat Dumbbell',               'Squat goblet haltère',                       'squat-goblet-dumbbell',                    'quads',      '{"glutes","hamstrings"}',             'squat', 'dumbbell',     'neutral',  'none',   'none', 'bilateral', true, 1),
  ((SELECT id FROM exercises WHERE slug = 'squat'), 'Smith Machine Squat',                 'Squat Smith machine',                        'squat-smith-machine',                      'quads',      '{"glutes","hamstrings"}',             'squat', 'smith_machine','pronated', 'medium', 'none', 'bilateral', true, 1),
  ((SELECT id FROM exercises WHERE slug = 'squat'), 'Hack Squat Machine',                  'Squat hack machine',                         'squat-hack-machine',                       'quads',      '{"glutes","hamstrings"}',             'squat', 'machine',      'none',     'none',   'none', 'bilateral', true, 1),
  ((SELECT id FROM exercises WHERE slug = 'squat'), 'Landmine Squat',                      'Squat landmine',                             'squat-landmine',                           'quads',      '{"glutes","hamstrings"}',             'squat', 'barbell',      'neutral',  'none',   'none', 'bilateral', true, 2),

  -- Leg Press variants
  ((SELECT id FROM exercises WHERE slug = 'leg-press'), 'Leg Press 45 Bilateral',          'Presse 45° bilatérale',                      'leg-press-45-bilateral',                   'quads',      '{"glutes","hamstrings"}',             'squat', 'machine', 'none', 'none', 'none', 'bilateral',  true, 1),
  ((SELECT id FROM exercises WHERE slug = 'leg-press'), 'Leg Press 45 Unilateral',         'Presse 45° unilatérale',                     'leg-press-45-unilateral',                  'quads',      '{"glutes","hamstrings"}',             'squat', 'machine', 'none', 'none', 'none', 'unilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'leg-press'), 'Horizontal Leg Press',            'Presse horizontale',                         'leg-press-horizontal',                     'quads',      '{"glutes","hamstrings"}',             'squat', 'machine', 'none', 'none', 'none', 'bilateral',  true, 1),

  -- Lunge variants
  ((SELECT id FROM exercises WHERE slug = 'lunge'), 'Barbell Walking Lunge',               'Fente marchée barre',                        'lunge-barbell-walking',                    'quads',      '{"glutes","hamstrings"}', 'lunge', 'barbell',  'pronated', 'medium', 'none', 'unilateral', true, 3),
  ((SELECT id FROM exercises WHERE slug = 'lunge'), 'Barbell Stationary Lunge',            'Fente statique barre',                       'lunge-barbell-stationary',                 'quads',      '{"glutes","hamstrings"}', 'lunge', 'barbell',  'pronated', 'medium', 'none', 'unilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'lunge'), 'Dumbbell Walking Lunge',              'Fente marchée haltères',                     'lunge-dumbbell-walking',                   'quads',      '{"glutes","hamstrings"}', 'lunge', 'dumbbell', 'neutral',  'none',   'none', 'unilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'lunge'), 'Dumbbell Stationary Lunge',           'Fente statique haltères',                    'lunge-dumbbell-stationary',                'quads',      '{"glutes","hamstrings"}', 'lunge', 'dumbbell', 'neutral',  'none',   'none', 'unilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'lunge'), 'Dumbbell Reverse Lunge',              'Fente arrière haltères',                     'lunge-dumbbell-reverse',                   'quads',      '{"glutes","hamstrings"}', 'lunge', 'dumbbell', 'neutral',  'none',   'none', 'unilateral', true, 2),

  -- Bulgarian Split Squat variants
  ((SELECT id FROM exercises WHERE slug = 'bulgarian-split-squat'), 'Bulgarian Split Squat Barbell',   'Squat bulgare barre',               'bulgarian-split-squat-barbell',            'quads',      '{"glutes","hamstrings"}', 'lunge', 'barbell',  'pronated', 'medium', 'none', 'unilateral', true, 3),
  ((SELECT id FROM exercises WHERE slug = 'bulgarian-split-squat'), 'Bulgarian Split Squat Dumbbell',  'Squat bulgare haltères',            'bulgarian-split-squat-dumbbell',           'quads',      '{"glutes","hamstrings"}', 'lunge', 'dumbbell', 'neutral',  'none',   'none', 'unilateral', true, 3),

  -- Leg Extension variants
  ((SELECT id FROM exercises WHERE slug = 'leg-extension'), 'Leg Extension Machine Bilateral',         'Extension jambes machine bilatérale',        'leg-extension-machine-bilateral',          'quads', '{}', 'isolation', 'machine', 'none', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'leg-extension'), 'Leg Extension Machine Unilateral',        'Extension jambes machine unilatérale',       'leg-extension-machine-unilateral',         'quads', '{}', 'isolation', 'machine', 'none', 'none', 'none', 'unilateral', false, 1),

  -- Leg Curl variants
  ((SELECT id FROM exercises WHERE slug = 'leg-curl'), 'Lying Leg Curl Machine Bilateral',             'Curl jambes couché machine bilatéral',       'leg-curl-lying-bilateral',                 'hamstrings', '{"glutes","calves"}', 'isolation', 'machine', 'none', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'leg-curl'), 'Lying Leg Curl Machine Unilateral',            'Curl jambes couché machine unilatéral',      'leg-curl-lying-unilateral',                'hamstrings', '{"glutes","calves"}', 'isolation', 'machine', 'none', 'none', 'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'leg-curl'), 'Seated Leg Curl Machine',                      'Curl jambes assis machine',                  'leg-curl-seated-machine',                  'hamstrings', '{"glutes","calves"}', 'isolation', 'machine', 'none', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'leg-curl'), 'Cable Standing Leg Curl Unilateral',           'Curl jambes debout poulie unilatéral',       'leg-curl-cable-standing-unilateral',       'hamstrings', '{"glutes","calves"}', 'isolation', 'cable',   'none', 'none', 'none', 'unilateral', false, 1),

  -- Hip Thrust variants
  ((SELECT id FROM exercises WHERE slug = 'hip-thrust'), 'Barbell Hip Thrust',                         'Hip thrust barre',                           'hip-thrust-barbell',                       'glutes', '{"hamstrings","lower_back"}', 'hinge', 'barbell',  'none', 'none', 'none', 'bilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'hip-thrust'), 'Dumbbell Hip Thrust',                        'Hip thrust haltère',                         'hip-thrust-dumbbell',                      'glutes', '{"hamstrings","lower_back"}', 'hinge', 'dumbbell', 'none', 'none', 'none', 'bilateral', true, 1),
  ((SELECT id FROM exercises WHERE slug = 'hip-thrust'), 'Machine Hip Thrust',                         'Hip thrust machine',                         'hip-thrust-machine',                       'glutes', '{"hamstrings","lower_back"}', 'hinge', 'machine',  'none', 'none', 'none', 'bilateral', true, 1),

  -- Glute Bridge variants
  ((SELECT id FROM exercises WHERE slug = 'glute-bridge'), 'Glute Bridge Bodyweight',                  'Pont fessier au poids du corps',             'glute-bridge-bodyweight',                  'glutes', '{"hamstrings","lower_back"}', 'hinge', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'glute-bridge'), 'Glute Bridge Barbell',                     'Pont fessier barre',                         'glute-bridge-barbell',                     'glutes', '{"hamstrings","lower_back"}', 'hinge', 'barbell',    'none', 'none', 'none', 'bilateral', false, 1),

  -- Calf Raise variants
  ((SELECT id FROM exercises WHERE slug = 'calf-raise'), 'Standing Calf Raise Machine',                'Extension mollets debout machine',           'calf-raise-standing-machine',              'calves', '{}', 'isolation', 'machine',    'none', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'calf-raise'), 'Seated Calf Raise Machine',                  'Extension mollets assis machine',            'calf-raise-seated-machine',                'calves', '{}', 'isolation', 'machine',    'none', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'calf-raise'), 'Leg Press Calf Raise',                       'Extension mollets à la presse',              'calf-raise-leg-press',                     'calves', '{}', 'isolation', 'machine',    'none', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'calf-raise'), 'Dumbbell Calf Raise Unilateral',             'Extension mollets haltère unilatéral',       'calf-raise-dumbbell-unilateral',           'calves', '{}', 'isolation', 'dumbbell',   'none', 'none', 'none', 'unilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'calf-raise'), 'Bodyweight Calf Raise Bilateral',            'Extension mollets poids du corps bilatéral', 'calf-raise-bodyweight-bilateral',          'calves', '{}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral',  false, 1),
  ((SELECT id FROM exercises WHERE slug = 'calf-raise'), 'Bodyweight Calf Raise Unilateral',           'Extension mollets poids du corps unilatéral','calf-raise-bodyweight-unilateral',         'calves', '{}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'unilateral', false, 1),

  -- Step Up variants
  ((SELECT id FROM exercises WHERE slug = 'step-up'), 'Dumbbell Step Up',                              'Montée sur banc haltères',                   'step-up-dumbbell',                         'quads', '{"glutes","hamstrings"}', 'lunge', 'dumbbell', 'neutral', 'none', 'none', 'unilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'step-up'), 'Barbell Step Up',                               'Montée sur banc barre',                      'step-up-barbell',                          'quads', '{"glutes","hamstrings"}', 'lunge', 'barbell',  'pronated','medium','none', 'unilateral', true, 3),

  -- Sumo Squat variants
  ((SELECT id FROM exercises WHERE slug = 'sumo-squat'), 'Barbell Sumo Squat',                         'Squat sumo barre',                           'sumo-squat-barbell',                       'quads', '{"glutes","hamstrings","adductors"}', 'squat', 'barbell',  'pronated', 'wide', 'none', 'bilateral', true, 2),
  ((SELECT id FROM exercises WHERE slug = 'sumo-squat'), 'Dumbbell Sumo Squat',                        'Squat sumo haltère',                         'sumo-squat-dumbbell',                      'quads', '{"glutes","hamstrings","adductors"}', 'squat', 'dumbbell', 'neutral',  'none','none', 'bilateral', true, 1),

  -- Wall Sit variants
  ((SELECT id FROM exercises WHERE slug = 'wall-sit'), 'Wall Sit Bodyweight',                          'Chaise murale au poids du corps',            'wall-sit-bodyweight',                      'quads', '{"glutes","hamstrings"}', 'squat', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),

  -- Box Jump variants
  ((SELECT id FROM exercises WHERE slug = 'box-jump'), 'Box Jump Bodyweight',                          'Saut sur box poids du corps',                'box-jump-bodyweight',                      'quads', '{"glutes","hamstrings","calves"}', 'squat', 'bodyweight', 'none', 'none', 'none', 'bilateral', true, 2)
;

-- ═══════════════════════════════════════
-- ABDOMINAUX & TRONC (Abs & Core) — Parents
-- ═══════════════════════════════════════

INSERT INTO exercises (name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  ('Crunch',             'Crunch abdominal',             'crunch',             'abs', '{}',               'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Sit-Up',             'Relevé de buste',              'sit-up',             'abs', '{"hip_flexors"}',  'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Plank',              'Gainage',                      'plank',              'abs', '{"lower_back","shoulders"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Leg Raise',          'Levée de jambes',              'leg-raise',          'abs', '{"hip_flexors"}',  'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Ab Wheel Rollout',   'Roue abdominale',              'ab-wheel-rollout',   'abs', '{"lower_back","shoulders"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 3),
  ('Russian Twist',      'Rotation russe',               'russian-twist',      'abs', '{"lower_back"}',   'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 2),
  ('Cable Crunch',       'Crunch poulie',                'cable-crunch',       'abs', '{}',               'isolation', 'cable',      'none', 'none', 'none', 'bilateral', false, 1),
  ('Wood Chop',          'Bûcheron',                     'wood-chop',          'abs', '{"shoulders","lower_back"}', 'isolation', 'cable', 'none', 'none', 'none', 'bilateral', false, 2),
  ('Bicycle Crunch',     'Crunch vélo',                  'bicycle-crunch',     'abs', '{}',               'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ('Mountain Climber',   'Grimpeur de montagne',         'mountain-climber',   'abs', '{"shoulders","hip_flexors"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 2),
  ('Dragon Flag',        'Drapeau dragon',               'dragon-flag',        'abs', '{"lower_back","shoulders"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 3)
;

-- ═══════════════════════════════════════
-- ABDOMINAUX & TRONC (Abs & Core) — Variants
-- ═══════════════════════════════════════

INSERT INTO exercises (parent_exercise_id, name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  -- Crunch variants
  ((SELECT id FROM exercises WHERE slug = 'crunch'), 'Crunch Bodyweight Floor',             'Crunch au sol poids du corps',               'crunch-bodyweight-floor',                  'abs', '{}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'crunch'), 'Machine Crunch',                      'Crunch machine',                             'crunch-machine',                           'abs', '{}', 'isolation', 'machine',    'none', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'crunch'), 'Cable Crunch Standing',               'Crunch poulie debout',                       'crunch-cable-standing',                    'abs', '{}', 'isolation', 'cable',      'none', 'none', 'none', 'bilateral', false, 1),

  -- Sit-Up variants
  ((SELECT id FROM exercises WHERE slug = 'sit-up'), 'Bodyweight Sit-Up',                   'Relevé de buste poids du corps',             'sit-up-bodyweight',                        'abs', '{"hip_flexors"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'sit-up'), 'Weighted Sit-Up',                     'Relevé de buste lesté',                      'sit-up-weighted',                          'abs', '{"hip_flexors"}', 'isolation', 'other',      'none', 'none', 'none', 'bilateral', false, 2),

  -- Plank variants
  ((SELECT id FROM exercises WHERE slug = 'plank'), 'Forearm Plank Bodyweight',             'Gainage avant-bras poids du corps',          'plank-forearm-bodyweight',                 'abs', '{"lower_back","shoulders"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'plank'), 'Side Plank',                           'Gainage latéral',                            'plank-side',                               'abs', '{"lower_back","shoulders"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'unilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'plank'), 'Weighted Plank',                       'Gainage lesté',                              'plank-weighted',                           'abs', '{"lower_back","shoulders"}', 'isolation', 'other',      'none', 'none', 'none', 'bilateral', false, 2),

  -- Leg Raise variants
  ((SELECT id FROM exercises WHERE slug = 'leg-raise'), 'Lying Leg Raise Bodyweight',       'Levée de jambes allongé',                    'leg-raise-lying-bodyweight',               'abs', '{"hip_flexors"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'leg-raise'), 'Hanging Leg Raise',                'Levée de jambes suspendu',                   'leg-raise-hanging',                        'abs', '{"hip_flexors"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'leg-raise'), 'Captain''s Chair Leg Raise',       'Levée de jambes chaise capitaine',           'leg-raise-captains-chair',                 'abs', '{"hip_flexors"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 2),

  -- Ab Wheel Rollout variants
  ((SELECT id FROM exercises WHERE slug = 'ab-wheel-rollout'), 'Ab Wheel Rollout Bodyweight','Roue abdominale poids du corps',            'ab-wheel-rollout-bodyweight',              'abs', '{"lower_back","shoulders"}', 'isolation', 'bodyweight', 'neutral', 'none', 'none', 'bilateral', false, 3),

  -- Russian Twist variants
  ((SELECT id FROM exercises WHERE slug = 'russian-twist'), 'Russian Twist Bodyweight',      'Rotation russe poids du corps',             'russian-twist-bodyweight',                 'abs', '{"lower_back"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),
  ((SELECT id FROM exercises WHERE slug = 'russian-twist'), 'Russian Twist Weighted Plate',  'Rotation russe disque',                     'russian-twist-weighted-plate',             'abs', '{"lower_back"}', 'isolation', 'other',      'none', 'none', 'none', 'bilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'russian-twist'), 'Russian Twist Medicine Ball',   'Rotation russe médecine ball',              'russian-twist-medicine-ball',              'abs', '{"lower_back"}', 'isolation', 'other',      'none', 'none', 'none', 'bilateral', false, 2),

  -- Cable Crunch variants
  ((SELECT id FROM exercises WHERE slug = 'cable-crunch'), 'Cable Crunch Kneeling',          'Crunch poulie à genoux',                    'cable-crunch-kneeling',                    'abs', '{}', 'isolation', 'cable', 'none', 'none', 'none', 'bilateral', false, 1),

  -- Wood Chop variants
  ((SELECT id FROM exercises WHERE slug = 'wood-chop'), 'Cable Wood Chop High to Low',      'Bûcheron poulie haut vers bas',              'wood-chop-cable-high-to-low',              'abs', '{"shoulders","lower_back"}', 'isolation', 'cable',    'neutral', 'none', 'none', 'unilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'wood-chop'), 'Cable Wood Chop Low to High',      'Bûcheron poulie bas vers haut',              'wood-chop-cable-low-to-high',              'abs', '{"shoulders","lower_back"}', 'isolation', 'cable',    'neutral', 'none', 'none', 'unilateral', false, 2),
  ((SELECT id FROM exercises WHERE slug = 'wood-chop'), 'Dumbbell Wood Chop',               'Bûcheron haltère',                           'wood-chop-dumbbell',                       'abs', '{"shoulders","lower_back"}', 'isolation', 'dumbbell', 'neutral', 'none', 'none', 'unilateral', false, 2),

  -- Bicycle Crunch variants
  ((SELECT id FROM exercises WHERE slug = 'bicycle-crunch'), 'Bicycle Crunch Bodyweight',   'Crunch vélo poids du corps',                 'bicycle-crunch-bodyweight',                'abs', '{}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),

  -- Mountain Climber variants
  ((SELECT id FROM exercises WHERE slug = 'mountain-climber'), 'Mountain Climber Bodyweight','Grimpeur de montagne poids du corps',        'mountain-climber-bodyweight',              'abs', '{"shoulders","hip_flexors"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 2),

  -- Dragon Flag variants
  ((SELECT id FROM exercises WHERE slug = 'dragon-flag'), 'Dragon Flag Bodyweight',          'Drapeau dragon poids du corps',             'dragon-flag-bodyweight',                   'abs', '{"lower_back","shoulders"}', 'isolation', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 3)
;
