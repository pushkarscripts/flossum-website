"use client";
import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Link from "next/link";
import dynamic from 'next/dynamic';

const PlaygroundComponent = dynamic(() => import("../../components/playground"), { ssr: false });

export default function PlaygroundPage() {
  const examples = [
    { cmd: 'flossum wave "Surfing the terminal"', desc: "RGB Wave Effect" },
    { cmd: 'flossum glitch "SYSTEM FAILURE"', desc: "Digital Distortion" },
    { cmd: 'flossum rainbow "Vibrant Colors"', desc: "Color Cycle" },
    { cmd: 'flossum scramble "Decrypting..."', desc: "Text Reveal" },
    { cmd: 'flossum typeout "Typewriter effect"', desc: "Classic Typing" },
    { cmd: 'flossum spinner "Processing"', desc: "Loading State" },
  ];

  return (
    <div className="bg-[#12121c] min-h-screen flex flex-col font-ubuntu text-gray-300 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow w-full px-[3vw] md:px-[5vw] py-2">
        <PlaygroundComponent />

        {/* Examples Section */}
        <div className="mt-12 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Commands to Try</h2>
              <p className="text-gray-400">Copy and paste these into the terminal above to see the magic.</p>
            </div>
            <Link 
              href="/docs" 
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 group"
            >
              Learn more about Flossum Commands
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {examples.map((example, i) => (
              <div 
                key={i} 
                className="bg-[#1e1e2e]/50 border border-gray-800 p-4 rounded-xl flex flex-col gap-2 hover:border-[#f45455]/30 transition-colors group cursor-default"
              >
                <span className="text-[10px] text-[#f45455] font-bold uppercase tracking-widest opacity-70">{example.desc}</span>
                <code className="text-sm font-mono text-gray-200 group-hover:text-white transition-colors">{example.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
