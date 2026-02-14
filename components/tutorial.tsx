"use client";

import { useState } from "react";
import Playground from "./playground";
import Link from "next/link";

export default function Tutorial() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const effects = [
    ["⌨️", "Typewriter", "typeOut", "Simulates typing text", "typewriter"],
    ["⏪", "Reverse Typewriter", "reverseType", "Deletes text like rewinding", "reverse"],
    ["🌊", "Wavy Text", "wave", "Animated wave motion", "wave"],
    ["🌈", "Color Pulse", "colorPulse", "Pulsing color animation", "pulse"],
    ["🔁", "Spinner", "spinner", "Loading spinner effect", "spinner"],
    ["📊", "Progress Bar", "progressBar", "Animated progress bar", "progress"],
    ["🤯", "Glitch", "glitch", "Glitchy text distortion", "glitch"],
    ["🧩", "Scramble Decoder", "scramble", "Scrambled-to-clear text", "scramble"],
    ["🌈", "Rainbow Text", "rainbow", "Animated rainbow colors", "rainbow"],
    ["🎞", "Frame Player", "playFrames", "ASCII animation frames", "animations"],
    ["🅰️", "ASCII Art", "asciiArt", "Text as ASCII art", "animations"],
    ["⚡", "Flash", "flash", "Flashing/blinking text", "flash"],
    ["✂️", "Type-Delete", "typeDelete", "Type and delete animation", "type-delete"],
    ["⏳", "Loading Dots", "dots", "Animated loading dots", "dots"],
  ];

  const jsCode = `import { flossum } from 'flossum';\n\nawait flossum.effectName('Hello World!');`;
  const terminalCode = `flossum effectName "Hello World!"\n\n\n`;

  return (
    <div className="mt-0 mx-[3vw] p-4 sm:p-6 md:p-10 pb-0" id="tutorial">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 animate-fade-in-up">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold md:text-5xl leading-tight text-white font-ubuntu">
            How to Use?
          </h1>
          <p className="mt-2 text-lg sm:text-xl md:text-2xl text-gray-400 font-ubuntu">
            Follow these steps to get started with Flossum:
          </p>
        </div>
      </div>

      {/* Code Examples Section - Redesigned */}
      <div className="flex flex-col md:flex-row gap-8 mt-12">
        {/* JavaScript/TypeScript Card */}
        <div className="group relative w-full md:w-1/2 animate-slide-in-left">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#f45455] via-[#ff6b6b] to-[#f45455] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

          <div className="relative bg-gradient-to-br from-[#1e1e2e] to-[#151521] p-6 rounded-2xl border border-gray-800 group-hover:border-[#f45455]/50 transition-all duration-500 shadow-2xl">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-[#f45455] to-[#ff6b6b] rounded-xl shadow-lg shadow-[#f45455]/30 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p
                  className="text-white text-xl sm:text-2xl font-semibold"
                  style={{
                    fontFamily:
                      '"Bahnschrift Condensed", Bahnschrift, Arial, sans-serif',
                  }}
                >
                  JavaScript/TypeScript
                </p>
                <p className="text-gray-500 text-sm mt-0.5">For code files</p>
              </div>
              <button
                onClick={() => handleCopy(jsCode, "js")}
                className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-200 group/btn relative"
                title="Copy code"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#f45455] to-[#ff6b6b] rounded-xl opacity-0 group-hover/btn:opacity-10 transition-opacity duration-200"></div>
                {copiedCode === "js" ? (
                  <svg
                    className="w-5 h-5 text-green-400 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover/btn:text-gray-300 relative z-10 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Code block */}
            <div className="relative bg-[#0d0d1a] p-5 rounded-xl border border-gray-800/50 overflow-x-auto group-hover:border-gray-700/50 transition-colors duration-300">
              <div className="absolute top-3 left-3 flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              </div>
              <pre className="text-sm sm:text-base text-gray-200 font-mono mt-6">
                <code>{jsCode}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Terminal Card */}
        <div className="group relative w-full md:w-1/2 animate-slide-in-right">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6b6b] via-[#f45455] to-[#ff6b6b] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

          <div className="relative bg-gradient-to-br from-[#1e1e2e] to-[#151521] p-6 rounded-2xl border border-gray-800 group-hover:border-[#f45455]/50 transition-all duration-500 shadow-2xl">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-gradient-to-br from-[#ff6b6b] to-[#f45455] rounded-xl shadow-lg shadow-[#ff6b6b]/30 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p
                  className="text-white text-xl sm:text-2xl font-semibold"
                  style={{
                    fontFamily:
                      '"Bahnschrift Condensed", Bahnschrift, Arial, sans-serif',
                  }}
                >
                  Terminal
                </p>
                <p className="text-gray-500 text-sm mt-0.5">
                  Direct command line
                </p>
              </div>
              <button
                onClick={() => handleCopy(terminalCode, "terminal")}
                className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-200 group/btn relative"
                title="Copy code"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b6b] to-[#f45455] rounded-xl opacity-0 group-hover/btn:opacity-10 transition-opacity duration-200"></div>
                {copiedCode === "terminal" ? (
                  <svg
                    className="w-5 h-5 text-green-400 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover/btn:text-gray-300 relative z-10 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Code block */}
            <div className="relative bg-[#0d0d1a] p-5 rounded-xl border border-gray-800/50 overflow-x-auto group-hover:border-gray-700/50 transition-colors duration-300">
              <div className="absolute top-3 left-3 flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
              </div>
              <pre className="text-sm sm:text-base text-gray-200 font-mono mt-6">
                <code>{terminalCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
          <Playground />
      </div>

      {/* Demo Video Section - Commented out for now
      <div
        className="mt-16 animate-fade-in"
        style={{ animationDelay: "300ms" }}
      >
        <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-white flex items-center gap-3 font-ubuntu">
          <span className="text-3xl">🎬</span>
          Demo Video
        </h3>
        <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 hover:border-[#f45455]/50 transition-colors duration-500 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#f45455] to-[#ffd47b] rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          <iframe
            className="absolute top-0 left-0 w-full h-full z-10 rounded-2xl"
            src="https://www.youtube.com/embed/18lzkb331Gk?si=KD4V8ue8MkfpVBXR&controls=0&modestbranding=1&rel=0"
            title="Flossum demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
      */}

      {/* Available Effects Section */}
      <section className="flex flex-col mt-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-8 text-white font-bold flex items-center gap-3 font-ubuntu">
          <span className="text-3xl">✨</span>
          Available Effects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {effects.map(([emoji, title, code, desc, docId], index) => (
            <Link 
              key={code} 
              href={`/docs#${docId}`}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-5 rounded-2xl border border-gray-800 hover:border-[#f45455]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#f45455]/10 animate-fade-in-up hover:-translate-y-1 block"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#f45455]/0 to-[#ffd47b]/0 group-hover:from-[#f45455]/10 group-hover:to-[#ffd47b]/10 rounded-2xl transition-all duration-300 blur-sm"></div>

              <div className="relative">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {emoji}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#ff8b8b] transition-colors duration-300 font-ubuntu">
                      {title}
                    </h3>
                    <code className="bg-gray-900/90 px-3 py-1.5 rounded-lg text-[#ffd47b] text-sm font-mono border border-gray-700/50 group-hover:border-[#ffd47b]/30 transition-colors duration-300 inline-block">
                      {code}
                    </code>
                  </div>
                </div>
                <p className="text-gray-400 group-hover:text-gray-300 text-sm mt-3 leading-relaxed transition-colors duration-300">
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="border-gray-800 border-2 mt-16 mb-0 opacity-50" />

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

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
