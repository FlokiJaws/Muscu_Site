import { useState, useEffect, useCallback } from 'react'
import { Check, ChevronRight, X, SkipForward, Clock } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

// ─── Rest Timer ────────────────────────────────────────────────────────────────
function RestTimer({ seconds, onDone }) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    if (timeLeft <= 0) { onDone(); return }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, onDone])

  const progress = timeLeft / seconds
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  return (
    <div className="fixed inset-0 bg-[#111111]/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-slide-up">
      <p className="text-zinc-400 text-sm font-medium mb-6 tracking-widest uppercase">
        Temps de repos
      </p>

      {/* Cercle SVG countdown */}
      <div className="relative w-40 h-40 flex items-center justify-center mb-8">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
          {/* Track */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#2a2a2a" strokeWidth="6" />
          {/* Progress */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="#22c55e"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <span className="text-5xl font-bold tabular-nums text-white">
          {mins}:{secs}
        </span>
      </div>

      <button
        onClick={onDone}
        className="flex items-center gap-2 bg-[#2a2a2a] text-zinc-300 px-6 py-3 rounded-2xl text-sm font-medium active:scale-95 transition-transform"
      >
        <SkipForward size={16} />
        Passer le repos
      </button>
    </div>
  )
}

// ─── NumericInput ──────────────────────────────────────────────────────────────
function NumericInput({ label, value, onChange, unit, step = 1, min = 0 }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <span className="text-xs text-zinc-500 font-medium uppercase tracking-widest">{label}</span>
      <div className="relative w-full">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          step={step}
          className="w-full text-center text-4xl font-bold bg-[#1e1e1e] text-white rounded-2xl py-5 border border-[#2a2a2a] focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
        />
        {unit && (
          <span className="absolute bottom-2 right-3 text-xs text-zinc-500">{unit}</span>
        )}
      </div>
    </div>
  )
}

// ─── SetCard ──────────────────────────────────────────────────────────────────
function SetCard({ setNum, weight, reps, isLast }) {
  return (
    <div className={`flex items-center gap-3 text-sm ${isLast ? 'text-green-400' : 'text-zinc-500'}`}>
      <span className="w-6 text-right font-mono">{setNum}</span>
      <div className="flex-1 h-px bg-[#2a2a2a]" />
      <span className="font-medium">{weight} kg × {reps} reps</span>
      {isLast && <Check size={14} className="text-green-400" />}
    </div>
  )
}

