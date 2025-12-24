import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Clock, Trophy, Target, Hash, Activity, TrendingUp, Calendar } from "lucide-react"
import { useSolves } from "../contexts/SolveContext"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { AchievementsSection } from "../components/dashboard/AchievementsSection"

export default function Dashboard() {
    const { solves, getBestSingle, getAo5, getAo12, getAo100, getSolvesThisWeek } = useSolves()

    const bestSingle = getBestSingle()
    const ao5 = getAo5()
    const ao12 = getAo12()
    const solvesWeek = getSolvesThisWeek()
    const totalSolves = solves.length

    // Prepare chart data (reverse for chronological order)
    // Show last 50 solves for the chart
    const chartData = [...solves].reverse().slice(-50).map((s, i) => ({
        index: i + 1,
        time: s.penalty === Infinity ? null : (s.time + s.penalty) / 1000,
        raw: s.time
    }))

    // Distribution data (simple histogram of seconds)
    const distribution = {}
    solves.forEach(s => {
        if (s.penalty === Infinity) return
        const val = Math.floor((s.time + s.penalty) / 1000)
        distribution[val] = (distribution[val] || 0) + 1
    })
    const distData = Object.keys(distribution).map(k => ({
        bin: `${k}s`,
        count: distribution[k]
    })).sort((a, b) => parseInt(a.bin) - parseInt(b.bin))


    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-mono">Dashboard</h1>
                    <p className="text-zinc-600">Track your progress and analyze your solves.</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="px-3 py-1 text-sm bg-white">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2 online-indicator"></span>
                        Active Session
                    </Badge>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Best Single" value={bestSingle} color="text-rubik-yellow" icon={Trophy} sub="Personal Best" />
                <StatCard title="Current Ao5" value={ao5} color="text-rubik-green" icon={Target} sub="Average of 5" />
                <StatCard title="Current Ao12" value={ao12} color="text-rubik-blue" icon={Target} sub="Average of 12" />
                <StatCard title="Solves (Week)" value={solvesWeek} color="text-rubik-orange" icon={Calendar} sub={`${totalSolves} Total Solves`} />
            </div>

            {/* Graphs Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Graph: Solve Trend */}
                <Card className="lg:col-span-2 border-zinc-200">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Recent Progress</span>
                            <Badge variant="secondary" className="text-xs">Last 50 Solves</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="index" hide />
                                    <YAxis domain={['auto', 'auto']} width={40} tick={{ fontSize: 12, fill: '#6B7280' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ display: 'none' }}
                                        formatter={(value) => [`${value}s`, 'Time']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="time"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
                                        activeDot={{ r: 6, fill: '#2563eb' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-zinc-400">
                                <Activity className="w-12 h-12 mb-2 opacity-20" />
                                <p>No solve data available</p>
                                <p className="text-xs">Start using the Timer to see your stats!</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Secondary Graphs / Info */}
                <div className="space-y-6">
                    {/* Time Distribution */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-widest text-zinc-600 font-bold">Time Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[200px]">
                            {distData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={distData}>
                                        <XAxis dataKey="bin" tick={{ fontSize: 10 }} />
                                        <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ fontSize: '12px' }} />
                                        <Bar dataKey="count" fill="#f97316" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-xs text-zinc-400">No data</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Solve Stats Grid */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-widest text-zinc-600 font-bold">Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-zinc-300">
                                <span className="text-sm text-zinc-600">Total Solves</span>
                                <span className="font-mono font-bold text-zinc-900">{totalSolves}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-zinc-300">
                                <span className="text-sm text-zinc-600">Ao100</span>
                                <span className="font-mono font-bold text-zinc-900">{getAo100()}</span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-zinc-300">
                                <span className="text-sm text-zinc-600">Best Ao5</span>
                                <span className="font-mono font-bold text-zinc-900">--</span> {/* Not tracked in context yet */}
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-zinc-600">Deviation</span>
                                <span className="font-mono font-bold text-zinc-900">--</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Achievements Section */}
            <AchievementsSection />
        </div>
    )
}

function StatCard({ title, value, color, icon: Icon, sub }) {
    return (
        <Card className="border-l-4 border-l-transparent hover:border-l-zinc-300 transition-all">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-zinc-600">{title}</span>
                    <Icon className={`w-4 h-4 ${color.replace('text-', 'stroke-')}`} />
                </div>
                <div className={`text-2xl font-mono font-bold ${color}`}>{value}</div>
                <div className="text-xs text-zinc-400 mt-1">{sub}</div>
            </CardContent>
        </Card>
    )
}
