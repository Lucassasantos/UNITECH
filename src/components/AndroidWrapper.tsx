import React from 'react';

interface AndroidWrapperProps {
  children: React.ReactNode;
  onAndroidBack?: () => void;
}

export const AndroidWrapper: React.FC<AndroidWrapperProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 flex justify-center">
      <div className="w-full max-w-xl min-h-screen bg-[#F8FAFC] flex flex-col relative shadow-sm border-x border-slate-200/50">
        <div className="flex-1 overflow-y-auto flex flex-col relative no-scrollbar bg-[#F8FAFC]">
          {children}
        </div>
      </div>
    </div>
  );
};

