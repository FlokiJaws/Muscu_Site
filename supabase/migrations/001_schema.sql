-- ═══════════════════════════════════════════════════════════════════════════
--  Muscu Tracker — Schéma complet PostgreSQL (Supabase)
--  Migration 001 — Schéma initial
-- ═══════════════════════════════════════════════════════════════════════════

-- Extension UUID (activée par défaut sur Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─────────────────────────────────────────────────────────────────────────────
--  EXERCISES
--  Logique de variantes : un exercice peut avoir un parent_exercise_id
--  qui pointe vers l'exercice "base" (ex: 'bench-press').
--  Les parents ont parent_exercise_id = NULL.
--  Les variantes héritent du contexte sémantique du parent mais précisent
--  le grip, l'angle, le matériel, et la latéralité.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE exercises (
  id                  UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_exercise_id  UUID        REFERENCES exercises(id) ON DELETE SET NULL,

  -- Identité
  name                TEXT        NOT NULL,           -- nom anglais canonique
  name_fr             TEXT        NOT NULL,           -- nom français affiché
  slug                TEXT        UNIQUE NOT NULL,    -- identifiant URL-safe unique

  -- Classification musculaire
  -- Valeurs: chest | back | lats | traps | shoulders | biceps | triceps |
  --          forearms | quads | hamstrings | glutes | calves | abs | lower_back
  primary_muscle      TEXT        NOT NULL,
  secondary_muscles   TEXT[]      DEFAULT '{}',

  -- Pattern de mouvement
  -- Valeurs: horizontal_push | vertical_push | horizontal_pull | vertical_pull |
  --          squat | hinge | lunge | isolation
  movement_pattern    TEXT        NOT NULL,

  -- Attributs de variante
  -- equipment: barbell | dumbbell | cable | machine | bodyweight |
  --            smith_machine | trap_bar | kettlebell | resistance_band | other
  equipment           TEXT        NOT NULL,

  -- grip_type: pronated | supinated | neutral | mixed | none
  grip_type           TEXT        NOT NULL DEFAULT 'none',

  -- grip_width: wide | medium | close | none
  grip_width          TEXT        NOT NULL DEFAULT 'none',

  -- bench_angle: flat | incline | decline | none
  bench_angle         TEXT        NOT NULL DEFAULT 'none',

  -- laterality: bilateral | unilateral
  laterality          TEXT        NOT NULL DEFAULT 'bilateral',

  -- Métadonnées
  description         TEXT,
  coaching_cues       TEXT[]      DEFAULT '{}',   -- conseils d'exécution
  image_url           TEXT,                        -- URL image (wger ou custom)
  video_url           TEXT,                        -- URL vidéo démo
  is_compound         BOOLEAN     NOT NULL DEFAULT true,
  difficulty          SMALLINT    NOT NULL DEFAULT 2
                      CHECK (difficulty BETWEEN 1 AND 3),

  is_active           BOOLEAN     NOT NULL DEFAULT true,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Contraintes de validation
  CONSTRAINT valid_primary_muscle CHECK (primary_muscle IN (
    'chest','back','lats','traps','shoulders','biceps','triceps',
    'forearms','quads','hamstrings','glutes','calves','abs','lower_back'
  )),
  CONSTRAINT valid_equipment CHECK (equipment IN (
    'barbell','dumbbell','cable','machine','bodyweight',
    'smith_machine','trap_bar','kettlebell','resistance_band','other'
  )),
  CONSTRAINT valid_grip_type  CHECK (grip_type IN ('pronated','supinated','neutral','mixed','none')),
  CONSTRAINT valid_grip_width CHECK (grip_width IN ('wide','medium','close','none')),
  CONSTRAINT valid_bench_angle CHECK (bench_angle IN ('flat','incline','decline','none')),
  CONSTRAINT valid_laterality CHECK (laterality IN ('bilateral','unilateral')),
  CONSTRAINT valid_movement CHECK (movement_pattern IN (
    'horizontal_push','vertical_push','horizontal_pull','vertical_pull',
    'squat','hinge','lunge','isolation'
  ))
);

