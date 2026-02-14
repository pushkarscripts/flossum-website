"use client";
import Image from "next/image";
import { useState } from "react";

export default function Products() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const commands = [
    {
      text: "npm install flossum",
      logo: "/npmLogo.svg",
      alt: "NPM Logo",
      color: "from-red-500/10 to-red-600/5",
    },
    {
      text: "yarn add flossum",
      logo: "/yarnLogo.svg",
      alt: "Yarn Logo",
      color: "from-blue-500/10 to-blue-600/5",
    },
    {
      text: "pnpm add flossum",
      logo: "/pnpmLogo.svg",
      alt: "PNPM Logo",
      color: "from-orange-500/10 to-orange-600/5",
    },
  ];

  return (
    <div
      className="mt-8 ml-[3vw] mr-[3vw] p-4 sm:p-8 md:p-10 pb-0"
      id="platforms"
    >
      {/* Heading Section with animation */}
      <div className="text-left mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl text-white mb-2 font-ubuntu">
          Available across Platforms
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl font-ubuntu">
          Flossum is available on NPM, Yarn & PNPM—so you can freely use it in
          any of your NodeJS projects.
        </p>
      </div>

      {/* Two Column Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-12 mt-6">
        {/* Left: Commands */}
        <div className="flex flex-col flex-1 items-start w-full space-y-4">
          {commands.map((cmd, index) => (
            <div
              key={index}
              className={`relative group bg-gradient-to-br ${cmd.color} bg-[#1e1e2e] rounded-xl p-4 sm:p-5 text-lg sm:text-xl md:text-2xl w-full border border-gray-800 hover:border-gray-600 transition-all duration-300 cursor-pointer overflow-hidden animate-slide-in-left`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCopy(cmd.text, index)}
              title="Click to copy command"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer pointer-events-none"></div>

              {/* Content */}
              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-gray-500 group-hover:text-gray-400 transition-colors">
                    $
                  </span>
                  <p className="font-mono text-gray-200 group-hover:text-white transition-colors">
                    {cmd.text}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Copy feedback */}
                  {copiedIndex === index && (
                    <span className="text-green-400 text-sm font-semibold animate-fade-in">
                      Copied!
                    </span>
                  )}

                  {/* Copy icon */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-5 h-5 text-gray-400"
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
                  </div>

                  {/* Logo */}
                  <div className="relative ml-2 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={cmd.logo}
                      alt={cmd.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50px, 60px"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Bottom highlight bar */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#f45455] to-[#ffd47b] group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Right: Image */}
        <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0 w-full animate-fade-in-right">
          <div
            className="relative w-[90%] sm:w-[70%] md:w-[40vw] h-auto group cursor-pointer"
            onClick={() => {
              window.open(
                "https://marketplace.visualstudio.com/items?itemName=pushkarscripts.flossum-devtools",
                "_blank",
              );
            }}
          >
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#f45455]/20 to-[#ffd47b]/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Image container */}
            <div className="relative">
              <Image
                src="/devtools.png"
                alt="Flossum DevTools"
                width={700}
                height={400}
                className="rounded-xl shadow-2xl object-contain transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_20px_60px_-15px_rgba(244,84,85,0.3)]"
                sizes="(max-width: 768px) 100vw, 40vw"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="text-white font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View on VS Code Marketplace
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-gray-800 border-2 mt-12 opacity-50" />

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

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.5s ease-out backwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
