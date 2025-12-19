import { Button } from "./ui/button";

export default function Hero() {
    const headline = "CubeHub";
    const letters = headline.split("");

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pl-0 md:pl-16">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-rubik-blue/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-40 -left-20 w-72 h-72 bg-rubik-red/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rubik-yellow/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10 px-4 text-center max-w-4xl mx-auto flex flex-col items-center gap-8">
                {/* Animated Headline */}
                <h1 className="flex items-center justify-center gap-1 sm:gap-2 text-[48px] sm:text-[72px] font-black tracking-tight leading-none text-gray-900" aria-label={headline}>
                    {letters.map((char, index) => (
                        <span
                            key={index}
                            className="inline-block animate-enter-3d opacity-0 origin-bottom"
                            style={{
                                animationDelay: `${index * 100}ms`,
                                textShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </h1>

                {/* Subtitle */}
                <p className="text-xl sm:text-[28px] text-gray-600 font-medium max-w-2xl leading-relaxed animate-fade-in-up opacity-0"
                    style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                    Created by students, for students — Master Speed Cubing!
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto animate-fade-in-up opacity-0"
                    style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                    <Button
                        variant="rubikRed"
                        size="xl"
                        className="w-full sm:w-auto font-bold text-lg tracking-wide rounded-2xl shadow-rubik-red/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Start Solving
                    </Button>
                    <Button
                        variant="rubikBlue"
                        size="xl"
                        className="w-full sm:w-auto font-bold text-lg tracking-wide rounded-2xl shadow-rubik-blue/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        Join Session
                    </Button>
                </div>
            </div>
        </section>
    );
}
