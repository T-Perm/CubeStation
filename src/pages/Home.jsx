import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Users, BookOpen, UserPlus, Trophy, Clock } from "lucide-react"
import { cn } from "../lib/utils"

export default function Home() {
    const headline = "CubeStation: Student Learning Hub"
    const letters = headline.split("")

    const stats = [
        { label: "5K+ Peers", icon: Users, color: "bg-rubik-blue text-white", desc: "Active community" },
        { label: "1M+ Algos", icon: BookOpen, color: "bg-rubik-green text-white", desc: "Curated database" },
        { label: "Join Session", icon: UserPlus, color: "bg-rubik-yellow text-black", desc: "Live coaching" },
        { label: "Track PBs", icon: Trophy, color: "bg-rubik-red text-white", desc: "Advanced stats" },
    ]

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300">
                <div className="container mx-auto max-w-5xl text-center relative z-10">

                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rubik-green/10 border border-rubik-green/20 text-xs font-bold font-mono text-rubik-green dark:text-rubik-green animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-rubik-green animate-pulse" />
                        v2.0 Now Live
                    </div>

                    <h1 className="flex flex-col items-center justify-center gap-y-4 font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-8" aria-label={headline}>
                        {/* First Line: CubeStation */}
                        <div className="flex flex-wrap justify-center gap-x-2 text-5xl md:text-8xl">
                            {"CubeStation".split("").map((char, index) => (
                                <span
                                    key={`line1-${index}`}
                                    className={cn(
                                        "inline-block animate-enter-3d opacity-0 origin-bottom transition-colors duration-500",
                                        "text-zinc-900 dark:text-zinc-100"
                                    )}
                                    style={{
                                        animationDelay: `${index * 40}ms`,
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                        
                        {/* Second Line: Student Learning Hub */}
                        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-2xl md:text-4xl text-zinc-600 dark:text-zinc-300">
                            {"Student Learning Hub".split(" ").map((word, wordIndex) => (
                                <span key={wordIndex} className="whitespace-nowrap">
                                    {word.split("").map((char, charIndex) => (
                                        <span
                                            key={`line2-${wordIndex}-${charIndex}`}
                                            className={cn(
                                                "inline-block animate-enter-3d opacity-0 origin-bottom transition-colors duration-500",
                                            )}
                                            style={{
                                                animationDelay: `${(15 + wordIndex * 5 + charIndex) * 40}ms`,
                                            }}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            ))}
                        </div>
                    </h1>

                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium animate-fade-in-up opacity-0" style={{ animationDelay: '800ms' }}>
                        Built by students, for cubers — twist, learn, and compete with the best tools in the game.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '1000ms' }}>
                        <Link to="/timer">
                            <Button size="xl" className="bg-rubik-orange hover:bg-rubik-orange/90 text-white font-bold px-8 rounded-xl shadow-lg shadow-rubik-orange/20 hover:shadow-xl hover:-translate-y-1 transition-all">
                                <Clock className="w-5 h-5 mr-2" />
                                Start Timer
                            </Button>
                        </Link>
                        <Link to="/schedule">
                            <Button size="xl" variant="outline" className="px-8 rounded-xl font-bold bg-white dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 border-2 hover:-translate-y-1 transition-all">
                                Browse Sessions
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Background Gradients */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rubik-blue/5 dark:bg-rubik-blue/10 rounded-full blur-3xl -z-10" />
            </section>

            {/* Stats Grid */}
            <section className="py-12 bg-zinc-50 dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800 transition-colors">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:-translate-y-1">
                                <CardContent className="p-6 flex items-start justify-between">
                                    <div>
                                        <div className="font-mono font-bold text-3xl text-zinc-900 dark:text-zinc-100 mb-1">{stat.label.split(' ')[0]}</div>
                                        <div className="font-medium text-zinc-900 dark:text-zinc-200">{stat.label.split(' ').slice(1).join(' ')}</div>
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider font-bold">{stat.desc}</div>
                                    </div>
                                    <div className={cn("p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300", stat.color)}>
                                        <stat.icon className="w-5 h-5 md:w-6 h-6" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
