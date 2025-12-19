import { useState, useEffect, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Users, Settings, Share2, Hand } from "lucide-react"
import { Badge } from "../components/ui/badge"

export default function Seminar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [micOn, setMicOn] = useState(false)
    const [cameraOn, setCameraOn] = useState(true)
    const [messages, setMessages] = useState([
        { user: "System", text: "Welcome to the seminar room!" },
        { user: "Max Park", text: "Hey everyone! We'll start in 2 minutes." }
    ])
    const [input, setInput] = useState("")
    const videoRef = useRef(null)
    const mainVideoRef = useRef(null)

    // Mock event data lookup
    const getEventTitle = (id) => {
        const titles = {
            "1": "Advanced F2L Workshop",
            "2": "Weekly Competition",
            "3": "Blindfolded Basics",
            "4": "Roux Method Seminar"
        }
        return titles[id] || "Live Seminar"
    }

    const title = getEventTitle(id)

    // Webcam Access Logic
    useEffect(() => {
        let stream = null;

        const startCamera = async () => {
            if (cameraOn) {
                try {
                    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                    if (videoRef.current) videoRef.current.srcObject = stream;
                    if (mainVideoRef.current) mainVideoRef.current.srcObject = stream;
                } catch (err) {
                    console.error("Error accessing webcam:", err);
                }
            } else {
                if (videoRef.current) videoRef.current.srcObject = null;
                if (mainVideoRef.current) mainVideoRef.current.srcObject = null;
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraOn]);

    const sendMessage = (e) => {
        e.preventDefault()
        if (!input.trim()) return
        setMessages([...messages, { user: "You", text: input }])
        setInput("")
    }

    return (
        <div className="h-[calc(100vh-64px)] bg-zinc-950 text-white flex flex-col md:flex-row overflow-hidden">
            {/* Main Video Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Header Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-10 flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold">{title}</h1>
                        <div className="flex items-center gap-2 text-sm text-zinc-300">
                            <Badge variant="destructive" className="animate-pulse">REC</Badge>
                            <span>00:14:23</span>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md rounded-lg p-2">
                        <div className="grid grid-cols-2 gap-2 w-32 md:w-48 aspect-video bg-zinc-800 rounded mb-1 overflow-hidden relative">
                            {cameraOn ?
                                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                                : <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-xs">Camera Off</div>
                            }
                            <div className="absolute bottom-1 right-1 text-[10px] bg-black/60 px-1 rounded">You</div>
                        </div>
                    </div>
                </div>

                {/* Main Content (Shared Screen / Speaker - Now Replaced with UserCam per request) */}
                <div className="flex-1 bg-zinc-900 flex items-center justify-center p-4">
                    <div className="w-full max-w-5xl aspect-video bg-zinc-800 rounded-xl overflow-hidden shadow-2xl relative group">
                        {/* Using the webcam stream as the "background" replacement as requested */}
                        {cameraOn ?
                            <video ref={mainVideoRef} autoPlay muted playsInline className="w-full h-full object-cover opacity-80" />
                            : <img
                                src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=1600"
                                alt="Presentation"
                                className="w-full h-full object-cover opacity-80"
                            />
                        }

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/50 backdrop-blur-sm p-6 rounded-2xl text-center">
                                <div className="w-20 h-20 bg-rubik-blue rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                                    {title.charAt(0)}
                                </div>
                                <h2 className="text-2xl font-bold">{title} is live</h2>
                                <p className="text-zinc-300">Speaker is sharing their screen</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Controls Bar */}
                <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center gap-4 px-4">
                    <Button
                        variant={micOn ? "secondary" : "destructive"}
                        size="icon"
                        className="rounded-full h-12 w-12"
                        onClick={() => setMicOn(!micOn)}
                    >
                        {micOn ? <Mic /> : <MicOff />}
                    </Button>
                    <Button
                        variant={cameraOn ? "secondary" : "destructive"}
                        size="icon"
                        className="rounded-full h-12 w-12"
                        onClick={() => setCameraOn(!cameraOn)}
                    >
                        {cameraOn ? <Video /> : <VideoOff />}
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 hidden md:flex">
                        <Share2 />
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 hidden md:flex">
                        <Hand />
                    </Button>
                    <Button
                        className="rounded-full h-12 px-8 bg-red-600 hover:bg-red-700 text-white ml-4"
                        onClick={() => navigate('/schedule')}
                    >
                        <PhoneOff className="mr-2 h-5 w-5" /> Leave
                    </Button>
                </div>
            </div>

            {/* Right Sidebar (Chat) */}
            <div className="w-full md:w-80 bg-zinc-950 border-l border-zinc-800 flex flex-col h-[40vh] md:h-full">
                <div className="h-14 border-b border-zinc-800 flex items-center px-4 font-bold">
                    <MessageSquare className="w-4 h-4 mr-2" /> In-Call Messages
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className="text-sm">
                            <div className="font-bold text-zinc-400 text-xs mb-1">{msg.user}</div>
                            <div className="bg-zinc-800 p-2 rounded-lg inline-block text-zinc-200">
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                    <form onSubmit={sendMessage} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Send a message..."
                            className="bg-zinc-800 border-zinc-700 text-white focus-visible:ring-rubik-blue"
                        />
                        <Button type="submit" size="icon" className="bg-rubik-blue hover:bg-rubik-blue/90">
                            <ChevronRight />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

function ChevronRight() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
    )
}
