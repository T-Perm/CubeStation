import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { ArrowLeft, Scale, ExternalLink, Code } from "lucide-react"

export default function Copyright() {
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
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3">
                        <Scale className="w-8 h-8 text-neutral-500" />
                        Copyright & Sources
                    </h1>

                    <div className="prose dark:prose-invert max-w-none space-y-8">

                        {/* Fair Use Statement */}
                        <section className="bg-neutral-100 dark:bg-zinc-900 p-6 rounded-xl">
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mt-0">Fair Use Disclaimer</h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                This website is created for educational purposes as part of the FBLA Website Design competition.
                                Content is used under the "Fair Use" doctrine for student learning and nonprofit educational use.
                                No copyright infringement is intended.
                            </p>
                        </section>

                        {/* Content Sources */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Content Sources & Credits</h2>
                            <div className="grid gap-4">
                                <SourceCard
                                    title="J Perm (Dylan Wang)"
                                    description="Tutorial videos, algorithm logic, and educational content structure."
                                    link="https://www.youtube.com/@JPerm"
                                />
                                <SourceCard
                                    title="VisualCube API"
                                    description="Dynamic SVG generation for Rubik's Cube algorithm visualization."
                                    link="http://cube.rider.biz/visualcube.php"
                                />
                                <SourceCard
                                    title="Gan Cube / Cubehead"
                                    description="Product imagery and unboxing video content."
                                    link="https://www.youtube.com/@CubeHead"
                                />
                            </div>
                        </section>

                        {/* Icons & Libraries */}
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Technology Stack</h2>
                            <ul className="grid md:grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-400">
                                <li className="flex items-center gap-2"><Code className="w-4 h-4" /> React (Vite)</li>
                                <li className="flex items-center gap-2"><Code className="w-4 h-4" /> Tailwind CSS</li>
                                <li className="flex items-center gap-2"><Code className="w-4 h-4" /> Lucide React (Icons)</li>
                                <li className="flex items-center gap-2"><Code className="w-4 h-4" /> Tabler Icons</li>
                                <li className="flex items-center gap-2"><Code className="w-4 h-4" /> Framer Motion (Animations)</li>
                            </ul>
                        </section>

                        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-8">
                            <p className="text-xs text-zinc-500 text-center">
                                CubeStation © 2025. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function SourceCard({ title, description, link }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:border-blue-500 dark:hover:bg-blue-900/10 transition-all group"
        >
            <div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-blue-500" />
        </a>
    )
}
