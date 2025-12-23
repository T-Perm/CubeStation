export const RANKS = [
    { name: "Copper", minLevel: 1, color: "text-orange-400", bg: "bg-orange-400/20", glow: "rgba(251, 146, 60, 0.4)" },
    { name: "Bronze", minLevel: 10, color: "text-amber-600", bg: "bg-amber-600/20", glow: "rgba(217, 119, 6, 0.4)" },
    { name: "Silver", minLevel: 20, color: "text-slate-300", bg: "bg-slate-300/20", glow: "rgba(203, 213, 225, 0.4)" },
    { name: "Gold", minLevel: 30, color: "text-yellow-400", bg: "bg-yellow-400/20", glow: "rgba(250, 204, 21, 0.4)" },
    { name: "Platinum", minLevel: 40, color: "text-cyan-300", bg: "bg-cyan-300/20", glow: "rgba(103, 232, 249, 0.4)" },
    { name: "Emerald", minLevel: 50, color: "text-emerald-400", bg: "bg-emerald-400/20", glow: "rgba(52, 211, 153, 0.4)" },
    { name: "Diamond", minLevel: 60, color: "text-blue-400", bg: "bg-blue-400/20", glow: "rgba(96, 165, 250, 0.4)" },
    { name: "Ruby", minLevel: 70, color: "text-red-500", bg: "bg-red-500/20", glow: "rgba(239, 68, 68, 0.4)" },
    { name: "Amethyst", minLevel: 80, color: "text-purple-400", bg: "bg-purple-400/20", glow: "rgba(192, 132, 252, 0.4)" },
    { name: "Azurite", minLevel: 90, color: "text-blue-600", bg: "bg-blue-600/20", glow: "rgba(37, 99, 235, 0.4)" },
];

export const getRankForLevel = (level) => {
    return [...RANKS].reverse().find(rank => level >= rank.minLevel) || RANKS[0];
};

export const getXPForLevel = (level) => {
    // RPG style curve: level 1 is 100, increases by 15% each level
    return Math.floor(100 * Math.pow(1.15, level - 1));
};
