import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Swords, Users, Zap, Loader2, Trophy, ArrowRight, ShieldCheck, Timer } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export default function CompetitiveModal({ isOpen, onClose, opponent }) {
    const navigate = useNavigate();
    const [matchState, setMatchState] = useState("idle"); // idle, searching, found, preparing
    const [searchTime, setSearchTime] = useState(0);

    useEffect(() => {
        let interval;
        if (matchState === "searching") {
            interval = setInterval(() => {
                setSearchTime(prev => prev + 1);
            }, 1000);
        } else if (matchState === "found") {
            const timeout = setTimeout(() => {
                navigate("/versus-arena", { state: { opponent } });
                onClose();
            }, 3000);
            return () => clearTimeout(timeout);
        } else {
            setSearchTime(0);
        }
        return () => clearInterval(interval);
    }, [matchState, navigate, onClose]);

    const startSearch = () => {
        setMatchState("searching");
        // Simulate match found after 1-3 seconds if challenging, or 3-5 if global
        const delay = opponent ? 1500 : 3500;
        setTimeout(() => {
            setMatchState("found");
        }, delay);
    };

    // Auto-start if opponent is specified (direct challenge)
    useEffect(() => {
        if (isOpen && opponent) {
            startSearch();
        }
    }, [isOpen, opponent]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-xl"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-white/10"
                >
                    {/* Header Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rubik-red/10 via-rubik-orange/5 to-transparent pointer-events-none" />

                    <div className="p-8 md:p-12">
                        <div className="flex justify-between items-start mb-12 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-rubik-red/10 rounded-2xl">
                                    <Swords className="w-8 h-8 text-rubik-red" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Competitive Arena</h2>
                                    <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs font-bold">
                                        <ShieldCheck size={14} className="text-rubik-blue" />
                                        Ranked Matchmaking Enabled
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2.5 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 rounded-2xl transition-all">
                                <X className="w-6 h-6 text-zinc-500" />
                            </button>
                        </div>

                        <div className="relative min-h-[300px] flex flex-col items-center justify-center text-center">
                            <AnimatePresence mode="wait">
                                {matchState === "idle" && (
                                    <motion.div
                                        key="idle"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="space-y-8"
                                    >
                                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                                            <div className="p-6 bg-zinc-50 dark:bg-white/5 rounded-3xl border border-zinc-100 dark:border-white/5 text-left group hover:border-rubik-blue/30 transition-all cursor-pointer">
                                                <Users size={24} className="text-rubik-blue mb-3 group-hover:scale-110 transition-transform" />
                                                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Ranked 1v1</h4>
                                                <p className="text-xs text-zinc-500">Gain or lose Elo based on performance.</p>
                                            </div>
                                            <div className="p-6 bg-zinc-50 dark:bg-white/5 rounded-3xl border border-zinc-100 dark:border-white/5 text-left group hover:border-rubik-green/30 transition-all cursor-pointer opacity-50">
                                                <Timer size={24} className="text-rubik-green mb-3" />
                                                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Casual Play</h4>
                                                <p className="text-xs text-zinc-500">Practice without rank consequences.</p>
                                                <span className="inline-block mt-2 px-2 py-0.5 bg-zinc-200 dark:bg-white/10 rounded text-[10px] uppercase font-black">Coming Soon</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={startSearch}
                                            size="xl"
                                            className="w-full max-w-sm h-16 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all group"
                                        >
                                            Find Match
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </Button>
                                    </motion.div>
                                )}

                                {matchState === "searching" && (
                                    <motion.div
                                        key="searching"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="flex flex-col items-center gap-6"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-rubik-blue/20 blur-[40px] animate-pulse" />
                                            <div className="relative w-24 h-24 flex items-center justify-center">
                                                <Loader2 className="w-full h-full text-rubik-blue animate-spin stroke-[1.5]" />
                                                <Swords className="absolute w-10 h-10 text-white dark:text-zinc-900" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-wider">Queueing...</h3>
                                            <p className="text-zinc-500 font-mono font-bold">{Math.floor(searchTime / 60)}:{(searchTime % 60).toString().padStart(2, '0')}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setMatchState("idle")}
                                            className="text-zinc-500 hover:text-rubik-red font-bold uppercase tracking-widest text-xs"
                                        >
                                            Cancel Queue
                                        </Button>
                                    </motion.div>
                                )}

                                {matchState === "found" && (
                                    <motion.div
                                        key="found"
                                        initial={{ opacity: 0, scale: 1.2 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full max-w-lg"
                                    >
                                        <div className="absolute inset-0 bg-rubik-green/10 blur-[100px] pointer-events-none" />
                                        <div className="text-rubik-green font-black uppercase tracking-[0.4em] mb-8 text-sm animate-bounce">
                                            {opponent ? "Challenge Accepted!" : "Match Found!"}
                                        </div>

                                        <div className="flex items-center justify-between gap-8 mb-12">
                                            <div className="flex flex-col items-center gap-4 flex-1">
                                                <div className="w-24 h-24 rounded-full border-4 border-rubik-blue p-1 shadow-2xl">
                                                    <img src="https://github.com/shadcn.png" className="w-full h-full rounded-full" alt="You" />
                                                </div>
                                                <div>
                                                    <div className="font-black text-zinc-900 dark:text-white">YOU</div>
                                                    <div className="text-xs font-mono font-bold text-zinc-500">1450 Elo</div>
                                                </div>
                                            </div>

                                            <div className="text-4xl font-black italic text-zinc-300 dark:text-zinc-700">VS</div>

                                            <div className="flex flex-col items-center gap-4 flex-1">
                                                <motion.div
                                                    initial={{ rotate: 12, scale: 0.8 }}
                                                    animate={{ rotate: 0, scale: 1 }}
                                                    className="w-24 h-24 rounded-full border-4 border-rubik-red p-1 shadow-2xl"
                                                >
                                                    <img src={opponent?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Feliks"} className="w-full h-full rounded-full" alt="Opponent" />
                                                </motion.div>
                                                <div>
                                                    <div className="font-black text-zinc-900 dark:text-white">{opponent?.name || "FAZ_2026"}</div>
                                                    <div className="text-xs font-mono font-bold text-zinc-500">{opponent ? `${opponent.level * 15} Elo` : "1482 Elo"}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-zinc-900 dark:bg-white rounded-2xl">
                                            <div className="text-white dark:text-zinc-900 font-black uppercase tracking-widest text-xs mb-1">Next Up:</div>
                                            <div className="text-rubik-orange font-black text-xl">3x3 SPEEDSOLVE</div>
                                        </div>

                                        <div className="mt-8 text-zinc-500 text-xs font-bold animate-pulse">Launching match in 3s...</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer Tips */}
                        <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between text-zinc-500">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                <Trophy size={14} className="text-rubik-yellow" />
                                WIN: +25 Elo
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                                <Trophy size={14} className="text-rubik-red rotate-180" />
                                LOSS: -12 Elo
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
