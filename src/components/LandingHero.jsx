import React, { useRef } from 'react';
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { LiquidGlassCard } from "./ui/liquid-glass";
import { motion, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "./ui/typewriter-text";
import { LiquidButton } from "./ui/liquid-glass-button";

export default function LandingHero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const navigate = useNavigate();

    const y1 = useTransform(scrollY, [0, 500], [0, -100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-[90dvh] flex flex-col items-center justify-center pt-20 pb-32 px-4 overflow-hidden pointer-events-none">
            {/* Main content needs pointer events for buttons/links */}
            <motion.div
                style={{ y: y1, opacity }}
                className="container relative z-10 max-w-6xl mx-auto text-center pointer-events-auto py-12 px-6 rounded-[4rem] bg-white/[0.02] dark:bg-black/[0.02] backdrop-blur-[2px]"
            >
                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1] headline-readability"
                >
                    Master the Cube. <br />
                    <Typewriter
                        text={["Learn Faster.", "Play Smarter.", "Master Every Case.", "Track Progress."]}
                        speed={100}
                        loop={true}
                        className="text-transparent bg-clip-text bg-gradient-to-br from-rubik-blue via-rubik-red to-rubik-yellow"
                    />
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
                        shadowIntensity="md"
                        glowIntensity="none"
                        className="p-6 border border-white/10 dark:border-white/5 shadow-2xl relative overflow-hidden group/card"
                    >
                        <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-200 leading-relaxed relative z-10 transition-colors duration-500 group-hover/card:text-zinc-900 dark:group-hover/card:text-white text-glow">
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
                    <LiquidButton
                        size="xl"
                        onClick={() => navigate('/timer')}
                        className="font-bold relative z-20"
                    >
                        <span className="relative z-10 flex items-center">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-rubik-blue via-rubik-red to-rubik-yellow opacity-0 group-hover:opacity-20 transition-opacity" />
                    </LiquidButton>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500 dark:text-white/90 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Scroll to Explore</span>

                {/* Pure Liquid Glass Pill */}
                <div className="relative w-3 h-14 bg-zinc-900/5 dark:bg-white/10 backdrop-blur-[4px] rounded-full border border-zinc-200 dark:border-white/30 shadow-[inset_0_1px_1px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_10px_20px_rgba(0,0,0,0.3)] overflow-hidden">
                    {/* Top Specular Highlight */}
                    <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/40 blur-[1px] rounded-full" />

                    {/* Animated Blue Neon Highlight Line */}
                    <motion.div
                        animate={{
                            y: [-20, 70],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: [0.45, 0, 0.55, 1],
                            times: [0, 0.2, 0.8, 1]
                        }}
                        className="absolute inset-x-0 h-4 bg-gradient-to-b from-transparent via-rubik-blue to-transparent z-10"
                        style={{
                            boxShadow: '0 0 12px 2px rgba(59, 130, 246, 0.6)'
                        }}
                    />

                    {/* Subtle Internal Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
                </div>
            </motion.div>
        </section>

    );
}
