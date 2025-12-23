import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { CardContent } from "../components/ui/card"
import { Users, BookOpen, UserPlus, Trophy } from "lucide-react"
import { cn } from "../lib/utils"
import ThreeBackground from "../components/ThreeBackground"
import { LiquidGlassCard } from "../components/ui/liquid-glass"
import LandingHero from "../components/LandingHero"

export default function Home() {
    const stats = [
        { label: "5K+ Peers", icon: Users, color: "text-rubik-blue shadow-rubik-blue/20", glassBg: "bg-rubik-blue/10 dark:bg-rubik-blue/20", desc: "Active community", link: "https://discord.gg/cubestation", external: true },
        { label: "1M+ Algos", icon: BookOpen, color: "text-rubik-green shadow-rubik-green/20", glassBg: "bg-rubik-green/10 dark:bg-rubik-green/20", desc: "Curated database", link: "/resources/algorithms/OLL" },
        { label: "Join Session", icon: UserPlus, color: "text-rubik-yellow shadow-rubik-yellow/20", glassBg: "bg-rubik-yellow/10 dark:bg-rubik-yellow/20", desc: "Live coaching", link: "/schedule" },
        { label: "Track PBs", icon: Trophy, color: "text-rubik-red shadow-rubik-red/20", glassBg: "bg-rubik-red/10 dark:bg-rubik-red/20", desc: "Advanced stats", link: "/dashboard" },
    ]

    return (
        <div className="flex flex-col relative min-h-screen">
            <ThreeBackground />
            
            <LandingHero />

            {/* Stats Interaction Grid */}
            <section className="py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => {
                            const Wrapper = stat.external ? 'a' : Link;
                            const wrapperProps = stat.external ? { href: stat.link, target: "_blank", rel: "noopener noreferrer" } : { to: stat.link };

                            return (
                                <Wrapper
                                    key={i}
                                    {...wrapperProps}
                                    className="block group h-full focus:outline-none focus:ring-2 focus:ring-rubik-blue/40 rounded-[2rem]"
                                >
                                    <LiquidGlassCard
                                        draggable={false}
                                        shadowIntensity="sm"
                                        glowIntensity={i === 0 ? "xs" : "none"} // Subtle glow for primary action
                                        blurIntensity="xl"
                                        borderRadius="32px"
                                        className={cn(
                                            "h-full transition-all duration-500 border border-white/10 dark:border-white/5",
                                            "bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-900/60",
                                            "hover:-translate-y-2 hover:shadow-2xl active:scale-[0.98]"
                                        )}
                                    >
                                        <CardContent className="p-8 flex flex-col items-center text-center h-full gap-4">
                                            <div className="relative mb-2">
                                                <div className={cn(
                                                    "absolute inset-0 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity",
                                                    stat.glassBg
                                                )} />
                                                <LiquidGlassCard
                                                    draggable={false}
                                                    blurIntensity="md"
                                                    borderRadius="20px"
                                                    shadowIntensity="sm"
                                                    className={cn(
                                                        "p-4 transition-all duration-500 ring-1 ring-inset ring-white/20",
                                                        "bg-white/20 dark:bg-white/5 group-hover:rotate-6",
                                                        stat.glassBg
                                                    )}
                                                >
                                                    <stat.icon className={cn("w-7 h-7", stat.color)} />
                                                </LiquidGlassCard>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-white">{stat.label}</div>
                                                <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {stat.desc}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </LiquidGlassCard>
                                </Wrapper>
                            )
                        })}
                    </div>
                </div>
                
                {/* Decorative background glow for the section */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-rubik-blue/5 blur-[120px] pointer-events-none -z-10" />
            </section>
        </div>
    )
}
