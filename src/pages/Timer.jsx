
import { useState, useEffect, useRef, useCallback } from "react"
import { useSolves } from "../contexts/SolveContext"
import Confetti from "react-confetti"
import { Play, RotateCcw, Trash2, Check, AlertCircle, Trophy, Save, History, Settings, Mic, MicOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { cn } from "../lib/utils"
import StackmatDisplay from "../components/StackmatDisplay"

// --- Helper Functions for Cube Logic ---

// WCA-like 3x3 Scramble Generator
const generateScramble = () => {
    const moves = ["R", "L", "U", "D", "F", "B"]
    const modifiers = ["", "'", "2"]
    const length = 20
    let scramble = []
    let lastMove = ""
    let secondLastMove = ""

    while (scramble.length < length) {
        const move = moves[Math.floor(Math.random() * moves.length)]
        if (move !== lastMove && move !== secondLastMove) { // Basic avoidance of simple redundancy
            // More advanced check needed for R L R' but this is sufficient for basic
            secondLastMove = lastMove
            lastMove = move
            scramble.push(move + modifiers[Math.floor(Math.random() * modifiers.length)])
        }
    }
    return scramble.join(" ")
}

// Format time (ms -> 00.00)
const formatTime = (ms) => {
    if (ms === 0) return "0.00"
    const seconds = Math.floor(ms / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${seconds}.${centiseconds.toString().padStart(2, "0")}`
}

export default function Timer() {
    // --- Context ---
    const {
        solves,
        addSolve,
        updatePenalty,
        deleteSolve,
        getBestSingle,
        getAo5,
        formatTime
    } = useSolves()

    // --- State ---
    const [scramble, setScramble] = useState(generateScramble())
    const [time, setTime] = useState(0)
    const [timerState, setTimerState] = useState("idle") // idle, inspection, holding, ready, running, finished
    const [inspectionTime, setInspectionTime] = useState(15000) // 15s in ms
    const [penalty, setPenalty] = useState(0) // 0, 2000 (+2), or Infinity (DNF)

    // Hardware Timer Hook
    const stackmat = StackmatDisplay.useStackmat();

    // Note: isNewPB logic assumes context handles it or we calculate locally.
    // For simplicity, we'll calculate locally based on solves from context + new time.
    const [isNewPB, setIsNewPB] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

    // Refs for intervals and timing
    const timerRef = useRef(null)
    const startTimeRef = useRef(0)
    const pressTimeRef = useRef(0)
    // No need for inspectionIntervalRef if using useEffect, but let's keep consistency with previous refactor

    // Audio Context (Mocked for simplicity, would use Audio API in full prod)
    const playBeep = (freq = 440) => {
        // Placeholder for audio warnings
        // const ctx = new (window.AudioContext || window.webkitAudioContext)()
        // ... oscillator implementation
    }

    // --- Effects ---

    // Resize listener for Confetti
    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Keyboard Handling
    const handleKeyDown = useCallback((e) => {
        if (e.code === "Space") {
            e.preventDefault() // Prevent scrolling

            if (timerState === "idle" || timerState === "finished") {
                // START INSPECTION
                setTimerState("inspection")
                setInspectionTime(15000)
                setPenalty(0)
                setTime(0)
                setIsNewPB(false)
                if (timerState === "finished") setScramble(generateScramble())

            } else if (timerState === "inspection") {
                // PRESSING TO START
                setTimerState("holding")
                pressTimeRef.current = Date.now()
            } else if (timerState === "running") {
                // STOP TIMER
                const endTime = Date.now()
                const finalTime = endTime - startTimeRef.current

                setTimerState("finished")
                setTime(finalTime)

                // Save Solve via Context
                const newSolve = {
                    id: Date.now(),
                    time: finalTime,
                    scramble: scramble,
                    date: new Date().toISOString(),
                    penalty: 0
                }

                addSolve(newSolve)

                // Check PB (Local calculation for confetti)
                const currentBest = solves.length > 0
                    ? Math.min(...solves.filter(s => s.penalty !== Infinity).map(s => s.time + s.penalty))
                    : Infinity

                if (finalTime < currentBest) {
                    setIsNewPB(true)
                    setTimeout(() => setIsNewPB(false), 5000)
                }
            }
        }
    }, [timerState, scramble, isNewPB, solves, addSolve])

    const handleKeyUp = useCallback((e) => {
        if (e.code === "Space") {
            if (timerState === "holding") {
                // RELEASE TO START SOLVE
                // Calculate penalty from inspection logic if needed
                let currentPenalty = 0
                if (inspectionTime <= 0 && inspectionTime > -2000) currentPenalty = 2000
                else if (inspectionTime <= -2000) currentPenalty = Infinity

                setPenalty(currentPenalty)

                if (currentPenalty === Infinity) {
                    setTimerState("finished")
                    // In a more complex app, we'd save DNF here. For now, we only save on "stop" if running,
                    // but for instant DNF we should probably save it immediately.
                    // Let's keep it simple: Instant DNF transitions to finished, user must press space again to save/reset?
                    // Or auto-save DNF? Let's just state transition for now.
                } else {
                    setTimerState("running")
                    startTimeRef.current = Date.now()
                }
            }
        }
    }, [timerState, inspectionTime])

    // Main Timer Loop Effect
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

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [timerState])

    // Global Key Listeners
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    // --- Stackmat Auto-Save Logic ---
    const lastStackmatStatus = useRef(stackmat.status);
    useEffect(() => {
        if (stackmat.status === 'STOPPED' && lastStackmatStatus.current === 'RUNNING') {
            // Convert "0:00.00" string to ms
            const [min, rest] = stackmat.time.split(':');
            const [sec, hun] = rest.split('.');
            const totalMs = (parseInt(min) * 60000) + (parseInt(sec) * 1000) + (parseInt(hun) * 10);

            const newSolve = {
                id: Date.now(),
                time: totalMs,
                scramble: scramble,
                date: new Date().toISOString(),
                penalty: 0
            };

            addSolve(newSolve);
            setScramble(generateScramble()); // Get next scramble

            // Check PB for confetti
            const currentBest = solves.length > 0
                ? Math.min(...solves.filter(s => s.penalty !== Infinity).map(s => s.time + s.penalty))
                : Infinity;

            if (totalMs < currentBest) {
                setIsNewPB(true);
                setTimeout(() => setIsNewPB(false), 5000);
            }
        }
        lastStackmatStatus.current = stackmat.status;
    }, [stackmat.status, stackmat.time, scramble, addSolve, solves]);

    // --- UI Helpers ---
    const getTimerColor = () => {
        const activeStatus = stackmat.isActive ? stackmat.status : timerState;

        if (activeStatus === "RUNNING") return "text-white"
        if (activeStatus === "STOPPED" || timerState === "finished") return "text-white"
        if (activeStatus === "inspection") {
            if (inspectionTime <= 0) return "text-rubik-red"
            if (inspectionTime <= 8000) return "text-rubik-orange"
            return "text-rubik-yellow"
        }
        if (activeStatus === "holding") return "text-rubik-green"
        return "text-rubik-orange" // Idle color
    }

    const currentDisplayTime = () => {
        if (stackmat.isActive && (stackmat.status === 'RUNNING' || stackmat.status === 'STOPPED' || stackmat.status === 'IDLE')) {
            return stackmat.time;
        }

        if (timerState === "inspection") {
            const seconds = Math.ceil(inspectionTime / 1000)
            if (seconds <= -2) return "DNF"
            if (seconds <= 0) return "+2"
            return Math.abs(seconds)
        }
        return formatTime(time)
    }

    const currentTimerStatus = stackmat.isActive ? stackmat.status : timerState;

    return (
        <div className="container mx-auto p-4 max-w-6xl min-h-[calc(100vh-80px)]">
            {isNewPB && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}

            {/* Top Bar: Scramble & Hardware Toggle */}
            <div className="mb-6 space-y-4">
                <Card className="border-zinc-800 bg-zinc-950 border-t-4 border-t-rubik-blue shadow-none overflow-hidden relative">
                    <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-mono font-medium tracking-wide text-zinc-300 leading-relaxed">
                                {scramble}
                            </h2>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                                <p className="text-xs text-zinc-600 font-mono">
                                    {stackmat.isActive ? "Hardware Timer Direct" : "Manual Mode • Space to Start"}
                                </p>
                                <div className="h-3 w-px bg-zinc-800" />
                                <button
                                    onClick={stackmat.toggleStackmat}
                                    className={cn(
                                        "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors",
                                        stackmat.isActive ? "text-rubik-green" : "text-zinc-600 hover:text-zinc-300"
                                    )}
                                >
                                    <Mic className={cn("w-3.5 h-3.5", stackmat.isActive && "animate-pulse")} />
                                    Stackmat {stackmat.isActive ? "Connected" : "Off"}
                                </button>
                            </div>
                        </div>
                        <Button
                            onClick={() => setScramble(generateScramble())}
                            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800 shrink-0 border"
                            size="icon"
                        >
                            <RotateCcw className="w-5 h-5" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

                {/* Main Timer Area */}
                <div className="lg:col-span-2 space-y-6">
                    <Card
                        className="h-[400px] md:h-[500px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 bg-zinc-950 border-zinc-800 shadow-none border"
                        onClick={() => {
                            // Touch support placeholder
                            if (window.innerWidth < 768 && timerState === 'idle') handleKeyDown({ code: 'Space', preventDefault: () => { } })
                        }}
                    >
                        {/* Background Pulse for Inspection */}
                        {timerState === "inspection" && (
                            <div className={cn("absolute inset-0 opacity-10 animate-pulse",
                                inspectionTime > 8000 ? "bg-rubik-yellow" : "bg-rubik-red"
                            )} />
                        )}

                        <div className={cn("text-[15vw] md:text-[8rem] font-mono font-bold tabular-nums tracking-tighter transition-colors select-none z-10", getTimerColor())}>
                            {currentDisplayTime()}
                        </div>

                        {timerState === "idle" && (
                            <p className="absolute bottom-12 text-zinc-600 animate-pulse font-mono text-sm">
                                Press Spacebar to Start
                            </p>
                        )}

                        {timerState === "finished" && solves.length > 0 && (
                            <div className="flex items-center gap-2 mt-4 absolute bottom-8 z-20">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updatePenalty(solves[0].id, "OK")}
                                    className="border-rubik-green text-rubik-green hover:bg-rubik-green/10"
                                >
                                    OK
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updatePenalty(solves[0].id, "+2")}
                                    className={cn("border-rubik-yellow text-rubik-yellow hover:bg-rubik-yellow/10", solves[0]?.penalty === 2000 && "bg-rubik-yellow text-white hover:bg-rubik-yellow")}
                                >
                                    +2
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updatePenalty(solves[0].id, "DNF")}
                                    className={cn("border-rubik-red text-rubik-red hover:bg-rubik-red/10", solves[0]?.penalty === Infinity && "bg-rubik-red text-white hover:bg-rubik-red")}
                                >
                                    DNF
                                </Button>
                                <div className="w-px h-6 bg-zinc-800 mx-2" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-zinc-600 hover:text-rubik-red"
                                    onClick={() => deleteSolve(solves[0].id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    {/* Session Summary */}
                    <Card className="bg-zinc-950 border-zinc-800 shadow-none">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm uppercase tracking-widest text-zinc-600 font-bold">Session Stats</CardTitle>
                                <Badge variant="outline" className="font-mono bg-zinc-900 border-zinc-800 text-zinc-400">{solves.length} Solves</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                <div className="text-xs text-zinc-600 font-medium mb-1">Best Single</div>
                                <div className="text-2xl font-mono font-bold text-rubik-green">{getBestSingle()}</div>
                            </div>
                            <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                <div className="text-xs text-zinc-600 font-medium mb-1">Current Ao5</div>
                                <div className="text-2xl font-mono font-bold text-rubik-blue">{getAo5()}</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Solve History */}
                    <Card className="bg-zinc-950 border-zinc-800 shadow-none flex-1 min-h-[300px]">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm uppercase tracking-widest text-zinc-600 font-bold">History</CardTitle>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><Settings className="w-4 h-4 text-zinc-600 hover:text-zinc-400" /></Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-zinc-600 bg-zinc-900/50 sticky top-0 uppercase">
                                        <tr>
                                            <th className="px-4 py-3 font-medium">#</th>
                                            <th className="px-4 py-3 font-medium">Time</th>
                                            <th className="px-4 py-3 font-medium">Ao5</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-900">
                                        {solves.map((solve, i) => (
                                            <tr key={solve.id} className="hover:bg-zinc-900/40 transition-colors group">
                                                <td className="px-4 py-3 font-mono text-zinc-600 w-12">{solves.length - i}</td>
                                                <td className="px-4 py-3 font-mono font-medium text-zinc-300">
                                                    {solve.penalty === Infinity ? <span className="text-rubik-red">DNF</span> :
                                                        solve.penalty === 2000 ? <span className="text-rubik-yellow">{formatTime(solve.time + 2000)}+</span> :
                                                            formatTime(solve.time)}
                                                </td>
                                                <td className="px-4 py-3 font-mono text-zinc-600">
                                                    --
                                                </td>
                                            </tr>
                                        ))}
                                        {solves.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="px-4 py-8 text-center text-zinc-600 italic">
                                                    No solves yet. Start timer!
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
