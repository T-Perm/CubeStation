import React, { useState, useEffect } from "react";
import { Search, X, Hash, BookOpen, Video, Puzzle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const items = [
    { title: "Beginner's Guide", category: "Tutorials", icon: BookOpen, link: "/resources/tutorial/beginner-guide" },
    { title: "CFOP Method", category: "Tutorials", icon: BookOpen, link: "/resources/tutorial/cfop-guide" },
    { title: "Roux Method", category: "Tutorials", icon: BookOpen, link: "/resources/tutorial/roux-guide" },
    { title: "OLL Algorithms", category: "Algorithms", icon: Hash, link: "/resources/algorithms/OLL" },
    { title: "PLL Algorithms", category: "Algorithms", icon: Hash, link: "/resources/algorithms/PLL" },
    { title: "F2L Algorithms", category: "Algorithms", icon: Hash, link: "/resources/algorithms/F2L" },
    { title: "Quizzes", category: "Resources", icon: Puzzle, link: "/resources" },
    { title: "Video Guides", category: "Resources", icon: Video, link: "/resources" },
    { title: "Live Schedule", category: "Tutoring", icon: Search, link: "/schedule" },
];

export default function SearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setQuery("");
        }
    }, [isOpen]);

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (link) => {
        navigate(link);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm"
                    onClick={onClose}
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                >
                    <div className="flex items-center px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                        <Search className="w-5 h-5 text-zinc-400 mr-3" />
                        <input
                            autoFocus
                            placeholder="Search algorithms, tutorials, sessions..."
                            className="flex-1 bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 text-sm"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button onClick={onClose} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                            <X className="w-4 h-4 text-zinc-400" />
                        </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto p-2">
                        {filteredItems.length > 0 ? (
                            <div className="space-y-1">
                                {filteredItems.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(item.link)}
                                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-left group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-white dark:group-hover:bg-zinc-700 transition-colors">
                                                <item.icon className="w-4 h-4 text-zinc-500" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{item.title}</div>
                                                <div className="text-xs text-zinc-400">{item.category}</div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                            Jump
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center">
                                <Search className="w-8 h-8 text-zinc-200 mx-auto mb-3" />
                                <p className="text-sm text-zinc-500">No results found for "{query}"</p>
                            </div>
                        )}
                    </div>

                    <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                        <div className="flex gap-4">
                            <span><kbd className="px-1.5 py-0.5 rounded border bg-white dark:bg-zinc-800">↑↓</kbd> to navigate</span>
                            <span><kbd className="px-1.5 py-0.5 rounded border bg-white dark:bg-zinc-800">Enter</kbd> to select</span>
                        </div>
                        <span><kbd className="px-1.5 py-0.5 rounded border bg-white dark:bg-zinc-800">Esc</kbd> to close</span>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
