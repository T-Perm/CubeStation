import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ArrowUpDown, Award, Trophy, Info } from "lucide-react";
import { useSearchParams } from "react-router-dom";
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
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [highlightedBadgeId, setHighlightedBadgeId] = useState(null);

    useEffect(() => {
        const badgeId = searchParams.get("badge");
        if (badgeId && !loading) {
            // Find the achievement to ensure it exists and maybe switch category/filters to show it
            const target = achievements.find(a => a.id === badgeId);
            if (target) {
                // Adjust filters to make sure the target is visible
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSearch("");

                // Small delay to allow filters to apply and element to be in DOM
                setTimeout(() => {
                    const element = document.getElementById(`badge-${badgeId}`);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                        setHighlightedBadgeId(badgeId);

                        // Clear highlight after 2 seconds
                        setTimeout(() => {
                            setHighlightedBadgeId(null);
                        }, 2000);
                    }
                }, 300);
            }
        }
    }, [searchParams, loading, achievements]);

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
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rubik-yellow/10 border border-rubik-yellow/20 text-rubik-yellow text-[10px] font-black uppercase tracking-widest">
                        <Award className="w-3 h-3" />
                        Reputation System
                    </div>
                    <h2 className="text-5xl font-black text-zinc-900 dark:text-white font-mono flex items-center gap-4 tracking-tighter">
                        Badges & <span className="text-rubik-blue">Achievements</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md font-medium">
                        Proof of your dedication to the craft. Complete challenges to unlock exclusive badges.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-rubik-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Card className="relative bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2">Unlocked</span>
                                <span className="text-4xl font-black font-mono text-zinc-900 dark:text-white leading-none">{stats.unlocked}</span>
                                <span className="text-[11px] font-bold text-zinc-500 mt-2">of {stats.total} total</span>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-rubik-green/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Card className="relative bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2">Progress</span>
                                <span className="text-4xl font-black font-mono text-zinc-900 dark:text-white leading-none">{stats.percentage}%</span>
                                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-rubik-green shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-1000" style={{ width: `${stats.percentage}%` }} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="relative group hidden md:block">
                        <div className="absolute inset-0 bg-rubik-orange/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Card className="relative bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm rounded-3xl overflow-hidden h-full">
                            <CardContent className="p-6 flex flex-col items-center text-center justify-center h-full">
                                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] mb-2">Current Title</span>
                                <Badge variant="outline" className="font-black text-xs bg-rubik-orange/5 text-rubik-orange border-rubik-orange/20 py-1.5 px-4 rounded-xl">
                                    SILVER SOLVER
                                </Badge>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Filters & Search Row */}
            <Card className="border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-[2rem] shadow-sm overflow-hidden">
                <CardContent className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 transition-colors group-focus-within:text-rubik-blue" />
                            <Input
                                placeholder="Search achievements..."
                                className="pl-12 h-12 bg-white/50 dark:bg-zinc-950/50 border-zinc-200 dark:border-zinc-800 rounded-2xl text-base ring-offset-0 focus:ring-2 focus:ring-rubik-blue/20 focus:border-rubik-blue/50 transition-all font-medium"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
                                <ArrowUpDown className="w-5 h-5 text-zinc-500" />
                            </div>
                            <select
                                className="h-12 px-4 pr-10 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-rubik-blue/10 focus:border-rubik-blue transition-all appearance-none cursor-pointer"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2 mr-4 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                <Filter className="w-3.5 h-3.5 text-zinc-500" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-5 py-2 rounded-xl text-xs font-black transition-all duration-300 ${selectedCategory === cat
                                            ? "bg-rubik-blue text-white shadow-lg shadow-rubik-blue/30 scale-105"
                                            : "bg-white dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800 hover:border-rubik-blue/30 hover:text-rubik-blue"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center gap-2 mr-4 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                                <Award className="w-3.5 h-3.5 text-zinc-500" />
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {STATUS_FILTERS.map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setSelectedStatus(status)}
                                        className={`px-5 py-2 rounded-xl text-xs font-black transition-all duration-300 ${selectedStatus === status
                                            ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 shadow-lg shadow-black/10 scale-105"
                                            : "bg-white dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500"
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
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
                            isHighlighted={highlightedBadgeId === achievement.id}
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
