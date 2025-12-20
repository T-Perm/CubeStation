import React from 'react';
import { useStackmat } from '../hooks/useStackmat';
import { LiquidGlassCard } from './ui/liquid-glass';
import { Button } from './ui/button';
import { Mic, MicOff, Activity, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StackmatDisplay({ time, status, signalStrength, isActive, error, toggleStackmat }) {

    // Calculate signal quality percentage
    const signalPercent = Math.min(Math.round(signalStrength * 500), 100);

    return (
        <LiquidGlassCard
            className="w-full max-w-md mx-auto overflow-hidden"
            blurIntensity="xl"
            borderRadius="32px"
            shadowIntensity="lg"
        >
            <div className="p-8 flex flex-col items-center gap-6">
                <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
                        Stackmat Mode
                    </span>
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-2 h-2 rounded-full",
                            isActive ? "bg-rubik-green animate-pulse" : "bg-zinc-300 dark:bg-zinc-700"
                        )} />
                        <span className="text-[10px] font-mono font-bold">
                            {isActive ? 'LIVE' : 'OFFLINE'}
                        </span>
                    </div>
                </div>

                {/* Main Time Display */}
                <div className="py-8">
                    <h2 className={cn(
                        "text-6xl md:text-7xl font-mono font-bold tracking-tighter tabular-nums transition-all duration-300",
                        status === 'RUNNING' ? "text-rubik-green" :
                            status === 'STOPPED' ? "text-rubik-red" :
                                "text-zinc-900 dark:text-zinc-100"
                    )}>
                        {time}
                    </h2>
                    <div className="text-center mt-2">
                        <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            status === 'RUNNING' ? "bg-rubik-green/10 text-rubik-green" :
                                status === 'STOPPED' ? "bg-rubik-red/10 text-rubik-red" :
                                    "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                        )}>
                            {status}
                        </span>
                    </div>
                </div>

                {/* Signal Diagnostics */}
                <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold text-zinc-600">
                        <span className="flex items-center gap-1 uppercase">
                            <Activity className="w-3 h-3" /> Signal Stability
                        </span>
                        <span>{signalPercent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-300",
                                signalPercent > 60 ? "bg-rubik-green" :
                                    signalPercent > 30 ? "bg-rubik-yellow" :
                                        "bg-rubik-red"
                            )}
                            style={{ width: `${signalPercent}%` }}
                        />
                    </div>
                </div>

                {/* Control Button */}
                <Button
                    onClick={toggleStackmat}
                    className={cn(
                        "w-full h-14 rounded-2xl font-bold transition-all duration-300 group",
                        isActive
                            ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-rubik-red/10 hover:text-rubik-red"
                            : "bg-rubik-blue text-white shadow-lg shadow-rubik-blue/25 hover:shadow-xl hover:-translate-y-0.5"
                    )}
                >
                    {isActive ? (
                        <>
                            <MicOff className="w-5 h-5 mr-2" /> Stop Listening
                        </>
                    ) : (
                        <>
                            <Mic className="w-5 h-5 mr-2" /> Connect Stackmat
                        </>
                    )}
                </Button>

                {error && (
                    <div className="flex items-center gap-2 text-rubik-red bg-rubik-red/10 p-3 rounded-xl w-full border border-rubik-red/20">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-medium">{error}</span>
                    </div>
                )}

                <p className="text-[10px] text-center text-zinc-400 dark:text-zinc-600 leading-tight">
                    Requires a 3.5mm-to-Mic cable connected to your <br />
                    Stackmat Pro Timer (Gen 3/4).
                </p>
            </div>
        </LiquidGlassCard>
    );
}

StackmatDisplay.useStackmat = useStackmat;
