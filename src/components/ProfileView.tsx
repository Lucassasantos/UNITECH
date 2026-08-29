import React from 'react';
import { 
  User, 
  Mail, 
  FileText, 
  IdCard, 
  Building2, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  Smartphone,
  Check,
  RotateCcw,
  Edit3,
  UserPlus,
  Trash2,
  PencilRuler,
  Type
} from 'lucide-react';
import { Student } from '../types';

interface ProfileViewProps {
  student: Student;
  students: Student[];
  isAppEditMode?: boolean;
  onToggleEditMode?: () => void;
  onLogout: () => void;
  onSwitchStudent: (student: Student) => void;
  onOpenCard: () => void;
  onOpenAddStudent: () => void;
  onOpenEditStudent: (student: Student) => void;
  onDeleteStudent?: (studentId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  student,
  students,
  isAppEditMode = false,
  onToggleEditMode,
  onLogout,
  onSwitchStudent,
  onOpenCard,
  onOpenAddStudent,
  onOpenEditStudent,
  onDeleteStudent,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto space-y-4 pb-4">
      {/* Student Profile Header */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs text-center relative overflow-hidden">
        <div className="relative inline-block mb-3">
          <img
            src={student.avatar}
            alt={student.name}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-50 shadow-xs mx-auto"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          {student.name}
        </h2>
        <p className="text-sm text-blue-700 font-semibold mt-0.5">
          {student.course.name}
        </p>
        <p className="text-xs text-slate-500 font-mono mt-0.5">
          RA: {student.ra}
        </p>

        {/* Action buttons */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenEditStudent(student)}
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Edit3 className="w-4 h-4 text-blue-600" />
            <span>Editar Perfil</span>
          </button>
          <button
            type="button"
            onClick={onOpenCard}
            className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <IdCard className="w-4 h-4" />
            <span>Ver Carteirinha</span>
          </button>
        </div>
      </div>

      {/* Student Academic Credentials */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            Dados Cadastrais
          </h3>
          <button
            type="button"
            onClick={() => onOpenEditStudent(student)}
            className="flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg border border-blue-100 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">CPF:</span>
            <span className="font-mono text-slate-900 font-medium">{student.cpf}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Data de Nascimento:</span>
            <span className="font-mono text-slate-900 font-medium">{student.birthDate}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">E-mail Acadêmico:</span>
            <span className="text-blue-700 font-medium text-xs sm:text-sm truncate max-w-[200px]">{student.email}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Instituição:</span>
            <span className="text-slate-800 text-xs sm:text-sm font-medium truncate max-w-[200px]">{student.university} ({student.universityShort})</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500 font-medium">Certificado DNE:</span>
            <span className="font-mono text-amber-700 font-semibold text-xs sm:text-sm">{student.card.codeDNE}</span>
          </div>
        </div>
      </div>

      {/* Switch Mock Profile & Add Profile */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5 space-y-3.5 shadow-xs">
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-blue-600" />
            Perfis de Estudantes ({students.length})
          </h3>
          <button
            type="button"
            onClick={onOpenAddStudent}
            className="flex items-center gap-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Novo Perfil</span>
          </button>
        </div>

        <div className="space-y-2">
          {students.map((st) => (
            <div
              key={st.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                st.id === student.id
                  ? 'bg-blue-50/80 border-blue-200 shadow-xs'
                  : 'bg-slate-50/80 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <button
                type="button"
                onClick={() => onSwitchStudent(st)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
              >
                <img
                  src={st.avatar}
                  alt={st.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-slate-900 truncate">{st.name}</p>
                    {st.id === student.id && (
                      <span className="text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full">
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {st.course.name} • {st.universityShort}
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={() => onOpenEditStudent(st)}
                  className="p-2 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  title="Editar dados deste estudante"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                {students.length > 1 && onDeleteStudent && (
                  <button
                    type="button"
                    onClick={() => onDeleteStudent(st.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                    title="Remover perfil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="w-full py-3.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair da Conta (Fazer Logout)</span>
      </button>

      {/* Edit App Button */}
      {onToggleEditMode && (
        <button
          type="button"
          onClick={onToggleEditMode}
          className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
            isAppEditMode
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <PencilRuler className="w-4 h-4" />
          <span>{isAppEditMode ? 'Concluir Edição (Salvar Textos)' : 'Editar App'}</span>
        </button>
      )}
    </div>
  );
};
