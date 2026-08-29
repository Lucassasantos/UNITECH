import React, { useState } from 'react';
import { 
  Bell, 
  LogOut, 
  User, 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck 
} from 'lucide-react';
import { Student } from '../types';

interface StudentHeaderProps {
  student: Student;
  onLogout: () => void;
  onOpenProfile: () => void;
  onOpenCard: () => void;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({
  student,
  onLogout,
  onOpenProfile,
  onOpenCard,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 1,
      title: 'Nota Lançada: Usabilidade Mobile',
      desc: 'Sua média parcial foi atualizada para 9.8 pelo professor.',
      time: 'Há 25 min',
      unread: true,
    },
    {
      id: 2,
      title: 'Carteirinha Digital 2026/2027 Pronta',
      desc: 'Sua CIE com QR Code oficial ICP-Brasil está validada.',
      time: 'Hoje, 09:15',
      unread: true,
    },
    {
      id: 3,
      title: 'Semana de Tecnologia UNITECH',
      desc: 'Inscrições abertas para workshops e palestras com certificado.',
      time: 'Ontem',
      unread: false,
    },
  ];

  return (
    <header className="w-full bg-white/95 border-b border-slate-100 px-4 py-3 sticky top-0 z-30 backdrop-blur-md shadow-xs">
      <div className="flex items-center justify-between">
        {/* Student Avatar and Info */}
        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={student.avatar}
              alt={student.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-2xl object-cover border-2 border-blue-500/80 shadow-sm group-hover:border-blue-600 transition-colors"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                {student.name.split(' ')[0]} {student.name.split(' ')[1] || ''}
              </h1>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              RA: {student.ra}
            </p>
          </div>
        </div>

        {/* Action icons: Notifications & Logout */}
        <div className="flex items-center gap-2">
          {/* Notifications button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors relative cursor-pointer"
              title="Notificações acadêmicas"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-blue-600" />
                    Avisos Acadêmicos
                  </h3>
                  <span className="text-xs text-slate-500 font-mono font-bold">UNITECH</span>
                </div>

                <div className="space-y-2 mt-2.5 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-100 text-left space-y-1 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{n.title}</span>
                        <span className="text-[11px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logout button */}
          <button
            type="button"
            onClick={onLogout}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 transition-colors cursor-pointer"
            title="Sair do aplicativo"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