-- ─────────────────────────────────────────────────────────────────────────────
--  PROFILES  (1:1 avec auth.users de Supabase)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT,
  body_weight   NUMERIC(5,2),   -- poids du corps en kg (pour exercices au poids du corps)
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-création du profil à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ─────────────────────────────────────────────────────────────────────────────
--  ROUTINES  (templates de séances)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE routines (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name        TEXT        NOT NULL,
  description TEXT,
  color       TEXT        NOT NULL DEFAULT '#22c55e',
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
--  ROUTINE_EXERCISES  (exercices dans une routine, ordonnés)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE routine_exercises (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  routine_id      UUID        NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  exercise_id     UUID        NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
  position        SMALLINT    NOT NULL,       -- ordre dans la routine (0-based)
  target_sets     SMALLINT    NOT NULL DEFAULT 3,
  target_reps     TEXT        NOT NULL DEFAULT '8',   -- ex: '8' ou '8-12'
  target_weight   NUMERIC(6,2),               -- kg, NULL = libre
  rest_seconds    SMALLINT    NOT NULL DEFAULT 90,
  notes           TEXT,
  UNIQUE(routine_id, position)
);

-- ─────────────────────────────────────────────────────────────────────────────
--  WORKOUTS  (séances réelles effectuées)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE workouts (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  routine_id       UUID        REFERENCES routines(id) ON DELETE SET NULL,

  -- Dénormalisé pour l'historique (conservé si la routine est supprimée)
  routine_name     TEXT        NOT NULL,

  started_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at         TIMESTAMPTZ,
  duration_seconds INTEGER,
  notes            TEXT,

  -- Poids du corps au moment de la séance (utile pour les exercices au poids du corps)
  body_weight      NUMERIC(5,2)
);

-- ─────────────────────────────────────────────────────────────────────────────
--  WORKOUT_SETS  (chaque série réalisée)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE workout_sets (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_id      UUID        NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id     UUID        REFERENCES exercises(id) ON DELETE SET NULL,

  -- Dénormalisé (conservé si l'exercice est supprimé)
  exercise_name   TEXT        NOT NULL,

  set_number      SMALLINT    NOT NULL,
  weight          NUMERIC(6,2) NOT NULL DEFAULT 0,    -- kg (0 pour poids du corps)
  reps            SMALLINT    NOT NULL,
  rpe             NUMERIC(3,1) CHECK (rpe BETWEEN 1 AND 10),  -- Rate of Perceived Exertion
  is_warmup       BOOLEAN     NOT NULL DEFAULT false,
  performed_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────────────────────────────────────────────────
--  INDEX
-- ─────────────────────────────────────────────────────────────────────────────

-- Exercices
CREATE INDEX idx_exercises_parent      ON exercises(parent_exercise_id);
CREATE INDEX idx_exercises_muscle      ON exercises(primary_muscle);
CREATE INDEX idx_exercises_equipment   ON exercises(equipment);
CREATE INDEX idx_exercises_slug        ON exercises(slug);
CREATE INDEX idx_exercises_active      ON exercises(is_active) WHERE is_active = true;

-- Routines
CREATE INDEX idx_routines_user         ON routines(user_id);

-- Routine exercises
CREATE INDEX idx_routine_ex_routine    ON routine_exercises(routine_id);

-- Workouts
CREATE INDEX idx_workouts_user         ON workouts(user_id);
CREATE INDEX idx_workouts_started      ON workouts(started_at DESC);
CREATE INDEX idx_workouts_routine      ON workouts(routine_id);

-- Workout sets
CREATE INDEX idx_sets_workout          ON workout_sets(workout_id);
CREATE INDEX idx_sets_exercise         ON workout_sets(exercise_id);
CREATE INDEX idx_sets_performed        ON workout_sets(performed_at DESC);

-- ─────────────────────────────────────────────────────────────────────────────
--  ROW LEVEL SECURITY (RLS)
--  exercises : lecture publique, écriture admin uniquement
--  tout le reste : chaque user voit/modifie seulement ses propres données
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE exercises       ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines        ENABLE ROW LEVEL SECURITY;
ALTER TABLE routine_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sets    ENABLE ROW LEVEL SECURITY;

-- exercises : accessible en lecture à tous les utilisateurs authentifiés
CREATE POLICY "exercises_read_all"
  ON exercises FOR SELECT
  USING (true);

-- profiles
CREATE POLICY "profiles_own"
  ON profiles FOR ALL
  USING (auth.uid() = id);

-- routines
CREATE POLICY "routines_own"
  ON routines FOR ALL
  USING (auth.uid() = user_id);

-- routine_exercises : accès via la routine parente
CREATE POLICY "routine_exercises_own"
  ON routine_exercises FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM routines
      WHERE routines.id = routine_exercises.routine_id
        AND routines.user_id = auth.uid()
    )
  );

-- workouts
CREATE POLICY "workouts_own"
  ON workouts FOR ALL
  USING (auth.uid() = user_id);

-- workout_sets : accès via le workout parent
CREATE POLICY "workout_sets_own"
  ON workout_sets FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM workouts
      WHERE workouts.id = workout_sets.workout_id
        AND workouts.user_id = auth.uid()
    )
  );

-- ─────────────────────────────────────────────────────────────────────────────
--  FONCTIONS UTILITAIRES
-- ─────────────────────────────────────────────────────────────────────────────

-- Mise à jour auto de updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_routines_updated_at
  BEFORE UPDATE ON routines
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- Vue utilitaire : dernière perf par exercice pour un user
CREATE OR REPLACE VIEW last_performance AS
SELECT DISTINCT ON (ws.exercise_id, w.user_id)
  w.user_id,
  ws.exercise_id,
  ws.exercise_name,
  ws.weight,
  ws.reps,
  ws.performed_at,
  w.id AS workout_id
FROM workout_sets ws
JOIN workouts w ON w.id = ws.workout_id
WHERE ws.is_warmup = false
ORDER BY ws.exercise_id, w.user_id, ws.performed_at DESC;
