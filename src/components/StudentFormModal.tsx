import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  FileText, 
  Calendar, 
  Mail, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  CreditCard,
  Image as ImageIcon,
  Check,
  Sparkles
} from 'lucide-react';
import { Student } from '../types';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
  studentToEdit?: Student | null;
}

const PRESET_AVATARS = [
  {
    label: 'Ketherin',
    url: 'https://i.ibb.co/zhnCJCN2/3x4-KETHERIN.jpg',
  },
  {
    label: 'Lucas',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
  {
    label: 'Mariana',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
  },
  {
    label: 'Gabriel',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  },
  {
    label: 'Beatriz',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  },
  {
    label: 'Rafael',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  },
  {
    label: 'Juliana',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
  }
];

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  studentToEdit,
}) => {
  // Personal & Mandatory requested fields
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [universityShort, setUniversityShort] = useState('');
  const [codeDNE, setCodeDNE] = useState('');

  // Course and Academic info
  const [ra, setRa] = useState('');
  const [courseName, setCourseName] = useState('');
  const [degree, setDegree] = useState('Bacharelado');
  const [currentSemester, setCurrentSemester] = useState(1);
  const [totalSemesters, setTotalSemesters] = useState(8);
  const [shift, setShift] = useState('Noturno (19:00 - 22:30)');
  const [campus, setCampus] = useState('Campus Central - Asa Norte');
  const [avatar, setAvatar] = useState(PRESET_AVATARS[0].url);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [validUntil, setValidUntil] = useState('31/03/2027');

  // Load data if editing
  useEffect(() => {
    if (studentToEdit) {
      setName(studentToEdit.name);
      setCpf(studentToEdit.cpf);
      setBirthDate(studentToEdit.birthDate);
      setEmail(studentToEdit.email);
      setUniversity(studentToEdit.university);
      setUniversityShort(studentToEdit.universityShort);
      setCodeDNE(studentToEdit.card?.codeDNE || '');
      setRa(studentToEdit.ra);
      setCourseName(studentToEdit.course.name);
      setDegree(studentToEdit.course.degree);
      setCurrentSemester(studentToEdit.course.currentSemester);
      setTotalSemesters(studentToEdit.course.totalSemesters);
      setShift(studentToEdit.course.shift);
      setCampus(studentToEdit.campus || studentToEdit.course.campus);
      setAvatar(studentToEdit.avatar);
      setValidUntil(studentToEdit.card?.validUntil || '31/03/2027');
    } else {
      // New student defaults
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setName('');
      setCpf('');
      setBirthDate('');
      setEmail('');
      setUniversity('Centro Universitário de Tecnologia e Ciências');
      setUniversityShort('UNITECH');
      setCodeDNE(`DNE-BR-2026-${randomNum}-SP`);
      setRa(`2026.1.${randomNum}`);
      setCourseName('Engenharia de Software');
      setDegree('Bacharelado');
      setCurrentSemester(1);
      setTotalSemesters(8);
      setShift('Noturno (19:00 - 22:30)');
      setCampus('Campus Central - Asa Norte');
      setAvatar(PRESET_AVATARS[0].url);
      setValidUntil('31/03/2027');
    }
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const studentId = studentToEdit ? studentToEdit.id : `student-${Date.now()}`;
    const cleanName = name.trim() || 'Estudante';
    const cleanRa = ra.trim() || `2026.1.${Math.floor(10000 + Math.random() * 90000)}`;
    const cleanCpf = cpf.trim() || '000.***.***-00';
    const cleanBirthDate = birthDate.trim() || '01/01/2000';
    const cleanEmail = email.trim() || `${cleanName.toLowerCase().replace(/\s+/g, '.')}@aluno.faculdade.edu.br`;
    const cleanUniversity = university.trim() || 'Centro Universitário de Tecnologia e Ciências';
    const cleanUniversityShort = universityShort.trim() || 'UNITECH';
    const cleanCodeDNE = codeDNE.trim() || `DNE-BR-2026-${Math.floor(10000000 + Math.random() * 90000000)}-SP`;
    const finalAvatar = customAvatarUrl.trim() || avatar;

    // Build or preserve subjects
    const existingSubjects = studentToEdit?.course.subjects?.length ? studentToEdit.course.subjects : [
      {
        code: `${courseName.slice(0, 2).toUpperCase()}101`,
        name: `Introdução a ${courseName}`,
        professor: 'Dr. Carlos Eduardo',
        room: 'Sala 102 - Bloco A',
        schedule: '19:00 - 20:40',
        dayOfWeek: 'Segunda-feira',
        grade: 9.0,
        attendance: 96,
      },
      {
        code: `${courseName.slice(0, 2).toUpperCase()}102`,
        name: 'Metodologia Científica e Pesquisa',
        professor: 'Dra. Ana Paula Freitas',
        room: 'Sala 104 - Bloco A',
        schedule: '20:50 - 22:30',
        dayOfWeek: 'Segunda-feira',
        grade: 8.8,
        attendance: 92,
      },
      {
        code: `${courseName.slice(0, 2).toUpperCase()}103`,
        name: 'Fundamentos e Prática Aplicada',
        professor: 'Me. Roberto Lima',
        room: 'Lab 01 - Bloco Central',
        schedule: '19:00 - 22:30',
        dayOfWeek: 'Quarta-feira',
        grade: 9.5,
        attendance: 100,
      }
    ];

    const updatedStudent: Student = {
      id: studentId,
      name: cleanName,
      ra: cleanRa,
      cpf: cleanCpf,
      birthDate: cleanBirthDate,
      email: cleanEmail,
      avatar: finalAvatar,
      university: cleanUniversity,
      universityShort: cleanUniversityShort,
      campus: campus.trim() || 'Campus Central',
      course: {
        id: studentToEdit?.course.id || `course-${Date.now()}`,
        name: courseName.trim() || 'Graduação',
        degree,
        currentSemester: Number(currentSemester) || 1,
        totalSemesters: Number(totalSemesters) || 8,
        shift,
        campus: campus.trim() || 'Campus Central',
        status: studentToEdit?.course.status || 'Matriculado',
        ira: studentToEdit?.course.ira || 8.5,
        completedHours: studentToEdit?.course.completedHours || Math.round((currentSemester / totalSemesters) * 3000),
        totalHours: studentToEdit?.course.totalHours || 3200,
        subjects: existingSubjects,
      },
      card: {
        codeDNE: cleanCodeDNE,
        validUntil,
        issueDate: studentToEdit?.card.issueDate || '15/01/2026',
        qrPayload: `https://meiaentrada.mec.gov.br/validador?dne=${encodeURIComponent(cleanCodeDNE)}&cpf=${encodeURIComponent(cleanCpf)}&aluno=${encodeURIComponent(cleanName)}`,
        barcode: cleanCodeDNE.replace(/[^0-9]/g, '') || '202601984210984',
        status: 'VÁLIDA',
        entidadeEmissora: studentToEdit?.card.entidadeEmissora || 'DNE / UNE / UBES / ANPG',
        nationalIdDoc: studentToEdit?.card.nationalIdDoc || 'RG 52.841.902-X SSP/SP',
        certNumber: studentToEdit?.card.certNumber || `BR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      }
    };

    onSave(updatedStudent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-bold">
              {studentToEdit ? <FileText className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {studentToEdit ? 'Editar Perfil do Estudante' : 'Adicionar Perfil de Estudante'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Configure os dados acadêmicos e do documento oficial
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xs cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* Section: Dados Obrigatórios Solicitados */}
          <div className="bg-blue-50/40 border border-blue-100/80 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center gap-1.5 text-blue-800 font-bold text-xs pb-1 border-b border-blue-100/60">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Campos Principais do Perfil</span>
            </div>

            {/* Nome Completo */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Nome Completo do Estudante *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Lucas da Silva Santos"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* CPF */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                CPF do Estudante *
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  placeholder="Ex: 142.***.***-08 ou 142.589.632-08"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
            </div>

            {/* Data de Nascimento */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Data de Nascimento *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="Ex: 15/04/2003"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
            </div>

            {/* E-mail */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                E-mail Acadêmico ou Pessoal *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: lucas.santos@aluno.faculdade.edu.br"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            {/* Instituição & Sigla */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Instituição de Ensino *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="Ex: Centro Universitário UNITECH"
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Sigla *
                </label>
                <input
                  type="text"
                  required
                  value={universityShort}
                  onChange={(e) => setUniversityShort(e.target.value.toUpperCase())}
                  placeholder="Ex: UNITECH"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-bold"
                />
              </div>
            </div>

            {/* Certificado DNE */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Certificado DNE (Código de Uso) *
              </label>
              <div className="relative">
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={codeDNE}
                  onChange={(e) => setCodeDNE(e.target.value)}
                  placeholder="Ex: DNE-BR-2026-98124912-SP"
                  className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Identificador oficial emitido pelo padrão nacional ICP-Brasil / DNE.
              </p>
            </div>
          </div>

          {/* Section: Curso e Matrícula */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs pb-1 border-b border-slate-200/80">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Dados do Curso & Matrícula</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Matrícula / RA
                </label>
                <input
                  type="text"
                  value={ra}
                  onChange={(e) => setRa(e.target.value)}
                  placeholder="2026.1.08942"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Grau Acadêmico
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value="Bacharelado">Bacharelado</option>
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Tecnólogo">Tecnólogo</option>
                  <option value="Pós-Graduação">Pós-Graduação</option>
                  <option value="Mestrado">Mestrado</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Nome do Curso
              </label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Ex: Engenharia de Software"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Semestre
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={currentSemester}
                  onChange={(e) => setCurrentSemester(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Total Sem.
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={totalSemesters}
                  onChange={(e) => setTotalSemesters(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-2 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Turno
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg px-1.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 cursor-pointer"
                >
                  <option value="Noturno (19:00 - 22:30)">Noturno</option>
                  <option value="Matutino (08:00 - 11:40)">Matutino</option>
                  <option value="Vespertino (13:30 - 17:10)">Vespertino</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Campus / Unidade
              </label>
              <input
                type="text"
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                placeholder="Campus Central - Asa Norte"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Section: Foto do Estudante (Avatar) */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2.5">
            <label className="block text-[11px] font-semibold text-slate-700">
              Foto de Perfil & Carteirinha
            </label>
            
            <div className="flex items-center gap-3">
              <img
                src={customAvatarUrl.trim() || avatar}
                alt="Avatar preview"
                referrerPolicy="no-referrer"
                className="w-12 h-14 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-slate-500 block mb-1.5">
                  Escolha uma foto predefinida ou insira o link:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_AVATARS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setAvatar(p.url);
                        setCustomAvatarUrl('');
                      }}
                      className={`relative w-8 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        avatar === p.url && !customAvatarUrl
                          ? 'border-blue-600 ring-2 ring-blue-100'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={p.url}
                        alt={p.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-1">
              <input
                type="url"
                value={customAvatarUrl}
                onChange={(e) => setCustomAvatarUrl(e.target.value)}
                placeholder="Ou cole a URL direta de uma imagem personalizada"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-[11px] text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{studentToEdit ? 'Salvar Alterações' : 'Cadastrar Estudante'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
