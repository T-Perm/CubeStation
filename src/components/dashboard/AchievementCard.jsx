import React from 'react';
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Lock, CheckCircle2 } from "lucide-react";
import { ICON_MAP } from "../../data/achievements";

export function AchievementCard({ achievement, onClick }) {
    const IconComponent = ICON_MAP[achievement.icon] || Lock;

    const rarityColors = {
        Common: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700",
        Rare: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-100 dark:border-blue-800",
        Epic: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-100 dark:border-purple-800",
        Legendary: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-100 dark:border-amber-800"
    };

    return (
        <div
            onClick={() => onClick(achievement)}
            className={`relative group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg active:scale-[0.98] ${achievement.unlocked
                ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 grayscale-0"
                : "bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800/50 grayscale opacity-80 hover:grayscale-0 hover:opacity-100"
                }`}
        >
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${achievement.unlocked
                        ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                        }`}>
                        <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={`text-[10px] uppercase tracking-wider font-bold py-0.5 px-2 ${rarityColors[achievement.rarity]}`}>
                        {achievement.rarity}
                    </Badge>
                </div>

                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1 line-clamp-1">{achievement.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2 h-10 leading-relaxed">
                    {achievement.description}
                </p>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-tight">
                        <span className={achievement.unlocked ? "text-green-600 dark:text-green-400 flex items-center gap-1" : "text-zinc-400"}>
                            {achievement.unlocked ? (
                                <>
                                    <CheckCircle2 className="w-3 h-3" /> Unlocked
                                </>
                            ) : (
                                <>
                                    <Lock className="w-3 h-3" /> In Progress
                                </>
                            )}
                        </span>
                        <span className="text-zinc-500 font-mono italic">
                            {achievement.progressLabel || `${achievement.progress}%`}
                        </span>
                    </div>
                    <Progress value={achievement.progress} className="h-1.5" indicatorColor={achievement.unlocked ? "bg-green-500" : "bg-zinc-300 dark:bg-zinc-700"} />
                </div>
            </div>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-zinc-900/[0.02] dark:bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
}