// ─── LiveWorkout ──────────────────────────────────────────────────────────────
export default function LiveWorkout() {
  const { activeWorkout, logSet, advanceWorkout, finishWorkout, cancelWorkout, getLastPerformance } =
    useAppStore()

  const { currentExerciseIndex, currentSetIndex, exercises, routineName } = activeWorkout
  const exercise = exercises[currentExerciseIndex]
  const lastPerf = getLastPerformance(exercise.exerciseId)

  // Pré-remplir avec le poids cible ou le dernier perf
  const defaultWeight =
    exercise.completedSets[exercise.completedSets.length - 1]?.weight ??
    lastPerf?.[0]?.weight ??
    exercise.targetWeight ??
    0
  const defaultReps = lastPerf?.[currentSetIndex]?.reps ?? exercise.targetReps ?? 0

  const [weight, setWeight] = useState(String(defaultWeight))
  const [reps, setReps] = useState(String(defaultReps))
  const [isResting, setIsResting] = useState(false)
  const [showFinishConfirm, setShowFinishConfirm] = useState(false)

  // Recalcule les defaults quand on passe à un nouvel exercice/série
  useEffect(() => {
    const newDefaultWeight =
      exercise.completedSets[exercise.completedSets.length - 1]?.weight ??
      lastPerf?.[0]?.weight ??
      exercise.targetWeight ??
      0
    const newDefaultReps = lastPerf?.[currentSetIndex]?.reps ?? exercise.targetReps ?? 0
    setWeight(String(newDefaultWeight))
    setReps(String(newDefaultReps))
  }, [currentExerciseIndex, currentSetIndex]) // eslint-disable-line

  const handleRestDone = useCallback(() => {
    setIsResting(false)
  }, [])

  const handleValidateSet = () => {
    const w = parseFloat(weight) || 0
    const r = parseInt(reps, 10) || 0

    logSet(currentExerciseIndex, { weight: w, reps: r })

    const isLastSetOfExercise = currentSetIndex + 1 >= exercise.targetSets
    const isLastExercise = currentExerciseIndex + 1 >= exercises.length

    if (isLastSetOfExercise && isLastExercise) {
      // Fin de séance
      finishWorkout()
      return
    }

    // Lancer le temps de repos AVANT d'avancer
    setIsResting(true)

    // Calcul du prochain état
    if (isLastSetOfExercise) {
      // Passer à l'exercice suivant
      advanceWorkout(currentExerciseIndex + 1, 0)
    } else {
      advanceWorkout(currentExerciseIndex, currentSetIndex + 1)
    }
  }

  const totalSets = exercises.reduce((acc, ex) => acc + ex.targetSets, 0)
  const completedSets = exercises.reduce((acc, ex) => acc + ex.completedSets.length, 0)
  const progressPercent = totalSets > 0 ? (completedSets / totalSets) * 100 : 0

  const formatDuration = () => {
    const seconds = Math.round((Date.now() - new Date(activeWorkout.startedAt)) / 1000)
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  const [duration, setDuration] = useState(formatDuration())
  useEffect(() => {
    const id = setInterval(() => setDuration(formatDuration()), 1000)
    return () => clearInterval(id)
  }, [activeWorkout.startedAt]) // eslint-disable-line

  return (
    <div className="fixed inset-0 bg-[#111111] flex flex-col pt-safe">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a2a]">
        <button
          onClick={() => setShowFinishConfirm(true)}
          className="text-zinc-500 active:text-white transition-colors p-1"
        >
          <X size={22} />
        </button>

        <div className="text-center">
          <h1 className="text-sm font-semibold text-white">{routineName}</h1>
          <div className="flex items-center justify-center gap-1 text-xs text-zinc-500">
            <Clock size={10} />
            <span>{duration}</span>
          </div>
        </div>

        <div className="text-xs text-zinc-500 font-mono">
          {completedSets}/{totalSets}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="h-1 bg-[#2a2a2a]">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 min-h-0 scroll-area px-4 pb-nav">

        {/* ── Exercice header ── */}
        <div className="mt-5 mb-4">
          <span className="text-xs text-green-400 font-medium uppercase tracking-widest">
            {exercise.muscleGroup}
          </span>
          <h2 className="text-2xl font-bold text-white mt-0.5">{exercise.exerciseName}</h2>

          {/* Progression exercices */}
          <div className="flex items-center gap-1.5 mt-2">
            {exercises.map((ex, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < currentExerciseIndex
                    ? 'bg-green-500'
                    : i === currentExerciseIndex
                    ? 'bg-green-400'
                    : 'bg-[#2a2a2a]'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Exercice {currentExerciseIndex + 1}/{exercises.length}
          </p>
        </div>

        {/* ── Séries déjà faites ── */}
        {exercise.completedSets.length > 0 && (
          <div className="mb-4 bg-[#1a1a1a] rounded-2xl p-3 space-y-2">
            {exercise.completedSets.map((s, i) => (
              <SetCard
                key={i}
                setNum={i + 1}
                weight={s.weight}
                reps={s.reps}
                isLast={i === exercise.completedSets.length - 1}
              />
            ))}
          </div>
        )}

        {/* ── Série en cours ── */}
        <div className="bg-[#1a1a1a] rounded-2xl p-4 mb-4 border border-[#2a2a2a]">
          {/* Badge série */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-green-500/15 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
              Série {currentSetIndex + 1} / {exercise.targetSets}
            </span>
            <span className="text-xs text-zinc-500">
              Objectif : {exercise.targetReps} reps
            </span>
          </div>

          {/* Perfs précédentes */}
          {lastPerf && lastPerf[currentSetIndex] && (
            <div className="flex items-center gap-1.5 mb-4 text-xs text-zinc-500">
              <ChevronRight size={12} className="text-zinc-600" />
              <span>
                Dernière fois :{' '}
                <span className="text-zinc-300 font-medium">
                  {lastPerf[currentSetIndex].weight} kg × {lastPerf[currentSetIndex].reps} reps
                </span>
              </span>
            </div>
          )}

          {/* Inputs Poids / Reps */}
          <div className="flex gap-3 mb-5">
            <NumericInput
              label="Poids"
              value={weight}
              onChange={setWeight}
              unit="kg"
              step={2.5}
            />
            <NumericInput
              label="Reps"
              value={reps}
              onChange={setReps}
              unit="reps"
              step={1}
            />
          </div>

          {/* Bouton Valider */}
          <button
            onClick={handleValidateSet}
            className="w-full bg-green-500 active:bg-green-600 text-white font-bold text-lg py-5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-green-500/20"
          >
            <Check size={24} strokeWidth={3} />
            Valider la série
          </button>
        </div>

        {/* ── Exercices suivants ── */}
        {currentExerciseIndex + 1 < exercises.length && (
          <div className="mb-4">
            <p className="text-xs text-zinc-600 mb-2 uppercase tracking-widest font-medium">
              Ensuite
            </p>
            {exercises.slice(currentExerciseIndex + 1, currentExerciseIndex + 3).map((ex, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-3 mb-2"
              >
                <div className="w-1.5 h-8 rounded-full bg-[#2a2a2a]" />
                <div>
                  <p className="text-sm font-medium text-zinc-300">{ex.exerciseName}</p>
                  <p className="text-xs text-zinc-600">
                    {ex.targetSets}×{ex.targetReps} reps
                    {ex.targetWeight ? ` — ${ex.targetWeight} kg` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Rest Timer overlay ── */}
      {isResting && (
        <RestTimer seconds={exercise.restSeconds} onDone={handleRestDone} />
      )}

      {/* ── Confirm cancel dialog ── */}
      {showFinishConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-end z-50 pb-safe">
          <div className="w-full bg-[#1a1a1a] rounded-t-3xl p-6 animate-slide-up">
            <h3 className="text-lg font-bold text-white text-center mb-1">
              Terminer la séance ?
            </h3>
            <p className="text-sm text-zinc-500 text-center mb-6">
              Les séries déjà validées seront sauvegardées.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => { finishWorkout() }}
                className="w-full bg-green-500 text-white font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform"
              >
                Terminer et sauvegarder
              </button>
              <button
                onClick={() => { cancelWorkout() }}
                className="w-full bg-red-500/15 text-red-400 font-semibold py-4 rounded-2xl active:scale-[0.98] transition-transform"
              >
                Abandonner (ne pas sauvegarder)
              </button>
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="w-full text-zinc-500 font-medium py-3"
              >
                Continuer la séance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
