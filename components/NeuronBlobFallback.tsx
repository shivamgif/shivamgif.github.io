export function NeuronBlobFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="-100 -100 200 200"
        className="w-[min(70vmin,520px)] h-[min(70vmin,520px)]"
        aria-hidden
      >
        <defs>
          <radialGradient id="g" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#e63946" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0a0a0a" stopOpacity="1" />
          </radialGradient>
        </defs>
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x1 = Math.cos(a) * 60;
          const y1 = Math.sin(a) * 60;
          const x2 = Math.cos(a) * 95;
          const y2 = Math.sin(a) * 95;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#0a0a0a"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.3;1;0.3"
                dur={`${2 + (i % 3)}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
        <circle cx="0" cy="0" r="58" fill="url(#g)" stroke="#0a0a0a" strokeWidth="3">
          <animate
            attributeName="r"
            values="56;62;56"
            dur="3.6s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
