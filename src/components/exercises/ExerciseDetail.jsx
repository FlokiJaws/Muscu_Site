import { useState } from 'react'
import { X, ChevronRight, TrendingUp } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

// ── Constantes ─────────────────────────────────────────────────────────────

const MUSCLE_FR = {
  chest: 'Pectoraux', back: 'Dos', lats: 'Grand dorsal', traps: 'Trapèzes',
  shoulders: 'Épaules', biceps: 'Biceps', triceps: 'Triceps',
  forearms: 'Avant-bras', quads: 'Quadriceps', hamstrings: 'Ischio-jambiers',
  glutes: 'Fessiers', calves: 'Mollets', abs: 'Abdominaux', lower_back: 'Lombaires',
}

const MUSCLE_HEX = {
  chest: '#3b82f6', back: '#8b5cf6', lats: '#a78bfa', traps: '#6366f1',
  shoulders: '#eab308', biceps: '#f97316', triceps: '#ef4444',
  forearms: '#fb923c', quads: '#22c55e', hamstrings: '#14b8a6',
  glutes: '#ec4899', calves: '#10b981', abs: '#06b6d4', lower_back: '#f59e0b',
}

const EQUIPMENT_FR = {
  barbell: 'Barre', dumbbell: 'Haltères', cable: 'Poulie', machine: 'Machine',
  bodyweight: 'Poids du corps', smith_machine: 'Smith', trap_bar: 'Trap bar',
  kettlebell: 'Kettlebell', resistance_band: 'Élastique',
}

const GRIP_FR   = { pronated: 'Pronation', supinated: 'Supination', neutral: 'Neutre', mixed: 'Mixte' }
const WIDTH_FR  = { wide: 'Large', medium: 'Normal', close: 'Serré' }
const ANGLE_FR  = { flat: 'Plat', incline: 'Incliné', decline: 'Décliné' }

const PATTERN_FR = {
  horizontal_push: 'Poussée horizontale', vertical_push: 'Poussée verticale',
  horizontal_pull: 'Tirage horizontal',   vertical_pull: 'Tirage vertical',
  squat: 'Squat', hinge: 'Charnière', lunge: 'Fente', isolation: 'Isolation',
}

// ── Helpers ────────────────────────────────────────────────────────────────

function rgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${opacity})`
}

function getDescription(ex) {
  if (ex.description) return ex.description
  const muscleName = (MUSCLE_FR[ex.primary_muscle] ?? ex.primary_muscle).toLowerCase()
  const patternName = (PATTERN_FR[ex.movement_pattern] ?? ex.movement_pattern).toLowerCase()
  const equip = (EQUIPMENT_FR[ex.equipment] ?? ex.equipment).toLowerCase()
  const secondary = (ex.secondary_muscles ?? [])
    .filter(m => MUSCLE_FR[m])
    .map(m => MUSCLE_FR[m].toLowerCase())
    .slice(0, 2)

  let desc = `Exercice ${ex.is_compound ? 'polyarticulaire' : "d'isolation"} ciblant les ${muscleName}`
  if (secondary.length > 0) desc += `, avec les ${secondary.join(' et les ')} en renfort`
  desc += `. Mouvement de ${patternName} réalisé ${equip === 'poids du corps' ? 'au poids du corps' : `à la ${equip}`}.`
  return desc
}

// ── Body Diagram SVG ───────────────────────────────────────────────────────

function MuscleHighlight({ muscle, c }) {
  const f = op => rgba(c, op)
  switch (muscle) {
    case 'chest':
      return <>
        <ellipse cx="57"  cy="83"  rx="20" ry="17" fill={f(0.6)} />
        <ellipse cx="103" cy="83"  rx="20" ry="17" fill={f(0.6)} />
      </>
    case 'abs':
      return <>
        {[0, 1, 2].map(row =>
          [0, 1].map(col => (
            <rect key={`${row}${col}`}
              x={60 + col * 22} y={106 + row * 22}
              width="16" height="17" rx="4"
              fill={f(0.65)} />
          ))
        )}
      </>
    case 'shoulders':
      return <>
        <ellipse cx="29"  cy="62" rx="19" ry="16" fill={f(0.65)} />
        <ellipse cx="131" cy="62" rx="19" ry="16" fill={f(0.65)} />
      </>
    case 'biceps':
      return <>
        <ellipse cx="17"  cy="98" rx="11" ry="25" fill={f(0.7)} />
        <ellipse cx="143" cy="98" rx="11" ry="25" fill={f(0.7)} />
      </>
    case 'triceps':
      return <>
        <ellipse cx="16"  cy="100" rx="11" ry="25" fill={f(0.65)} />
        <ellipse cx="144" cy="100" rx="11" ry="25" fill={f(0.65)} />
      </>
    case 'forearms':
      return <>
        <ellipse cx="13"  cy="152" rx="9" ry="23" fill={f(0.7)} />
        <ellipse cx="147" cy="152" rx="9" ry="23" fill={f(0.7)} />
      </>
    case 'quads':
      return <>
        <ellipse cx="59"  cy="220" rx="21" ry="35" fill={f(0.6)} />
        <ellipse cx="101" cy="220" rx="21" ry="35" fill={f(0.6)} />
      </>
    case 'hamstrings':
      return <>
        <ellipse cx="59"  cy="224" rx="20" ry="32" fill={f(0.55)} />
        <ellipse cx="101" cy="224" rx="20" ry="32" fill={f(0.55)} />
      </>
    case 'glutes':
      return <>
        <ellipse cx="59"  cy="180" rx="25" ry="20" fill={f(0.6)} />
        <ellipse cx="101" cy="180" rx="25" ry="20" fill={f(0.6)} />
      </>
    case 'calves':
      return <>
        <ellipse cx="57"  cy="291" rx="16" ry="27" fill={f(0.65)} />
        <ellipse cx="103" cy="291" rx="16" ry="27" fill={f(0.65)} />
      </>
    case 'back':
      return <path d="M46,66 L34,76 L36,164 L80,172 L124,164 L126,76 L114,66 Z" fill={f(0.48)} />
    case 'lats':
      return <>
        <path d="M46,66 L30,78 L34,164 L78,170 L80,76 L52,64 Z"  fill={f(0.55)} />
        <path d="M114,66 L130,78 L126,164 L82,170 L80,76 L108,64 Z" fill={f(0.55)} />
      </>
    case 'traps':
      return <path d="M40,50 L80,70 L120,50 L116,76 L80,86 L44,76 Z" fill={f(0.62)} />
    case 'lower_back':
      return <ellipse cx="80" cy="156" rx="33" ry="13" fill={f(0.7)} />
    default:
      return null
  }
}

function BodyDiagram({ muscle }) {
  const c  = MUSCLE_HEX[muscle] ?? '#22c55e'
  const bf = '#1c1c1c'
  const bs = '#2a2a2a'
  const bw = '1'

  return (
    <svg viewBox="0 0 160 340" fill="none" xmlns="http://www.w3.org/2000/svg"
         className="w-full h-full">
      <defs>
        <filter id={`glow_${muscle}`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── Silhouette ── */}
      <circle cx="80" cy="22" r="18" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="80" cy="43" rx="9"  ry="8"  fill={bf} stroke={bs} strokeWidth={bw} />

      {/* Torso */}
      <path d="M42,50 L118,50 L124,72 L126,170 L98,182 L62,182 L34,170 L36,72 Z"
            fill={bf} stroke={bs} strokeWidth={bw} />

      {/* Left arm */}
      <ellipse cx="29"  cy="62"  rx="18" ry="15" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="17"  cy="100" rx="12" ry="28" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="13"  cy="152" rx="9"  ry="24" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="11"  cy="184" rx="8"  ry="11" fill={bf} stroke={bs} strokeWidth={bw} />

      {/* Right arm */}
      <ellipse cx="131" cy="62"  rx="18" ry="15" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="143" cy="100" rx="12" ry="28" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="147" cy="152" rx="9"  ry="24" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="149" cy="184" rx="8"  ry="11" fill={bf} stroke={bs} strokeWidth={bw} />

      {/* Left leg */}
      <ellipse cx="59"  cy="222" rx="22" ry="36" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="57"  cy="290" rx="17" ry="28" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="55"  cy="328" rx="16" ry="8"  fill={bf} stroke={bs} strokeWidth={bw} />

      {/* Right leg */}
      <ellipse cx="101" cy="222" rx="22" ry="36" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="103" cy="290" rx="17" ry="28" fill={bf} stroke={bs} strokeWidth={bw} />
      <ellipse cx="105" cy="328" rx="16" ry="8"  fill={bf} stroke={bs} strokeWidth={bw} />

      {/* ── Glow layer ── */}
      <g filter={`url(#glow_${muscle})`} opacity="0.4">
        <MuscleHighlight muscle={muscle} c={c} />
      </g>
      {/* ── Solid highlight layer ── */}
      <MuscleHighlight muscle={muscle} c={c} />
    </svg>
  )
}

