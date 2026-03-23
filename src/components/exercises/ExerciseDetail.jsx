import { useState } from 'react'
import { X, ChevronRight, Dumbbell, TrendingUp, Languages } from 'lucide-react'
import { useWgerImage } from '../../hooks/useWgerImage'
import { useAppStore } from '../../store/useAppStore'

const MUSCLE_FR = {
  chest: 'Pectoraux', back: 'Dos', lats: 'Grand dorsal', traps: 'Trapèzes',
  shoulders: 'Épaules', biceps: 'Biceps', triceps: 'Triceps',
  forearms: 'Avant-bras', quads: 'Quadriceps', hamstrings: 'Ischio-jambiers',
  glutes: 'Fessiers', calves: 'Mollets', abs: 'Abdominaux',
  lower_back: 'Lombaires',
}

const MUSCLE_COLOR = {
  chest: 'bg-blue-500/20 text-blue-300',
  back: 'bg-purple-500/20 text-purple-300',
  lats: 'bg-purple-500/20 text-purple-300',
  traps: 'bg-indigo-500/20 text-indigo-300',
  shoulders: 'bg-yellow-500/20 text-yellow-300',
  biceps: 'bg-orange-500/20 text-orange-300',
  triceps: 'bg-red-500/20 text-red-300',
  quads: 'bg-green-500/20 text-green-300',
  hamstrings: 'bg-teal-500/20 text-teal-300',
  glutes: 'bg-pink-500/20 text-pink-300',
  calves: 'bg-emerald-500/20 text-emerald-300',
  abs: 'bg-cyan-500/20 text-cyan-300',
  lower_back: 'bg-amber-500/20 text-amber-300',
}

const EQUIPMENT_FR = {
  barbell: 'Barre', dumbbell: 'Haltères', cable: 'Poulie', machine: 'Machine',
  bodyweight: 'Poids du corps', smith_machine: 'Smith machine',
  trap_bar: 'Trap bar', kettlebell: 'Kettlebell', resistance_band: 'Élastique',
}

const GRIP_FR = {
  pronated: 'Pronation', supinated: 'Supination', neutral: 'Neutre', mixed: 'Mixte',
}

const WIDTH_FR = { wide: 'Large', medium: 'Normal', close: 'Serré' }
const ANGLE_FR = { flat: 'Plat', incline: 'Incliné', decline: 'Décliné' }

// ── Placeholder image quand wger ne renvoie rien ───────────────────────────
function MuscleIllustration({ muscle }) {
  const color = {
    chest: '#3b82f6', back: '#a855f7', lats: '#a855f7', shoulders: '#eab308',
    biceps: '#f97316', triceps: '#ef4444', quads: '#22c55e', hamstrings: '#14b8a6',
    glutes: '#ec4899', calves: '#10b981', abs: '#06b6d4', lower_back: '#f59e0b',
    traps: '#6366f1',
  }[muscle] ?? '#22c55e'

  return (
    <div className="w-full h-52 flex items-center justify-center"
         style={{ background: `radial-gradient(ellipse at center, ${color}15, transparent)` }}>
      <Dumbbell size={72} style={{ color }} strokeWidth={1} />
    </div>
  )
}

