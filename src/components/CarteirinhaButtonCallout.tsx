import React from 'react';
import { motion } from 'motion/react';
import { 
  IdCard, 
  QrCode, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Maximize2 
} from 'lucide-react';
import { Student } from '../types';

interface CarteirinhaButtonCalloutProps {
  student: Student;
  onOpenCard: () => void;
}

export const CarteirinhaButtonCallout: React.FC<CarteirinhaButtonCalloutProps> = ({
  student,
  onOpenCard,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpenCard}
      className="w-full relative overflow-hidden rounded-2xl p-4 sm:p-5 cursor-pointer bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-slate-800 shadow-md hover:shadow-lg transition-all group"
    >
      {/* Light sheen effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-3">
        {/* Left Icon with Badge */}
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center shadow-sm">
              <IdCard className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow">
              <ShieldCheck className="w-3 h-3" />
            </div>
          </div>

          {/* Texts */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Documento Oficial
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Válida 2026/27
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
              Mostrar Carteirinha de Estudante
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-xs text-slate-300 font-normal line-clamp-1 mt-0.5">
              Toque para abrir QR Code, código de barras e validação
            </p>
          </div>
        </div>

        {/* Right Arrow Action */}
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:translate-x-0.5 transition-all">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Mini preview bar */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-mono">
        <span>RA: <strong className="text-white">{student.ra}</strong></span>
        <span>DNE: <strong className="text-amber-300">{student.card.codeDNE.slice(0, 15)}...</strong></span>
        <span className="text-blue-300 font-sans font-semibold flex items-center gap-1">
          <QrCode className="w-3.5 h-3.5" />
          Com QR Code
        </span>
      </div>
    </motion.div>
  );
};
