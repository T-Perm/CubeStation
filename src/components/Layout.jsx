import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Box, Calendar, LayoutDashboard, Library, Menu, X, MessageCircle, Clock, Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "./ui/badge"

import SearchModal from "./SearchModal"
import ScrollToTop from "./ScrollToTop"
import LoginModal from "./LoginModal"

export default function Layout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [user, setUser] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('user');
            return saved ? JSON.parse(saved) : null;
        }
        return null;
    })
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        return 'light';
    })

    // Add reduce motion state
    const [reduceMotion, setReduceMotion] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('reduceMotion') === 'true';
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme])

    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
    const location = useLocation()

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setIsSearchOpen(true)
            }
            if (e.key === "k" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) {
                e.preventDefault()
                setIsSearchOpen(true)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoginOpen(false);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const navItems = [
        { label: "Home", href: "/", icon: Box, color: "text-rubik-blue" },
        { label: "Timer", href: "/timer", icon: Clock, color: "text-rubik-orange" },
        { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-rubik-green" },
        { label: "Schedule", href: "/schedule", icon: Calendar, color: "text-rubik-red" },
        { label: "Resources", href: "/resources", icon: Library, color: "text-yellow-600 dark:text-rubik-yellow" },
    ]

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
            {/* Top Bar Countdown */}
            <div className="bg-zinc-900 dark:bg-black text-white text-xs font-mono py-1.5 px-4 text-center border-b border-white/5">
                <span className="opacity-70">Next Global Session: </span>
                <span className="font-bold text-rubik-red ml-2 tracking-wider">2d 4h 12m</span>
            </div>

            {/* Sticky Top Nav */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm transition-all">
                <div className="container flex h-16 items-center justify-between mx-auto px-4 gap-4">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                <span className="text-white dark:text-zinc-900 font-bold text-lg">C</span>
                            </div>
                            <span className="font-mono font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-300">CubeStation</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Desktop Nav - Moved to Right */}
                        <nav className="hidden md:flex items-center gap-1 mr-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-full transition-all hover:bg-zinc-300 dark:hover:bg-zinc-800",
                                        location.pathname === item.href
                                            ? "bg-zinc-900 text-white dark:bg-zinc-300 dark:text-zinc-900 shadow-md"
                                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300"
                                    )}
                                >
                                    <item.icon className={cn("w-4 h-4", location.pathname === item.href ? "text-current" : item.color)} />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="hidden lg:flex items-center gap-4 text-xs font-bold text-zinc-600 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors uppercase tracking-widest"
                        >
                            <span>Search <kbd className="ml-2 px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-300 dark:bg-zinc-800 font-mono text-[10px] lowercase">k</kbd></span>
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400 hover:scale-110"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </button>
                        {user ? (
                            <div className="hidden md:flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800">
                                <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{user.name}</span>
                                <button onClick={handleLogout} className="relative group">
                                    <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-800 shadow-sm transition-transform hover:scale-105" />
                                    <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
                                </button>
                            </div>
                        ) : (
                            <Button
                                onClick={() => setIsLoginOpen(true)}
                                className="bg-rubik-blue hover:bg-rubik-blue/90 text-white font-bold hidden md:inline-flex rounded-xl px-6 transition-all hover:shadow-lg shadow-rubik-blue/20"
                            >
                                Login
                            </Button>
                        )}

                        {/* Mobile Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-zinc-600 dark:text-zinc-400"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900 shadow-2xl space-y-4 animate-in slide-in-from-top duration-300">
                        <nav className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors",
                                        location.pathname === item.href
                                            ? "bg-zinc-300 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-300"
                                            : "text-zinc-600 dark:text-zinc-400"
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon className={cn("w-5 h-5", item.color)} />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        <Button
                            className="w-full bg-rubik-blue font-bold rounded-xl"
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                if (!user) setIsLoginOpen(true);
                            }}
                        >
                            {user ? `Signed in as ${user.name}` : "Login"}
                        </Button>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t bg-white dark:bg-zinc-900 py-12 mt-12 mb-20 md:mb-0">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Link to="/" className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                                        <span className="text-white dark:text-black font-bold text-lg">C</span>
                                    </div>
                                    <span className="font-mono font-bold text-xl tracking-tight text-black dark:text-white">CubeStation</span>
                                </Link>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-xs leading-relaxed">
                                The ultimate student learning hub for speedcubing mastery.
                                <br />
                                Built for the FBLA 2025-2026 Website Design competition.
                            </p>
                            <div className="mt-6">
                                <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 cursor-pointer hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
                                    <input
                                        type="checkbox"
                                        className="rounded border-zinc-300 text-rubik-blue focus:ring-rubik-blue"
                                        checked={reduceMotion}
                                        onChange={(e) => {
                                            const newVal = e.target.checked;
                                            setReduceMotion(newVal);
                                            localStorage.setItem('reduceMotion', newVal);
                                            window.dispatchEvent(new Event('storage'));
                                            // Force reload/re-render of 3D component effectively by simple state signal if needed, 
                                            // but localStorage event might be enough if components listen to it.
                                            // Actually, we'll expose this via window event.
                                            window.dispatchEvent(new CustomEvent('reduce-motion-change', { detail: newVal }));
                                        }}
                                    />
                                    Reduce Motion / Low Quality Mode
                                </label>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 dark:text-zinc-300 mb-4 uppercase text-xs tracking-widest">Learn</h4>
                            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                                <li><Link to="/resources" className="hover:text-rubik-blue dark:text-zinc-300 dark:hover:text-rubik-blue transition-colors">Tutorials</Link></li>
                                <li><Link to="/resources" className="hover:text-rubik-blue dark:text-zinc-300 dark:hover:text-rubik-blue transition-colors">Algorithms</Link></li>
                                <li><Link to="/resources" className="hover:text-rubik-blue dark:text-zinc-300 dark:hover:text-rubik-blue transition-colors">Video Guides</Link></li>
                                <li><Link to="/schedule" className="hover:text-rubik-blue dark:text-zinc-300 dark:hover:text-rubik-blue transition-colors">Seminars</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-zinc-900 dark:text-zinc-300 mb-4 uppercase text-xs tracking-widest">About</h4>
                            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                                <li><Link to="/about" className="hover:text-rubik-blue dark:text-zinc-300 dark:hover:text-rubik-blue transition-colors">Our Mission</Link></li>
                                <li><Link to="/contact" className="hover:text-rubik-blue dark:text-zinc-300 dark:hover:text-rubik-blue transition-colors">Contact Us</Link></li>
                                <li><Link to="/copyright" className="hover:text-rubik-blue dark:text-zinc-300 dark:hover:text-rubik-blue transition-colors">Fair Use & Sources</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 dark:text-zinc-400">
                        <p>© 2025-2026 CubeStation. All Rights Reserved.</p>
                        <div className="flex gap-4 mt-2 md:mt-0 font-medium">
                            <Link to="/copyright" className="hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">Privacy Policy</Link>
                            <Link to="/copyright" className="hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Action Button - Discord */}
            <Button
                onClick={() => window.open("https://discord.gg/cubestation", "_blank")}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-rubik-blue shadow-lg hover:bg-rubik-blue/90 hover:scale-110 transition-all z-40 flex items-center justify-center p-0"
                aria-label="Join Discord"
            >
                <MessageCircle className="h-6 w-6 text-white" />
            </Button>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
            <ScrollToTop />
        </div>
    )
}
