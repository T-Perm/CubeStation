"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
    IconBook,
    IconVideo,
    IconPuzzle,
    IconSchool
} from "@tabler/icons-react";
import { Menu as MenuIcon, X, Sparkles } from "lucide-react";
import { MenuContainer, MenuItem } from "../components/ui/fluid-menu";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";
import { quizzesData } from "../data/quizzes";
import { videoCategories, videosData } from "../data/videos";

export default function Resources() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("tutorials");
    const [activeVideoCategory, setActiveVideoCategory] = useState("f2l");
    const [open, setOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const triggerToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const menuItems = [
        {
            label: "Tutorials",
            onClick: () => setActiveTab("tutorials"),
            icon: <IconSchool className="h-6 w-6" />,
            isActive: activeTab === "tutorials"
        },
        {
            label: "Algorithms",
            onClick: () => setActiveTab("algorithms"),
            icon: <IconBook className="h-6 w-6" />,
            isActive: activeTab === "algorithms"
        },
        {
            label: "Quizzes",
            onClick: () => setActiveTab("quizzes"),
            icon: <IconPuzzle className="h-6 w-6" />,
            isActive: activeTab === "quizzes"
        },
        {
            label: "Video Guides",
            onClick: () => setActiveTab("videos"),
            icon: <IconVideo className="h-6 w-6" />,
            isActive: activeTab === "videos"
        },
        {
            label: "Go Pro",
            onClick: triggerToast,
            icon: <Sparkles className="h-6 w-6 text-yellow-600 dark:text-rubik-yellow" />,
            isActive: false
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "tutorials":
                return (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
                            {/* Featured: Beginner's Guide */}
                            <div
                                onClick={() => window.location.href = '/resources/tutorial/beginner-guide'}
                                className="md:col-span-2 row-span-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-8 text-white relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <span className="bg-white/20 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Start Here</span>
                                        <h3 className="text-4xl font-bold mt-4 mb-2">Beginner's Guide</h3>
                                        <p className="text-white/80 text-lg max-w-md">Learn to solve the cube layer by layer. The fundamental method for everyone.</p>
                                    </div>
                                    <div className="flex items-center gap-2 font-bold group-hover:gap-4 transition-all">
                                        Start Tutorial <IconArrowLeft className="rotate-180" />
                                    </div>
                                </div>
                                <IconSchool className="absolute bottom-4 right-4 w-32 h-32 text-white/10 rotate-12" />
                            </div>

                            {/* CFOP Method */}
                            <div
                                onClick={() => window.location.href = '/resources/tutorial/cfop-guide'}
                                className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:border-rubik-blue hover:shadow-lg transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-rubik-blue/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                                <h3 className="font-bold text-xl mb-1 text-neutral-800 dark:text-neutral-100 group-hover:text-rubik-blue transition-colors">CFOP Method</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Cross, F2L, OLL, PLL</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-bold bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-300">Advanced</span>
                                    <IconBook className="w-5 h-5 text-neutral-300 group-hover:text-rubik-blue transition-colors" />
                                </div>
                            </div>

                            {/* Roux Method */}
                            <div
                                onClick={() => window.location.href = '/resources/tutorial/roux-guide'}
                                className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:border-rubik-orange hover:shadow-lg transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-rubik-orange/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
                                <h3 className="font-bold text-xl mb-1 text-neutral-800 dark:text-neutral-100 group-hover:text-rubik-orange transition-colors">Roux Method</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Block building & M-slices</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-bold bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-300">Alternative</span>
                                    <IconPuzzle className="w-5 h-5 text-neutral-300 group-hover:text-rubik-orange transition-colors" />
                                </div>
                            </div>

                            {/* One-Handed Solving */}
                            <div
                                onClick={() => window.location.href = '/resources/tutorial/oh-guide'}
                                className="md:col-span-3 bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:border-rubik-red hover:shadow-lg transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rubik-red/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
                                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold mb-1 text-neutral-800 dark:text-neutral-100 group-hover:text-rubik-red transition-colors">One-Handed Solving (OH)</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Master the art of turning with a single hand. Expert techniques.</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-neutral-600 dark:text-neutral-300">Expert</span>
                                        <IconUserBolt className="w-6 h-6 text-neutral-300 group-hover:text-rubik-red transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "algorithms":
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">Algorithm Database</h2>
                        <div className="space-y-2 max-w-4xl mx-auto">
                            {[
                                { id: "OLL", name: "OLL (Orientation)", count: 57, color: "border-l-rubik-yellow" },
                                { id: "PLL", name: "PLL (Permutation)", count: 21, color: "border-l-rubik-red" },
                                { id: "F2L", name: "F2L (First 2 Layers)", count: 41, color: "border-l-rubik-blue" },
                                { id: "CMLL", name: "CMLL (Roux Corners)", count: 42, color: "border-l-rubik-orange" }
                            ].map(algo => (
                                <div
                                    key={algo.id}
                                    onClick={() => window.location.href = `/resources/algorithms/${algo.id}`}
                                    className={`p-4 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow border-l-4 ${algo.color}`}
                                >
                                    <span className="font-mono font-bold text-lg">{algo.name}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-neutral-500">{algo.count} algorithms</span>
                                        <IconArrowLeft className="rotate-180 w-4 h-4 text-neutral-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case "quizzes":
                return (
                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">Quizzes</h2>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                            Test your knowledge with progressive quizzes from beginner to expert
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quizzesData.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    onClick={() => navigate(`/resources/quiz/${quiz.id}`)}
                                    className="group bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-rubik-blue dark:hover:border-rubik-blue"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 group-hover:text-rubik-blue transition-colors">
                                            {quiz.title}
                                        </h3>
                                        <span className={cn(
                                            "px-2 py-1 rounded-full text-xs font-medium",
                                            quiz.difficulty <= 3 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                quiz.difficulty <= 6 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        )}>
                                            {quiz.level}
                                        </span>
                                    </div>
                                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                                        {quiz.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-neutral-500">
                                            {quiz.questions.length} questions
                                        </span>
                                        <div className="flex items-center gap-1">
                                            {[...Array(10)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        i < quiz.difficulty ? "bg-rubik-blue" : "bg-neutral-300 dark:bg-neutral-600"
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            case "videos":
                return (
                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Video Guides</h2>

                        {/* Category Scroll Bar */}
                        <div className="flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar">
                            {videoCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveVideoCategory(cat.id)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                                        activeVideoCategory === cat.id
                                            ? "bg-rubik-blue text-white border-rubik-blue shadow-md"
                                            : "bg-white dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-rubik-blue"
                                    )}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Video List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {videosData[activeVideoCategory]?.map((video) => (
                                <div
                                    key={video.id}
                                    onClick={() => navigate(`/resources/video/${video.id}`)}
                                    className="group bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-neutral-200 dark:border-neutral-700 hover:border-rubik-blue dark:hover:border-rubik-blue"
                                >
                                    {/* Thumbnail with Overlay */}
                                    <div className="relative aspect-video bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <IconVideo className="w-6 h-6 text-rubik-blue fill-rubik-blue" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-100 mb-1 line-clamp-1 group-hover:text-rubik-blue transition-colors">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500 mb-2 font-medium">
                                            {video.creator}
                                        </p>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                            {video.description}
                                        </p>
                                    </div>
                                </div>
                            )) || (
                                    <div className="col-span-full text-center py-12 text-neutral-500">
                                        No videos found for this category.
                                    </div>
                                )}
                        </div>
                    </div>
                )
            default:
                return (
                    <div className="flex items-center justify-center h-full text-neutral-500">
                        Select a category from the sidebar
                    </div>
                )
        }
    }

    return (
        <div
            className={cn(
                "flex w-full flex-1 flex-col overflow-hidden bg-white dark:bg-neutral-900",
                "h-[calc(100vh-64px)] relative"
            )}
        >
            {/* Fluid Menu Overlay */}
            <div className="fixed top-24 left-8 z-[100]">
                <MenuContainer>
                    <MenuItem
                        icon={
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180 flex items-center justify-center">
                                    <MenuIcon size={24} strokeWidth={1.5} className="text-neutral-700 dark:text-neutral-200" />
                                </div>
                                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0 flex items-center justify-center">
                                    <X size={24} strokeWidth={1.5} className="text-neutral-700 dark:text-neutral-200" />
                                </div>
                            </div>
                        }
                    />
                    {menuItems.map((item, idx) => (
                        <MenuItem
                            key={idx}
                            icon={item.icon}
                            label={item.label}
                            isActive={item.isActive}
                            onClick={item.onClick}
                        />
                    ))}
                </MenuContainer>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto pl-4 md:pl-28 pr-4 py-4 pt-24 md:pt-4">
                <div className="max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </div>
            {/* Coming Soon Toast */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-zinc-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10"
                    >
                        <Sparkles className="w-5 h-5 text-rubik-yellow" />
                        <span className="font-bold text-sm tracking-tight whitespace-nowrap text-white">Go Pro is coming soon to CubeStation!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
