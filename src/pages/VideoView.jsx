import { useParams, useNavigate } from "react-router-dom"
import { videosData, videoCategories } from "../data/videos"
import { Button } from "../components/ui/button"
import { ArrowLeft, User } from "lucide-react"

export default function VideoView() {
    const { videoId } = useParams()
    const navigate = useNavigate()

    // Find the video across all categories
    let video = null
    let categoryLabel = ""

    for (const [catKey, videos] of Object.entries(videosData)) {
        const found = videos.find(v => v.id === videoId)
        if (found) {
            video = found
            const category = videoCategories.find(c => c.id === catKey)
            categoryLabel = category ? category.label : catKey
            break
        }
    }

    if (!video) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-zinc-50 dark:bg-zinc-900">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Video Not Found</h2>
                <Button onClick={() => navigate('/resources')} className="mt-4">
                    Back to Resources
                </Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 w-full overflow-y-auto">
            <div className="container mx-auto max-w-5xl px-4 py-8">
                <Button
                    onClick={() => navigate('/resources')}
                    variant="ghost"
                    className="mb-6 pl-0 hover:pl-2 transition-all gap-2 text-zinc-600 dark:text-zinc-400"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Resources
                </Button>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                    {/* Video Embed */}
                    <div className="relative pt-[56.25%] bg-black">
                        <iframe
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                            title={video.title}
                            className="absolute top-0 left-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    {/* Content & Credits */}
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="px-3 py-1 rounded-full bg-rubik-blue/10 text-rubik-blue text-sm font-medium">
                                        {categoryLabel}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                                    {video.title}
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                                    {video.description}
                                </p>
                            </div>

                            {/* Creator Credit Card */}
                            <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-xl p-5 border border-zinc-100 dark:border-zinc-700 min-w-[250px]">
                                <h3 className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold mb-3">
                                    Content Creator
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                        {video.creator.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900 dark:text-zinc-100 text-lg">
                                            {video.creator}
                                        </p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Video Author
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-600">
                                    <p className="text-xs text-zinc-500 italic">
                                        All rights belong to the original creator.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
