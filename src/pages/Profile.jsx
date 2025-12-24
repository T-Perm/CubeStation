import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { Trophy, Clock, Target, Calendar, UserPlus, MessageSquare, ShieldCheck, History, ChevronRight, Activity, TrendingUp } from "lucide-react"
import { cn } from "../lib/utils"
import { RANKS, getRankForLevel } from "../lib/ranks"
import ThreeBackground from "../components/ThreeBackground"
import { Badge } from "../components/ui/badge"
import { ACHIEVEMENTS_DATA, ICON_MAP } from "../data/achievements"

const USER_DATA = {
    name: "Max Park",
    handle: "@maxpark",
    country: "US",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    allTime: { level: 95, xp: 4500, nextLevel: 5000 },
    season: { level: 18, xp: 450, nextLevel: 1200, name: "January 2026 Season", endDate: "5d 12:34" },
    pbs: [
        { event: "3x3", single: "3.13", ao5: "4.48", icon: "Cube" },
        { event: "4x4", single: "15.83", ao5: "19.38", icon: "Cube" },
        { event: "2x2", single: "0.49", ao5: "1.02", icon: "Cube" },
        { event: "OH", single: "6.20", ao5: "8.65", icon: "Cube" },
    ],
    // These IDs now match ACHIEVEMENTS_DATA
    achievements: ["first-timer", "daily-grinder", "sub-60-club", "sub-30-club"],
    records: {
        bestGlobal: "12th",
        bestLocal: "2nd",
        bestSeason: "September 2025",
        peakLevel: 98
    }
}

