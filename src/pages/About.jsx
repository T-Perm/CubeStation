import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { ArrowLeft, Users, Target, Zap, Heart } from "lucide-react"

export default function About() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 w-full overflow-y-auto">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    className="mb-6 pl-0 hover:pl-2 transition-all gap-2 text-zinc-600 dark:text-zinc-400"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Button>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-700">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                        About CubeStation
                    </h1>

                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                            CubeStation is a student-built learning hub designed to make speedcubing accessible,
                            engaging, and collaborative for students worldwide.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Our Mission</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    To provide a comprehensive, free, and high-quality resource for anyone wanting to master the Rubik's Cube,
                                    from their first solve to their first competition.
                                </p>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border border-green-100 dark:border-green-800">
                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">For Students, By Students</h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    We understand the learning curve because we've been there. Our curriculum is designed to break down
                                    complex algorithms into digestible, student-friendly lessons.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Why CubeStation?</h2>
                        <ul className="space-y-4 mb-8 text-zinc-600 dark:text-zinc-400">
                            <li className="flex gap-3">
                                <Zap className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                                <span><strong>Integrated Tools:</strong> Access timers, algorithms, and tutorials all in one place.</span>
                            </li>
                            <li className="flex gap-3">
                                <Heart className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                                <span><strong>Community Focused:</strong> Join seminars and peer-to-peer tutoring sessions.</span>
                            </li>
                        </ul>

                        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-8 mt-8">
                            <p className="text-sm text-zinc-500 dark:text-zinc-500 italic">
                                Developed for the FBLA 2025-2026 Website Design competitive event.
                                "Design to Learn: Build a Student Learning Hub".
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
