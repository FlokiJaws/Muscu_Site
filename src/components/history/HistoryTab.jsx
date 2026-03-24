import { useState } from 'react'
import { ChevronDown, ChevronUp, Clock, Dumbbell, Flame } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export default function HistoryTab() {
  const { workoutHistory } = useAppStore()

  return (
    <div className="flex-1 min-h-0 scroll-area pb-nav pt-safe">
      <div className="px-4 pt-6">
        <h1 className="text-2xl font-bold text-white mb-1">Historique</h1>
        <p className="text-xs text-zinc-600 mb-5">
          {workoutHistory.length} séance{workoutHistory.length !== 1 ? 's' : ''} enregistrée{workoutHistory.length !== 1 ? 's' : ''}
        </p>

        {workoutHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-700">
            <Dumbbell size={40} className="mb-3 opacity-30" />
            <p className="text-sm">Aucune séance enregistrée</p>
            <p className="text-xs mt-1 text-zinc-800">Complete ta première séance pour la voir ici</p>
          </div>
        ) : (
          <div className="space-y-3">
            {workoutHistory.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SessionCard({ session }) {
  const [expanded, setExpanded] = useState(false)

  const date       = new Date(session.started_at)
  const dateStr    = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const timeStr    = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  const sets       = session.workout_sets ?? []
  const durationStr = session.duration_seconds
    ? `${Math.floor(session.duration_seconds / 60)} min`
    : null
  const totalVolume = sets.reduce((a, s) => a + (s.weight ?? 0) * (s.reps ?? 0), 0)

  // Grouper par exercice
  const exerciseMap = {}
  for (const s of sets) {
    if (!exerciseMap[s.exercise_name]) exerciseMap[s.exercise_name] = []
    exerciseMap[s.exercise_name].push(s)
  }
  const exerciseCount = Object.keys(exerciseMap).length

  return (
    <div className="bg-[#141414] rounded-2xl border border-white/[0.06] overflow-hidden">

      {/* Header cliquable */}
      <button onClick={() => setExpanded(v => !v)} className="w-full text-left p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base leading-tight truncate">
              {session.routine_name}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 capitalize">{dateStr} · {timeStr}</p>
          </div>
          <div className={`p-1.5 rounded-xl transition-colors ${expanded ? 'bg-white/5' : ''}`}>
            {expanded
              ? <ChevronUp  size={16} className="text-zinc-400" />
              : <ChevronDown size={16} className="text-zinc-500" />
            }
          </div>
        </div>

        {/* Stats rapides */}
        <div className="flex items-center gap-4 mt-3">
          {durationStr && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock size={12} className="text-zinc-600" />
              <span>{durationStr}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Dumbbell size={12} className="text-zinc-600" />
            <span>{sets.length} séries</span>
          </div>
          {exerciseCount > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span>{exerciseCount} exo{exerciseCount > 1 ? 's' : ''}</span>
            </div>
          )}
          {totalVolume > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-green-400/70 ml-auto">
              <Flame size={11} />
              <span>{Math.round(totalVolume).toLocaleString('fr-FR')} kg vol.</span>
            </div>
          )}
        </div>
      </button>

      {/* Détail expandé */}
      {expanded && (
        <div className="border-t border-white/[0.05] px-4 pb-4 pt-3 space-y-4 animate-fade-in">
          {Object.entries(exerciseMap).map(([exName, exSets]) => {
            const maxW = Math.max(...exSets.map(s => s.weight ?? 0))
            return (
              <div key={exName}>
                <p className="text-sm font-semibold text-white mb-2">{exName}</p>
                <div className="space-y-1.5">
                  {exSets.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="w-5 text-right text-zinc-700 font-mono">{s.set_number}</span>
                      <div className="flex-1 h-px bg-white/5" />
                      <span className={`font-semibold tabular-nums ${s.weight === maxW && maxW > 0 ? 'text-green-400' : 'text-zinc-300'}`}>
                        {s.weight} kg
                      </span>
                      <span className="text-zinc-600">×</span>
                      <span className="text-zinc-400 tabular-nums w-12 text-left">{s.reps} reps</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
