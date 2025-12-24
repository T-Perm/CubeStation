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
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
                    >
                        {/* Header / Banner */}
                        <div className={`h-32 w-full relative ${achievement.unlocked
                            ? "bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-800/50"
                            : "bg-zinc-100 dark:bg-zinc-800/30"
                            }`}>
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 rounded-full transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
                            </button>

                            <div className="absolute -bottom-10 left-8 p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
                                <IconComponent className={`w-12 h-12 ${achievement.unlocked ? "text-zinc-900 dark:text-white" : "text-zinc-300"}`} />
                            </div>
                        </div>

                        <div className="pt-14 pb-8 px-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white font-mono leading-tight">
                                        {achievement.title}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className={`text-[10px] uppercase font-bold ${rarityColors[achievement.rarity]}`}>
                                            {achievement.rarity}
                                        </Badge>
                                        <span className="text-zinc-400 text-xs font-medium">•</span>
                                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                                            {achievement.category}
                                        </span>
                                    </div>
                                </div>

                                {achievement.unlocked && (
                                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl border border-green-100 dark:border-green-900/30">
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="text-sm font-bold">Unlocked</span>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <section>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Description</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                        {achievement.description}
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Requirements</h3>
                                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                            <Target className="w-4 h-4 text-zinc-400" />
                                            {/* Placeholder for criteria text requested in requirements */}
                                            Complete the specific task for {achievement.title} to unlock this badge.
                                        </p>
                                    </div>
                                </section>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Status</h4>
                                        <div className="flex items-center gap-2">
                                            <Progress value={achievement.progress} className="flex-1 h-2" indicatorColor={achievement.unlocked ? "bg-green-500" : "bg-zinc-300 dark:bg-zinc-700"} />
                                            <span className="text-sm font-mono font-bold text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                                                {achievement.progressLabel || `${achievement.progress}%`}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">
                                            {achievement.unlocked ? "Unlocked On" : "Last Activity"}
                                        </h4>
                                        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-medium">
                                            <Calendar className="w-4 h-4 text-zinc-400" />
                                            <span className="text-sm">
                                                {achievement.unlockedAt
                                                    ? new Date(achievement.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                    : "In Progress"
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
