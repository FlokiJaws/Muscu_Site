import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import { useAppStore } from './store/useAppStore'
import AuthScreen from './components/auth/AuthScreen'
import BottomNav from './components/layout/BottomNav'
import HomeTab from './components/home/HomeTab'
import ExercisesTab from './components/exercises/ExercisesTab'
import HistoryTab from './components/history/HistoryTab'
import LiveWorkout from './components/workout/LiveWorkout'
import { useState } from 'react'
import { Dumbbell, Loader2 } from 'lucide-react' 


export default function App() {
  const { user, loading: authLoading } = useAuth()
  const { initialize, isLoading, activeWorkout, error } = useAppStore()
  const [activeTab, setActiveTab] = useState('home')

  // Charge les données dès que l'utilisateur est connecté
  useEffect(() => {
    if (user) initialize()
  }, [user])

  // ── Splash de chargement auth ──
  if (authLoading) {
    return (
      <div className="fixed inset-0 bg-[#111111] flex items-center justify-center">
        <Loader2 size={32} className="text-green-400 animate-spin" />
      </div>
    )
  }

  // ── Écran de connexion ──
  if (!user) {
    return <AuthScreen />
  }

  // ── Chargement des données Supabase ──
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#111111] flex flex-col items-center justify-center gap-3">
        <Dumbbell size={40} className="text-green-400" />
        <p className="text-zinc-500 text-sm">Chargement de tes données…</p>
      </div>
    )
  }

  // ── Erreur de chargement ──
  if (error) {
    return (
      <div className="fixed inset-0 bg-[#111111] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-red-400 font-bold text-center">Erreur de connexion</p>
        <p className="text-zinc-500 text-sm text-center font-mono break-all">{error}</p>
        <button
          onClick={initialize}
          className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold"
        >
          Réessayer
        </button>
      </div>
    )
  }

  // ── Séance en cours → LiveWorkout par-dessus tout ──
  if (activeWorkout) {
    return <LiveWorkout />
  }

  return (
    <div className="flex flex-col flex-1 bg-[#111111] text-white">
      <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
        {activeTab === 'home'      && <HomeTab onTabChange={setActiveTab} />}
        {activeTab === 'exercises' && <ExercisesTab />}
        {activeTab === 'history'   && <HistoryTab />}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
