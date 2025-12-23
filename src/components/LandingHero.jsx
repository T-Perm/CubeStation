import React, { useRef } from 'react';
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { LiquidGlassCard } from "./ui/liquid-glass";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function LandingHero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const navigate = useNavigate();

    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-32 px-4 overflow-hidden pointer-events-none">
            {/* Main content needs pointer events for buttons/links */}
            <motion.div
                style={{ y: y1, opacity }}
                className="container relative z-10 max-w-6xl mx-auto text-center pointer-events-auto"
            >
                {/* Floating Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-sm font-medium mb-8 shadow-2xl"
                >
                    <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-rubik-yellow" />
                        <span className="bg-gradient-to-r from-rubik-blue to-rubik-green bg-clip-text text-transparent font-bold">New:</span>
                        Interactive 3D Masterclasses
                    </span>
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]"
                >
                    Master the Cube. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-zinc-700 via-zinc-400 to-zinc-700 dark:from-white dark:via-zinc-300 dark:to-zinc-500">
                        Learn Faster.
                    </span>
                    <span className="relative whitespace-nowrap">
                        {" "}Play Smarter.
                        <svg className="absolute -bottom-1 left-0 w-full h-2 text-rubik-blue/40" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
                            <path d="M1 11C40 3 150 1 299 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </span>
                </motion.h1>

                {/* Subheadline Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl mx-auto mb-12"
                >
                    <LiquidGlassCard
                        blurIntensity="xl"
                        borderRadius="24px"
                        shadowIntensity="sm"
                        glowIntensity="none"
                        className="p-6 bg-white/40 dark:bg-zinc-900/40 border border-white/20 dark:border-white/5 backdrop-blur-2xl"
                    >
                        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            Cubestation is the ultimate student-led interactive learning platform designed to take your cubing skills to the next dimension through guided mastery and performance analytics.
                        </p>
                    </LiquidGlassCard>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex items-center justify-center gap-6"
                >
                    <Button
                        size="xl"
                        onClick={() => navigate('/timer')}
                        className="group relative overflow-hidden bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold px-10 h-16 rounded-2xl shadow-2xl hover:scale-105 transition-all"
                    >
                        <span className="relative z-10 flex items-center">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-rubik-blue via-rubik-red to-rubik-yellow opacity-0 group-hover:opacity-20 transition-opacity" />
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-300 dark:from-zinc-700 to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 48] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-rubik-blue to-transparent"
                    />
                </div>
            </motion.div>

            {/* Decorative Liquid Glass Elements floating in background */}
            <motion.div
                style={{ y: y2 }}
                className="absolute top-1/2 left-[5%] w-64 h-64 -translate-y-1/2 pointer-events-none opacity-20 md:opacity-100"
            >
                <LiquidGlassCard className="w-full h-full flex items-center justify-center rotate-12" borderRadius="48px" blurIntensity="xl">
                    <div className="w-20 h-20 bg-rubik-blue/30 rounded-full blur-2xl" />
                </LiquidGlassCard>
            </motion.div>

            <motion.div
                style={{ y: y1 }}
                className="absolute top-1/4 right-[5%] w-48 h-48 pointer-events-none opacity-20 md:opacity-100"
            >
                <LiquidGlassCard className="w-full h-full flex items-center justify-center -rotate-12" borderRadius="32px" blurIntensity="lg">
                    <div className="w-16 h-16 bg-rubik-red/30 rounded-full blur-2xl" />
                </LiquidGlassCard>
            </motion.div>
        </section>
    );
}
