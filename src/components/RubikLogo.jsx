import React from 'react';

const RubikLogo = ({ className = "w-10 h-10" }) => (
    <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} transition-transform duration-500 group-hover:scale-105 shadow-lg shadow-black/10 dark:shadow-white/5 rounded-xl`}
    >
        {/* Dark border/gaps - acts as the base */}
        <rect width="40" height="40" rx="8" fill="#18181b" />

        {/* 3x3 Rubik's Grid */}
        {/* Row 1 */}
        <rect x="2.5" y="2.5" width="10" height="10" rx="1.5" fill="#3b82f6" />
        <rect x="15" y="2.5" width="10" height="10" rx="1.5" fill="#ef4444" />
        <rect x="27.5" y="2.5" width="10" height="10" rx="1.5" fill="#22c55e" />

        {/* Row 2 */}
        <rect x="2.5" y="15" width="10" height="10" rx="1.5" fill="#f97316" />
        <rect x="15" y="15" width="10" height="10" rx="1.5" fill="#eab308" />
        <rect x="27.5" y="15" width="10" height="10" rx="1.5" fill="#3b82f6" />

        {/* Row 3 */}
        <rect x="2.5" y="27.5" width="10" height="10" rx="1.5" fill="#22c55e" />
        <rect x="15" y="27.5" width="10" height="10" rx="1.5" fill="#f8fafc" />
        <rect x="27.5" y="27.5" width="10" height="10" rx="1.5" fill="#ef4444" />

        {/* CS Text Overlay */}
        <text
            x="50%"
            y="54%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: '900',
                fontSize: '14px',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                pointerEvents: 'none'
            }}
        >
            CS
        </text>
    </svg>
);

export default RubikLogo;
