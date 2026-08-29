import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Student } from '../types';

interface ScheduleViewProps {
  student: Student;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ student }) => {
  const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  const [selectedDay, setSelectedDay] = useState<string>('Segunda-feira');

  const filteredSubjects = student.course.subjects.filter(
    (sub) => sub.dayOfWeek.toLowerCase() === selectedDay.toLowerCase()
  );

  return (
    <div className="w-full max-w-sm mx-auto space-y-4 pb-4">
      {/* Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Quadro de Horários</h2>
            <p className="text-[11px] text-slate-500 font-medium">Semestre 2026.1 • {student.course.shift}</p>
          </div>
        </div>
      </div>

      {/* Days Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDay === day;
          const shortName = day.slice(0, 3);
          const hasClasses = student.course.subjects.some((s) => s.dayOfWeek.toLowerCase() === day.toLowerCase());

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs'
              }`}
            >
              <div>{shortName}</div>
              {hasClasses && (
                <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-1 ${isSelected ? 'bg-amber-300' : 'bg-blue-600'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Classes for Selected Day */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            {selectedDay}
          </h3>
          <span className="text-[11px] text-blue-700 font-semibold">
            {filteredSubjects.length} {filteredSubjects.length === 1 ? 'aula' : 'aulas'}
          </span>
        </div>

        {filteredSubjects.length > 0 ? (
          <div className="space-y-2.5">
            {filteredSubjects.map((sub) => (
              <div
                key={sub.code}
                className="bg-white border border-slate-100 rounded-xl p-4 space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {sub.code}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-800 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {sub.schedule}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {sub.name}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 truncate">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{sub.professor}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{sub.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-8 text-center space-y-2 shadow-xs">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">
              Nenhuma aula agendada para {selectedDay.toLowerCase()}.
            </p>
            <p className="text-[10px] text-slate-500">
              Aproveite o tempo para atividades complementares e estudos!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
