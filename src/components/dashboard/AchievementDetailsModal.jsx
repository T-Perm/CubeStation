import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Trophy, Target, Clock, CheckCircle2, Lock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ICON_MAP } from "../../data/achievements";

export function AchievementDetailsModal({ achievement, isOpen, onClose }) {
    if (!achievement) return null;

    const IconComponent = ICON_MAP[achievement.icon] || Lock;

    const rarityColors = {
        Common: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700",
        Rare: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-100 dark:border-blue-800",
        Epic: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-100 dark:border-purple-800",
        Legendary: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-100 dark:border-amber-800"
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-xl bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
                    >
                        {/* Header / Banner */}
                        <div className={`h-40 w-full relative overflow-hidden ${achievement.unlocked
                            ? "bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-800"
                            : "bg-zinc-100 dark:bg-zinc-800/30"
                            }`}>
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-rubik-blue/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-rubik-orange/5 rounded-full -ml-32 -mb-32 blur-3xl" />

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2.5 bg-white/80 dark:bg-zinc-950/50 hover:bg-white dark:hover:bg-zinc-950 rounded-full transition-all shadow-sm z-10 hover:scale-110 active:scale-90"
                            >
                                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                            </button>

                            <div className="absolute -bottom-8 left-10 p-5 bg-white dark:bg-zinc-950 rounded-[2rem] shadow-xl border border-zinc-100 dark:border-zinc-800 group transition-transform hover:scale-105">
                                <IconComponent className={`w-14 h-14 transition-transform group-hover:rotate-12 ${achievement.unlocked ? "text-zinc-900 dark:text-white" : "text-zinc-300 dark:text-zinc-700"}`} />
                            </div>
                        </div>

                        <div className="pt-16 pb-10 px-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className={`text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full border-2 ${rarityColors[achievement.rarity]}`}>
                                            {achievement.rarity}
                                        </Badge>
                                        <span className="text-zinc-300 dark:text-zinc-700 font-bold">•</span>
                                        <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-black uppercase tracking-[0.2em]">
                                            {achievement.category}
                                        </span>
                                    </div>
                                    <h2 className="text-4xl font-black text-zinc-900 dark:text-white font-mono leading-none tracking-tighter">
                                        {achievement.title}
                                    </h2>
                                </div>

                                {achievement.unlocked && (
                                    <div className="flex items-center gap-3 text-rubik-green bg-rubik-green/5 dark:bg-rubik-green/10 px-5 py-2.5 rounded-2xl border-2 border-rubik-green/20">
                                        <CheckCircle2 className="w-6 h-6" />
                                        <span className="text-sm font-black uppercase tracking-widest">Mastered</span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <section>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-3">Description</h3>
                                        <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-lg font-medium">
                                            {achievement.description}
                                        </p>
                                    </section>

                                    <section>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-3">Requirement</h3>
                                        <div className="p-5 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50 group transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50">
                                            <p className="text-sm text-zinc-700 dark:text-zinc-300 flex items-start gap-4">
                                                <Target className="w-5 h-5 text-rubik-blue mt-0.5" />
                                                <span className="font-semibold leading-snug">
                                                    Complete the specific {achievement.category.toLowerCase()} challenge for {achievement.title} to secure this badge.
                                                </span>
                                            </p>
                                        </div>
                                    </section>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4 text-center">Current Progress</h4>
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="relative w-24 h-24 flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle
                                                        cx="48"
                                                        cy="48"
                                                        r="40"
                                                        stroke="currentColor"
                                                        strokeWidth="8"
                                                        fill="transparent"
                                                        className="text-zinc-200 dark:text-zinc-800"
                                                    />
                                                    <circle
                                                        cx="48"
                                                        cy="48"
                                                        r="40"
                                                        stroke="currentColor"
                                                        strokeWidth="8"
                                                        fill="transparent"
                                                        strokeDasharray={2 * Math.PI * 40}
                                                        strokeDashoffset={2 * Math.PI * 40 * (1 - achievement.progress / 100)}
                                                        className={`${achievement.unlocked ? 'text-rubik-green' : 'text-rubik-blue'} transition-all duration-1000 ease-out`}
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <span className="absolute text-xl font-mono font-black text-zinc-900 dark:text-white">
                                                    {achievement.progress}%
                                                </span>
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full shadow-sm">
                                                {achievement.progressLabel || "In Progress"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 mb-4 text-center">
                                            {achievement.unlocked ? "Mastery Date" : "Last Activity"}
                                        </h4>
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm mb-1">
                                                <Calendar className="w-6 h-6 text-rubik-orange" />
                                            </div>
                                            <span className="text-lg font-black font-mono text-zinc-900 dark:text-white">
                                                {achievement.unlockedAt
                                                    ? new Date(achievement.unlockedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                                    : "STILL GRINDING"
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
