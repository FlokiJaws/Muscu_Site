import { useState } from 'react'
import { Search, Languages, ChevronRight } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import ExerciseDetail from './ExerciseDetail'

const MUSCLE_GROUPS = [
  { key: 'all',        label: 'Tous' },
  { key: 'chest',      label: 'Pecto' },
  { key: 'back',       label: 'Dos' },
  { key: 'lats',       label: 'Grand dorsal' },
  { key: 'shoulders',  label: 'Épaules' },
  { key: 'biceps',     label: 'Biceps' },
  { key: 'triceps',    label: 'Triceps' },
  { key: 'quads',      label: 'Quads' },
  { key: 'hamstrings', label: 'Ischio' },
  { key: 'glutes',     label: 'Fessiers' },
  { key: 'abs',        label: 'Abdos' },
  { key: 'lower_back', label: 'Lombaires' },
  { key: 'calves',     label: 'Mollets' },
]

const MUSCLE_HEX = {
  chest: '#3b82f6', back: '#8b5cf6', lats: '#a78bfa', traps: '#6366f1',
  shoulders: '#eab308', biceps: '#f97316', triceps: '#ef4444',
  forearms: '#fb923c', quads: '#22c55e', hamstrings: '#14b8a6',
  glutes: '#ec4899', calves: '#10b981', abs: '#06b6d4', lower_back: '#f59e0b',
}

const MUSCLE_FR = {
  chest: 'Pectoraux', back: 'Dos', lats: 'Grand dorsal', traps: 'Trapèzes',
  shoulders: 'Épaules', biceps: 'Biceps', triceps: 'Triceps',
  forearms: 'Avant-bras', quads: 'Quadriceps', hamstrings: 'Ischio-jambiers',
  glutes: 'Fessiers', calves: 'Mollets', abs: 'Abdominaux', lower_back: 'Lombaires',
}

const EQUIPMENT_ICON = {
  barbell: '🏋️', dumbbell: '💪', cable: '🔗', machine: '⚙️',
  bodyweight: '🤸', smith_machine: '🏗️', trap_bar: '⬡', kettlebell: '🫧',
  resistance_band: '〰️',
}

export default function ExercisesTab() {
  const { exercises, workoutHistory } = useAppStore()
  const [search,      setSearch]      = useState('')
  const [filterGroup, setFilterGroup] = useState('all')
  const [lang,        setLang]        = useState('fr')
  const [selectedEx,  setSelectedEx]  = useState(null)
  const [showVariants,setShowVariants]= useState(false)

  const displayExercises = exercises
    .filter(e => showVariants ? e.parent_exercise_id !== null : e.parent_exercise_id === null)
    .filter(e => filterGroup === 'all' || e.primary_muscle === filterGroup)
    .filter(e => {
      const q = search.toLowerCase()
      return e.name_fr.toLowerCase().includes(q) || e.name.toLowerCase().includes(q)
    })

  const getLastWeight = (exerciseId) => {
    for (const session of workoutHistory) {
      const sets = (session.workout_sets ?? []).filter(s => s.exercise_id === exerciseId)
      if (sets.length > 0) return `${Math.max(...sets.map(s => s.weight ?? 0))} kg`
    }
    return null
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col pt-safe">

      {/* ── Header ── */}
      <div className="px-4 pt-5 pb-3">

        {/* Titre + toggle lang */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Exercices</h1>
            <p className="text-xs text-zinc-600 mt-0.5">{displayExercises.length} exercices</p>
          </div>
          <button
            onClick={() => setLang(l => l === 'fr' ? 'en' : 'fr')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              lang === 'en'
                ? 'bg-green-500 text-white'
                : 'bg-white/[0.06] text-zinc-400 border border-white/[0.06]'
            }`}
          >
            <Languages size={13} />
            {lang === 'fr' ? 'FR' : 'EN'}
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="relative mb-3">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher un exercice…' : 'Search exercise…'}
            className="w-full bg-[#141414] text-white pl-10 pr-4 py-3 rounded-xl border border-white/[0.07] focus:border-green-500/50 focus:outline-none text-sm placeholder:text-zinc-600"
          />
        </div>

        {/* Toggle Catégories / Variantes */}
        <div className="flex gap-2 mb-3">
          {[
            { label: 'Catégories', count: exercises.filter(e => !e.parent_exercise_id).length, value: false },
            { label: 'Variantes',  count: exercises.filter(e =>  e.parent_exercise_id).length, value: true  },
          ].map(({ label, count, value }) => (
            <button
              key={label}
              onClick={() => setShowVariants(value)}
              className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
                showVariants === value
                  ? 'bg-green-500 text-white'
                  : 'bg-[#141414] text-zinc-500 border border-white/[0.06]'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>

        {/* Filtres muscles — scroll horizontal */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ touchAction: 'pan-x' }}>
          {MUSCLE_GROUPS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterGroup(key)}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                filterGroup === key
                  ? 'bg-green-500 text-white'
                  : 'bg-[#141414] text-zinc-500 border border-white/[0.06]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Liste ── */}
      <div className="flex-1 min-h-0 scroll-area pb-nav">
        <div className="px-4 space-y-2 pt-1">
          {displayExercises.length === 0 ? (
            <div className="text-center py-16 text-zinc-600">
              <Search size={32} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucun exercice trouvé</p>
            </div>
          ) : (
            displayExercises.map(ex => {
              const lastWeight   = getLastWeight(ex.id)
              const variantCount = exercises.filter(e => e.parent_exercise_id === ex.id).length
              const muscleColor  = MUSCLE_HEX[ex.primary_muscle] ?? '#666'

              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedEx(ex)}
                  className="w-full flex items-center gap-3 bg-[#141414] rounded-2xl px-4 py-3.5 border border-white/[0.05] active:bg-[#1c1c1c] text-left transition-colors"
                >
                  {/* Barre couleur muscle */}
                  <div
                    className="w-1 self-stretch rounded-full flex-shrink-0"
                    style={{ backgroundColor: muscleColor }}
                  />

                  {/* Icône équipement */}
                  <span className="text-xl w-8 text-center flex-shrink-0">
                    {EQUIPMENT_ICON[ex.equipment] ?? '💪'}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm leading-tight truncate">
                      {lang === 'fr' ? ex.name_fr : ex.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs font-medium" style={{ color: muscleColor }}>
                        {MUSCLE_FR[ex.primary_muscle] ?? ex.primary_muscle}
                      </span>
                      {variantCount > 0 && (
                        <span className="text-xs text-zinc-700">{variantCount} var.</span>
                      )}
                      {lastWeight && (
                        <span className="text-xs text-green-400 font-medium">{lastWeight}</span>
                      )}
                    </div>
                  </div>

                  <ChevronRight size={15} className="text-zinc-700 flex-shrink-0" />
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* ── Modal détail ── */}
      {selectedEx && (
        <ExerciseDetail
          exercise={selectedEx}
          lang={lang}
          onLangToggle={() => setLang(l => l === 'fr' ? 'en' : 'fr')}
          onClose={() => setSelectedEx(null)}
        />
      )}
    </div>
  )
}
