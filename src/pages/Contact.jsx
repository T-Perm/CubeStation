import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ArrowLeft, Send, Mail, MessageSquare, User } from "lucide-react"

export default function Contact() {
    const navigate = useNavigate()
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // Simulate form submission
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 w-full items-center justify-center p-4">
                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-md border border-zinc-200 dark:border-zinc-700 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-300 mb-2">Message Sent!</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                        Thanks for reaching out! A student moderator will get back to you shortly.
                    </p>
                    <Button onClick={() => navigate('/')} className="w-full">
                        Back to Home
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-900 w-full overflow-y-auto">
            <div className="container mx-auto max-w-2xl px-4 py-8">
                <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    className="mb-6 pl-0 hover:pl-2 transition-all gap-2 text-zinc-600 dark:text-zinc-400"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Button>

                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-sm border border-zinc-200 dark:border-zinc-700">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-300 mb-2">
                            Contact Us
                        </h1>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Have a question about a tutorial? Want to suggest a feature? We'd love to hear from you!
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300 flex items-center gap-2">
                                <User className="w-4 h-4" /> Name
                            </label>
                            <Input
                                required
                                type="text"
                                placeholder="Your Name"
                                className="bg-zinc-50 dark:bg-zinc-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300 flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email
                            </label>
                            <Input
                                required
                                type="email"
                                placeholder="you@school.edu"
                                className="bg-zinc-50 dark:bg-zinc-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-300 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> Message
                            </label>
                            <textarea
                                required
                                rows={5}
                                className="w-full rounded-md border border-input bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="How can we help?"
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