// ── ExerciseImage : tente wger, sinon placeholder ──────────────────────────
function ExerciseImage({ exercise }) {
  const { imageUrl, loading } = useWgerImage(exercise.name)
  const [imgError, setImgError] = useState(false)

  if (loading) {
    return (
      <div className="w-full h-52 flex items-center justify-center bg-[#1a1a1a]">
        <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (imageUrl && !imgError) {
    return (
      <div className="w-full h-52 bg-[#1a1a1a] overflow-hidden flex items-center justify-center">
        <img
          src={imageUrl}
          alt={exercise.name}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  return <MuscleIllustration muscle={exercise.primary_muscle} />
}

// ── LastPerformance ────────────────────────────────────────────────────────
function LastPerformance({ exerciseId }) {
  const { getLastPerformance } = useAppStore()
  const sets = getLastPerformance(exerciseId)

  if (!sets || sets.length === 0) return null

  const maxWeight = Math.max(...sets.map((s) => s.weight ?? 0))

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#2a2a2a]">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={14} className="text-green-400" />
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Dernière séance
        </span>
      </div>
      <div className="space-y-1.5">
        {sets.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-5 text-right text-zinc-600 font-mono text-xs">{s.set_number ?? i + 1}</span>
            <div className="flex-1 h-px bg-[#2a2a2a]" />
            <span className={`font-semibold tabular-nums ${s.weight === maxWeight ? 'text-green-400' : 'text-white'}`}>
              {s.weight} kg
            </span>
            <span className="text-zinc-500 text-xs">× {s.reps} reps</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── VariantsList ───────────────────────────────────────────────────────────
function VariantsList({ parentId, lang, onSelect }) {
  const { exercises } = useAppStore()
  const variants = exercises.filter((e) => e.parent_exercise_id === parentId)
  if (variants.length === 0) return null

  return (
    <div>
      <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-2">
        Variantes ({variants.length})
      </p>
      <div className="space-y-1.5">
        {variants.map((v) => (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="w-full flex items-center justify-between bg-[#1a1a1a] rounded-xl px-3 py-2.5 border border-[#2a2a2a] active:bg-[#2a2a2a] text-left"
          >
            <div>
              <p className="text-sm text-white font-medium">
                {lang === 'fr' ? v.name_fr : v.name}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">
                {[EQUIPMENT_FR[v.equipment], GRIP_FR[v.grip_type], WIDTH_FR[v.grip_width], ANGLE_FR[v.bench_angle]]
                  .filter(Boolean).join(' · ')}
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-600 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── ExerciseDetail (composant principal) ───────────────────────────────────
export default function ExerciseDetail({ exercise, onClose, lang, onLangToggle }) {
  const { exercises } = useAppStore()
  const [currentEx, setCurrentEx] = useState(exercise)

  // Si c'est une variante, on peut remonter au parent
  const parent = currentEx.parent_exercise_id
    ? exercises.find((e) => e.id === currentEx.parent_exercise_id)
    : null

  const chips = [
    currentEx.grip_type !== 'none' && GRIP_FR[currentEx.grip_type],
    currentEx.grip_width !== 'none' && WIDTH_FR[currentEx.grip_width],
    currentEx.bench_angle !== 'none' && ANGLE_FR[currentEx.bench_angle],
    currentEx.laterality === 'unilateral' && 'Unilatéral',
    !currentEx.is_compound && 'Isolation',
    currentEx.difficulty === 1 && 'Débutant',
    currentEx.difficulty === 3 && 'Avancé',
  ].filter(Boolean)

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-end">
      <div className="w-full bg-[#111111] rounded-t-3xl max-h-[92vh] flex flex-col animate-slide-up">

        {/* ── Header ── */}
        <div className="flex items-start justify-between px-5 pt-5 pb-3">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-xl font-bold text-white leading-tight">
              {lang === 'fr' ? currentEx.name_fr : currentEx.name}
            </h2>
            {lang === 'fr'
              ? <p className="text-xs text-zinc-500 mt-0.5">{currentEx.name}</p>
              : <p className="text-xs text-zinc-500 mt-0.5">{currentEx.name_fr}</p>
            }
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Toggle FR/EN */}
            <button
              onClick={onLangToggle}
              className="flex items-center gap-1 bg-[#2a2a2a] text-zinc-400 text-xs font-bold px-2.5 py-1.5 rounded-xl"
            >
              <Languages size={12} />
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button onClick={onClose} className="text-zinc-500 p-1">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* ── Content scrollable ── */}
        <div className="flex-1 scroll-area pb-safe">

          {/* Image */}
          <ExerciseImage exercise={currentEx} />

          <div className="px-5 pt-4 space-y-5 pb-8">

            {/* Muscle primaire + secondaires */}
            <div className="flex flex-wrap gap-2">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${MUSCLE_COLOR[currentEx.primary_muscle] ?? 'bg-zinc-700 text-zinc-300'}`}>
                {MUSCLE_FR[currentEx.primary_muscle] ?? currentEx.primary_muscle}
              </span>
              {(currentEx.secondary_muscles ?? []).filter((m) => m && MUSCLE_FR[m]).map((m) => (
                <span key={m} className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400">
                  {MUSCLE_FR[m]}
                </span>
              ))}
            </div>

            {/* Equipment + chips */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-green-500/15 text-green-400 font-medium">
                {EQUIPMENT_FR[currentEx.equipment] ?? currentEx.equipment}
              </span>
              {chips.map((chip) => (
                <span key={chip} className="text-xs px-3 py-1.5 rounded-full bg-[#2a2a2a] text-zinc-400">
                  {chip}
                </span>
              ))}
            </div>

            {/* Lien vers parent si variante */}
            {parent && (
              <button
                onClick={() => setCurrentEx(parent)}
                className="flex items-center gap-2 text-xs text-zinc-500 active:text-white"
              >
                <ChevronRight size={12} className="rotate-180" />
                Exercice de base : <span className="text-zinc-300 font-medium">
                  {lang === 'fr' ? parent.name_fr : parent.name}
                </span>
              </button>
            )}

            {/* Dernière performance */}
            <LastPerformance exerciseId={currentEx.id} />

            {/* Coaching cues */}
            {currentEx.coaching_cues?.length > 0 && (
              <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#2a2a2a]">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                  Points clés
                </p>
                <ul className="space-y-2">
                  {currentEx.coaching_cues.map((cue, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                      {cue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variantes */}
            {!currentEx.parent_exercise_id && (
              <VariantsList
                parentId={currentEx.id}
                lang={lang}
                onSelect={(v) => setCurrentEx(v)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
