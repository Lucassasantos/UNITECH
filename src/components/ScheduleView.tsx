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
    <div className="w-full max-w-lg mx-auto space-y-4 pb-4">
      {/* Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Quadro de Horários</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">Semestre 2026.1 • {student.course.shift}</p>
          </div>
        </div>
      </div>

      {/* Days Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDay === day;
          const shortName = day.slice(0, 3);
          const hasClasses = student.course.subjects.some((s) => s.dayOfWeek.toLowerCase() === day.toLowerCase());

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs'
              }`}
            >
              <div>{shortName}</div>
              {hasClasses && (
                <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${isSelected ? 'bg-amber-300' : 'bg-blue-600'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Classes for Selected Day */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            {selectedDay}
          </h3>
          <span className="text-xs sm:text-sm text-blue-700 font-semibold">
            {filteredSubjects.length} {filteredSubjects.length === 1 ? 'aula' : 'aulas'}
          </span>
        </div>

        {filteredSubjects.length > 0 ? (
          <div className="space-y-3">
            {filteredSubjects.map((sub) => (
              <div
                key={sub.code}
                className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                    {sub.code}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-amber-800 flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Clock className="w-4 h-4 text-amber-600" />
                    {sub.schedule}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  {sub.name}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 truncate">
                    <UserCheck className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{sub.professor}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>{sub.room}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl p-8 text-center space-y-2 shadow-xs">
            <BookOpen className="w-9 h-9 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">
              Nenhuma aula agendada para {selectedDay.toLowerCase()}.
            </p>
            <p className="text-xs text-slate-500">
              Aproveite o tempo para atividades complementares e estudos!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
