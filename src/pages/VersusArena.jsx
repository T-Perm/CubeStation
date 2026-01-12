import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useNavigate, useLocation } from "react-router-dom"
import { Swords, Trophy, Zap, Ghost, Timer as TimerIcon, ArrowLeft, RotateCcw, ShieldCheck, Flame } from "lucide-react"
import Confetti from "react-confetti"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import ThreeBackground from "../components/ThreeBackground"

// Format time (ms -> 00.00)
const formatTime = (ms) => {
    if (ms === 0) return "0.00"
    const seconds = Math.floor(ms / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`
}

const generateScramble = () => {
    const moves = ["R", "L", "U", "D", "F", "B"]
    const modifiers = ["", "'", "2"]
    const length = 20
    let scramble = []
    let lastMove = ""
    let secondLastMove = ""

    while (scramble.length < length) {
        const move = moves[Math.floor(Math.random() * moves.length)]
        if (move !== lastMove && move !== secondLastMove) {
            secondLastMove = lastMove
            lastMove = move
            scramble.push(move + modifiers[Math.floor(Math.random() * modifiers.length)])
        }
    }
    return scramble.join(" ")
}

export default function VersusArena() {
    const navigate = useNavigate()
    const location = useLocation()
    const opponentData = location.state?.opponent

    const [time, setTime] = useState(0)
    const [timerState, setTimerState] = useState("idle") // idle, inspection, holding, ready, running, finished
    const [inspectionTime, setInspectionTime] = useState(15000)
    const [opponentTime] = useState(15870) // 15.87 seconds in ms
    const [opponentStatus, setOpponentStatus] = useState("preparing") // preparing, solving, finished
    const [scramble, setScramble] = useState(generateScramble())
    const [penalty, setPenalty] = useState(0) // 0, 2000, Infinity
    const [result, setResult] = useState(null) // null, 'win', 'loss'
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    const opponentName = opponentData?.name || "FAZ_2026"
    const opponentAvatar = opponentData?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Feliks"
    const opponentElo = opponentData ? opponentData.level * 15 : 1482

    const startTimeRef = useRef(0)
    const pressTimeRef = useRef(0)

    // Resize listener for Confetti
    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Simulate opponent behavior
    useEffect(() => {
        if (timerState === "running" && opponentStatus === "preparing") {
            setOpponentStatus("solving")
            // Opponent finishes at exactly 15.87s
            setTimeout(() => {
                setOpponentStatus("finished")
            }, 15870)
        }
    }, [timerState, opponentStatus])

    const handleKeyDown = useCallback((e) => {
        if (e.code === "Space") {
            e.preventDefault()
            if (timerState === "idle" || timerState === "finished") {
                setTimerState("inspection")
                setInspectionTime(15000)
                setTime(0)
                setPenalty(0)
                setResult(null)
                if (timerState === "finished") setScramble(generateScramble())
            } else if (timerState === "inspection") {
                setTimerState("holding")
                pressTimeRef.current = Date.now()
            } else if (timerState === "running") {
                const finalTime = Date.now() - startTimeRef.current
                setTimerState("finished")
                setTime(finalTime)

                // Determine winner
                if (finalTime < opponentTime) {
                    setResult("win")
                } else {
                    setResult("loss")
                }
            }
        }
    }, [timerState, opponentTime])

    const handleKeyUp = useCallback((e) => {
        if (e.code === "Space") {
            if (timerState === "ready") {
                // Determine penalty from inspection
                let startPenalty = 0
                if (inspectionTime <= 0 && inspectionTime > -2000) startPenalty = 2000
                else if (inspectionTime <= -2000) startPenalty = Infinity

                if (startPenalty === Infinity) {
                    setTimerState("finished")
                    setPenalty(Infinity)
                    setResult("loss")
                } else {
                    setTimerState("running")
                    setPenalty(startPenalty)
                    startTimeRef.current = Date.now()
                }
            } else if (timerState === "holding") {
                setTimerState("inspection")
            }
        }
    }, [timerState, inspectionTime])

    useEffect(() => {
        let intervalId;
        if (timerState === "running") {
            intervalId = setInterval(() => {
                setTime(Date.now() - startTimeRef.current)
            }, 10)
        } else if (timerState === "inspection") {
            intervalId = setInterval(() => {
                setInspectionTime(prev => prev - 100)
            }, 100)
        }
        return () => clearInterval(intervalId)
    }, [timerState])

    useEffect(() => {
        let timeout;
        if (timerState === "holding") {
            timeout = setTimeout(() => {
                setTimerState("ready")
            }, 500)
        }
        return () => clearTimeout(timeout)
    }, [timerState])

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return (
        <div className="relative min-h-screen pt-24 pb-12 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            <ThreeBackground />

            {result === "win" && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={500} />}

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                {/* Arena Header */}
                <div className="flex items-center justify-between mb-12">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/leaderboard')}
                        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-2 font-bold"
                    >
                        <ArrowLeft size={18} /> Exit Arena
                    </Button>
                    <div className="flex items-center gap-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl px-6 py-2 rounded-2xl border border-zinc-200 dark:border-white/10">
                        <ShieldCheck className="text-rubik-blue" size={20} />
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Ranked Matchmaking</span>
                    </div>
                </div>

                {/* Scramble Display */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em] mb-4">Official Battle Scramble</div>
                    <div className="text-2xl md:text-3xl font-mono font-bold text-zinc-900 dark:text-white leading-relaxed max-w-4xl mx-auto px-4">
                        {scramble}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: You */}
                    <div className="lg:col-span-4 flex flex-col items-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-rubik-blue/20 blur-[40px] rounded-full" />
                            <img src="https://github.com/shadcn.png" className="w-32 h-32 rounded-full border-4 border-rubik-blue relative z-10" alt="You" />
                            <div className="absolute -bottom-2 -right-2 bg-rubik-blue text-white p-2 rounded-xl shadow-lg z-20">
                                <Zap size={16} fill="white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-1">YOU</h2>
                        <div className="text-zinc-500 font-mono font-bold text-sm">1,450 ELO</div>

                        <div className="mt-12 w-full p-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-zinc-200 dark:border-white/10">
                            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4">Stats This Match</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Current Time</span>
                                    <span className="font-mono font-bold text-lg text-zinc-900 dark:text-white">{formatTime(time)}</span>
                                </div>
                                <div className="h-px bg-zinc-200 dark:bg-white/5" />
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-zinc-500">Winning Chance</span>
                                    <span className="font-mono text-rubik-green">84%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Middle: Timer & Battle Info */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center">
                        <div className="relative w-full aspect-square flex flex-col items-center justify-center">
                            {/* Battle Visual Container */}
                            <div className="absolute inset-x-0 top-0 flex justify-center py-4">
                                <span className="bg-rubik-red px-4 py-1 rounded-full text-[10px] font-black text-white tracking-[0.3em] shadow-lg animate-pulse">BATTLE LIVE</span>
                            </div>

                            <Card className={cn(
                                "w-full aspect-square flex flex-col items-center justify-center rounded-[3rem] border-0 shadow-2xl transition-all duration-300 relative overflow-hidden",
                                timerState === "holding" && "bg-rubik-red scale-[1.02]",
                                timerState === "ready" && "bg-rubik-green scale-[1.05]",
                                (timerState === "idle" || timerState === "finished" || timerState === "running" || timerState === "inspection") && "bg-white dark:bg-zinc-900"
                            )}>
                                {timerState === "inspection" && (
                                    <div className={cn("absolute inset-0 opacity-10 animate-pulse",
                                        inspectionTime > 8000 ? "bg-rubik-yellow" : "bg-rubik-red"
                                    )} />
                                )}

                                <div className={cn(
                                    "text-7xl font-mono font-black tabular-nums transition-colors z-10",
                                    (timerState === "holding" || timerState === "ready") ? "text-white" : "text-zinc-900 dark:text-white",
                                    timerState === "inspection" && (inspectionTime <= 8000 ? "text-rubik-orange" : "text-rubik-yellow")
                                )}>
                                    {timerState === "inspection" ? Math.ceil(inspectionTime / 1000) :
                                        penalty === Infinity ? "DNF" :
                                            formatTime(time + penalty) + (penalty === 2000 ? "+" : "")}
                                </div>

                                {timerState === "idle" && (
                                    <p className="absolute bottom-12 text-zinc-400 animate-pulse font-mono text-xs font-bold uppercase tracking-widest">Hold Spacebar</p>
                                )}
                            </Card>

                            {/* Goal Time Visual */}
                            <div className="mt-8 text-center">
                                <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-2">TARGET TO BEAT</div>
                                <div className="text-4xl font-black text-rubik-red font-mono italic">15.87</div>
                            </div>
                        </div>

                        {/* Result Overlay */}
                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
                                >
                                    <div className="p-12 bg-zinc-900/90 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] text-center pointer-events-auto">
                                        {result === 'win' ? (
                                            <>
                                                <div className="w-24 h-24 bg-rubik-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <Trophy className="text-rubik-green w-12 h-12" />
                                                </div>
                                                <h2 className="text-5xl font-black text-white italic mb-2">VICTORY</h2>
                                                <p className="text-zinc-400 font-bold mb-8">You beat {opponentName} by {formatTime(opponentTime - time)}s</p>
                                                <div className="text-rubik-green font-black text-2xl mb-8">+25 ELO</div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-24 h-24 bg-rubik-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <Flame className="text-rubik-red w-12 h-12" />
                                                </div>
                                                <h2 className="text-5xl font-black text-white italic mb-2">DEFEAT</h2>
                                                <p className="text-zinc-400 font-bold mb-8">{penalty === Infinity ? "You DNFs the match" : `${opponentName} was faster by ${formatTime(Math.abs((time + penalty) - opponentTime))}s`}</p>
                                                <div className="text-rubik-red font-black text-2xl mb-8">-12 ELO</div>
                                            </>
                                        )}

                                        <div className="flex items-center justify-center gap-3 mb-8">
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const newPenalty = 0;
                                                    setPenalty(newPenalty);
                                                    setResult((time + newPenalty) < opponentTime ? "win" : "loss");
                                                }}
                                                className={cn("rounded-xl font-bold px-6", penalty === 0 && "bg-white text-zinc-900")}
                                            >
                                                OK
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    const newPenalty = 2000;
                                                    setPenalty(newPenalty);
                                                    setResult((time + newPenalty) < opponentTime ? "win" : "loss");
                                                }}
                                                className={cn("rounded-xl font-bold px-6 border-rubik-yellow text-rubik-yellow hover:bg-rubik-yellow/10", penalty === 2000 && "bg-rubik-yellow text-white")}
                                            >
                                                +2
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setPenalty(Infinity);
                                                    setResult("loss");
                                                }}
                                                className={cn("rounded-xl font-bold px-6 border-rubik-red text-rubik-red hover:bg-rubik-red/10", penalty === Infinity && "bg-rubik-red text-white")}
                                            >
                                                DNF
                                            </Button>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button size="xl" onClick={() => setTimerState('idle')} className="rounded-2xl bg-white text-zinc-900 font-black h-16 px-8">REMATCH</Button>
                                            <Button size="xl" variant="outline" onClick={() => navigate('/leaderboard')} className="rounded-2xl border-2 font-black h-16 px-8">EXIT</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Opponent */}
                    <div className="lg:col-span-4 flex flex-col items-center">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-rubik-red/20 blur-[40px] rounded-full" />
                            <img src={opponentAvatar} className="w-32 h-32 rounded-full border-4 border-rubik-red relative z-10" alt={opponentName} />
                        </div>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase mb-1">{opponentName}</h2>
                        <div className="text-zinc-500 font-mono font-bold text-sm">{opponentElo.toLocaleString()} ELO</div>

                        <div className="mt-12 w-full p-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-3xl border border-zinc-200 dark:border-white/10">
                            <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] mb-4">Opponent Status</h3>
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-zinc-500">Solve Progress</span>
                                        <span className={cn(
                                            opponentStatus === "finished" ? "text-rubik-green" : "text-rubik-blue"
                                        )}>
                                            {opponentStatus === "preparing" ? "INSPECTION" : opponentStatus === "solving" ? "SOLVING..." : "FINISHED"}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-200 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{
                                                width: opponentStatus === "preparing" ? "15%" : opponentStatus === "solving" ? "75%" : "100%"
                                            }}
                                            className={cn(
                                                "h-full transition-all duration-[15s] ease-linear",
                                                opponentStatus === "finished" ? "bg-rubik-green" : "bg-rubik-blue"
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">Final Time</span>
                                    <span className="font-mono font-bold text-lg text-rubik-red transition-all">
                                        {opponentStatus === "finished" ? "15.87" : "--.--"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
