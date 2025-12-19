import { useParams, useNavigate } from "react-router-dom"
import { tutorialsData } from "../data/tutorials"
import { Button } from "../components/ui/button"
import { ArrowLeft, BookOpen, CheckCircle, AlertCircle } from "lucide-react"

export default function TutorialView() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const tutorial = tutorialsData[slug]

    if (!tutorial) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-zinc-500">
                <AlertCircle className="w-16 h-16 mb-4 text-rubik-red" />
                <h2 className="text-2xl font-bold text-zinc-800">Tutorial Not Found</h2>
                <p className="mb-6">The requested tutorial "{slug}" suggests it doesn't exist.</p>
                <Button onClick={() => navigate('/resources')} variant="outline">Back to Resources</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 overflow-y-auto w-full">
            <div className="container mx-auto max-w-4xl px-4 py-8">
                <Button
                    onClick={() => navigate('/resources')}
                    variant="ghost"
                    className="mb-6 pl-0 hover:pl-2 transition-all gap-2 text-zinc-500 hover:text-rubik-blue"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Resources
                </Button>

                <div className="mb-10 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${tutorial.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                tutorial.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                            }`}>
                            {tutorial.difficulty}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 mb-4">
                        {tutorial.title}
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {tutorial.description}
                    </p>
                </div>

                <div className="space-y-12">
                    {tutorial.steps.map((step, index) => (
                        <div key={index} className="bg-white dark:bg-zinc-800 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                            <div className="absolute top-0 right-0 p-4 text-9xl font-bold text-zinc-50 dark:text-zinc-700/20 -z-0 pointer-events-none select-none">
                                {index + 1}
                            </div>

                            <h2 className="text-2xl font-bold mb-4 relative z-10 flex items-center gap-3">
                                <span className="bg-rubik-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg shadow-rubik-blue/20">
                                    {index + 1}
                                </span>
                                {step.title}
                            </h2>

                            <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed mb-6 relative z-10">
                                {step.content}
                            </p>

                            {step.tips && step.tips.length > 0 && (
                                <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-rubik-blue p-4 rounded-r-lg relative z-10">
                                    <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> Pro Tips
                                    </h4>
                                    <ul className="space-y-2">
                                        {step.tips.map((tip, i) => (
                                            <li key={i} className="text-blue-800 dark:text-blue-200 text-sm flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 mt-0.5 opacity-70 flex-shrink-0" />
                                                <span>{tip}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 bg-zinc-900 text-white rounded-2xl text-center">
                    <h3 className="text-2xl font-bold mb-2">Ready to practice?</h3>
                    <p className="text-zinc-400 mb-6">Start the timer and test your new skills!</p>
                    <Button
                        onClick={() => navigate('/timer')}
                        className="bg-rubik-blue hover:bg-rubik-blue/90 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-transform"
                    >
                        Go to Timer
                    </Button>
                </div>
            </div>
        </div>
    )
}
