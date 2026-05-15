'use client'

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-slate-950 overflow-hidden relative">

            {/* Grid background */}
            <div className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage: `linear-gradient(rgba(22,163,74,0.07) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(22,163,74,0.07) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    animation: 'gridFade 3s ease-in-out infinite alternate'
                }}
            />

            {/* Scanning line */}
            {/* <div className="absolute left-0 right-0 h-[2px] pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(22,163,74,0.6), transparent)',
                    animation: 'scan 2.4s linear infinite'
                }}
            /> */}

            {/* Corner brackets */}
            {[
                'top-4 left-4 border-t-2 border-l-2',
                'top-4 right-4 border-t-2 border-r-2',
                'bottom-4 left-4 border-b-2 border-l-2',
                'bottom-4 right-4 border-b-2 border-r-2'
            ].map((cls, i) => (
                <div key={i} className={`absolute w-4 h-4 border-green-600 ${cls}`} />
            ))}

            {/* Core */}
            <div className="relative flex flex-col items-center gap-5 z-10">

                {/* Ring + orbit system */}
                <div className="relative w-40 h-40 flex items-center justify-center">
                    {[60, 90, 120, 155].map((size, i) => (
                        <div key={i} className="absolute rounded-full"
                            style={{
                                width: size, height: size,
                                border: '1.5px solid rgba(22,163,74,0.35)',
                                animation: `ripple 2.4s ease-out ${i * 0.4}s infinite`
                            }}
                        />
                    ))}

                    {/* Outer orbiting dot */}
                    <div className="absolute rounded-full"
                        style={{ width: 155, height: 155, animation: 'orbitSpin 3s linear infinite' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-green-600"
                            style={{ boxShadow: '0 0 8px #16a34a' }} />
                    </div>

                    {/* Inner orbiting dot (reverse) */}
                    <div className="absolute rounded-full"
                        style={{ width: 110, height: 110, animation: 'orbitSpin 2s linear infinite reverse' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-green-400"
                            style={{ boxShadow: '0 0 6px #4ade80' }} />
                    </div>

                    {/* Center diamond */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg rotate-45 border border-green-600/50 bg-green-600/10"
                        style={{ animation: 'hexPulse 2s ease-in-out infinite' }}>
                        <div className="w-5 h-5 rounded bg-green-600"
                            style={{ animation: 'hexInnerPulse 2s ease-in-out infinite' }} />
                    </div>
                </div>

                {/* Brand name */}
                <p className="text-white text-3xl font-bold tracking-tight"
                    style={{ animation: 'brandFade 2s ease-in-out infinite alternate' }}>
                    <span className="text-green-600">Fash</span>Tech
                </p>

                {/* Progress bar */}
                <div className="w-40 h-[2px] rounded-full overflow-hidden bg-white/10">
                    <div className="h-full rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #16a34a, #4ade80)',
                            animation: 'fillBar 2s ease-in-out infinite'
                        }}
                    />
                </div>

                {/* Status text */}
                <p className="text-xs tracking-[2.5px] uppercase text-green-600/70"
                    style={{ animation: 'blink 1.2s ease-in-out infinite alternate' }}>
                    Initializing..
                </p>
            </div>

            <style>{`
                @keyframes gridFade { from { opacity: 0.4; } to { opacity: 1; } }
                @keyframes scan { from { top: 0; } to { top: 100%; } }
                @keyframes ripple {
                    0%   { opacity: 0.9; border-color: rgba(22,163,74,0.8); transform: scale(0.94); }
                    50%  { opacity: 0.5; border-color: rgba(22,163,74,0.4); }
                    100% { opacity: 0;   border-color: rgba(22,163,74,0.1); transform: scale(1.04); }
                }
                @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes hexPulse {
                    0%,100% { box-shadow: 0 0 12px rgba(22,163,74,0.3); }
                    50%     { box-shadow: 0 0 28px rgba(22,163,74,0.7); }
                }
                @keyframes hexInnerPulse {
                    0%,100% { opacity: 0.8; transform: rotate(0deg) scale(0.9); }
                    50%     { opacity: 1;   transform: rotate(90deg) scale(1.1); }
                }
                @keyframes brandFade { from { opacity: 0.7; } to { opacity: 1; } }
                @keyframes fillBar {
                    0%   { width: 0%;   opacity: 1; }
                    80%  { width: 100%; opacity: 1; }
                    100% { width: 100%; opacity: 0; }
                }
                @keyframes blink { from { opacity: 0.4; } to { opacity: 1; } }
            `}</style>
        </div>
    )
}

export default Loading