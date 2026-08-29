import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  MapPin, 
  Award, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  UserCheck, 
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onOpenDetails?: () => void;
  showAllDisciplines?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onOpenDetails,
  showAllDisciplines = false,
}) => {
  const progressPercent = Math.round((course.completedHours / course.totalHours) * 100);

  return (
    <div className="w-full bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header with Degree & Status */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                {course.degree}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {course.status}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight mt-1">
              {course.name}
            </h2>
          </div>
        </div>
      </div>

      {/* Course Stats Grid */}
      <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
        <div className="text-center">
          <span className="text-[10px] text-slate-500 block font-medium">Semestre</span>
          <span className="text-sm font-bold text-slate-900 font-mono">
            {course.currentSemester}º <span className="text-[10px] text-slate-400 font-normal">/ {course.totalSemesters}</span>
          </span>
        </div>
        <div className="text-center border-x border-slate-200">
          <span className="text-[10px] text-slate-500 block font-medium">Turno</span>
          <span className="text-xs font-bold text-blue-700 truncate block px-1">
            {course.shift.split(' ')[0]}
          </span>
        </div>
        <div className="text-center">
          <span className="text-[10px] text-slate-500 block font-medium">IRA / CR</span>
          <span className="text-sm font-bold text-amber-600 font-mono">
            {course.ira.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-600 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            Integralização Curricular
          </span>
          <span className="font-mono text-xs font-bold text-slate-800">
            {progressPercent}% <span className="text-[10px] text-slate-400 font-normal">({course.completedHours}h/{course.totalHours}h)</span>
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Campus & Location info */}
      <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
        <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
        <span className="truncate">{course.campus}</span>
      </div>

      {/* Current Semester Disciplines / Matérias */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            Disciplinas do Semestre ({course.subjects.length})
          </h3>
          {onOpenDetails && (
            <button
              type="button"
              onClick={onOpenDetails}
              className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              Ver Grade Completa
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="space-y-2">
          {course.subjects.slice(0, showAllDisciplines ? undefined : 3).map((sub) => (
            <div
              key={sub.code}
              className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-100 rounded-xl transition-all space-y-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100 mr-1.5">
                    {sub.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-900">
                    {sub.name}
                  </span>
                </div>
                {sub.grade !== null && (
                  <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg shrink-0">
                    Média: {sub.grade.toFixed(1)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-slate-400" />
                  {sub.professor}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  {sub.room}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {sub.dayOfWeek.slice(0, 3)} • {sub.schedule}
                </span>
                <span className="flex items-center gap-1 ml-auto text-emerald-600 font-medium">
                  Freq: {sub.attendance}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
