import { Link } from "react-router-dom"
import { Users, BookOpen, UserPlus, Trophy, ArrowRight } from "lucide-react"
import { cn } from "../lib/utils"
import ThreeBackground from "../components/ThreeBackground"
import LandingHero from "../components/LandingHero"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef } from "react"
import { LiquidGlassCard } from "../components/ui/liquid-glass"

export default function Home() {
    const stats = [
        { 
            label: "5K+ Peers", 
            icon: Users, 
            color: "text-rubik-blue", 
            glow: "rgba(59, 130, 246, 0.4)",
            desc: "Join our global student community. Share solves, learn new methods, and find rivals.", 
            sub: "ACTIVE COMMUNITY",
            link: "https://discord.gg/cubestation", 
            external: true 
        },
        { 
            label: "1M+ Algos", 
            icon: BookOpen, 
            color: "text-rubik-green", 
            glow: "rgba(34, 197, 94, 0.4)",
            desc: "The world's most comprehensive database. From OLL to ZBLL, we've got you covered.", 
            sub: "CURATED DATABASE",
            link: "/resources/algorithms/OLL" 
        },
        { 
            label: "Join Session", 
            icon: UserPlus, 
            color: "text-rubik-yellow", 
            glow: "rgba(234, 179, 8, 0.4)",
            desc: "Attend live tutoring sessions. Get real-time feedback from the world's best student coaches.", 
            sub: "LIVE COACHING",
            link: "/schedule" 
        },
        { 
            label: "Track PBs", 
            icon: Trophy, 
            color: "text-rubik-red", 
            glow: "rgba(239, 68, 68, 0.4)",
            desc: "Analyze every turn with performance metrics. Watch your progress unfold over time.", 
            sub: "ADVANCED STATS",
            link: "/dashboard" 
        },
    ]

    return (
        <div className="flex flex-col relative min-h-screen">
            <ThreeBackground />
            
            <LandingHero />

            {/* Stats Interaction Grid */}
            <section className="py-20 relative overflow-hidden pointer-events-none">
                <div className="container mx-auto px-4 max-w-6xl relative z-10 pointer-events-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            stat.external ? (
                                <a key={i} href={stat.link} target="_blank" rel="noopener noreferrer" className="block h-full group outline-none">
                                    <FeatureCard stat={stat} index={i} />
                                </a>
                            ) : (
                                <Link key={i} to={stat.link} className="block h-full group outline-none">
                                    <FeatureCard stat={stat} index={i} />
                                </Link>
                            )
                        ))}
                    </div>
                </div>
                
                {/* Decorative background glow for the section */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-rubik-blue/5 blur-[120px] pointer-events-none -z-10" />
            </section>
        </div>
    )
}



function FeatureCard({ stat, index }) {
    const { icon: Icon } = stat;
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const mouseXSpring = useSpring(x, springConfig);
    const mouseYSpring = useSpring(y, springConfig);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
    
    // Icon Parallax
    const iconX = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
    const iconY = useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                }}
                className="relative h-full w-full group transition-all duration-300 pointer-events-auto"
            >
                <LiquidGlassCard
                    draggable={false}
                    borderRadius="48px"
                    className="h-full w-full p-8 flex flex-col items-center justify-between border border-white/10 dark:border-white/5 shadow-2xl"
                >
                    {/* Icon Container with individual glass effect */}
                    <motion.div 
                        style={{ 
                            x: iconX, 
                            y: iconY, 
                            translateZ: "60px",
                            '--glow-color': stat.glow 
                        }}
                        className="relative z-10"
                    >
                        <LiquidGlassCard 
                            draggable={false}
                            borderRadius="2rem"
                            className="p-6 border border-white/20 shadow-inner group-hover:shadow-[0_0_30px_-5px] group-hover:shadow-[var(--glow-color)] transition-all duration-500"
                        >
                            <Icon className={cn("w-10 h-10 drop-shadow-xl transition-transform duration-500 group-hover:scale-110", stat.color)} />
                        </LiquidGlassCard>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div 
                        style={{ translateZ: "40px" }}
                        className="relative z-10 text-center space-y-4 mt-8 flex-1 flex flex-col justify-center"
                    >
                        <div className="space-y-1">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 opacity-60 group-hover:opacity-100 transition-all group-hover:tracking-[0.5em] duration-500">
                                {stat.sub}
                            </h3>
                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight drop-shadow-sm">
                                {stat.label}
                            </h2>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-[200px] mx-auto transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
                            {stat.desc}
                        </p>
                    </motion.div>

                    {/* CTA indicator */}
                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 relative z-10">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-white/60">
                            Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </LiquidGlassCard>
            </motion.div>
        </motion.div>
    );
}

