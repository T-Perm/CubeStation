import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import { Calendar as CalendarIcon, Clock, Plus, Video, Users, MapPin, Trophy } from "lucide-react"
import { format, isSameDay } from "date-fns"

export default function Schedule() {
    const [date, setDate] = useState(new Date())
    const navigate = useNavigate()

    // Enhanced events data with actual Date objects for proper filtering
    const events = [
        {
            id: 1,
            title: "Advanced F2L Tutoring",
            tutor: "Max Park (Student Coach)",
            date: new Date(2026, 0, 15, 16, 0),
            type: "Tutoring",
            color: "bg-rubik-blue",
            desc: "Master the art of First 2 Layers with personalized coaching."
        },
        {
            id: 2,
            title: "Open Practice & Competition",
            tutor: "CubeStation Auto",
            date: new Date(2026, 0, 17, 18, 0),
            type: "Comp",
            color: "bg-rubik-red",
            desc: "Weekly student-run competition. All levels welcome."
        },
        {
            id: 3,
            title: "Blindfolded Basics Seminar",
            tutor: "Jack Cai (Peer Lead)",
            date: new Date(2026, 0, 18, 14, 0),
            type: "Seminar",
            color: "bg-rubik-green",
            desc: "Join our peer-led seminar on the Old Pochmann method."
        },
        {
            id: 4,
            title: "Roux Blockbuilding Tutoring",
            tutor: "Kian Mansour (Advisor)",
            date: new Date(), // Today
            type: "Tutoring",
            color: "bg-rubik-orange",
            desc: "One-on-one session covering efficient blockbuilding."
        },
    ]

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => a.date - b.date)

    // Filter events for selected date (optional, or just show all if none selected, or highlight)
    // Let's list upcoming events, but highlight if one matches the selected day
    const selectedDateEvents = events.filter(evt => isSameDay(evt.date, date))

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-mono">Schedule</h1>
                    <p className="text-zinc-500">Live tutoring, student seminars, and competitions</p>
                </div>
                <Button className="bg-rubik-red hover:bg-rubik-red/90 text-white rounded-full px-6 shadow-lg shadow-rubik-red/20 transition-all hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    New Session
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Calendar & Filter */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm sticky top-24">
                        <CardContent className="p-4 flex flex-col items-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow-sm"
                            />
                            <div className="mt-4 w-full pt-4 border-t border-zinc-100">
                                <h3 className="font-bold text-sm text-zinc-500 uppercase tracking-wider mb-3">Selected Date</h3>
                                <div className="text-2xl font-mono font-bold text-zinc-900 mb-1">
                                    {date ? format(date, "MMMM d, yyyy") : "No date selected"}
                                </div>
                                <div className="text-sm text-zinc-500">
                                    {selectedDateEvents.length} events scheduled
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Events List */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Show selected date events first if any */}
                    {selectedDateEvents.length > 0 && (
                        <div className="mb-8 animate-fade-in-up">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Clock className="text-rubik-blue" />
                                On {format(date, "MMMM d")}
                            </h2>
                            <div className="space-y-4">
                                {selectedDateEvents.map((evt, i) => (
                                    <EventCard key={`sel-${i}`} evt={evt} featured onClick={() => navigate(`/seminar/${evt.id}`)} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-zinc-400">
                            Upcoming
                        </h2>
                        <div className="space-y-4">
                            {sortedEvents.filter(evt => !isSameDay(evt.date, date)).map((evt, i) => (
                                <EventCard key={i} evt={evt} onClick={() => navigate(`/seminar/${evt.id}`)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function EventCard({ evt, featured, onClick }) {
    return (
        <Card
            className={`group hover:border-zinc-300 transition-all cursor-pointer overflow-hidden ${featured ? 'border-rubik-blue/30 bg-rubik-blue/5' : ''}`}
            onClick={onClick}
        >
            <CardContent className="p-0 flex flex-col sm:flex-row">
                {/* Color Strip / Icon Box */}
                <div className={`sm:w-32 h-32 sm:h-auto ${evt.color} flex flex-col items-center justify-center text-white p-4 transition-transform group-hover:scale-105 duration-500 relative`}>
                    {evt.type === 'Tutoring' && (
                        <div className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </div>
                    )}
                    <div className="mb-2 bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        {evt.type === 'Tutoring' ? <Video size={24} /> : evt.type === 'Comp' ? <Trophy size={24} /> : <Users size={24} />}
                    </div>
                    <span className="font-mono font-bold text-lg">{format(evt.date, "HH:mm")}</span>
                    <span className="text-xs opacity-75">{format(evt.date, "MMM d")}</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h3 className="font-bold text-xl text-zinc-900 group-hover:text-rubik-blue transition-colors">{evt.title}</h3>
                            <div className="text-sm font-medium text-zinc-500 flex items-center gap-2 mt-1">
                                <span>{evt.tutor}</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                <Badge variant="secondary" className="text-xs h-5">{evt.type}</Badge>
                            </div>
                        </div>
                        <Button
                            variant={featured ? "default" : "outline"}
                            className={`z-10 ${featured ? "bg-rubik-blue hover:bg-rubik-blue/90" : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick();
                            }}
                        >
                            Join Room
                        </Button>
                    </div>
                    <p className="text-sm text-zinc-500 line-clamp-2">
                        {evt.desc}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
