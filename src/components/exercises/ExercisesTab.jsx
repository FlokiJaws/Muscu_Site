import { useState } from 'react'
import { Search, Languages, ChevronRight } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import ExerciseDetail from './ExerciseDetail'

const MUSCLE_GROUPS = [
  { key: 'all',         label: 'Tous' },
  { key: 'chest',       label: 'Pectoraux' },
  { key: 'back',        label: 'Dos' },
  { key: 'lats',        label: 'Grand dorsal' },
  { key: 'shoulders',   label: 'Épaules' },
  { key: 'biceps',      label: 'Biceps' },
  { key: 'triceps',     label: 'Triceps' },
  { key: 'quads',       label: 'Quads' },
  { key: 'hamstrings',  label: 'Ischio' },
  { key: 'glutes',      label: 'Fessiers' },
  { key: 'abs',         label: 'Abdos' },
  { key: 'lower_back',  label: 'Lombaires' },
  { key: 'calves',      label: 'Mollets' },
]

const MUSCLE_COLOR = {
  chest: 'text-blue-400', back: 'text-purple-400', lats: 'text-purple-300',
  traps: 'text-indigo-400', shoulders: 'text-yellow-400', biceps: 'text-orange-400',
  triceps: 'text-red-400', quads: 'text-green-400', hamstrings: 'text-teal-400',
  glutes: 'text-pink-400', calves: 'text-emerald-400', abs: 'text-cyan-400',
  lower_back: 'text-amber-400',
}

const EQUIPMENT_ICON = {
  barbell: '🏋️', dumbbell: '💪', cable: '🔗', machine: '⚙️',
  bodyweight: '🤸', smith_machine: '🏗️', trap_bar: '⬡', kettlebell: '🫧',
  resistance_band: '〰️',
}

export default function ExercisesTab() {
  const { exercises, workoutHistory } = useAppStore()
  const [search,       setSearch]      = useState('')
  const [filterGroup,  setFilterGroup] = useState('all')
  const [lang,         setLang]        = useState('fr')     // 'fr' | 'en'
  const [selectedEx,   setSelectedEx]  = useState(null)
  const [showVariants, setShowVariants] = useState(false)   // afficher parents ou variantes

  // Filtres
  const displayExercises = exercises
    .filter((e) => showVariants ? e.parent_exercise_id !== null : e.parent_exercise_id === null)
    .filter((e) => filterGroup === 'all' || e.primary_muscle === filterGroup)
    .filter((e) => {
      const q = search.toLowerCase()
      return e.name_fr.toLowerCase().includes(q) || e.name.toLowerCase().includes(q)
    })

  const getLastWeight = (exerciseId) => {
    for (const session of workoutHistory) {
      const sets = (session.workout_sets ?? []).filter((s) => s.exercise_id === exerciseId)
      if (sets.length > 0) return `${Math.max(...sets.map((s) => s.weight ?? 0))} kg`
    }
    return null
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col pt-safe">

      {/* ── Header ── */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Exercices</h1>
            <p className="text-xs text-zinc-600 mt-0.5">{displayExercises.length} exercices</p>
          </div>

          {/* Toggle FR / EN */}
          <button
            onClick={() => setLang((l) => l === 'fr' ? 'en' : 'fr')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
              lang === 'en'
                ? 'bg-green-500 text-white'
                : 'bg-[#2a2a2a] text-zinc-400'
            }`}
          >
            <Languages size={14} />
            {lang === 'fr' ? 'FR' : 'EN'}
          </button>
        </div>

        {/* Recherche */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher…' : 'Search…'}
            className="w-full bg-[#1a1a1a] text-white pl-9 pr-4 py-3 rounded-xl border border-[#2a2a2a] focus:border-green-500 focus:outline-none text-sm"
          />
        </div>

        {/* Toggle Catégories / Variantes */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setShowVariants(false)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
              !showVariants ? 'bg-green-500 text-white' : 'bg-[#1a1a1a] text-zinc-500 border border-[#2a2a2a]'
            }`}
          >
            Catégories ({exercises.filter((e) => !e.parent_exercise_id).length})
          </button>
          <button
            onClick={() => setShowVariants(true)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium transition-colors ${
              showVariants ? 'bg-green-500 text-white' : 'bg-[#1a1a1a] text-zinc-500 border border-[#2a2a2a]'
            }`}
          >
            Variantes ({exercises.filter((e) => e.parent_exercise_id).length})
          </button>
        </div>

        {/* Filtres groupes musculaires */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {MUSCLE_GROUPS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterGroup(key)}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                filterGroup === key
                  ? 'bg-green-500 text-white'
                  : 'bg-[#1a1a1a] text-zinc-500 border border-[#2a2a2a]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Liste ── */}
      <div className="flex-1 scroll-area pb-nav">
        <div className="px-4 space-y-2">
          {displayExercises.length === 0 ? (
            <div className="text-center py-12 text-zinc-600">
              <p className="text-sm">Aucun exercice trouvé</p>
            </div>
          ) : (
            displayExercises.map((ex) => {
              const lastWeight   = getLastWeight(ex.id)
              const variantCount = exercises.filter((e) => e.parent_exercise_id === ex.id).length

              return (
                <button
                  key={ex.id}
                  onClick={() => setSelectedEx(ex)}
                  className="w-full flex items-center gap-3 bg-[#1a1a1a] rounded-2xl px-4 py-3 border border-[#2a2a2a] active:bg-[#2a2a2a] text-left transition-colors"
                >
                  {/* Icône équipement */}
                  <span className="text-xl w-8 text-center flex-shrink-0">
                    {EQUIPMENT_ICON[ex.equipment] ?? '💪'}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm leading-tight truncate">
                      {lang === 'fr' ? ex.name_fr : ex.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className={`text-xs font-medium ${MUSCLE_COLOR[ex.primary_muscle] ?? 'text-zinc-400'}`}>
                        {MUSCLE_GROUPS.find((m) => m.key === ex.primary_muscle)?.label ?? ex.primary_muscle}
                      </span>
                      {variantCount > 0 && (
                        <>
                          <span className="text-zinc-700">·</span>
                          <span className="text-xs text-zinc-600">{variantCount} variantes</span>
                        </>
                      )}
                      {lastWeight && (
                        <>
                          <span className="text-zinc-700">·</span>
                          <span className="text-xs text-green-400 font-medium">{lastWeight}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ChevronRight size={16} className="text-zinc-600 flex-shrink-0" />
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* ── Exercise Detail Modal ── */}
      {selectedEx && (
        <ExerciseDetail
          exercise={selectedEx}
          lang={lang}
          onLangToggle={() => setLang((l) => l === 'fr' ? 'en' : 'fr')}
          onClose={() => setSelectedEx(null)}
        />
      )}
    </div>
  )
}
