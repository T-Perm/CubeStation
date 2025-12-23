import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Trophy, Globe, MapPin, TrendingUp, History, Info } from "lucide-react"
import { cn } from "../lib/utils"
import { Badge } from "../components/ui/badge"
import { RANKS, getRankForLevel } from "../lib/ranks"
import ThreeBackground from "../components/ThreeBackground"

const MOCK_LEADERBOARD = [
    { id: 1, name: "Max Park", handle: "@maxpark", level: 95, xp: 4500, country: "US", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max" },
    { id: 2, name: "Yiheng Wang", handle: "@yiheng", level: 92, xp: 3200, country: "CN", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wang" },
    { id: 3, name: "TYu Nakajima", handle: "@tyub", level: 88, xp: 1200, country: "JP", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nak" },
    { id: 4, name: "Luke Garrett", handle: "@lukeg", level: 85, xp: 800, country: "US", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luke" },
    { id: 5, name: "Feliks Zemdegs", handle: "@faz", level: 84, xp: 2500, country: "AU", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Faz" },
    { id: 6, name: "Ruihang Xu", handle: "@ruihang", level: 82, xp: 1500, country: "CN", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Xu" },
    { id: 7, name: "Tommy Cherry", handle: "@tommy", level: 79, xp: 900, country: "US", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tommy" },
    { id: 8, name: "Matty Hiroto", handle: "@matty", level: 75, xp: 400, country: "US", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Matty" },
];

export default function Leaderboard() {
    const [mainTab, setMainTab] = useState("season") // "season" | "all-time"
    const [subTab, setSubTab] = useState("global") // "global" | "local"
    
    // In a real app, these would come from the user's data
    const myPosition = { rank: 42, level: 18, xp: 450, change: "+3" }

    const filteredData = MOCK_LEADERBOARD.filter(user => {
        if (subTab === "local") return user.country === "US"
        return true
    }).sort((a, b) => b.level - a.level)

    return (
        <div className="relative min-h-screen">
            <ThreeBackground />
            
            <div className="container mx-auto px-4 py-32 max-w-5xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-mono text-zinc-900 dark:text-white mb-2">Leaderboard</h1>
                        <p className="text-zinc-600 dark:text-zinc-400">Compete with cubers worldwide and climb the ranks.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {/* Main Toggle */}
                        <div className="flex p-1 bg-zinc-900/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-white/10 relative overflow-hidden">
                            <motion.div 
                                className="absolute inset-y-1 bg-white dark:bg-zinc-800 rounded-xl shadow-lg"
                                initial={false}
                                animate={{ x: mainTab === "season" ? 0 : "100%" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ width: "calc(50% - 4px)" }}
                            />
                            <button 
                                onClick={() => setMainTab("season")}
                                className={cn(
                                    "relative z-10 flex-1 px-6 py-2.5 text-sm font-bold transition-colors",
                                    mainTab === "season" ? "text-zinc-900 dark:text-white" : "text-zinc-500"
                                )}
                            >
                                Season
                            </button>
                            <button 
                                onClick={() => setMainTab("all-time")}
                                className={cn(
                                    "relative z-10 flex-1 px-6 py-2.5 text-sm font-bold transition-colors",
                                    mainTab === "all-time" ? "text-zinc-900 dark:text-white" : "text-zinc-500"
                                )}
                            >
                                All-Time
                            </button>
                        </div>

                        {/* Sub Toggle */}
                        <div className="flex p-1 bg-zinc-900/5 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-zinc-200 dark:border-white/10">
                            <button 
                                onClick={() => setSubTab("global")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                    subTab === "global" ? "bg-rubik-blue text-white shadow-lg shadow-rubik-blue/20" : "text-zinc-500"
                                )}
                            >
                                <Globe size={14} /> Global
                            </button>
                            <button 
                                onClick={() => setSubTab("local")}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-1.5 text-xs font-bold rounded-lg transition-all",
                                    subTab === "local" ? "bg-rubik-orange text-white shadow-lg shadow-rubik-orange/20" : "text-zinc-500"
                                )}
                            >
                                <MapPin size={14} /> United States
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Leaderboard Table */}
                    <div className="lg:col-span-8 space-y-4">
                        {/* Season Banner (only for season view) */}
                        {mainTab === "season" && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-purple-500/10 border border-purple-500/20 backdrop-blur-md rounded-2xl flex items-center justify-between gap-4 overflow-hidden relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-3 relative z-10 text-purple-600 dark:text-purple-400">
                                    <TrendingUp className="w-5 h-5" />
                                    <div>
                                        <div className="text-sm font-bold">January 2026 Season</div>
                                        <div className="text-xs opacity-75">Season ends in 5d 12h 34m</div>
                                    </div>
                                </div>
                                <button className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors relative z-10 dark:text-purple-200">
                                    View Rewards
                                </button>
                            </motion.div>
                        )}

                        {/* List Container */}
                        <div className="bg-white/5 dark:bg-black/20 backdrop-blur-[6px] rounded-[2.5rem] border border-zinc-200/50 dark:border-white/10 shadow-2xl overflow-hidden p-2">
                             <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 border-b border-zinc-200/50 dark:border-white/5">
                                        <tr>
                                            <th className="px-6 py-4 font-black">Rank</th>
                                            <th className="px-6 py-4 font-black">Cuber</th>
                                            <th className="px-6 py-4 font-black">Level</th>
                                            <th className="px-6 py-4 font-black text-right">XP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200/50 dark:divide-white/5">
                                        <AnimatePresence mode="popLayout">
                                            {filteredData.map((user, i) => {
                                                const rank = getRankForLevel(user.level);
                                                const isTop3 = i < 3;
                                                return (
                                                    <motion.tr 
                                                        key={user.handle}
                                                        layout
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: 10 }}
                                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                                        className="group cursor-pointer hover:bg-zinc-900/5 dark:hover:bg-white/5 transition-colors relative"
                                                    >
                                                        <td className="px-6 py-5 whitespace-nowrap">
                                                            <div className={cn(
                                                                "w-10 h-10 flex items-center justify-center font-mono font-bold text-lg rounded-full transition-all group-hover:scale-110",
                                                                isTop3 ? (
                                                                    i === 0 ? "bg-yellow-400/20 text-yellow-500 ring-2 ring-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]" :
                                                                    i === 1 ? "bg-slate-300/20 text-slate-400 ring-2 ring-slate-300/30" :
                                                                    "bg-amber-600/20 text-amber-700 ring-2 ring-amber-600/30"
                                                                ) : "text-zinc-400 dark:text-white/20"
                                                            )}>
                                                                {i + 1}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 whitespace-nowrap">
                                                            <div className="flex items-center gap-4">
                                                                <img src={user.avatar} className="w-10 h-10 rounded-full border border-zinc-200 dark:border-white/10" alt="" />
                                                                <div>
                                                                    <div className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                                                                        {user.name}
                                                                        <span className="text-xs opacity-50 grayscale group-hover:grayscale-0 transition-all">🇺🇸</span>
                                                                    </div>
                                                                    <div className="text-xs text-zinc-500 font-mono">{user.handle}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 whitespace-nowrap">
                                                            <div className="flex flex-col">
                                                                <span className={cn("text-xs font-black uppercase tracking-widest mb-1", rank.color)}>
                                                                    {rank.name}
                                                                </span>
                                                                <span className="font-mono font-bold text-zinc-900 dark:text-white">Lvl {user.level}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 whitespace-nowrap text-right">
                                                            <div className="font-mono font-bold text-zinc-900 dark:text-white">{user.xp.toLocaleString()} XP</div>
                                                            <div className="text-[10px] text-green-500 font-bold">+120 this week</div>
                                                        </td>
                                                    </motion.tr>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                             </div>
                        </div>
                    </div>

                    {/* Sidebar: Sticky Stats */}
                    <div className="lg:col-span-4 space-y-6 sticky top-24">
                        {/* Your Position Card */}
                        {(() => {
                            const myRank = getRankForLevel(myPosition.level);
                            return (
                                <div className="bg-white/10 dark:bg-white/5 backdrop-blur-[12px] rounded-[2.5rem] p-8 border border-white/20 dark:border-white/10 shadow-2xl relative overflow-hidden group">
                                    {/* Rank Color Liquid Glow */}
                                    <div className={cn("absolute -top-24 -right-24 w-64 h-64 blur-[80px] opacity-30 transition-all duration-1000 group-hover:opacity-50", myRank.bg)} />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                                    
                                    <div className="relative z-10">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-500 dark:text-zinc-400">Your Current Position</h3>
                                        
                                        <div className="flex items-end justify-between mb-8">
                                            <div className="flex flex-col">
                                                <div className="text-6xl font-black font-mono text-zinc-900 dark:text-white tracking-tighter">
                                                    #{myPosition.rank}
                                                </div>
                                                <div className="text-xs font-bold text-green-500 flex items-center gap-1 mt-1 transition-transform group-hover:translate-x-1">
                                                    <TrendingUp size={14} /> {myPosition.change} spots today
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className={cn("text-[10px] font-black uppercase tracking-widest mb-1", myRank.color)}>
                                                    {myRank.name}
                                                </span>
                                                <div className="text-2xl font-black font-mono text-zinc-900 dark:text-white leading-none">
                                                    Lvl {myPosition.level}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                                    <span>XP Progress</span>
                                                    <span>{myPosition.xp} / 1200</span>
                                                </div>
                                                <div className="h-2 w-full bg-zinc-200 dark:bg-white/5 rounded-full overflow-hidden border border-zinc-300/50 dark:border-transparent">
                                                    <motion.div 
                                                        className={cn("h-full shadow-[0_0_15px] transition-all", myRank.bg.replace('/20', ''), `shadow-${myRank.color.split('-')[1]}-500/20`)}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "40%" }}
                                                        transition={{ duration: 1.5, ease: "circOut" }}
                                                        style={{ backgroundColor: `var(--rank-glow, ${myRank.glow})` }}
                                                    />
                                                </div>
                                            </div>
                                            <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl dark:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                                Jump to my row
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Recent Archives */}
                        <div className="bg-white/5 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/10 p-6 rounded-[2rem]">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-zinc-500 dark:text-zinc-400">Past Seasons</h3>
                            <div className="space-y-3">
                                {[
                                    { name: "December 2025", rank: "Global #12", label: "Silver" },
                                    { name: "November 2025", rank: "Local #2", label: "Gold" },
                                    { name: "October 2025", rank: "Global #84", label: "Bronze" }
                                ].map((season, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-zinc-900/5 dark:bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                                                <History size={14} className="text-zinc-400" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-zinc-900 dark:text-white">{season.name}</div>
                                                <div className="text-[10px] text-zinc-500 font-mono">{season.label}</div>
                                            </div>
                                        </div>
                                        <div className="text-xs font-black font-mono text-rubik-blue">{season.rank}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
