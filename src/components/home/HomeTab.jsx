import { useState } from 'react'
import { Play, Plus, Trash2 } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import TemplateForm from '../templates/TemplateForm'

export default function HomeTab({ onTabChange }) {
  const { routines, startWorkout, deleteRoutine, workoutHistory } = useAppStore()
  const [showForm, setShowForm]       = useState(false)
  const [editRoutine, setEditRoutine] = useState(null)

  const lastSession = workoutHistory[0]

  return (
    <div className="h-full scroll-area pb-nav pt-safe">
      <div className="px-4 pt-5">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Entraînement</h1>
          {lastSession && (
            <p className="text-sm text-zinc-500 mt-0.5">
              Dernière séance :{' '}
              <span className="text-zinc-300">
                {lastSession.routine_name},{' '}
                {new Date(lastSession.started_at).toLocaleDateString('fr-FR', {
                  weekday: 'long', day: 'numeric', month: 'short',
                })}
              </span>
            </p>
          )}
        </div>

        {/* Routines */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
            Mes routines
          </h2>
          <button
            onClick={() => { setEditRoutine(null); setShowForm(true) }}
            className="flex items-center gap-1 text-green-400 text-sm font-medium active:opacity-70"
          >
            <Plus size={16} />
            Nouvelle
          </button>
        </div>

        {routines.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-2xl p-8 text-center border border-dashed border-[#2a2a2a]">
            <p className="text-zinc-500 text-sm mb-3">Aucune routine créée</p>
            <button
              onClick={() => setShowForm(true)}
              className="text-green-400 text-sm font-medium"
            >
              Créer ma première routine
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {routines.map((routine) => (
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

        {/* Stats semaine */}
        {workoutHistory.length > 0 && (
          <div className="mt-8 mb-4">
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-widest mb-3">
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

function RoutineCard({ routine, onStart, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const exerciseCount = routine.exercises?.length ?? 0
  const setCount      = routine.exercises?.reduce((a, e) => a + (e.targetSets ?? 0), 0) ?? 0

  return (
    <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-[#2a2a2a]">
      <div className="flex items-center gap-3 p-4">
        <div className={`w-3 h-10 rounded-full ${routine.color ?? 'bg-green-500'} flex-shrink-0`} />

        <div className="flex-1 min-w-0" onClick={onEdit}>
          <h3 className="font-semibold text-white text-base leading-tight">{routine.name}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            {exerciseCount} exercice{exerciseCount > 1 ? 's' : ''} · {setCount} séries
          </p>
          <p className="text-xs text-zinc-600 mt-0.5 truncate">
            {routine.exercises?.map((e) => e.exerciseName).join(', ')}
          </p>
        </div>

        {confirmDelete ? (
          <div className="flex gap-2">
            <button
              onClick={() => { onDelete(); setConfirmDelete(false) }}
              className="bg-red-500/15 text-red-400 text-xs font-medium px-3 py-2 rounded-xl"
            >
              Supprimer
            </button>
            <button onClick={() => setConfirmDelete(false)} className="text-zinc-500 text-xs px-2 py-2">
              Annuler
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-2 text-zinc-700 active:text-red-400 transition-colors"
            >
              <Trash2 size={16} />
            </button>
            <button
              onClick={onStart}
              className="bg-green-500 text-white p-3 rounded-xl active:bg-green-600 transition-colors"
            >
              <Play size={18} fill="currentColor" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function WeekStats({ history }) {
  const now       = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay() + 1)
  weekStart.setHours(0, 0, 0, 0)

  const thisWeek    = history.filter((s) => new Date(s.started_at) >= weekStart)
  const totalSec    = thisWeek.reduce((a, s) => a + (s.duration_seconds ?? 0), 0)
  const hours       = Math.floor(totalSec / 3600)
  const mins        = Math.floor((totalSec % 3600) / 60)

  return (
    <div className="flex gap-3">
      {[
        { label: 'Séances', value: thisWeek.length },
        { label: 'Durée',   value: totalSec > 0 ? `${hours}h${String(mins).padStart(2, '0')}` : '—' },
      ].map(({ label, value }) => (
        <div key={label} className="flex-1 bg-[#1a1a1a] rounded-2xl p-4 text-center border border-[#2a2a2a]">
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-xs text-zinc-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  )
}
