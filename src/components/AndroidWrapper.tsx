import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  Smartphone, 
  Maximize, 
  Minimize, 
  Volume2, 
  Moon,
  ChevronLeft,
  Square,
  Circle
} from 'lucide-react';

interface AndroidWrapperProps {
  children: React.ReactNode;
  onAndroidBack?: () => void;
}

export const AndroidWrapper: React.FC<AndroidWrapperProps> = ({ children, onAndroidBack }) => {
  const [currentTime, setCurrentTime] = useState('12:30');
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Live Android Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 flex flex-col items-center justify-center p-0 sm:p-4">
      {/* Top Device Mode Toolbar for preview */}
      <div className="w-full max-w-md hidden sm:flex items-center justify-between px-3 py-1.5 mb-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-slate-700">Android • App Universitário</span>
        </div>
        <button
          type="button"
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-medium shadow-sm transition-colors cursor-pointer"
        >
          {deviceFrameMode ? (
            <>
              <Maximize className="w-3.5 h-3.5" />
              <span>Expandir Layout</span>
            </>
          ) : (
            <>
              <Minimize className="w-3.5 h-3.5" />
              <span>Moldura Android</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container - Either phone mockup or full width */}
      <div
        className={`w-full transition-all duration-300 flex flex-col ${
          deviceFrameMode
            ? 'max-w-[420px] h-[92vh] max-h-[890px] bg-[#F8FAFC] rounded-[40px] border-[10px] border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.15)] ring-1 ring-slate-900/10 overflow-hidden relative'
            : 'max-w-md min-h-screen bg-[#F8FAFC] shadow-xl relative'
        }`}
        style={{
          borderColor: deviceFrameMode ? '#1e293b' : 'transparent',
        }}
      >
        {/* Android Status Bar (Punch hole, Clock, Battery, Wifi, 5G) */}
        <div className="w-full bg-white text-slate-700 px-6 py-2 flex items-center justify-between text-xs font-semibold select-none shrink-0 z-40 border-b border-slate-100 shadow-xs">
          {/* Clock */}
          <span className="font-mono text-[11px] tracking-tight text-slate-800">{currentTime}</span>

          {/* Front Camera Punch-hole */}
          {deviceFrameMode && (
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 flex items-center justify-center -mr-2">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-blue-400/40" />
            </div>
          )}

          {/* System Icons */}
          <div className="flex items-center gap-2 text-[11px]">
            <span className="font-bold text-[10px] text-slate-600">5G</span>
            <Wifi className="w-3.5 h-3.5 text-slate-600" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-600">94%</span>
              <Battery className="w-4 h-4 text-emerald-600 fill-emerald-600" />
            </div>
          </div>
        </div>

        {/* Content View with smooth scroll */}
        <div className="flex-1 overflow-y-auto flex flex-col relative no-scrollbar bg-[#F8FAFC]">
          {children}
        </div>

        {/* Android Bottom Navigation Gesture Bar */}
        <div className="w-full bg-white px-6 py-2 flex items-center justify-center select-none shrink-0 border-t border-slate-100">
          <div 
            onClick={onAndroidBack}
            className="w-32 h-1 bg-slate-300 hover:bg-slate-400 rounded-full cursor-pointer transition-colors" 
          />
        </div>
      </div>
    </div>
  );
};
