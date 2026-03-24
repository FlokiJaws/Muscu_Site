import { Home, Dumbbell, History } from 'lucide-react'

const TABS = [
  { id: 'home',      label: 'Accueil',    Icon: Home },
  { id: 'exercises', label: 'Exercices',  Icon: Dumbbell },
  { id: 'history',   label: 'Historique', Icon: History },
]

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav bg-[#0f0f0f]/95 backdrop-blur-md border-t border-white/[0.06] flex">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors relative"
          >
            {/* Indicateur actif */}
            {isActive && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-400 rounded-full" />
            )}

            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 1.8}
              className={isActive ? 'text-green-400' : 'text-zinc-600'}
            />
            <span className={`text-[10px] font-medium tracking-wide ${
              isActive ? 'text-green-400' : 'text-zinc-600'
            }`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