export default function Profile() {
    const navigate = useNavigate();
    const allTimeRank = getRankForLevel(USER_DATA.allTime.level);
    const seasonRank = getRankForLevel(USER_DATA.season.level);

    // Get actual achievement objects
    const unlockedBadges = USER_DATA.achievements
        .map(id => ACHIEVEMENTS_DATA.find(a => a.id === id))
        .filter(Boolean);

    return (
        <div className="relative min-h-screen">
            <ThreeBackground />

            <div className="container mx-auto px-4 py-32 max-w-6xl relative z-10">

                {/* Profile Header */}
                <div className="mb-12">
                    <div className="bg-white/5 dark:bg-black/20 backdrop-blur-[6px] rounded-[3rem] border border-zinc-200/50 dark:border-white/10 p-8 shadow-2xl relative overflow-hidden group">
                        {/* Background Shine */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            {/* Avatar Section */}
                            <div className="relative">
                                <div className={cn("absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse", allTimeRank.bg)} />
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-rubik-blue via-rubik-red to-rubik-yellow animate-spin-slow opacity-20" />
                                <img
                                    src={USER_DATA.avatar}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 dark:border-zinc-900/50 relative z-10 shadow-2xl"
                                    alt={USER_DATA.name}
                                />
                                <div className="absolute bottom-2 right-2 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-lg z-20 border border-zinc-200 dark:border-zinc-700">
                                    <span className="text-xl">🇺🇸</span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">{USER_DATA.name}</h1>
                                    <Badge variant="outline" className="bg-white/10 dark:bg-white/10 border-white/20 dark:border-white/10 text-zinc-500 dark:text-zinc-400 font-mono py-1 px-3">
                                        {USER_DATA.handle}
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                                    <RankBadge rank={allTimeRank} level={USER_DATA.allTime.level} label="All-Time" />
                                    <RankBadge rank={seasonRank} level={USER_DATA.season.level} label="Season" variant="purple" />
                                </div>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <button className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl">
                                        <UserPlus size={16} /> Add Friend
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white/10 dark:bg-white/5 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all active:scale-95">
                                        <MessageSquare size={16} /> Message
                                    </button>
                                </div>
                            </div>

                            {/* Engagement Stats */}
                            <div className="hidden lg:grid grid-cols-2 gap-4">
                                <MiniStat icon={Calendar} label="Member Since" value="July 2024" />
                                <MiniStat icon={Activity} label="Days Active" value="542" />
                                <MiniStat icon={TrendingUp} label="Total Solves" value="12,540" />
                                <MiniStat icon={History} label="Global Rank" value="#42" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: XP and Records */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* XP Progress Section */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                <Activity size={14} className="text-rubik-blue" /> Leveling & XP
                            </h3>

                            {/* All-Time XP Card */}
                            <XPCard
                                title="All-Time Experience"
                                current={USER_DATA.allTime.xp}
                                total={USER_DATA.allTime.nextLevel}
                                color="bg-rubik-blue"
                                glow="shadow-rubik-blue/20"
                                label={`Level ${USER_DATA.allTime.level}`}
                            />

                            {/* Season XP Card */}
                            <XPCard
                                title={USER_DATA.season.name}
                                current={USER_DATA.season.xp}
                                total={USER_DATA.season.nextLevel}
                                color="bg-purple-500"
                                glow="shadow-purple-500/20"
                                label={`Season Level ${USER_DATA.season.level}`}
                                subtitle={`Ends in ${USER_DATA.season.endDate}`}
                            />
                        </div>

                        {/* Peak Records Section */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                <Trophy size={14} className="text-rubik-yellow" /> Seasonal Records
                            </h3>
                            <div className="bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-[2.5rem] border border-zinc-200/50 dark:border-white/10 p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[50px] pointer-events-none" />

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Best Season Peak</div>
                                            <div className="text-xl font-bold text-zinc-900 dark:text-white">{USER_DATA.records.bestSeason}</div>
                                        </div>
                                        <div className="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center text-yellow-500">
                                            <Trophy size={20} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Global</div>
                                            <div className="text-2xl font-black text-rubik-blue font-mono">{USER_DATA.records.bestGlobal}</div>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Local (US)</div>
                                            <div className="text-2xl font-black text-rubik-orange font-mono">{USER_DATA.records.bestLocal}</div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex items-center justify-between text-xs group cursor-pointer hover:text-rubik-blue transition-colors">
                                            <span className="text-zinc-500 group-hover:text-rubik-blue ">View all past seasons</span>
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: PBs and Achievements */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* PBs Grid */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                <Clock size={14} className="text-rubik-green" /> Personal Bests
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {USER_DATA.pbs.map((pb, i) => (
                                    <motion.div
                                        key={pb.event}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-[2rem] border border-zinc-200/50 dark:border-white/10 p-6 shadow-xl group hover:-translate-y-1 transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-zinc-900/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-zinc-200 dark:border-white/10 group-hover:scale-110 transition-transform">
                                                    <div className="w-6 h-6 bg-rubik-blue/40 rounded-sm" />
                                                </div>
                                                <div className="text-xl font-bold text-zinc-900 dark:text-white">{pb.event}</div>
                                            </div>
                                            <button className="p-2 hover:bg-white/5 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                                                <Activity size={16} className="text-zinc-500" />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Single</div>
                                                <div className="text-2xl font-black font-mono text-zinc-900 dark:text-white">{pb.single}s</div>
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Average (Ao5)</div>
                                                <div className="text-2xl font-black font-mono text-zinc-900 dark:text-white">{pb.ao5}s</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements Row */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                                <ShieldCheck size={14} className="text-rubik-blue" /> Unlocked Badges
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {unlockedBadges.map((ach, i) => {
                                    const Icon = ICON_MAP[ach.icon];
                                    const rarityColors = {
                                        Common: "text-zinc-400",
                                        Rare: "text-blue-400",
                                        Epic: "text-purple-400",
                                        Legendary: "text-amber-400"
                                    };
                                    return (
                                        <div
                                            key={ach.id}
                                            className="flex flex-col items-center gap-2 group cursor-pointer"
                                            onClick={() => navigate(`/dashboard?badge=${ach.id}`)}
                                        >
                                            <div className="w-20 h-20 bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-[1.5rem] border border-zinc-200/50 dark:border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity", rarityColors[ach.rarity].replace('text', 'bg'))} />
                                                <Icon className={cn("w-8 h-8 relative z-10", rarityColors[ach.rarity])} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-center max-w-[80px] text-zinc-500 dark:text-zinc-400 opacity-60 group-hover:opacity-100 transition-opacity">
                                                {ach.title}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

function RankBadge({ rank, level, label, variant = "gold" }) {
    const isPurple = variant === "purple";
    return (
        <div className="flex items-center gap-3 bg-zinc-900/5 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10 px-4 py-2 rounded-2xl">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform hover:scale-110", rank.bg)}>
                <div className={cn("w-5 h-5 rounded-sm border-2 rotate-12", rank.color.replace('text', 'border'))} />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">{label}</span>
                <span className={cn("text-xs font-black uppercase tracking-widest", rank.color)}>{rank.name} {level}</span>
            </div>
        </div>
    )
}

function XPCard({ title, current, total, color, glow, label, subtitle }) {
    const progress = (current / total) * 100;
    return (
        <div className="bg-white/5 dark:bg-black/20 backdrop-blur-md rounded-[2rem] border border-zinc-200/50 dark:border-white/10 p-6 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{title}</h4>
                    <div className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">{label}</div>
                </div>
                {subtitle && <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">{subtitle}</div>}
            </div>
            <div className="space-y-2">
                <div className="h-2 w-full bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden border border-zinc-200 dark:border-transparent">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn("h-full", color, glow)}
                    />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <span>{current.toLocaleString()} XP</span>
                    <span>{total.toLocaleString()} XP</span>
                </div>
            </div>
        </div>
    )
}

function MiniStat({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-3 p-4 bg-white/5 dark:bg-white/5 backdrop-blur-md border border-zinc-100/10 dark:border-white/5 rounded-2xl group hover:bg-white/10 transition-colors">
            <div className="p-2 bg-zinc-100 dark:bg-white/10 rounded-xl group-hover:scale-110 transition-transform">
                <Icon size={16} className="text-zinc-600 dark:text-zinc-400" />
            </div>
            <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">{label}</div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white">{value}</div>
            </div>
        </div>
    )
}
