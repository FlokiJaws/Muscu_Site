import { useState } from 'react'
import { Play, Plus, Trash2, Dumbbell, Zap } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import TemplateForm from '../templates/TemplateForm'

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Bonjour'
  if (h < 18) return 'Bonne après-midi'
  return 'Bonsoir'
}

export default function HomeTab({ onTabChange }) {
  const { routines, startWorkout, deleteRoutine, workoutHistory } = useAppStore()
  const [showForm,    setShowForm]    = useState(false)
  const [editRoutine, setEditRoutine] = useState(null)

  const lastSession = workoutHistory[0]

  return (
    <div className="flex-1 min-h-0 scroll-area pb-nav pt-safe">
      <div className="px-4 pt-6">

        {/* ── Header ── */}
        <div className="mb-6">
          <p className="text-sm text-zinc-500">{greeting()}</p>
          <h1 className="text-2xl font-bold text-white mt-0.5">Prêt pour la séance ?</h1>
          {lastSession && (
            <p className="text-xs text-zinc-600 mt-1.5">
              Dernière séance :{' '}
              <span className="text-zinc-400">
                {lastSession.routine_name},{' '}
                {new Date(lastSession.started_at).toLocaleDateString('fr-FR', {
                  weekday: 'long', day: 'numeric', month: 'short',
                })}
              </span>
            </p>
          )}
        </div>

        {/* ── Section routines ── */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">
            Mes routines
          </h2>
          <button
            onClick={() => { setEditRoutine(null); setShowForm(true) }}
            className="flex items-center gap-1 text-green-400 text-sm font-medium active:opacity-60"
          >
            <Plus size={16} />
            Nouvelle
          </button>
        </div>

        {routines.length === 0 ? (
          <div className="bg-[#141414] rounded-2xl p-8 text-center border border-dashed border-white/10">
            <Dumbbell size={28} className="mx-auto mb-3 text-zinc-700" />
            <p className="text-zinc-500 text-sm mb-3">Aucune routine créée</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-green-400 text-sm font-semibold"
            >
              Créer ma première routine
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {routines.map(routine => (
              <RoutineCard
                key={routine.id}
                routine={routine}
                onStart={() => startWorkout(routine)}
                onEdit={() => { setEditRoutine(routine); setShowForm(true) }}
                onDelete={() => deleteRoutine(routine.id)}
              />
            ))}
          </div>
        )}

        {/* ── Stats semaine ── */}
        {workoutHistory.length > 0 && (
          <div className="mt-8 mb-4">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
              Cette semaine
            </h2>
            <WeekStats history={workoutHistory} />
          </div>
        )}

      </div>

      {showForm && (
        <TemplateForm
          initial={editRoutine}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

// ── Routine Card ─────────────────────────────────────────────────────────────

function RoutineCard({ routine, onStart, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const exerciseCount = routine.exercises?.length ?? 0
  const setCount      = routine.exercises?.reduce((a, e) => a + (e.targetSets ?? 0), 0) ?? 0

  // Couleur de la routine (classe Tailwind → hex approximatif pour le inline style)
  const colorClass = routine.color ?? 'bg-green-500'

  return (
    <div className="bg-[#141414] rounded-2xl overflow-hidden border border-white/[0.06]">

      {/* Bande couleur en haut */}
      <div className={`h-1 w-full ${colorClass}`} />

      <div className="flex items-center gap-3 px-4 py-4">

        {/* Infos — zone cliquable pour éditer */}
        <div className="flex-1 min-w-0" onClick={onEdit}>
          <h3 className="font-bold text-white text-base leading-tight">{routine.name}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            {exerciseCount} exercice{exerciseCount !== 1 ? 's' : ''} · {setCount} séries
          </p>
          {exerciseCount > 0 && (
            <p className="text-xs text-zinc-700 mt-0.5 truncate">
              {routine.exercises?.map(e => e.exerciseName).join(', ')}
            </p>
          )}
        </div>

        {confirmDelete ? (
          <div className="flex gap-2">
            <button
              onClick={() => { onDelete(); setConfirmDelete(false) }}
              className="bg-red-500/15 text-red-400 text-xs font-semibold px-3 py-2 rounded-xl"
            >
              Supprimer
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-zinc-500 text-xs px-2 py-2"
            >
              Annuler
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-2 text-zinc-700 active:text-red-400 transition-colors"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={onStart}
              className="bg-green-500 text-white p-3 rounded-xl active:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
            >
              <Play size={18} fill="currentColor" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ── Week Stats ────────────────────────────────────────────────────────────────

function WeekStats({ history }) {
  const now       = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay() + 1)
  weekStart.setHours(0, 0, 0, 0)

  const thisWeek = history.filter(s => new Date(s.started_at) >= weekStart)
  const totalSec = thisWeek.reduce((a, s) => a + (s.duration_seconds ?? 0), 0)
  const hours    = Math.floor(totalSec / 3600)
  const mins     = Math.floor((totalSec % 3600) / 60)

  const stats = [
    { label: 'Séances',  value: thisWeek.length,
      sub: thisWeek.length === 0 ? 'cette semaine' : thisWeek.length > 1 ? 'cette semaine' : 'cette semaine' },
    { label: 'Durée totale',
      value: totalSec > 0 ? `${hours > 0 ? `${hours}h` : ''}${String(mins).padStart(hours > 0 ? 2 : 1, '0')}min` : '—',
      sub: totalSec > 0 ? 'cumulé' : 'aucune séance' },
  ]

  return (
    <div className="flex gap-3">
      {stats.map(({ label, value, sub }) => (
        <div key={label} className="flex-1 bg-[#141414] rounded-2xl p-4 border border-white/[0.06]">
          <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
          <p className="text-xs font-medium text-zinc-400 mt-0.5">{label}</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">{sub}</p>
        </div>
      ))}
    </div>
  )
}
