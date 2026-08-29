import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  MapPin, 
  UserCheck, 
  Award, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  BarChart,
  Calendar,
  Layers
} from 'lucide-react';
import { Student } from '../types';

interface CourseViewProps {
  student: Student;
  onOpenCard: () => void;
}

export const CourseView: React.FC<CourseViewProps> = ({ student, onOpenCard }) => {
  const { course } = student;
  const [selectedTab, setSelectedTab] = useState<'current' | 'all' | 'history'>('current');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  const progressPercent = Math.round((course.completedHours / course.totalHours) * 100);

  return (
    <div className="w-full max-w-sm mx-auto space-y-4 pb-4">
      {/* Course Banner */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase">
            {course.degree}
          </span>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {course.status}
          </span>
        </div>

        <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
          {course.name}
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          {student.university}
        </p>

        {/* Course Metrics */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-500 block font-medium">Semestre</span>
            <span className="text-sm font-bold text-slate-900 font-mono">
              {course.currentSemester}º <span className="text-[10px] text-slate-400 font-normal">/ {course.totalSemesters}</span>
            </span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-500 block font-medium">Turno</span>
            <span className="text-xs font-bold text-blue-700 truncate block mt-0.5">
              {course.shift.split(' ')[0]}
            </span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
            <span className="text-[9px] text-slate-500 block font-medium">IRA Geral</span>
            <span className="text-sm font-bold text-amber-600 font-mono">
              {course.ira.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-600">Carga Horária Cumprida</span>
            <span className="text-blue-700 font-bold font-mono">{progressPercent}% ({course.completedHours}h de {course.totalHours}h)</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Course Navigation Subtabs */}
      <div className="flex items-center justify-around bg-slate-100 border border-slate-200/80 rounded-xl p-1 text-xs">
        <button
          type="button"
          onClick={() => setSelectedTab('current')}
          className={`flex-1 py-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
            selectedTab === 'current'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Semestre Atual ({course.subjects.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedTab('history')}
          className={`flex-1 py-2 rounded-lg font-bold transition-all text-center cursor-pointer ${
            selectedTab === 'history'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Histórico & Desempenho
        </button>
      </div>

      {/* Subjects List */}
      {selectedTab === 'current' ? (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Matérias Matriculadas
            </h3>
            <span className="text-[10px] text-slate-500">2026.1</span>
          </div>

          <div className="space-y-2.5">
            {course.subjects.map((sub) => {
              const isExpanded = selectedSubject === sub.code;
              return (
                <div
                  key={sub.code}
                  onClick={() => setSelectedSubject(isExpanded ? null : sub.code)}
                  className="bg-white hover:bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 transition-all cursor-pointer space-y-2 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                          {sub.code}
                        </span>
                        <span className="text-[10px] text-slate-500">{sub.dayOfWeek}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {sub.name}
                      </h4>
                    </div>

                    <div className="text-right shrink-0">
                      {sub.grade !== null && (
                        <div className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg">
                          Média: {sub.grade.toFixed(1)}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="flex items-center gap-1 truncate">
                      <UserCheck className="w-3 h-3 text-slate-400 shrink-0" />
                      {sub.professor}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {sub.room}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-700 space-y-2 bg-slate-50 p-2.5 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Horário:</span>
                        <span className="font-semibold text-slate-900">{sub.schedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Frequência Registrada:</span>
                        <span className="font-bold text-emerald-700">{sub.attendance}% (Aprovado por presença)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Status da Disciplina:</span>
                        <span className="text-blue-700 font-semibold">Em Andamento</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Desempenho Geral do Curso
            </span>
            <span className="text-[10px] text-emerald-700 font-mono font-bold">Regular</span>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Coeficiente Acadêmico (IRA):</span>
              <span className="font-bold text-amber-600 font-mono">{course.ira.toFixed(1)} / 10.0</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Disciplinas Concluídas:</span>
              <span className="font-bold text-slate-900 font-mono">24 de 32</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Atividades Complementares:</span>
              <span className="font-bold text-emerald-700 font-mono">160h / 120h (Concluído)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Previsão de Formatura:</span>
              <span className="font-bold text-blue-700">Dezembro / 2027</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button to Carteirinha */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onOpenCard}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Ver Carteirinha Oficial deste Curso</span>
        </button>
      </div>
    </div>
  );
};
