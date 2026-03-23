import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Variables d\'environnement Supabase manquantes.\n' +
    'Crée un fichier .env.local avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,      // session sauvegardée dans localStorage
    autoRefreshToken: true,    // refresh automatique avant expiration
    detectSessionInUrl: true,  // détecte le token dans l'URL (magic link)
    // storageKey personnalisé pour isoler du reste
    storageKey: 'muscu-tracker-auth',
  },
})

/**
 * Helpers typés pour les tables principales
 */

// ── Exercises ──────────────────────────────────────────────────────────────

/** Récupère tous les exercices actifs (avec variantes) */
export async function fetchExercises({ muscle, equipment, search } = {}) {
  let query = supabase
    .from('exercises')
    .select('*')
    .eq('is_active', true)
    .order('name_fr', { ascending: true })

  if (muscle)    query = query.eq('primary_muscle', muscle)
  if (equipment) query = query.eq('equipment', equipment)
  if (search)    query = query.ilike('name_fr', `%${search}%`)

  const { data, error } = await query
  if (error) throw error
  return data
}

/** Récupère les variantes d'un exercice parent */
export async function fetchVariants(parentId) {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .eq('parent_exercise_id', parentId)
    .eq('is_active', true)
    .order('name_fr')
  if (error) throw error
  return data
}

// ── Routines ───────────────────────────────────────────────────────────────

/** Récupère les routines de l'utilisateur connecté avec leurs exercices */
export async function fetchRoutines() {
  const { data, error } = await supabase
    .from('routines')
    .select(`
      *,
      routine_exercises (
        *,
        exercise:exercises (id, name_fr, primary_muscle, equipment)
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

// ── Workouts (historique) ──────────────────────────────────────────────────

/** Récupère l'historique des séances (paginé) */
export async function fetchWorkouts({ page = 0, pageSize = 20 } = {}) {
  const { data, error } = await supabase
    .from('workouts')
    .select(`
      *,
      workout_sets (
        *,
        exercise:exercises (id, name_fr, primary_muscle)
      )
    `)
    .order('started_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1)
  if (error) throw error
  return data
}

/** Récupère la dernière performance pour un exercice donné */
export async function fetchLastPerformance(exerciseId) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('last_performance')
    .select('*')
    .eq('exercise_id', exerciseId)
    .eq('user_id', user.id)
    .single()

  if (error && error.code !== 'PGRST116') throw error  // PGRST116 = not found
  return data ?? null
}

/** Sauvegarde une séance complète en une transaction */
export async function saveWorkout({ routineId, routineName, startedAt, endedAt, sets }) {
  const durationSeconds = Math.round((new Date(endedAt) - new Date(startedAt)) / 1000)

  // 1. Créer la séance
  const { data: workout, error: workoutError } = await supabase
    .from('workouts')
    .insert({ routine_id: routineId, routine_name: routineName, started_at: startedAt, ended_at: endedAt, duration_seconds: durationSeconds })
    .select()
    .single()
  if (workoutError) throw workoutError

  // 2. Insérer toutes les séries
  const setsToInsert = sets.map((s) => ({ ...s, workout_id: workout.id }))
  const { error: setsError } = await supabase
    .from('workout_sets')
    .insert(setsToInsert)
  if (setsError) throw setsError

  return workout
}
