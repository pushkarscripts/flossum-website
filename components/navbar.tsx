"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex justify-between items-center px-6 py-3 text-[#FF6B6B] font-bold text-xl sticky top-0 z-50 mb-4 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-[#12121c]/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-transparent"
      }`}
      style={{
        fontFamily: '"Bahnschrift Condensed", Bahnschrift, Arial, sans-serif',
      }}
    >
      {/* Gradient line at bottom when scrolled */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FF6B6B]/50 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group relative z-10">
        <Image
          src="/Flossum-logo-wide.png"
          alt="Flossum Logo"
          width={110}
          height={32}
          className="h-17 w-50 relative"
          unoptimized
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center uppercase tracking-wider">
        <Link
          href="/"
          className="relative group transition-colors duration-300 hover:text-[#FF8B8B]"
        >
          <span className="relative z-10">HOME</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] group-hover:w-full transition-all duration-300" />
        </Link>

        <Link
          href="/docs"
          className="relative group transition-colors duration-300 hover:text-[#FF8B8B]"
        >
          <span className="relative z-10">DOCUMENTATION</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] group-hover:w-full transition-all duration-300" />
        </Link>

        <Link
          href="/playground"
          className="relative group transition-colors duration-300 hover:text-[#FF8B8B]"
        >
          <span className="relative z-10">PLAYGROUND</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] group-hover:w-full transition-all duration-300" />
        </Link>

        <Link
          href="/#contribute"
          className="relative group transition-colors duration-300 hover:text-[#FF8B8B]"
        >
          <span className="relative z-10">CONTRIBUTE</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] group-hover:w-full transition-all duration-300" />
        </Link>

        <Link
          href="/#support"
          className="relative group transition-colors duration-300 hover:text-[#FF8B8B]"
        >
          <span className="relative z-10">SUPPORT</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] group-hover:w-full transition-all duration-300" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden relative z-10 p-2 rounded-lg hover:bg-[#FF6B6B]/10 active:scale-95 transition-all duration-200"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <div className="relative w-7 h-7">
          <Menu
            size={28}
            className={`absolute inset-0 transition-all duration-300 ${
              menuOpen
                ? "opacity-0 rotate-90 scale-50"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            size={28}
            className={`absolute inset-0 transition-all duration-300 ${
              menuOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-50"
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full right-6 mt-2 bg-white/95 dark:bg-[#12121c]/95 backdrop-blur-xl text-[#FF6B6B] rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 md:hidden overflow-hidden transition-all duration-500 border border-[#FF6B6B]/20 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto max-h-96"
            : "opacity-0 -translate-y-4 pointer-events-none max-h-0"
        }`}
        style={{
          fontFamily: '"Bahnschrift Condensed", Bahnschrift, Arial, sans-serif',
        }}
      >
        {/* Gradient accent at top */}
        <div className="h-1 bg-gradient-to-r from-[#FF6B6B] via-[#FF8B8B] to-[#FF6B6B]" />

        <div className="flex flex-col p-6 gap-1">
          <Link
            href="/"
            className="px-4 py-3 rounded-xl hover:bg-[#FF6B6B]/10 transition-all duration-200 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            HOME
          </Link>

          <Link
            href="/docs"
            className="px-4 py-3 rounded-xl hover:bg-[#FF6B6B]/10 transition-all duration-200 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            DOCUMENTATION
          </Link>

          <Link
            href="/playground"
            className="px-4 py-3 rounded-xl hover:bg-[#FF6B6B]/10 transition-all duration-200 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            PLAYGROUND
          </Link>

          <Link
            href="/#contribute"
            className="px-4 py-3 rounded-xl hover:bg-[#FF6B6B]/10 transition-all duration-200 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            CONTRIBUTE
          </Link>

          <Link
            href="/#support"
            className="px-4 py-3 rounded-xl hover:bg-[#FF6B6B]/10 transition-all duration-200 hover:translate-x-1"
            onClick={() => setMenuOpen(false)}
          >
            SUPPORT
          </Link>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm md:hidden -z-10 animate-in fade-in duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}
