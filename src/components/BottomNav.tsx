import React from 'react';
import { 
  Home, 
  GraduationCap, 
  IdCard, 
  Calendar, 
  User, 
  Sparkles 
} from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'course', label: 'Meu Curso', icon: GraduationCap },
    { 
      id: 'card', 
      label: 'Carteirinha', 
      icon: IdCard, 
      highlight: true 
    },
    { id: 'schedule', label: 'Horários', icon: Calendar },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 border-t border-slate-200/80 px-2 py-2 z-40 backdrop-blur-lg shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id as TabType)}
                className={`relative flex flex-col items-center justify-center -mt-5 px-3 py-1 transition-transform active:scale-95 cursor-pointer ${
                  isActive ? 'scale-105' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md transition-all ${
                  isActive
                    ? 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-blue-600/30 ring-4 ring-white'
                    : 'bg-slate-900 text-white shadow-slate-900/20'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold mt-1 tracking-tight ${
                  isActive ? 'text-blue-600' : 'text-slate-600'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id as TabType)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className={`text-xs ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
