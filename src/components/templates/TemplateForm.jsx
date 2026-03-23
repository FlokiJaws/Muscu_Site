import { useState } from 'react'
import { X, Plus, Trash2, Search } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { nanoid } from '../../utils/nanoid'

const COLORS = [
  'bg-blue-600', 'bg-purple-600', 'bg-orange-600',
  'bg-red-600',  'bg-teal-600',   'bg-pink-600',
  'bg-yellow-600','bg-green-600',
]

const MUSCLE_GROUPS = [
  'Tous', 'chest', 'back', 'lats', 'shoulders',
  'biceps', 'triceps', 'quads', 'hamstrings', 'glutes', 'abs',
]

const MUSCLE_FR = {
  chest: 'Pectoraux', back: 'Dos', lats: 'Grand dorsal', traps: 'Trapèzes',
  shoulders: 'Épaules', biceps: 'Biceps', triceps: 'Triceps',
  forearms: 'Avant-bras', quads: 'Quadriceps', hamstrings: 'Ischio-jambiers',
  glutes: 'Fessiers', calves: 'Mollets', abs: 'Abdominaux',
  lower_back: 'Lombaires',
}

export default function TemplateForm({ initial, onClose }) {
  const { exercises, addRoutine, updateRoutine } = useAppStore()

  const [name, setName]   = useState(initial?.name ?? '')
  const [color, setColor] = useState(initial?.color ?? COLORS[0])
  const [items, setItems] = useState(
    initial?.exercises?.map((ex) => ({ ...ex, _id: nanoid() })) ?? []
  )
  const [showPicker, setShowPicker]     = useState(false)
  const [search, setSearch]             = useState('')
  const [filterMuscle, setFilterMuscle] = useState('Tous')
  const [saving, setSaving]             = useState(false)

  const handleSave = async () => {
    if (!name.trim() || items.length === 0) return
    setSaving(true)
    try {
      const payload = {
        name:  name.trim(),
        color,
        exercises: items.map(({ _id, ...rest }) => rest),
      }
      if (initial) {
        await updateRoutine(initial.id, payload)
      } else {
        await addRoutine(payload)
      }
      onClose()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const addExToTemplate = (ex) => {
    setItems((prev) => [
      ...prev,
      {
        _id:         nanoid(),
        exerciseId:  ex.id,
        exerciseName:ex.name_fr,
        muscleGroup: ex.primary_muscle,
        targetSets:  3,
        targetReps:  '10',
        targetWeight:null,
        restSeconds: 90,
      },
    ])
    setShowPicker(false)
    setSearch('')
  }

  const updateItem = (id, field, value) =>
    setItems((prev) => prev.map((it) => (it._id === id ? { ...it, [field]: value } : it)))

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it._id !== id))

  // Exercices filtrés pour le picker (on exclut ceux déjà ajoutés)
  const filteredEx = exercises
    .filter((e) => e.parent_exercise_id !== null) // variantes uniquement (les concrètes)
    .filter((e) => !items.some((it) => it.exerciseId === e.id))
    .filter((e) => filterMuscle === 'Tous' || e.primary_muscle === filterMuscle)
    .filter((e) => e.name_fr.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="fixed inset-0 bg-black/80 z-40 flex items-end">
      <div className="w-full bg-[#1a1a1a] rounded-t-3xl max-h-[92vh] flex flex-col animate-slide-up">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-[#2a2a2a]">
          <h2 className="text-lg font-bold text-white">
            {initial ? 'Modifier la routine' : 'Nouvelle routine'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 p-1"><X size={20} /></button>
        </div>

        <div className="flex-1 scroll-area px-5 py-4 space-y-5">

          {/* Nom */}
          <div>
            <label className="text-xs text-zinc-500 font-medium uppercase tracking-widest block mb-2">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Push A, Full Body…"
              className="w-full bg-[#111111] text-white rounded-xl px-4 py-3 border border-[#2a2a2a] focus:border-green-500 focus:outline-none"
            />
          </div>

          {/* Couleur */}
          <div>
            <label className="text-xs text-zinc-500 font-medium uppercase tracking-widest block mb-2">Couleur</label>
            <div className="flex gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-9 h-9 rounded-full ${c} transition-all ${
                    color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a]' : 'opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Exercices ajoutés */}
          <div>
            <label className="text-xs text-zinc-500 font-medium uppercase tracking-widest block mb-2">
              Exercices ({items.length})
            </label>

            {items.length === 0 && (
              <p className="text-sm text-zinc-600 text-center py-4">Ajoute des exercices ci-dessous</p>
            )}

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item._id} className="bg-[#111111] rounded-2xl p-3 border border-[#2a2a2a]">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.exerciseName}</p>
                      <p className="text-xs text-zinc-500">{MUSCLE_FR[item.muscleGroup] ?? item.muscleGroup}</p>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="text-zinc-600 active:text-red-400 p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Séries',   field: 'targetSets',   type: 'number' },
                      { label: 'Reps',     field: 'targetReps',   type: 'text' },
                      { label: 'Repos (s)',field: 'restSeconds',   type: 'number' },
                    ].map(({ label, field, type }) => (
                      <div key={field}>
                        <label className="text-[10px] text-zinc-600 block mb-1">{label}</label>
                        <input
                          type={type}
                          inputMode={type === 'number' ? 'numeric' : 'text'}
                          value={item[field]}
                          onChange={(e) => updateItem(item._id, field, type === 'number' ? Number(e.target.value) : e.target.value)}
                          className="w-full bg-[#1a1a1a] text-white text-center rounded-xl py-2 text-sm border border-[#2a2a2a] focus:border-green-500 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <label className="text-[10px] text-zinc-600 block mb-1">Poids cible (kg)</label>
                    <input
                      type="number" inputMode="decimal"
                      value={item.targetWeight ?? ''}
                      placeholder="—"
                      onChange={(e) => updateItem(item._id, 'targetWeight', e.target.value ? Number(e.target.value) : null)}
                      className="w-full bg-[#1a1a1a] text-white text-center rounded-xl py-2 text-sm border border-[#2a2a2a] focus:border-green-500 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Picker exercices */}
            {showPicker ? (
              <div className="mt-3 bg-[#111111] rounded-2xl border border-[#2a2a2a] overflow-hidden">
                {/* Recherche */}
                <div className="p-3 border-b border-[#2a2a2a]">
                  <div className="relative mb-2">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Rechercher un exercice…"
                      className="w-full bg-[#1a1a1a] text-white pl-8 pr-3 py-2 text-sm rounded-xl border border-[#2a2a2a] focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  {/* Filtre muscle */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {MUSCLE_GROUPS.map((g) => (
                      <button
                        key={g}
                        onClick={() => setFilterMuscle(g)}
                        className={`flex-shrink-0 text-xs px-2.5 py-1 rounded-full transition-colors ${
                          filterMuscle === g
                            ? 'bg-green-500 text-white'
                            : 'bg-[#2a2a2a] text-zinc-500'
                        }`}
                      >
                        {g === 'Tous' ? 'Tous' : (MUSCLE_FR[g] ?? g)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="max-h-52 overflow-y-auto">
                  {filteredEx.length === 0 ? (
                    <p className="text-center text-zinc-600 text-sm py-4">Aucun exercice trouvé</p>
                  ) : (
                    filteredEx.map((ex) => (
                      <button
                        key={ex.id}
                        onClick={() => addExToTemplate(ex)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left border-b border-[#2a2a2a] last:border-0 active:bg-[#2a2a2a]"
                      >
                        <div>
                          <p className="text-sm text-white font-medium">{ex.name_fr}</p>
                          <p className="text-xs text-zinc-500">{MUSCLE_FR[ex.primary_muscle] ?? ex.primary_muscle} · {ex.equipment}</p>
                        </div>
                        <Plus size={16} className="text-green-400 flex-shrink-0" />
                      </button>
                    ))
                  )}
                </div>

                <button onClick={() => setShowPicker(false)} className="w-full py-3 text-zinc-500 text-sm border-t border-[#2a2a2a]">
                  Fermer
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPicker(true)}
                className="mt-3 w-full border border-dashed border-[#2a2a2a] text-zinc-500 rounded-2xl py-4 flex items-center justify-center gap-2 text-sm active:border-green-500 active:text-green-400 transition-colors"
              >
                <Plus size={18} />
                Ajouter un exercice
              </button>
            )}
          </div>
        </div>

        {/* Bouton sauvegarde */}
        <div className="px-5 py-4 border-t border-[#2a2a2a] pb-safe">
          <button
            onClick={handleSave}
            disabled={!name.trim() || items.length === 0 || saving}
            className="w-full bg-green-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-bold py-4 rounded-2xl text-base active:scale-[0.98] transition-all"
          >
            {saving ? 'Sauvegarde…' : initial ? 'Enregistrer' : 'Créer la routine'}
          </button>
        </div>
      </div>
    </div>
  )
}
