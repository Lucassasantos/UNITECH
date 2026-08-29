import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Lock, 
  User, 
  ArrowRight, 
  Fingerprint, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  Smartphone,
  UserPlus
} from 'lucide-react';
import { Student } from '../types';

interface LoginScreenProps {
  students: Student[];
  onLoginSuccess: (student: Student) => void;
  onOpenAddStudent?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ 
  students, 
  onLoginSuccess,
  onOpenAddStudent 
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      // Find matching student by RA or email or name substring, or fallback to first student if generic demo login
      const cleanIdent = identifier.trim().toLowerCase();
      const student = students.find(
        (s) =>
          s.ra.toLowerCase() === cleanIdent ||
          s.email.toLowerCase() === cleanIdent ||
          s.cpf.replace(/\D/g, '').includes(cleanIdent) ||
          s.name.toLowerCase().includes(cleanIdent)
      );

      if (!identifier.trim() && !password.trim()) {
        // Auto select first student for convenient trial
        onLoginSuccess(students[0]);
      } else if (student) {
        onLoginSuccess(student);
      } else {
        // Fallback friendly demo: accept any login and assign a personalized student
        const customizedStudent: Student = {
          ...students[0],
          name: identifier.includes('@') ? identifier.split('@')[0] : (identifier || 'Estudante'),
          ra: identifier.includes('.') ? identifier : '2024.2.10980',
        };
        onLoginSuccess(customizedStudent);
      }
      setIsLoading(false);
    }, 650);
  };

  const handleQuickSelectStudent = (student: Student) => {
    setIdentifier(student.ra);
    setPassword('••••••••');
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess(student);
      setIsLoading(false);
    }, 500);
  };

  const handleBiometricLogin = () => {
    setIsBiometricScanning(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsBiometricScanning(false);
      onLoginSuccess(students[0]);
    }, 1200);
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col min-h-full px-4 py-6 justify-between">
      {/* Top University Branding */}
      <div className="text-center pt-2">
        <div className="relative inline-block mb-3">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 shadow-xs mx-auto flex items-center justify-center">
            <GraduationCap className="w-9 h-9 text-blue-600" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 rounded-full p-1 shadow-xs">
            <Smartphone className="w-3.5 h-3.5" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Portal do Aluno
        </h1>
        <p className="text-sm text-slate-500 mt-0.5 font-medium">
          UNITECH • Centro Universitário
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs my-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Acesse sua conta</h2>
            <p className="text-xs text-slate-500">Digite seu RA ou e-mail acadêmico</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>SSL Seguro</span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-3 p-2.5 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-xs sm:text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3.5">
          {/* RA / Matrícula input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              RA / Matrícula ou E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="login-ra-input"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ex: 2024.1.08942"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors font-mono"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Senha de Acesso
              </label>
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="text-xs text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-0 focus:ring-offset-0"
              />
              <span>Lembrar meu RA neste celular</span>
            </label>
          </div>

          {/* Login Submit Button */}
          <button
            id="btn-login-submit"
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-bold rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Entrar no Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Biometric Quick Login */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col items-center">
          <button
            type="button"
            onClick={handleBiometricLogin}
            disabled={isBiometricScanning}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2.5 rounded-xl transition-all w-full justify-center cursor-pointer font-medium"
          >
            <Fingerprint className={`w-4 h-4 text-blue-600 ${isBiometricScanning ? 'animate-pulse text-blue-700' : ''}`} />
            <span>{isBiometricScanning ? 'Autenticando biometria...' : 'Acesso rápido com Biometria / Face ID'}</span>
          </button>
        </div>
      </div>

      {/* Demo Student Accounts Selector */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Selecione um Estudante (Acesso Rápido):
          </span>
          {onOpenAddStudent && (
            <button
              type="button"
              onClick={onOpenAddStudent}
              className="flex items-center gap-1 text-[10px] font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-md border border-blue-100 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3 h-3" />
              <span>+ Novo Perfil</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {students.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => handleQuickSelectStudent(st)}
              className="flex items-center gap-2.5 p-2 bg-white hover:bg-slate-50 border border-slate-100 hover:border-blue-200 rounded-xl text-left transition-all group shadow-xs cursor-pointer"
            >
              <img
                src={st.avatar}
                alt={st.name}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-lg object-cover border border-slate-200 group-hover:border-blue-300 transition-colors shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-600">
                    {st.name}
                  </p>
                  <span className="text-[9px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                    {st.course.degree.slice(0, 4)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 truncate">
                  {st.course.name} • Sem. {st.course.currentSemester}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 max-w-xs w-full shadow-2xl text-left space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                Suporte Acadêmico
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Para redefinir sua senha institucional ou solicitar primeiro acesso, você pode:
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-4">
              <li>Utilizar o botão de <strong className="text-slate-800">Acesso Rápido</strong> abaixo do formulário.</li>
              <li>Contatar a Secretaria Acadêmica pelo WhatsApp: <strong className="text-slate-800">(11) 98765-4321</strong></li>
              <li>Comparecer ao guichê do Campus Central.</li>
            </ul>
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-xl mt-2 cursor-pointer hover:bg-blue-700"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="text-center pt-2 text-[10px] text-slate-400">
        UNITECH Mobile v2.8.4 • Android App
      </div>
    </div>
  );
};
