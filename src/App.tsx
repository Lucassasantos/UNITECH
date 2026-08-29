import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  IdCard, 
  Calendar, 
  BookOpen, 
  FileText, 
  CreditCard, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Building2,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  UserPlus
} from 'lucide-react';
import { Student, TabType } from './types';
import { MOCK_STUDENTS } from './data/mockStudents';
import { AndroidWrapper } from './components/AndroidWrapper';
import { LoginScreen } from './components/LoginScreen';
import { StudentHeader } from './components/StudentHeader';
import { BottomNav } from './components/BottomNav';
import { CourseCard } from './components/CourseCard';
import { CarteirinhaButtonCallout } from './components/CarteirinhaButtonCallout';
import { CarteirinhaDigital } from './components/CarteirinhaDigital';
import { CourseView } from './components/CourseView';
import { ScheduleView } from './components/ScheduleView';
import { ProfileView } from './components/ProfileView';
import { StudentFormModal } from './components/StudentFormModal';

const STORAGE_KEY = 'carteirinha_app_students_v1';

export default function App() {
  // Load persisted students or fallback to MOCK_STUDENTS
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return MOCK_STUDENTS;
  });

  // Current logged in student
  const [currentUser, setCurrentUser] = useState<Student | null>(() => students[0] || MOCK_STUDENTS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [showDeclarationModal, setShowDeclarationModal] = useState<boolean>(false);
  const [showFinanceModal, setShowFinanceModal] = useState<boolean>(false);

  // Student Form Modal state
  const [isStudentFormOpen, setIsStudentFormOpen] = useState<boolean>(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);

  // Live in-place App Text Editing Mode state
  const [isAppEditMode, setIsAppEditMode] = useState<boolean>(false);

  // Toggle document.designMode and CSS styling for live in-place editing across entire app
  useEffect(() => {
    if (typeof document !== 'undefined') {
      try {
        document.designMode = isAppEditMode ? 'on' : 'off';
      } catch {
        // ignore if not supported
      }
      if (isAppEditMode) {
        document.body.classList.add('app-edit-mode-active');
      } else {
        document.body.classList.remove('app-edit-mode-active');
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        try {
          document.designMode = 'off';
        } catch {
          // ignore
        }
        document.body.classList.remove('app-edit-mode-active');
      }
    };
  }, [isAppEditMode]);

  // Persist students to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  // Open add student modal
  const handleOpenAddStudent = () => {
    setStudentToEdit(null);
    setIsStudentFormOpen(true);
  };

  // Open edit student modal
  const handleOpenEditStudent = (student: Student) => {
    setStudentToEdit(student);
    setIsStudentFormOpen(true);
  };

  // Handle saving new or edited student
  const handleSaveStudent = (savedStudent: Student) => {
    setStudents((prev) => {
      const exists = prev.some((s) => s.id === savedStudent.id);
      let updated: Student[];
      if (exists) {
        updated = prev.map((s) => (s.id === savedStudent.id ? savedStudent : s));
      } else {
        updated = [savedStudent, ...prev];
      }
      return updated;
    });

    // If current logged-in user is the one being edited, update it or switch to newly added user
    setCurrentUser(savedStudent);
  };

  // Handle student profile deletion
  const handleDeleteStudent = (studentId: string) => {
    if (students.length <= 1) {
      alert('É necessário manter pelo menos um perfil de estudante.');
      return;
    }
    const updated = students.filter((s) => s.id !== studentId);
    setStudents(updated);
    if (currentUser?.id === studentId) {
      setCurrentUser(updated[0] || null);
    }
  };

  // If user is not logged in, display the Login Screen inside the Android mockup
  if (!currentUser) {
    return (
      <AndroidWrapper>
        <LoginScreen
          students={students}
          onLoginSuccess={(student) => {
            setCurrentUser(student);
            setActiveTab('home');
          }}
          onOpenAddStudent={handleOpenAddStudent}
        />
        <StudentFormModal
          isOpen={isStudentFormOpen}
          onClose={() => setIsStudentFormOpen(false)}
          onSave={(newStudent) => {
            handleSaveStudent(newStudent);
            setCurrentUser(newStudent);
            setActiveTab('home');
          }}
          studentToEdit={studentToEdit}
        />
      </AndroidWrapper>
    );
  }

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('home');
  };

  // Handle Android back button
  const handleAndroidBack = () => {
    if (isStudentFormOpen) {
      setIsStudentFormOpen(false);
    } else if (showCardModal) {
      setShowCardModal(false);
    } else if (activeTab !== 'home') {
      setActiveTab('home');
    }
  };

  return (
    <AndroidWrapper onAndroidBack={handleAndroidBack}>
      {/* Top Fixed Header with student info and notifications */}
      <StudentHeader
        student={currentUser}
        onLogout={handleLogout}
        onOpenProfile={() => setActiveTab('profile')}
        onOpenCard={() => setShowCardModal(true)}
      />

      {/* Live In-Place App Text Edit Mode Floating Indicator Banner */}
      {isAppEditMode && (
        <div className="sticky top-0 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3.5 py-2 shadow-md flex items-center justify-between text-xs animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <div className="leading-tight">
              <span className="font-bold text-[11px] block text-white">Modo Edição de Textos Ativo</span>
              <span className="text-[10px] text-blue-100 block">Toque em qualquer texto na tela para editar</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAppEditMode(false)}
            className="px-2.5 py-1 bg-white text-blue-700 font-bold rounded-lg text-[11px] hover:bg-blue-50 transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Concluir Edição
          </button>
        </div>
      )}

      {/* Main Tab Views */}
      <main className="flex-1 px-4 py-4 space-y-4">
        <AnimatePresence mode="wait">
          {/* ================= TAB: HOME / INÍCIO ================= */}
          {activeTab === 'home' && (
            <motion.div
              key="home-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 max-w-sm mx-auto"
            >
              {/* Welcome Banner */}
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                    Semestre Letivo 2026.1
                  </span>
                  <h2 className="text-base font-bold text-slate-900">
                    Olá, {currentUser.name.split(' ')[0]}! 👋
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tudo pronto para suas aulas de hoje.
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  {currentUser.course.currentSemester}º
                </div>
              </div>

              {/* HIGHLIGHT 1: CARTEIRINHA DE ESTUDANTE PROMINENT BUTTON */}
              <CarteirinhaButtonCallout
                student={currentUser}
                onOpenCard={() => setShowCardModal(true)}
              />

              {/* HIGHLIGHT 2: CURRENT COURSE MENU & DETAILS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    Seu Curso em Andamento
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('course')}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    Detalhes
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <CourseCard
                  course={currentUser.course}
                  onOpenDetails={() => setActiveTab('course')}
                  showAllDisciplines={false}
                />
              </div>

              {/* Quick Academic Actions Grid */}
              <div className="space-y-2 pt-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider px-1">
                  Serviços Acadêmicos
                </h3>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* Horários */}
                  <button
                    type="button"
                    onClick={() => setActiveTab('schedule')}
                    className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600">Horários de Aula</p>
                      <p className="text-[10px] text-slate-500">Ver grade semanal</p>
                    </div>
                  </button>

                  {/* Carteirinha Digital */}
                  <button
                    type="button"
                    onClick={() => setShowCardModal(true)}
                    className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IdCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700">Carteirinha CIE</p>
                      <p className="text-[10px] text-slate-500">QR Code e Catraca</p>
                    </div>
                  </button>

                  {/* Atestado de Matrícula */}
                  <button
                    type="button"
                    onClick={() => setShowDeclarationModal(true)}
                    className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">Declaração</p>
                      <p className="text-[10px] text-slate-500">Comprovante 2026.1</p>
                    </div>
                  </button>

                  {/* Financeiro */}
                  <button
                    type="button"
                    onClick={() => setShowFinanceModal(true)}
                    className="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-2xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Financeiro</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">Mensalidade em dia</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Next Class Live Alert */}
              <div className="bg-white border border-blue-100 rounded-2xl p-3.5 space-y-1.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    Próxima Aula Hoje
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                    19:00
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {currentUser.course.subjects[0]?.name || 'Aula Programada'}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {currentUser.course.subjects[0]?.room || 'Lab 04'}
                  </span>
                  <span>{currentUser.course.subjects[0]?.professor}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= TAB: MEU CURSO ================= */}
          {activeTab === 'course' && (
            <motion.div
              key="course-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CourseView
                student={currentUser}
                onOpenCard={() => setShowCardModal(true)}
              />
            </motion.div>
          )}

          {/* ================= TAB: CARTEIRINHA ================= */}
          {activeTab === 'card' && (
            <motion.div
              key="card-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <CarteirinhaDigital
                student={currentUser}
                isModal={false}
              />
            </motion.div>
          )}

          {/* ================= TAB: HORÁRIOS ================= */}
          {activeTab === 'schedule' && (
            <motion.div
              key="schedule-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ScheduleView student={currentUser} />
            </motion.div>
          )}

          {/* ================= TAB: PERFIL ================= */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileView
                student={currentUser}
                students={students}
                isAppEditMode={isAppEditMode}
                onToggleEditMode={() => setIsAppEditMode(prev => !prev)}
                onLogout={handleLogout}
                onSwitchStudent={(st) => setCurrentUser(st)}
                onOpenCard={() => setShowCardModal(true)}
                onOpenAddStudent={handleOpenAddStudent}
                onOpenEditStudent={handleOpenEditStudent}
                onDeleteStudent={handleDeleteStudent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Android Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Modal Popup for Student Form (Add / Edit Profile) */}
      <StudentFormModal
        isOpen={isStudentFormOpen}
        onClose={() => setIsStudentFormOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      {/* Modal Popup for Carteirinha when triggered from buttons */}
      <AnimatePresence>
        {showCardModal && (
          <CarteirinhaDigital
            student={currentUser}
            isOpen={showCardModal}
            onClose={() => setShowCardModal(false)}
            isModal={true}
          />
        )}
      </AnimatePresence>

      {/* Modal: Declaração de Matrícula */}
      {showDeclarationModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 max-w-xs w-full shadow-2xl space-y-3.5 text-left animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Atestado de Matrícula
              </h3>
              <button
                type="button"
                onClick={() => setShowDeclarationModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
              <p className="text-slate-700 leading-relaxed">
                Declaramos que <strong className="text-slate-900">{currentUser.name}</strong> está regularmente matriculado(a) no curso de <strong className="text-blue-700">{currentUser.course.name}</strong> ({currentUser.course.currentSemester}º Semestre).
              </p>
              <div className="pt-1 text-[10px] text-slate-400 font-mono">
                Autenticidade digital: UNITECH-MAT-{currentUser.ra.replace(/\D/g, '')}-2026
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  alert('Comprovante baixado com sucesso no formato PDF oficial!');
                  setShowDeclarationModal(false);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Baixar PDF com Assinatura Digital</span>
              </button>
              <button
                type="button"
                onClick={() => setShowDeclarationModal(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Financeiro */}
      {showFinanceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 max-w-xs w-full shadow-2xl space-y-3.5 text-left animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                Situação Financeira
              </h3>
              <button
                type="button"
                onClick={() => setShowFinanceModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Status: Regular / Adimplente</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Todas as mensalidades do semestre letivo 2026.1 estão devidamente quitadas.
              </p>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Próxima Parcela:</span>
                <span className="font-mono text-slate-900 font-bold">05/04/2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Desconto Pontualidade:</span>
                <span className="text-emerald-700 font-semibold">15% Aplicado</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFinanceModal(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </AndroidWrapper>
  );
}
