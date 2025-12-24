import React, { useState, useMemo } from 'react';
import { Search, Filter, ArrowUpDown, Award, Trophy, Info } from "lucide-react";
import { AchievementCard } from "./AchievementCard";
import { AchievementDetailsModal } from "./AchievementDetailsModal";
import { useAchievements } from "../../hooks/useAchievements";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const CATEGORIES = ["All", "Timer", "Consistency", "Learning", "Community", "Milestones"];
const STATUS_FILTERS = ["All", "Unlocked", "Locked"];
const SORT_OPTIONS = [
    { label: "Rarity (High to Low)", value: "rarity-desc" },
    { label: "Rarity (Low to High)", value: "rarity-asc" },
    { label: "Progress", value: "progress" },
    { label: "Newest Unlocked", value: "newest" },
];

const RARITY_WEIGHT = {
    Legendary: 4,
    Epic: 3,
    Rare: 2,
    Common: 1
};

export function AchievementsSection() {
    const { achievements, loading, stats } = useAchievements();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    const filteredAchievements = useMemo(() => {
        let result = [...achievements];

        // Filter by search
        if (search) {
            result = result.filter(a =>
                a.title.toLowerCase().includes(search.toLowerCase()) ||
                a.description.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== "All") {
            result = result.filter(a => a.category === selectedCategory);
        }

        // Filter by status
        if (selectedStatus === "Unlocked") {
            result = result.filter(a => a.unlocked);
        } else if (selectedStatus === "Locked") {
            result = result.filter(a => !a.unlocked);
        }

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case "rarity-desc":
                    return RARITY_WEIGHT[b.rarity] - RARITY_WEIGHT[a.rarity];
                case "rarity-asc":
                    return RARITY_WEIGHT[a.rarity] - RARITY_WEIGHT[b.rarity];
                case "progress":
                    return b.progress - a.progress;
                case "newest":
                    if (a.unlocked && b.unlocked) {
                        return new Date(b.unlockedAt) - new Date(a.unlockedAt);
                    }
                    if (a.unlocked) return -1;
                    if (b.unlocked) return 1;
                    return 0;
                default:
                    return 0;
            }
        });

        return result;
    }, [achievements, search, selectedCategory, selectedStatus, sortBy]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-rubik-blue border-t-transparent rounded-full animate-spin" />
                <p className="text-zinc-500 font-medium font-mono animate-pulse">Loading Achievements...</p>
            </div>
        );
    }

    return (
        <div className="mt-12 space-y-8">
            {/* Header & Stats Overview */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white font-mono flex items-center gap-3">
                        <Trophy className="w-8 h-8 text-rubik-yellow" />
                        Badges & Achievements
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                        Track your milestones, consistency, and skill levels.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Card className="bg-zinc-50 dark:bg-zinc-900 border-none shadow-sm">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Unlocked</span>
                            <span className="text-2xl font-black font-mono text-zinc-900 dark:text-white">{stats.unlocked}</span>
                            <span className="text-xs text-zinc-500">of {stats.total} badges</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-50 dark:bg-zinc-900 border-none shadow-sm">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Completion</span>
                            <span className="text-2xl font-black font-mono text-zinc-900 dark:text-white">{stats.percentage}%</span>
                            <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden">
                                <div className="h-full bg-rubik-green" style={{ width: `${stats.percentage}%` }} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hidden md:flex bg-zinc-50 dark:bg-zinc-900 border-none shadow-sm">
                        <CardContent className="p-4 flex flex-col items-center text-center justify-center">
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Next Rank</span>
                            <Badge variant="outline" className="font-mono bg-white dark:bg-zinc-950">Expert Solver</Badge>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Filters & Search Row */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md">
                <CardContent className="p-4 space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <Input
                                placeholder="Search achievements..."
                                className="pl-10 h-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <ArrowUpDown className="w-4 h-4 text-zinc-400" />
                            <select
                                className="h-10 px-3 pr-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm focus:outline-none focus:ring-2 focus:ring-rubik-blue"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mr-4">
                            <Filter className="w-3 h-3 text-zinc-400" />
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Category</span>
                        </div>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === cat
                                        ? "bg-rubik-blue text-white shadow-md shadow-rubik-blue/20"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 mr-4">
                            <Award className="w-3 h-3 text-zinc-400" />
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Status</span>
                        </div>
                        {STATUS_FILTERS.map(status => (
                            <button
                                key={status}
                                onClick={() => setSelectedStatus(status)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedStatus === status
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Grid */}
            {filteredAchievements.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAchievements.map(achievement => (
                        <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                            onClick={(a) => setSelectedAchievement(a)}
                        />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    <Info className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">No achievements found</h3>
                    <p className="text-zinc-500">Try adjusting your filters or search query.</p>
                </div>
            )}

            {/* Detail Modal */}
            <AchievementDetailsModal
                achievement={selectedAchievement}
                isOpen={!!selectedAchievement}
                onClose={() => setSelectedAchievement(null)}
            />
        </div>
    );
}
