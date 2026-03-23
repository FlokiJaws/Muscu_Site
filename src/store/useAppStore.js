import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { nanoid } from '../utils/nanoid'

/**
 * Store principal — données viennent de Supabase, activeWorkout reste local.
 *
 * Flux :
 *  1. App monte → initialize() charge exercises + routines depuis Supabase
 *  2. Actions (addRoutine, finishWorkout…) écrivent dans Supabase ET mettent
 *     à jour le state local pour éviter un re-fetch
 *  3. activeWorkout est 100% local (in-memory) — sauvegardé dans Supabase
 *     uniquement quand finishWorkout() est appelé
 */
export const useAppStore = create((set, get) => ({
  // ─── State ───────────────────────────────────────────────────────────────
  exercises:      [],
  routines:       [],
  workoutHistory: [],
  activeWorkout:  null,

  isLoading:  true,
  error:      null,

  // ─── Initialisation ───────────────────────────────────────────────────────
  initialize: async () => {
    set({ isLoading: true, error: null })
    try {
      const [exRes, rtRes, whRes] = await Promise.all([
        // Tous les exercices actifs (parents + variantes)
        supabase.from('exercises').select('*').eq('is_active', true).order('name_fr'),

        // Routines de l'utilisateur avec leurs exercices liés
        supabase.from('routines').select(`
          *,
          routine_exercises (
            id, position, target_sets, target_reps, target_weight, rest_seconds, notes,
            exercise:exercises (id, name_fr, primary_muscle, equipment)
          )
        `).eq('is_active', true).order('created_at'),

        // Historique (20 dernières séances)
        supabase.from('workouts').select(`
          *,
          workout_sets (
            id, exercise_id, exercise_name, set_number, weight, reps, rpe, is_warmup, performed_at
          )
        `).order('started_at', { ascending: false }).limit(20),
      ])

      if (exRes.error) throw exRes.error
      if (rtRes.error) throw rtRes.error
      if (whRes.error) throw whRes.error

      // Normalise les routines pour correspondre au format attendu par les composants
      const routines = (rtRes.data ?? []).map((r) => ({
        ...r,
        exercises: (r.routine_exercises ?? [])
          .sort((a, b) => a.position - b.position)
          .map((re) => ({
            id:            re.id,
            exerciseId:    re.exercise?.id,
            exerciseName:  re.exercise?.name_fr ?? '?',
            muscleGroup:   re.exercise?.primary_muscle ?? '',
            targetSets:    re.target_sets,
            targetReps:    re.target_reps,
            targetWeight:  re.target_weight,
            restSeconds:   re.rest_seconds,
          })),
      }))

      set({
        exercises:      exRes.data ?? [],
        routines,
        workoutHistory: whRes.data ?? [],
        isLoading:      false,
      })
    } catch (err) {
      console.error('initialize error:', err)
      set({ error: err.message, isLoading: false })
    }
  },

  // ─── Routines ─────────────────────────────────────────────────────────────
  addRoutine: async ({ name, color, exercises }) => {
    const { data: { user } } = await supabase.auth.getUser()

    // 1. Créer la routine
    const { data: routine, error: rErr } = await supabase
      .from('routines')
      .insert({ user_id: user.id, name, color })
      .select()
      .single()
    if (rErr) throw rErr

    // 2. Créer les routine_exercises
    const reRows = exercises.map((ex, i) => ({
      routine_id:    routine.id,
      exercise_id:   ex.exerciseId,
      position:      i,
      target_sets:   ex.targetSets,
      target_reps:   String(ex.targetReps),
      target_weight: ex.targetWeight ?? null,
      rest_seconds:  ex.restSeconds,
    }))
    const { error: reErr } = await supabase.from('routine_exercises').insert(reRows)
    if (reErr) throw reErr

    // 3. Re-fetch pour avoir les données complètes
    await get().initialize()
  },

  updateRoutine: async (routineId, { name, color, exercises }) => {
    // Mise à jour de la routine
    const { error: rErr } = await supabase
      .from('routines')
      .update({ name, color })
      .eq('id', routineId)
    if (rErr) throw rErr

    // Supprimer les anciens exercices et ré-insérer
    await supabase.from('routine_exercises').delete().eq('routine_id', routineId)
    const reRows = exercises.map((ex, i) => ({
      routine_id:    routineId,
      exercise_id:   ex.exerciseId,
      position:      i,
      target_sets:   ex.targetSets,
      target_reps:   String(ex.targetReps),
      target_weight: ex.targetWeight ?? null,
      rest_seconds:  ex.restSeconds,
    }))
    if (reRows.length > 0) {
      const { error: reErr } = await supabase.from('routine_exercises').insert(reRows)
      if (reErr) throw reErr
    }

    await get().initialize()
  },

  deleteRoutine: async (routineId) => {
    await supabase.from('routines').update({ is_active: false }).eq('id', routineId)
    set((s) => ({ routines: s.routines.filter((r) => r.id !== routineId) }))
  },

  // ─── Active Workout (100% local) ─────────────────────────────────────────
  startWorkout: (routine) => {
    const activeExercises = routine.exercises.map((ex) => ({
      exerciseId:   ex.exerciseId,
      exerciseName: ex.exerciseName,
      muscleGroup:  ex.muscleGroup,
      targetSets:   ex.targetSets,
      targetReps:   ex.targetReps,
      targetWeight: ex.targetWeight,
      restSeconds:  ex.restSeconds,
      completedSets: [],
    }))

    set({
      activeWorkout: {
        routineId:             routine.id,
        routineName:           routine.name,
        startedAt:             new Date().toISOString(),
        exercises:             activeExercises,
        currentExerciseIndex:  0,
        currentSetIndex:       0,
      },
    })
  },

  logSet: (exerciseIndex, completedSet) => {
    set((s) => {
      if (!s.activeWorkout) return s
      const exercises = s.activeWorkout.exercises.map((ex, i) =>
        i === exerciseIndex
          ? { ...ex, completedSets: [...ex.completedSets, completedSet] }
          : ex
      )
      return { activeWorkout: { ...s.activeWorkout, exercises } }
    })
  },

  advanceWorkout: (nextExerciseIndex, nextSetIndex) => {
    set((s) => {
      if (!s.activeWorkout) return s
      return {
        activeWorkout: {
          ...s.activeWorkout,
          currentExerciseIndex: nextExerciseIndex,
          currentSetIndex:      nextSetIndex,
        },
      }
    })
  },

  finishWorkout: async () => {
    const { activeWorkout } = get()
    if (!activeWorkout) return

    const endedAt         = new Date().toISOString()
    const durationSeconds = Math.round(
      (new Date(endedAt) - new Date(activeWorkout.startedAt)) / 1000
    )
    const { data: { user } } = await supabase.auth.getUser()

    // 1. Créer le workout
    const { data: workout, error: wErr } = await supabase
      .from('workouts')
      .insert({
        user_id:          user.id,
        routine_id:       activeWorkout.routineId,
        routine_name:     activeWorkout.routineName,
        started_at:       activeWorkout.startedAt,
        ended_at:         endedAt,
        duration_seconds: durationSeconds,
      })
      .select()
      .single()
    if (wErr) throw wErr

    // 2. Insérer toutes les séries
    const sets = activeWorkout.exercises.flatMap((ex) =>
      ex.completedSets.map((s, i) => ({
        workout_id:    workout.id,
        exercise_id:   ex.exerciseId,
        exercise_name: ex.exerciseName,
        set_number:    i + 1,
        weight:        s.weight,
        reps:          s.reps,
      }))
    )
    if (sets.length > 0) {
      const { error: sErr } = await supabase.from('workout_sets').insert(sets)
      if (sErr) throw sErr
    }

    // 3. Mettre à jour l'historique local
    set((s) => ({
      activeWorkout:  null,
      workoutHistory: [{ ...workout, workout_sets: sets }, ...s.workoutHistory],
    }))
  },

  cancelWorkout: () => set({ activeWorkout: null }),

  // ─── Helper : dernière perf pour un exercice ─────────────────────────────
  getLastPerformance: (exerciseId) => {
    const { workoutHistory } = get()
    for (const session of workoutHistory) {
      const sets = (session.workout_sets ?? [])
        .filter((s) => s.exercise_id === exerciseId && !s.is_warmup)
        .sort((a, b) => a.set_number - b.set_number)
      if (sets.length > 0) return sets
    }
    return null
  },
}))
