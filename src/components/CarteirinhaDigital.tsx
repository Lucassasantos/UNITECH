import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  QrCode, 
  Share2, 
  Calendar, 
  User, 
  GraduationCap, 
  Building2, 
  IdCard,
  Sun,
  Lock,
  Copy,
  Check
} from 'lucide-react';
import { Student } from '../types';
import { QRCodeSvg, BarcodeSvg } from './BarcodeAndQR';

interface CarteirinhaDigitalProps {
  student: Student;
  isOpen?: boolean;
  onClose?: () => void;
  isModal?: boolean;
}

export const CarteirinhaDigital: React.FC<CarteirinhaDigitalProps> = ({
  student,
  isOpen = true,
  onClose,
  isModal = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highBrightness, setHighBrightness] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveTime, setLiveTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'card' | 'qr' | 'info'>('card');

  // Real-time security clock update (Anti-fraud validation indicator)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTime(
        now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(student.card.codeDNE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cardContent = (
    <div className={`w-full max-w-lg mx-auto flex flex-col items-center transition-all ${highBrightness ? 'brightness-125 contrast-105' : ''}`}>
      {/* Top action controls bar */}
      <div className="w-full flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5" />
          <span>Documento Ativo & Válido</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHighBrightness(!highBrightness)}
            className={`p-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer border ${
              highBrightness ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
            title="Aumentar brilho para catraca/leitor"
          >
            <Sun className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 rounded-xl text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            title="Girar carteirinha (Frente / Verso)"
          >
            <RotateCw className={`w-4 h-4 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
            <span className="hidden sm:inline">{isFlipped ? 'Ver Frente' : 'Ver Verso'}</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div className="w-full relative [perspective:1200px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="w-full relative [transform-style:preserve-3d]"
        >
          {/* ==================== FRONT OF CARD ==================== */}
          <div
            className="w-full rounded-2xl overflow-hidden shadow-2xl border border-blue-500/40 relative select-none [backface-visibility:hidden]"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #172554 100%)',
            }}
          >
            {/* Holographic dynamic sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-cyan-400/10 pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-52 h-52 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-52 h-52 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header / University Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-4 border-b border-white/10 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-sm">
                  UT
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
                    {student.universityShort}
                  </h3>
                  <p className="text-xs text-blue-200/80 font-medium line-clamp-1">
                    Carteira de Identificação Estudantil (CIE)
                  </p>
                </div>
              </div>

              {/* National Student Stamp */}
              <div className="flex flex-col items-end">
                <span className="bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  DNE Oficial
                </span>
                <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Lei 12.933/13
                </span>
              </div>
            </div>

            {/* Body of Front Card */}
            <div className="p-4 relative z-10 space-y-3.5">
              {/* Student Photo and Core Info */}
              <div className="flex gap-3.5 items-start">
                <div className="relative shrink-0">
                  <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-amber-400/60 shadow-lg bg-slate-800 relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {/* Official holographic watermark badge */}
                    <div className="absolute bottom-1 right-1 bg-blue-600/90 text-white rounded p-0.5 shadow">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    </div>
                  </div>
                  <div className="text-center mt-1.5">
                    <span className="text-[11px] font-mono text-slate-400 block">
                      Validade
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-amber-400 font-mono">
                      {student.card.validUntil}
                    </span>
                  </div>
                </div>

                {/* Info Fields */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                      Nome do Estudante
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug break-words">
                      {student.name}
                    </h2>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                      Curso
                    </span>
                    <p className="text-sm font-bold text-cyan-300 leading-snug">
                      {student.course.name}
                    </p>
                    <p className="text-xs text-slate-300">
                      {student.course.degree} • {student.course.currentSemester}º Semestre ({student.course.shift.split(' ')[0]})
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase block font-semibold">
                        Matrícula / RA
                      </span>
                      <span className="text-xs sm:text-sm font-mono font-bold text-white">
                        {student.ra}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 uppercase block font-semibold">
                        Nascimento
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-slate-200">
                        {student.birthDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Institution & CPF Row */}
              <div className="bg-slate-900/80 border border-white/5 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Instituição</span>
                  <span className="font-semibold text-slate-200 text-xs leading-tight block truncate">
                    {student.university}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">Doc. / CPF</span>
                  <span className="font-mono text-slate-200 text-xs font-semibold block">
                    {student.cpf}
                  </span>
                </div>
              </div>

              {/* Dynamic Anti-Fraud Live Bar */}
              <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300 font-medium">Autenticação Dinâmica:</span>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-xs">
                  {liveTime.split('às')[1] || liveTime}
                </span>
              </div>
            </div>

            {/* Card Footer Barcode & DNE Code */}
            <div className="bg-slate-950/90 border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px] text-slate-400 truncate max-w-[220px]">
                {student.card.codeDNE}
              </span>
              <span className="text-amber-400 font-semibold text-xs">
                ICP-BRASIL
              </span>
            </div>
          </div>

          {/* ==================== BACK OF CARD ==================== */}
          <div
            className="w-full rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/40 absolute inset-0 select-none [transform:rotateY(180deg)] [backface-visibility:hidden]"
            style={{
              background: 'linear-gradient(135deg, #090d16 0%, #131b2e 50%, #1e1b4b 100%)',
            }}
          >
            {/* Header */}
            <div className="bg-indigo-950 p-3.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Validação Digital & QR Code
                </span>
              </div>
              <span className="text-[11px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded">
                DNE - Padrão Nacional
              </span>
            </div>

            <div className="p-4 space-y-3 flex flex-col items-center text-center">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                <QRCodeSvg value={student.card.qrPayload} size={130} />
                <span className="text-xs text-slate-400 mt-1 font-mono">
                  Aproxime para leitura na portaria / eventos
                </span>
              </div>

              {/* Barcode */}
              <div className="w-full">
                <BarcodeSvg value={student.card.barcode} />
              </div>

              {/* Legal info & certificate */}
              <div className="w-full bg-slate-900/90 border border-white/5 rounded-lg p-2.5 text-left text-[11px] text-slate-300 space-y-0.5 leading-relaxed">
                <p className="text-slate-200 font-semibold truncate">
                  {student.card.entidadeEmissora}
                </p>
                <p>Certificado Digital: <span className="font-mono text-amber-300 font-semibold">{student.card.certNumber}</span></p>
                <p>Validade nacional assegurada para meia-entrada em eventos.</p>
              </div>
            </div>

            <div className="bg-slate-950 p-2.5 border-t border-white/10 text-center text-xs text-slate-400">
              Toque no botão <span className="text-blue-400 font-bold">Girar</span> para voltar à frente
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Action Buttons underneath card */}
      <div className="w-full grid grid-cols-3 gap-2 mt-4">
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-100 hover:bg-slate-50 text-slate-800 transition-all text-xs font-semibold shadow-xs cursor-pointer"
        >
          <RotateCw className="w-4 h-4 mb-1 text-blue-600" />
          <span>{isFlipped ? 'Frente' : 'Verso QR'}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyCode}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-100 hover:bg-slate-50 text-slate-800 transition-all text-xs font-semibold shadow-xs cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mb-1 text-emerald-600" />
              <span className="text-emerald-700 font-bold">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mb-1 text-blue-600" />
              <span>Copiar DNE</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-100 hover:bg-slate-50 text-slate-800 transition-all text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Maximize2 className="w-4 h-4 mb-1 text-amber-600" />
          <span>Expandir</span>
        </button>
      </div>

      {/* Student Details Card */}
      <div className="w-full bg-white border border-slate-100 rounded-xl p-4 mt-3.5 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between text-slate-800 font-bold pb-2 border-b border-slate-100">
          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
            <IdCard className="w-4 h-4 text-blue-600" />
            Dados da Certificação
          </span>
          <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full font-mono font-bold">
            {student.card.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 pt-1">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Código de Uso</span>
            <span className="font-mono text-slate-900 text-xs font-semibold">{student.card.codeDNE}</span>
          </div>
          <div>
            <span className="text-xs text-slate-500 block font-medium">Emissão</span>
            <span className="font-mono text-slate-900 text-xs font-semibold">{student.card.issueDate}</span>
          </div>
          <div className="col-span-2">
            <span className="text-xs text-slate-500 block font-medium">Documento de Identidade</span>
            <span className="font-mono text-slate-900 text-xs font-semibold">{student.card.nationalIdDoc}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Fullscreen Overlay
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-bold text-sm">Modo Apresentação (Meia-Entrada / Catraca)</span>
          </div>
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors cursor-pointer"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>
        <div className="w-full max-w-sm">
          {cardContent}
        </div>
      </div>
    );
  }

  // Modal View
  if (isModal) {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-sm bg-white border border-slate-100 rounded-2xl p-4 shadow-2xl my-auto"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                <IdCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Carteirinha Digital</h3>
                <p className="text-[11px] text-slate-500 font-medium">Documento Oficial de Estudante</p>
              </div>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
          {cardContent}
        </motion.div>
      </div>
    );
  }

  return cardContent;
};
