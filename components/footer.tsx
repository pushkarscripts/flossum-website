"use client";
import Link from "next/link";

export default function Footer() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="bg-[#f45455] mt-20 border-t-4 border-white/20 rounded-tl-3xl rounded-tr-3xl relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl" />
            
            {/* Desktop Footer */}
            <div className="hidden lg:flex p-5 justify-start items-start gap-10 flex-wrap pl-20 pr-30 pt-10 relative z-10">
                {/* Flossum Section */}
                <div className="text-white animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1
                        className="text-5xl flex items-center gap-2 mb-4 hover:scale-105 transition-transform duration-300"
                        style={{
                            fontFamily:
                                '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                            fontWeight: 'bold',
                        }}
                    >
                        Flossum
                    </h1>
                    <div className="flex gap-10 mt-3 mr-8 flex-wrap">
                        <ul
                            className="text-3xl space-y-2"
                            style={{
                                fontFamily:
                                    '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                            }}
                        >
                            <li className="relative group">
                                <Link href="/" className="hover:text-white/90 transition-all duration-300 block hover:translate-x-2">
                                    <span className="relative">
                                        Home
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                                    </span>
                                </Link>
                            </li>
                            <li className="relative group">
                                <Link href="/docs" className="hover:text-white/90 transition-all duration-300 block hover:translate-x-2">
                                    <span className="relative">
                                        Docs
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                                    </span>
                                </Link>
                            </li>
                            <li className="relative group">
                                <Link href="/playground" className="hover:text-white/90 transition-all duration-300 block hover:translate-x-2">
                                    <span className="relative">
                                        Playground
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                                    </span>
                                </Link>
                            </li>
                            <li 
                                className="cursor-pointer hover:translate-x-2 hover:text-white/90 transition-all duration-300 relative group"
                                onClick={() => scrollToSection("feedback")}
                            >
                                <span className="relative">
                                    Feedback
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                                </span>
                            </li>
                        </ul>
                        <ul
                            className="text-3xl ml-[-10px] space-y-2"
                            style={{
                                fontFamily:
                                    '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                            }}
                        >
                            <li 
                                className="cursor-pointer hover:translate-x-2 hover:text-white/90 transition-all duration-300 relative group"
                                onClick={() => scrollToSection("contribute")}
                            >
                                <span className="relative">
                                    Contribute
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                                </span>
                            </li>
                            <li 
                                className="cursor-pointer hover:translate-x-2 hover:text-white/90 transition-all duration-300 relative group"
                                onClick={() => scrollToSection("sponsor")}
                            >
                                <span className="relative">
                                    Sponsor
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Socials Section */}
                <div className="text-white mr-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    <h1
                        className="text-5xl flex items-center gap-2 mb-4 hover:scale-105 transition-transform duration-300"
                        style={{
                            fontFamily:
                                '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                            fontWeight: 'bold',
                        }}
                    >
                        Socials
                    </h1>
                    <ul
                        className="text-3xl mt-3 space-y-2"
                        style={{
                            fontFamily:
                                '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                        }}
                    >
                        <li 
                            className="cursor-pointer hover:translate-x-2 hover:text-white/90 transition-all duration-300 relative group"
                            onClick={() => window.open("https://github.com/pushkarscripts/", "_blank", "noopener,noreferrer")}
                        >
                            <span className="relative">
                                GitHub
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                            </span>
                        </li>
                        <li 
                            className="cursor-pointer hover:translate-x-2 hover:text-white/90 transition-all duration-300 relative group"
                            onClick={() => window.open("https://twitter.com/", "_blank", "noopener,noreferrer")}
                        >
                            <span className="relative">
                                Twitter(X)
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                            </span>
                        </li>
                        <li 
                            className="cursor-pointer hover:translate-x-2 hover:text-white/90 transition-all duration-300 relative group"
                            onClick={() => window.open("https://linkedin.com/in/pushkarscripts", "_blank", "noopener,noreferrer")}
                        >
                            <span className="relative">
                                LinkedIn
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Updates Section */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    <h1
                        className="text-5xl text-white flex items-center gap-2 mb-4 hover:scale-105 transition-transform duration-300"
                        style={{
                            fontFamily:
                                '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                            fontWeight: 'bold',
                        }}
                    >
                        Updates
                    </h1>
                    <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl w-60 mt-3 flex flex-col gap-2 text-[#f45455] hover:scale-105 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 group border border-white/50">
                        <p
                            className="text-5xl p-2 font-semibold font-stretch-condensed group-hover:scale-105 transition-transform duration-300"
                            style={{
                                fontFamily:
                                    '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                            }}
                        >
                            See What&apos;s New
                        </p>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#f45455] via-[#ff6b6b] to-[#f45455] rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
                            <Link href="/patch-notes">
                                <p
                                    className="relative bg-[#f45455] rounded-lg text-white flex justify-center items-center font-semibold cursor-pointer p-2 m-2 hover:scale-95 active:scale-90 transition-all duration-200 text-5xl shadow-lg"
                                    style={{
                                        fontFamily:
                                            '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                                    }}
                                >
                                    v1.1.2
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Footer */}
            <div className="flex flex-col items-center justify-center text-center text-white lg:hidden p-6 gap-4 relative z-10">
                <p
                    className="text-2xl sm:text-3xl animate-in fade-in slide-in-from-bottom-4 duration-700"
                    style={{
                        fontFamily:
                            '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                    }}
                >
                    Made with <span className="inline-block animate-pulse text-pink-200">♥</span> by <span className="font-semibold">Pushkar Singh</span>
                </p>
                <p
                    className="text-xl sm:text-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
                    style={{
                        fontFamily:
                            '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                    }}
                >
                    MIT Licensed ·{" "}
                    <a
                        href="https://github.com/pushkarscripts/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-white/80 transition-colors duration-300 relative group"
                    >
                        <span className="relative">
                            GitHub
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-right" />
                        </span>
                    </a>
                </p>
            </div>

            {/* Copyright (for desktop) */}
            <div
                className="hidden lg:flex text-white text-3xl justify-center pb-6 mt-6 relative z-10 animate-in fade-in duration-700 delay-300"
                style={{
                    fontFamily:
                        '"Bahnschrift Condensed", "Bahnschrift", "Agency FB", Arial, sans-serif',
                }}
            >
                <p className="text-white/90">
                    © {new Date().getFullYear()} Flossum. MIT Licensed. Open source on{" "}
                    <a
                        href="https://github.com/pushkarscripts/flossum"
                        className="hover:text-white transition-colors duration-300 relative group"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="relative">
                            GitHub
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white scale-x-100 group-hover:scale-x-0 transition-transform duration-300 origin-right" />
                        </span>
                    </a>.
                </p>
            </div>
        </footer>
    );
}