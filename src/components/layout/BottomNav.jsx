import { Home, Dumbbell, History } from 'lucide-react'

const TABS = [
  { id: 'home',      label: 'Accueil',    Icon: Home },
  { id: 'exercises', label: 'Exercices',  Icon: Dumbbell },
  { id: 'history',   label: 'Historique', Icon: History },
]

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav bg-[#1a1a1a] border-t border-[#2a2a2a] flex">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              isActive ? 'text-green-400' : 'text-zinc-500'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
