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
    <div className="w-full max-w-sm mx-auto space-y-4 pb-4">
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

        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          {student.name}
        </h2>
        <p className="text-xs text-blue-700 font-semibold mt-0.5">
          {student.course.name}
        </p>
        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
          RA: {student.ra}
        </p>

        {/* Action buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenEditStudent(student)}
            className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Editar Perfil</span>
          </button>
          <button
            type="button"
            onClick={onOpenCard}
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <IdCard className="w-3.5 h-3.5" />
            <span>Ver Carteirinha</span>
          </button>
        </div>
      </div>

      {/* Edit App / In-place Text Customization Mode Section */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <PencilRuler className="w-4 h-4 text-blue-600" />
            Edição Geral do App
          </h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isAppEditMode 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            {isAppEditMode ? '● Modo Ativo' : 'Desativado'}
          </span>
        </div>

        <p className="text-[11px] text-slate-600 leading-relaxed">
          Ative para poder clicar e <strong>editar qualquer texto</strong> diretamente na tela em qualquer seção do aplicativo (disciplinas, notas, avisos, dados, cabeçalhos e carteirinha).
        </p>

        {onToggleEditMode && (
          <button
            type="button"
            onClick={onToggleEditMode}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
              isAppEditMode
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <PencilRuler className="w-4 h-4" />
            <span>{isAppEditMode ? 'Concluir Edição (Salvar Textos)' : 'Editar App (Habilitar Edição de Texto)'}</span>
          </button>
        )}
      </div>

      {/* Student Academic Credentials */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            Dados Cadastrais
          </h3>
          <button
            type="button"
            onClick={() => onOpenEditStudent(student)}
            className="flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg border border-blue-100 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3 h-3" />
            <span>Editar</span>
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">CPF:</span>
            <span className="font-mono text-slate-900 font-medium">{student.cpf}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Data de Nascimento:</span>
            <span className="font-mono text-slate-900 font-medium">{student.birthDate}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">E-mail Acadêmico:</span>
            <span className="text-blue-700 font-medium text-[11px] truncate max-w-[180px]">{student.email}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Instituição:</span>
            <span className="text-slate-800 text-[11px] font-medium truncate max-w-[180px]">{student.university} ({student.universityShort})</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">Certificado DNE:</span>
            <span className="font-mono text-amber-700 font-medium text-[11px]">{student.card.codeDNE}</span>
          </div>
        </div>
      </div>

      {/* Switch Mock Profile & Add Profile */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-blue-600" />
            Perfis de Estudantes ({students.length})
          </h3>
          <button
            type="button"
            onClick={onOpenAddStudent}
            className="flex items-center gap-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Novo Perfil</span>
          </button>
        </div>

        <div className="space-y-2">
          {students.map((st) => (
            <div
              key={st.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                st.id === student.id
                  ? 'bg-blue-50/80 border-blue-200 shadow-xs'
                  : 'bg-slate-50/80 border-slate-100 hover:bg-slate-100'
              }`}
            >
              <button
                type="button"
                onClick={() => onSwitchStudent(st)}
                className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer"
              >
                <img
                  src={st.avatar}
                  alt={st.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-lg object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900 truncate">{st.name}</p>
                    {st.id === student.id && (
                      <span className="text-[9px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                        Ativo
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">
                    {st.course.name} • {st.universityShort}
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={() => onOpenEditStudent(st)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                  title="Editar dados deste estudante"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                {students.length > 1 && onDeleteStudent && (
                  <button
                    type="button"
                    onClick={() => onDeleteStudent(st.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
                    title="Remover perfil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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
        className="w-full py-3 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair da Conta (Fazer Logout)</span>
      </button>
    </div>
  );
};
