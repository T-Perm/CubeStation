import React, { useState } from "react";
import { X, Mail, Lock, Loader2, Github } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

export default function LoginModal({ isOpen, onClose, onLogin }) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onLogin({
                name: "SpeedCuber_2025",
                email: email,
                avatar: "https://github.com/shadcn.png"
            });
            onClose();
        }, 1500);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800"
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white font-mono">Welcome Back</h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Sign in to track your PBs and progress.</p>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                <X className="w-5 h-5 text-zinc-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-rubik-blue outline-none transition-all"
                                        placeholder="cuber@example.com"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-rubik-blue outline-none transition-all"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-rubik-blue hover:bg-rubik-blue/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-rubik-blue/20"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                            </Button>
                        </form>

                        <div className="mt-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                            <span className="text-xs font-bold text-zinc-400 uppercase">Or continue with</span>
                            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-10 rounded-xl border-2 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800" type="button" onClick={() => handleSubmit({ preventDefault: () => { } })}>
                                <Github className="w-4 h-4 mr-2" />
                                GitHub
                            </Button>
                            <Button variant="outline" className="h-10 rounded-xl border-2 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 text-rubik-red" type="button" onClick={() => handleSubmit({ preventDefault: () => { } })}>
                                Google
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