// ── Last Performance ────────────────────────────────────────────────────────

function LastPerformance({ exerciseId }) {
  const { getLastPerformance } = useAppStore()
  const sets = getLastPerformance(exerciseId)
  if (!sets || sets.length === 0) return null

  const maxWeight = Math.max(...sets.map(s => s.weight ?? 0))

  return (
    <div className="bg-[#141414] rounded-2xl p-4 border border-white/[0.06]">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={14} className="text-green-400" />
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
          Dernière séance
        </span>
      </div>
      <div className="space-y-2">
        {sets.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-5 text-right text-zinc-600 font-mono text-xs">{s.set_number ?? i + 1}</span>
            <div className="flex-1 h-px bg-white/5" />
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

// ── Variants List ───────────────────────────────────────────────────────────

function VariantsList({ parentId, lang, onSelect }) {
  const { exercises } = useAppStore()
  const variants = exercises.filter(e => e.parent_exercise_id === parentId)
  if (variants.length === 0) return null

  return (
    <div>
      <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest mb-3">
        Variantes ({variants.length})
      </p>
      <div className="space-y-2">
        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => onSelect(v)}
            className="w-full flex items-center justify-between bg-[#141414] rounded-2xl px-4 py-3 border border-white/[0.06] active:bg-[#1c1c1c] text-left"
          >
            <div className="min-w-0">
              <p className="text-sm text-white font-medium truncate">
                {lang === 'fr' ? v.name_fr : v.name}
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">
                {[EQUIPMENT_FR[v.equipment], GRIP_FR[v.grip_type], WIDTH_FR[v.grip_width], ANGLE_FR[v.bench_angle]]
                  .filter(Boolean).join(' · ')}
              </p>
            </div>
            <ChevronRight size={14} className="text-zinc-600 flex-shrink-0 ml-2" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── ExerciseDetail ─────────────────────────────────────────────────────────

export default function ExerciseDetail({ exercise, onClose, lang, onLangToggle }) {
  const { exercises } = useAppStore()
  const [currentEx, setCurrentEx] = useState(exercise)

  const c      = MUSCLE_HEX[currentEx.primary_muscle] ?? '#22c55e'
  const parent = currentEx.parent_exercise_id
    ? exercises.find(e => e.id === currentEx.parent_exercise_id)
    : null

  const chips = [
    currentEx.grip_type   !== 'none' && GRIP_FR[currentEx.grip_type],
    currentEx.grip_width  !== 'none' && WIDTH_FR[currentEx.grip_width],
    currentEx.bench_angle !== 'none' && ANGLE_FR[currentEx.bench_angle],
    currentEx.laterality === 'unilateral' && 'Unilatéral',
    !currentEx.is_compound && 'Isolation',
    currentEx.difficulty === 1 && 'Débutant',
    currentEx.difficulty === 3 && 'Avancé',
  ].filter(Boolean)

  const secondaryMuscles = (currentEx.secondary_muscles ?? []).filter(m => MUSCLE_FR[m])

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-end">
      <div className="w-full bg-[#0f0f0f] rounded-t-3xl max-h-[92dvh] flex flex-col animate-slide-up">

        {/* ── Header : gradient + body diagram ── */}
        <div className="relative overflow-hidden rounded-t-3xl" style={{ height: 220 }}>

          {/* Fond dégradé */}
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse at 25% 60%, ${rgba(c, 0.28)} 0%, transparent 65%),
              radial-gradient(ellipse at 60% 10%, ${rgba(c, 0.12)} 0%, transparent 55%),
              #0f0f0f`
          }} />

          {/* Diagramme corps humain */}
          <div className="absolute right-2 top-0 bottom-0 w-40">
            <BodyDiagram muscle={currentEx.primary_muscle} />
          </div>

          {/* Fade vers la droite pour lisibilité du texte */}
          <div className="absolute inset-0 pointer-events-none"
               style={{ background: 'linear-gradient(to right, #0f0f0f 40%, transparent 72%)' }} />

          {/* Texte à gauche */}
          <div className="absolute inset-0 flex flex-col justify-end px-5 pb-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: rgba(c, 0.18), color: c }}>
                {MUSCLE_FR[currentEx.primary_muscle] ?? currentEx.primary_muscle}
              </span>
              <span className="text-xs text-zinc-400 px-2.5 py-1 rounded-full bg-white/[0.06]">
                {EQUIPMENT_FR[currentEx.equipment] ?? currentEx.equipment}
              </span>
            </div>
            <h2 className="text-[22px] font-bold text-white leading-snug max-w-[58%]">
              {lang === 'fr' ? currentEx.name_fr : currentEx.name}
            </h2>
            <p className="text-xs text-zinc-500 mt-1 max-w-[58%] truncate">
              {lang === 'fr' ? currentEx.name : currentEx.name_fr}
            </p>
          </div>

          {/* Boutons haut droite */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={onLangToggle}
              className="bg-black/50 backdrop-blur-sm text-zinc-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/10"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={onClose}
              className="bg-black/50 backdrop-blur-sm text-zinc-400 p-2 rounded-xl border border-white/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Contenu scrollable ── */}
        <div className="flex-1 min-h-0 scroll-area pb-safe">
          <div className="px-5 pt-5 pb-10 space-y-5">

            {/* Description */}
            <p className="text-sm text-zinc-400 leading-relaxed">
              {getDescription(currentEx)}
            </p>

            {/* Chips attributs */}
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {chips.map(chip => (
                  <span key={chip}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-zinc-400 border border-white/[0.07]">
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {/* Muscles secondaires */}
            {secondaryMuscles.length > 0 && (
              <div>
                <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold mb-2.5">
                  Muscles secondaires
                </p>
                <div className="flex flex-wrap gap-2">
                  {secondaryMuscles.map(m => (
                    <span key={m}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/[0.05] text-zinc-500">
                      {MUSCLE_FR[m]}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Lien vers exercice parent */}
            {parent && (
              <button
                onClick={() => setCurrentEx(parent)}
                className="flex items-center gap-2 text-sm text-zinc-500 active:text-white transition-colors"
              >
                <ChevronRight size={14} className="rotate-180 text-zinc-600" />
                Base :{' '}
                <span className="text-zinc-300 font-medium">
                  {lang === 'fr' ? parent.name_fr : parent.name}
                </span>
              </button>
            )}

            {/* Points clés */}
            {currentEx.coaching_cues?.length > 0 && (
              <div className="bg-[#141414] rounded-2xl p-4 border border-white/[0.06]">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
                  Points clés
                </p>
                <ul className="space-y-2.5">
                  {currentEx.coaching_cues.map((cue, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">·</span>
                      {cue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dernière perf */}
            <LastPerformance exerciseId={currentEx.id} />

            {/* Variantes */}
            {!currentEx.parent_exercise_id && (
              <VariantsList parentId={currentEx.id} lang={lang} onSelect={setCurrentEx} />
            )}

          </div>
        </div>

      </div>
    </div>
  )
}
