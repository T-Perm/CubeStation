import { useParams, useNavigate } from "react-router-dom"
import { algorithmsData } from "../data/algorithms"
import { Button } from "../components/ui/button"
import { ArrowLeft, Check, Copy } from "lucide-react"
import { useState } from "react"
import { cn } from "../lib/utils"
// Import helper
import { getCubeImageUrl } from "../lib/cube"

export default function AlgorithmSetView() {
    const { set } = useParams()
    const navigate = useNavigate()
    const algSet = algorithmsData[set]
    const [copiedId, setCopiedId] = useState(null)

    // Normalize input set key (e.g. handle casing if needed, currently exact match)
    if (!algSet) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center text-zinc-600">
                <h2 className="text-2xl font-bold">Set Not Found</h2>
                <Button onClick={() => navigate('/resources')} variant="outline" className="mt-4">Back to Resources</Button>
            </div>
        )
    }

    const copyToClipboard = (alg, id) => {
        navigator.clipboard.writeText(alg)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 w-full overflow-y-auto">
            <div className="container mx-auto max-w-6xl px-4 py-8">
                <Button
                    onClick={() => navigate('/resources')}
                    variant="ghost"
                    className="mb-6 pl-0 hover:pl-2 transition-all gap-2 text-zinc-600 hover:text-rubik-blue"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Resources
                </Button>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-300 mb-2">{algSet.title}</h1>
                    <p className="text-zinc-600 dark:text-zinc-400">Total Algorithms: {algSet.count}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {algSet.cases.map((algCase) => (
                        <div key={algCase.id} className="bg-white dark:bg-neutral-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-300">{algCase.name}</h3>
                                    <span className="text-xs text-zinc-400 font-mono uppercase tracking-wide">{algCase.group}</span>
                                </div>
                                <div className="w-20 h-20 bg-transparent rounded-md flex items-center justify-center overflow-hidden">
                                    <img
                                        src={getCubeImageUrl(algCase.imgAlg || algCase.alg, set)}
                                        alt={algCase.name}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            <div className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded-lg font-mono text-sm text-zinc-700 dark:text-zinc-300 break-words mb-2 border border-zinc-300 dark:border-zinc-700 relative group-hover:bg-blue-50 dark:group-hover:bg-blue-900/10 transition-colors">
                                {algCase.alg}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => copyToClipboard(algCase.alg, algCase.id)}
                                    aria-label="Copy algorithm to clipboard"
                                >
                                    {copiedId === algCase.id ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
