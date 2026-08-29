import React from 'react';

// Generates a clean SVG QR code visual with authentic finder patterns
export const QRCodeSvg: React.FC<{ value: string; size?: number; className?: string }> = ({
  value,
  size = 140,
  className = '',
}) => {
  // Deterministic pattern generator based on the value string
  let hash = 42;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) % 1000000007;
  }
  const gridSize = 21; // standard QR 21x21 version 1
  const modules: boolean[][] = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

  // Finder patterns helper (top-left, top-right, bottom-left)
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          modules[startY + r][startX + c] = true;
        }
      }
    }
  };

  drawFinder(0, 0); // Top-left
  drawFinder(gridSize - 7, 0); // Top-right
  drawFinder(0, gridSize - 7); // Bottom-left

  // Timing patterns
  for (let i = 8; i < gridSize - 8; i++) {
    if (i % 2 === 0) {
      modules[6][i] = true;
      modules[i][6] = true;
    }
  }

  // Fill pseudo-random data bits based on hash
  let state = Number(hash);
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= gridSize - 8;
      const inBottomLeft = r >= gridSize - 8 && c < 8;
      const isTiming = (r === 6 && c >= 8 && c < gridSize - 8) || (c === 6 && r >= 8 && r < gridSize - 8);

      if (!inTopLeft && !inTopRight && !inBottomLeft && !isTiming) {
        state = (Number(state) * 1664525 + 1013904223) % 4294967296;
        modules[r][c] = (state % 3 === 0 || (Number(r) + Number(c)) % 2 === 0);
      }
    }
  }

  const cellSize = size / gridSize;

  return (
    <div className={`relative bg-white p-2.5 rounded-xl inline-block shadow-sm ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="block"
      >
        {modules.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="#0f172a"
                rx={cellSize * 0.15}
              />
            ) : null
          )
        )}
      </svg>
      {/* Central University mini-badge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-7 h-7 bg-blue-700 text-white rounded-full flex items-center justify-center text-[9px] font-black border-2 border-white shadow-md">
          BR
        </div>
      </div>
    </div>
  );
};

// Generates an authentic Code-128 style Barcode for turnstile / library scanner
export const BarcodeSvg: React.FC<{ value: string; className?: string }> = ({
  value,
  className = '',
}) => {
  // Deterministic bar widths
  const bars: { width: number; isSpace: boolean }[] = [];
  let isBar = true;
  
  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i);
    const pattern = [(charCode % 3) + 1, ((charCode * 3) % 4) + 1, ((charCode * 7) % 3) + 1];
    pattern.forEach((w) => {
      bars.push({ width: w, isSpace: !isBar });
      isBar = !isBar;
    });
  }

  // Calculate total units
  const totalUnits = bars.reduce((acc, b) => acc + b.width, 0);

  return (
    <div className={`bg-white px-3 py-2 rounded-lg flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${totalUnits * 2} 48`}
        className="w-full h-11"
        preserveAspectRatio="none"
      >
        {(() => {
          let currentX = 0;
          return bars.map((bar, idx) => {
            const x = currentX;
            currentX += bar.width * 2;
            if (bar.isSpace) return null;
            return (
              <rect
                key={idx}
                x={x}
                y={0}
                width={bar.width * 2 - 0.4}
                height={48}
                fill="#0f172a"
              />
            );
          });
        })()}
      </svg>
      <span className="font-mono text-[11px] text-slate-700 tracking-widest font-semibold mt-1">
        {value.match(/.{1,4}/g)?.join(' ') || value}
      </span>
    </div>
  );
};
