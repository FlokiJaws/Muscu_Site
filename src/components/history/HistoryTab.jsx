import { useState } from 'react'
import { ChevronDown, ChevronUp, Clock, Dumbbell } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

export default function HistoryTab() {
  const { workoutHistory } = useAppStore()

  return (
    <div className="h-full scroll-area pb-nav pt-safe">
      <div className="px-4 pt-5">
        <h1 className="text-2xl font-bold text-white mb-5">Historique</h1>

        {workoutHistory.length === 0 ? (
          <div className="text-center py-20 text-zinc-600">
            <Dumbbell size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Aucune séance enregistrée</p>
            <p className="text-xs mt-1">Complète ta première séance pour la voir ici</p>
          </div>
        ) : (
          <div className="space-y-3">
            {workoutHistory.map((session) => (
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

  const date    = new Date(session.started_at)
  const dateStr = date.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
  const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

  const sets        = session.workout_sets ?? []
  const durationStr = session.duration_seconds
    ? `${Math.floor(session.duration_seconds / 60)} min`
    : null

  const totalVolume = sets.reduce((a, s) => a + (s.weight ?? 0) * (s.reps ?? 0), 0)

  // Grouper les sets par exercice
  const exerciseMap = {}
  for (const s of sets) {
    if (!exerciseMap[s.exercise_name]) exerciseMap[s.exercise_name] = []
    exerciseMap[s.exercise_name].push(s)
  }

  return (
    <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] overflow-hidden">
      <button onClick={() => setExpanded((v) => !v)} className="w-full text-left p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-base">{session.routine_name}</h3>
            <p className="text-xs text-zinc-500 mt-0.5 capitalize">{dateStr} · {timeStr}</p>
          </div>
          {expanded ? <ChevronUp size={18} className="text-zinc-500" /> : <ChevronDown size={18} className="text-zinc-500" />}
        </div>

        <div className="flex gap-4 mt-3">
          {durationStr && (
            <div className="flex items-center gap-1 text-xs text-zinc-500">
              <Clock size={12} /><span>{durationStr}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <Dumbbell size={12} /><span>{sets.length} séries</span>
          </div>
          {totalVolume > 0 && (
            <span className="text-xs text-zinc-500">
              {Math.round(totalVolume).toLocaleString('fr-FR')} kg vol.
            </span>
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[#2a2a2a] px-4 pb-4 pt-3 space-y-4 animate-slide-up">
          {Object.entries(exerciseMap).map(([exName, exSets]) => (
            <div key={exName}>
              <p className="text-sm font-semibold text-white mb-2">{exName}</p>
              <div className="space-y-1">
                {exSets.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="w-5 text-right text-zinc-600 font-mono">{s.set_number}</span>
                    <div className="flex-1 h-px bg-[#2a2a2a]" />
                    <span className="text-zinc-300 font-medium tabular-nums">
                      {s.weight} kg × {s.reps} reps
                    </span>
                    <span className="text-zinc-600 tabular-nums">
                      = {Math.round(s.weight * s.reps)} kg
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
