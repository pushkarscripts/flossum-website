"use client";
import React from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function PatchNotes() {
  const patches = [
    {
      version: "v1.1.2",
      date: "February 14, 2026",
      title: "Synchronization & Testing",
      changes: [
        "Fixed circular dependency in core library.",
        "Added comprehensive Vitest test suite.",
        "Updated API documentation for LLMs.",
        "Synchronized versioning across monorepo.",
      ],
      type: "patch",
    },
    {
      version: "v1.1.1",
      date: "November 11, 2025",
      title: "Optimization Patch",
      changes: [
        "Performance improvements for animation loops.",
        "Minor bug fixes for production builds.",
      ],
      type: "patch",
    },
    {
      version: "v1.1.0",
      date: "November 10, 2025",
      title: "Feature Expansion",
      changes: [
        "Introduced new animation presets.",
        "Enhanced CLI capabilities.",
        "Improved type definitions for TypeScript support.",
      ],
      type: "minor",
    },
    {
      version: "v1.0.8",
      date: "July 13, 2025",
      title: "Stability Update",
      changes: [
        "Refined spinner and progress bar logic.",
        "Fixed edge cases in text rendering.",
        "Dependency updates.",
      ],
      type: "patch",
    },
    {
      version: "v1.0.0",
      date: "July 02, 2025",
      title: "Initial Release",
      changes: [
        "Official launch of Flossum.",
        "Core animations: TypeOut, Spinner, ProgressBar.",
        "Initial CLI release.",
      ],
      type: "major",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#12121c] to-[#0d0d15] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 font-ubuntu tracking-tight">
            Patch Notes
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-ubuntu">
            Track the evolution of Flossum.
          </p>
        </div>

        <div className="space-y-8">
          {patches.map((patch, index) => (
            <div
              key={index}
              className="bg-[#1e1e2e]/50 border border-gray-800 rounded-3xl p-8 hover:border-[#f45455]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#f45455]/10 group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <span
                      className={`px-4 py-1 rounded-full text-lg font-bold font-mono ${
                        index === 0
                          ? "bg-[#f45455] text-white shadow-lg shadow-[#f45455]/30"
                          : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {patch.version}
                    </span>
                    <span className="text-gray-500 font-ubuntu text-lg">
                      {patch.date}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white font-ubuntu group-hover:text-[#f45455] transition-colors">
                    {patch.title}
                  </h2>
                </div>
              </div>

              <ul className="space-y-3">
                {patch.changes.map((change, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-lg text-gray-300 font-ubuntu"
                  >
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-[#f45455] shrink-0 group-hover:scale-125 transition-transform" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
