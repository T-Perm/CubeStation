import { Home, BookOpen, Trophy, Settings, Menu, X, Box } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { icon: Home, label: "Home", color: "text-rubik-red" },
        { icon: BookOpen, label: "Learn", color: "text-rubik-blue" },
        { icon: Trophy, label: "Compete", color: "text-rubik-orange" },
        { icon: Box, label: "Algorithms", color: "text-rubik-green" },
        { icon: Settings, label: "Settings", color: "text-gray-500" },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-16 bg-white border-r border-gray-100 flex flex-col items-center py-8 transition-transform duration-300 ease-in-out md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="mb-12">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">C</span>
                    </div>
                </div>

                <nav className="flex-1 flex flex-col gap-6 w-full px-2">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="group relative flex items-center justify-center w-full p-2 rounded-xl transition-all hover:bg-gray-50"
                            title={item.label}
                        >
                            <item.icon
                                className={cn(
                                    "w-6 h-6 transition-transform group-hover:scale-110",
                                    item.color
                                )}
                            />
                            <span className="sr-only">{item.label}</span>

                            {/* Tooltip for desktop */}
                            <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap hidden md:block z-50">
                                {item.label}
                            </div>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto">
                    <div className="w-8 h-8 rounded-full bg-rubik-yellow flex items-center justify-center font-bold text-xs text-black border border-gray-200 cursor-pointer">
                        JS
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
