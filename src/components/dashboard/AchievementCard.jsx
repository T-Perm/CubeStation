import React from 'react';
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Lock, CheckCircle2 } from "lucide-react";
import { ICON_MAP } from "../../data/achievements";

export function AchievementCard({ achievement, onClick, isHighlighted }) {
    const IconComponent = ICON_MAP[achievement.icon] || Lock;

    const rarityColors = {
        Common: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700",
        Rare: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border-blue-100 dark:border-blue-800",
        Epic: "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 border-purple-100 dark:border-purple-800",
        Legendary: "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400 border-amber-100 dark:border-amber-800"
    };

    return (
        <div
            id={`badge-${achievement.id}`}
            onClick={() => onClick(achievement)}
            className={`relative group cursor-pointer overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 active:scale-[0.97] ${achievement.unlocked
                ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm"
                : "bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800/50 opacity-80"
                } ${isHighlighted ? "ring-4 ring-rubik-blue scale-105 shadow-2xl z-20" : ""}`}
        >
            {/* Background glow on hover for unlocked/legendary */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-3xl -z-10 ${achievement.rarity === 'Legendary' ? 'bg-amber-500/10' :
                achievement.rarity === 'Epic' ? 'bg-purple-500/10' :
                    achievement.rarity === 'Rare' ? 'bg-blue-500/10' : 'bg-zinc-500/5'
                }`} />

            <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                    <div className={`p-3.5 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${achievement.unlocked
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-inner"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                        }`}>
                        <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-black py-1 px-2.5 rounded-full border-2 ${rarityColors[achievement.rarity]}`}>
                        {achievement.rarity}
                    </Badge>
                </div>

                <h3 className="font-black text-zinc-900 dark:text-zinc-100 mb-2 line-clamp-1 tracking-tight">{achievement.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 line-clamp-2 h-10 leading-relaxed font-medium">
                    {achievement.description}
                </p>

                <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                        <span className={achievement.unlocked ? "text-rubik-green flex items-center gap-1.5" : "text-zinc-400 flex items-center gap-1.5"}>
                            {achievement.unlocked ? (
                                <>
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3.5 h-3.5" /> Locked
                                </>
                            )}
                        </span>
                        <span className="text-zinc-500 font-mono">
                            {achievement.progressLabel || `${achievement.progress}%`}
                        </span>
                    </div>
                    <div className="relative w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-out rounded-full ${achievement.unlocked ? "bg-rubik-green" : "bg-zinc-300 dark:bg-zinc-700"
                                }`}
                            style={{ width: `${achievement.progress}%` }}
                        />
                        {!achievement.unlocked && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full animate-[shimmer_2s_infinite]" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
