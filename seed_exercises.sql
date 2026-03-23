-- ═══════════════════════════════════════════════════════════════════════
-- SEED FILE: exercises
-- Two-pass approach: parents first (NULL parent_exercise_id), then variants
-- ═══════════════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════
-- PECTORAUX (Chest)
-- ═══════════════════════════════════════

-- Parents
INSERT INTO exercises (name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  ('Bench Press',         'Développé couché',          'bench-press',         'chest', '{"shoulders","triceps"}', 'horizontal_push', 'barbell',    'none', 'none',   'none', 'bilateral', true,  2),
  ('Chest Fly',           'Écarté poitrine',           'chest-fly',           'chest', '{"shoulders"}',           'isolation',       'dumbbell',   'none', 'none',   'none', 'bilateral', false, 2),
  ('Push-Up',             'Pompe',                     'push-up',             'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'none', 'none',   'none', 'bilateral', true,  1),
  ('Dips',                'Dips',                      'dips',                'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'none', 'none',   'none', 'bilateral', true,  2),
  ('Machine Chest Press', 'Développé couché machine',  'machine-chest-press', 'chest', '{"shoulders","triceps"}', 'horizontal_push', 'machine',    'none', 'none',   'none', 'bilateral', true,  1)
;

-- Variants
INSERT INTO exercises (parent_exercise_id, name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES

  -- ── Bench Press – Barbell Flat ──────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Barbell Bench Press Flat Wide Grip',
   'Développé couché barre prise large',
   'bench-press-barbell-flat-wide',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'barbell', 'pronated', 'wide', 'flat', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Barbell Bench Press Flat Medium Grip',
   'Développé couché barre prise normale',
   'bench-press-barbell-flat-medium',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'barbell', 'pronated', 'medium', 'flat', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Barbell Bench Press Flat Close Grip',
   'Développé couché barre prise serrée',
   'bench-press-barbell-flat-close',
   'chest', '{"triceps","shoulders"}', 'horizontal_push', 'barbell', 'pronated', 'close', 'flat', 'bilateral', true, 2),

  -- ── Bench Press – Barbell Incline ────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Barbell Incline Bench Press Wide Grip',
   'Développé incliné barre prise large',
   'bench-press-barbell-incline-wide',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'barbell', 'pronated', 'wide', 'incline', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Barbell Incline Bench Press Medium Grip',
   'Développé incliné barre prise normale',
   'bench-press-barbell-incline-medium',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'barbell', 'pronated', 'medium', 'incline', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Barbell Incline Bench Press Close Grip',
   'Développé incliné barre prise serrée',
   'bench-press-barbell-incline-close',
   'chest', '{"triceps","shoulders"}', 'horizontal_push', 'barbell', 'pronated', 'close', 'incline', 'bilateral', true, 2),

  -- ── Bench Press – Barbell Decline ────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Barbell Decline Bench Press',
   'Développé décliné barre',
   'bench-press-barbell-decline',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'barbell', 'pronated', 'medium', 'decline', 'bilateral', true, 2),

  -- ── Bench Press – Dumbbell ───────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Dumbbell Bench Press Flat',
   'Développé couché haltères plat',
   'bench-press-dumbbell-flat',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'dumbbell', 'neutral', 'medium', 'flat', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Dumbbell Incline Bench Press',
   'Développé incliné haltères',
   'bench-press-dumbbell-incline',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'dumbbell', 'neutral', 'medium', 'incline', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Dumbbell Decline Bench Press',
   'Développé décliné haltères',
   'bench-press-dumbbell-decline',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'dumbbell', 'neutral', 'medium', 'decline', 'bilateral', true, 2),

  -- ── Bench Press – Smith Machine ──────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Smith Machine Bench Press Flat',
   'Développé couché Smith machine plat',
   'bench-press-smith-flat',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'smith_machine', 'pronated', 'medium', 'flat', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'bench-press'),
   'Smith Machine Incline Bench Press',
   'Développé incliné Smith machine',
   'bench-press-smith-incline',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'smith_machine', 'pronated', 'medium', 'incline', 'bilateral', true, 1),

  -- ── Chest Fly – Dumbbell ─────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'chest-fly'),
   'Dumbbell Fly Flat',
   'Écarté haltères plat',
   'chest-fly-dumbbell-flat',
   'chest', '{"shoulders"}', 'isolation', 'dumbbell', 'neutral', 'medium', 'flat', 'bilateral', false, 2),

  ((SELECT id FROM exercises WHERE slug = 'chest-fly'),
   'Dumbbell Incline Fly',
   'Écarté haltères incliné',
   'chest-fly-dumbbell-incline',
   'chest', '{"shoulders"}', 'isolation', 'dumbbell', 'neutral', 'medium', 'incline', 'bilateral', false, 2),

  ((SELECT id FROM exercises WHERE slug = 'chest-fly'),
   'Dumbbell Decline Fly',
   'Écarté haltères décliné',
   'chest-fly-dumbbell-decline',
   'chest', '{"shoulders"}', 'isolation', 'dumbbell', 'neutral', 'medium', 'decline', 'bilateral', false, 2),

  -- ── Chest Fly – Cable ────────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'chest-fly'),
   'Cable Fly Low-to-High',
   'Écarté poulie basse vers haute',
   'chest-fly-cable-low-to-high',
   'chest', '{"shoulders"}', 'isolation', 'cable', 'neutral', 'medium', 'none', 'bilateral', false, 2),

  ((SELECT id FROM exercises WHERE slug = 'chest-fly'),
   'Cable Fly High-to-Low',
   'Écarté poulie haute vers basse',
   'chest-fly-cable-high-to-low',
   'chest', '{"shoulders"}', 'isolation', 'cable', 'neutral', 'medium', 'none', 'bilateral', false, 2),

  ((SELECT id FROM exercises WHERE slug = 'chest-fly'),
   'Cable Crossover Mid',
   'Croisé poulie milieu',
   'chest-fly-cable-crossover-mid',
   'chest', '{"shoulders"}', 'isolation', 'cable', 'neutral', 'medium', 'none', 'bilateral', false, 2),

  -- ── Chest Fly – Pec Deck ─────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'chest-fly'),
   'Pec Deck Machine Fly',
   'Écarté pec deck machine',
   'chest-fly-pec-deck',
   'chest', '{"shoulders"}', 'isolation', 'machine', 'neutral', 'medium', 'none', 'bilateral', false, 1),

  -- ── Push-Up Variants ─────────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'push-up'),
   'Push-Up Standard',
   'Pompe standard',
   'push-up-standard',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'pronated', 'medium', 'flat', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'push-up'),
   'Wide Push-Up',
   'Pompe prise large',
   'push-up-wide',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'pronated', 'wide', 'flat', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'push-up'),
   'Close Grip Diamond Push-Up',
   'Pompe diamant prise serrée',
   'push-up-diamond',
   'chest', '{"triceps","shoulders"}', 'horizontal_push', 'bodyweight', 'pronated', 'close', 'flat', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'push-up'),
   'Incline Push-Up',
   'Pompe inclinée',
   'push-up-incline',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'pronated', 'medium', 'incline', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'push-up'),
   'Decline Push-Up',
   'Pompe déclinée',
   'push-up-decline',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'pronated', 'medium', 'decline', 'bilateral', true, 2),

  -- ── Dips Variants ────────────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'dips'),
   'Chest Dips Bodyweight',
   'Dips pectoraux au poids du corps',
   'dips-chest-bodyweight',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'neutral', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'dips'),
   'Assisted Machine Dips',
   'Dips machine assistée',
   'dips-assisted-machine',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'machine', 'neutral', 'medium', 'none', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'dips'),
   'Weighted Dips',
   'Dips lestés',
   'dips-weighted',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'bodyweight', 'neutral', 'medium', 'none', 'bilateral', true, 3),

  -- ── Machine Chest Press Variants ─────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'machine-chest-press'),
   'Machine Chest Press Flat',
   'Développé couché machine plat',
   'machine-chest-press-flat',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'machine', 'neutral', 'medium', 'flat', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'machine-chest-press'),
   'Machine Chest Press Incline',
   'Développé couché machine incliné',
   'machine-chest-press-incline',
   'chest', '{"shoulders","triceps"}', 'horizontal_push', 'machine', 'neutral', 'medium', 'incline', 'bilateral', true, 1)
;


-- ═══════════════════════════════════════
-- DOS (Back)
-- ═══════════════════════════════════════

-- Parents
INSERT INTO exercises (name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES
  ('Pull-Up',            'Traction',                       'pull-up',           'lats',       '{"biceps","traps","rhomboids"}', 'vertical_pull',   'bodyweight',  'none', 'none',   'none', 'bilateral', true,  2),
  ('Lat Pulldown',       'Tirage vertical poulie haute',   'lat-pulldown',      'lats',       '{"biceps","traps"}',             'vertical_pull',   'cable',       'none', 'none',   'none', 'bilateral', true,  1),
  ('Barbell Row',        'Rowing barre',                   'barbell-row',       'back',       '{"biceps","traps","lats"}',      'horizontal_pull', 'barbell',     'none', 'none',   'none', 'bilateral', true,  2),
  ('Dumbbell Row',       'Rowing haltère',                 'dumbbell-row',      'back',       '{"biceps","traps","lats"}',      'horizontal_pull', 'dumbbell',    'none', 'none',   'none', 'bilateral', true,  2),
  ('Cable Row',          'Rowing poulie',                  'cable-row',         'back',       '{"biceps","traps","lats"}',      'horizontal_pull', 'cable',       'none', 'none',   'none', 'bilateral', true,  2),
  ('T-Bar Row',          'Rowing barre en T',              't-bar-row',         'back',       '{"biceps","traps","lats"}',      'horizontal_pull', 'barbell',     'none', 'none',   'none', 'bilateral', true,  2),
  ('Deadlift',           'Soulevé de terre',               'deadlift',          'lower_back', '{"glutes","hamstrings","traps"}','hinge',           'barbell',     'none', 'none',   'none', 'bilateral', true,  3),
  ('Back Extension',     'Extension lombaire',             'back-extension',    'lower_back', '{"glutes","hamstrings"}',        'hinge',           'bodyweight',  'none', 'none',   'none', 'bilateral', false, 1),
  ('Face Pull',          'Face pull',                      'face-pull',         'traps',      '{"shoulders","rear_delts"}',     'horizontal_pull', 'cable',       'none', 'none',   'none', 'bilateral', false, 1),
  ('Pullover',           'Pull-over',                      'pullover',          'lats',       '{"chest","triceps"}',            'vertical_pull',   'dumbbell',    'none', 'none',   'none', 'bilateral', false, 2)
;

-- Variants
INSERT INTO exercises (parent_exercise_id, name, name_fr, slug, primary_muscle, secondary_muscles, movement_pattern, equipment, grip_type, grip_width, bench_angle, laterality, is_compound, difficulty)
VALUES

  -- ── Pull-Up Variants ─────────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'pull-up'),
   'Pull-Up Wide Pronated',
   'Traction prise large pronée',
   'pull-up-wide-pronated',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'bodyweight', 'pronated', 'wide', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'pull-up'),
   'Pull-Up Medium Pronated',
   'Traction prise normale pronée',
   'pull-up-medium-pronated',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'bodyweight', 'pronated', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'pull-up'),
   'Chin-Up Supinated',
   'Traction supinée',
   'pull-up-chin-up-supinated',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'bodyweight', 'supinated', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'pull-up'),
   'Pull-Up Neutral Grip',
   'Traction prise neutre',
   'pull-up-neutral',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'bodyweight', 'neutral', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'pull-up'),
   'Pull-Up Close Grip',
   'Traction prise serrée',
   'pull-up-close',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'bodyweight', 'pronated', 'close', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'pull-up'),
   'Weighted Pull-Up',
   'Traction lestée',
   'pull-up-weighted',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'bodyweight', 'pronated', 'medium', 'none', 'bilateral', true, 3),

  ((SELECT id FROM exercises WHERE slug = 'pull-up'),
   'Assisted Pull-Up Machine',
   'Traction assistée machine',
   'pull-up-assisted-machine',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'machine', 'pronated', 'medium', 'none', 'bilateral', true, 1),

  -- ── Lat Pulldown Variants ────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'lat-pulldown'),
   'Lat Pulldown Wide Pronated',
   'Tirage vertical prise large pronée',
   'lat-pulldown-wide-pronated',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'cable', 'pronated', 'wide', 'none', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'lat-pulldown'),
   'Lat Pulldown Wide Supinated',
   'Tirage vertical prise large supinée',
   'lat-pulldown-wide-supinated',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'cable', 'supinated', 'wide', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'lat-pulldown'),
   'Lat Pulldown Close Neutral',
   'Tirage vertical prise serrée neutre',
   'lat-pulldown-close-neutral',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'cable', 'neutral', 'close', 'none', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'lat-pulldown'),
   'Lat Pulldown Close Supinated',
   'Tirage vertical prise serrée supinée',
   'lat-pulldown-close-supinated',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'cable', 'supinated', 'close', 'none', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'lat-pulldown'),
   'Unilateral Lat Pulldown',
   'Tirage vertical unilatéral',
   'lat-pulldown-unilateral',
   'lats', '{"biceps","traps"}', 'vertical_pull', 'cable', 'neutral', 'medium', 'none', 'unilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'lat-pulldown'),
   'Straight-Arm Lat Pulldown',
   'Tirage vertical bras tendus',
   'lat-pulldown-straight-arm',
   'lats', '{"triceps"}', 'vertical_pull', 'cable', 'pronated', 'medium', 'none', 'bilateral', false, 2),

  -- ── Barbell Row Variants ─────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'barbell-row'),
   'Barbell Row Pronated',
   'Rowing barre pronée',
   'barbell-row-pronated',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'barbell', 'pronated', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'barbell-row'),
   'Barbell Row Supinated (Yates Row)',
   'Rowing barre supinée (Yates)',
   'barbell-row-yates',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'barbell', 'supinated', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'barbell-row'),
   'Pendlay Row',
   'Rowing Pendlay',
   'barbell-row-pendlay',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'barbell', 'pronated', 'medium', 'none', 'bilateral', true, 3),

  ((SELECT id FROM exercises WHERE slug = 'barbell-row'),
   'Smith Machine Row',
   'Rowing Smith machine',
   'barbell-row-smith',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'smith_machine', 'pronated', 'medium', 'none', 'bilateral', true, 1),

  -- ── Dumbbell Row Variants ────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'dumbbell-row'),
   'Single-Arm Dumbbell Row',
   'Rowing haltère unilatéral',
   'dumbbell-row-unilateral',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'dumbbell', 'neutral', 'medium', 'none', 'unilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'dumbbell-row'),
   'Two-Arm Dumbbell Row',
   'Rowing haltères bilatéral',
   'dumbbell-row-bilateral',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'dumbbell', 'neutral', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'dumbbell-row'),
   'Meadows Row',
   'Rowing Meadows',
   'dumbbell-row-meadows',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'dumbbell', 'neutral', 'medium', 'none', 'unilateral', true, 3),

  -- ── Cable Row Variants ───────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'cable-row'),
   'Cable Seated Row Close Neutral',
   'Rowing poulie assis prise serrée neutre',
   'cable-row-close-neutral',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'cable', 'neutral', 'close', 'none', 'bilateral', true, 1),

  ((SELECT id FROM exercises WHERE slug = 'cable-row'),
   'Cable Seated Row Wide Pronated',
   'Rowing poulie assis prise large pronée',
   'cable-row-wide-pronated',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'cable', 'pronated', 'wide', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'cable-row'),
   'Unilateral Cable Row',
   'Rowing poulie unilatéral',
   'cable-row-unilateral',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'cable', 'neutral', 'medium', 'none', 'unilateral', true, 2),

  -- ── T-Bar Row Variants ───────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 't-bar-row'),
   'T-Bar Row Pronated',
   'Rowing barre en T pronée',
   't-bar-row-pronated',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'barbell', 'pronated', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 't-bar-row'),
   'T-Bar Row Neutral Grip',
   'Rowing barre en T prise neutre',
   't-bar-row-neutral',
   'back', '{"biceps","traps","lats"}', 'horizontal_pull', 'barbell', 'neutral', 'close', 'none', 'bilateral', true, 2),

  -- ── Deadlift Variants ────────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Conventional Deadlift',
   'Soulevé de terre conventionnel',
   'deadlift-conventional',
   'lower_back', '{"glutes","hamstrings","traps","quads"}', 'hinge', 'barbell', 'mixed', 'medium', 'none', 'bilateral', true, 3),

  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Sumo Deadlift',
   'Soulevé de terre sumo',
   'deadlift-sumo',
   'lower_back', '{"glutes","hamstrings","quads"}', 'hinge', 'barbell', 'mixed', 'medium', 'none', 'bilateral', true, 3),

  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Romanian Deadlift',
   'Soulevé de terre roumain',
   'deadlift-romanian',
   'hamstrings', '{"glutes","lower_back"}', 'hinge', 'barbell', 'pronated', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Stiff-Leg Deadlift',
   'Soulevé de terre jambes tendues',
   'deadlift-stiff-leg',
   'hamstrings', '{"glutes","lower_back"}', 'hinge', 'barbell', 'pronated', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Trap Bar Deadlift',
   'Soulevé de terre hex bar',
   'deadlift-trap-bar',
   'lower_back', '{"glutes","hamstrings","quads"}', 'hinge', 'trap_bar', 'neutral', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Rack Pull',
   'Tirage depuis rack',
   'deadlift-rack-pull',
   'lower_back', '{"traps","glutes","hamstrings"}', 'hinge', 'barbell', 'mixed', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Dumbbell Romanian Deadlift',
   'Soulevé de terre roumain haltères',
   'deadlift-romanian-dumbbell',
   'hamstrings', '{"glutes","lower_back"}', 'hinge', 'dumbbell', 'neutral', 'medium', 'none', 'bilateral', true, 2),

  ((SELECT id FROM exercises WHERE slug = 'deadlift'),
   'Single-Leg Romanian Deadlift',
   'Soulevé de terre roumain unilatéral',
   'deadlift-romanian-single-leg',
   'hamstrings', '{"glutes","lower_back"}', 'hinge', 'dumbbell', 'neutral', 'medium', 'none', 'unilateral', true, 3),

  -- ── Back Extension Variants ──────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'back-extension'),
   'Bodyweight Back Extension',
   'Extension lombaire au poids du corps',
   'back-extension-bodyweight',
   'lower_back', '{"glutes","hamstrings"}', 'hinge', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 1),

  ((SELECT id FROM exercises WHERE slug = 'back-extension'),
   'Weighted Back Extension',
   'Extension lombaire lestée',
   'back-extension-weighted',
   'lower_back', '{"glutes","hamstrings"}', 'hinge', 'bodyweight', 'none', 'none', 'none', 'bilateral', false, 2),

  ((SELECT id FROM exercises WHERE slug = 'back-extension'),
   'Good Morning Barbell',
   'Good Morning barre',
   'back-extension-good-morning',
   'lower_back', '{"glutes","hamstrings"}', 'hinge', 'barbell', 'pronated', 'medium', 'none', 'bilateral', true, 3),

  -- ── Face Pull Variants ───────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'face-pull'),
   'Cable Face Pull',
   'Face pull poulie',
   'face-pull-cable',
   'traps', '{"shoulders","rear_delts"}', 'horizontal_pull', 'cable', 'neutral', 'medium', 'none', 'bilateral', false, 1),

  ((SELECT id FROM exercises WHERE slug = 'face-pull'),
   'Resistance Band Face Pull',
   'Face pull élastique',
   'face-pull-band',
   'traps', '{"shoulders","rear_delts"}', 'horizontal_pull', 'resistance_band', 'neutral', 'medium', 'none', 'bilateral', false, 1),

  -- ── Pullover Variants ────────────────────────────────────────────────
  ((SELECT id FROM exercises WHERE slug = 'pullover'),
   'Dumbbell Pullover',
   'Pull-over haltère',
   'pullover-dumbbell',
   'lats', '{"chest","triceps"}', 'vertical_pull', 'dumbbell', 'neutral', 'medium', 'flat', 'bilateral', false, 2),

  ((SELECT id FROM exercises WHERE slug = 'pullover'),
   'Cable Pullover',
   'Pull-over poulie',
   'pullover-cable',
   'lats', '{"chest","triceps"}', 'vertical_pull', 'cable', 'pronated', 'medium', 'none', 'bilateral', false, 2),

  ((SELECT id FROM exercises WHERE slug = 'pullover'),
   'Barbell Pullover',
   'Pull-over barre',
   'pullover-barbell',
   'lats', '{"chest","triceps"}', 'vertical_pull', 'barbell', 'pronated', 'medium', 'flat', 'bilateral', false, 2)
;
