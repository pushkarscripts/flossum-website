"use client";
import Image from "next/image";

export default function Contribute() {
  return (
    <div
      className="mt-0 ml-[3vw] mr-[3vw] p-4 sm:p-8 md:p-10 pb-0"
      id="contribute"
    >
      {/* Header Section */}
      <div className="animate-fade-in-up">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl text-white flex items-center gap-3 flex-wrap font-ubuntu">
              Contributions are Welcome!
            </h1>
            <p className="ml-0 mt-3 text-lg sm:text-xl md:text-2xl text-gray-400 max-w-4xl font-ubuntu">
              Flossum is an open-source project, and we are always looking for
              contributions!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
        {/* Image Side */}
        <div className="flex-shrink-0 group animate-slide-in-left">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-3 bg-gradient-to-r from-[#f45455]/30 to-[#ffd47b]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Image container */}
            <div className="relative">
              <Image
                src="/issuesOnGitHub.png"
                alt="GitHub Issues"
                width={450}
                height={180}
                className="rounded-xl shadow-2xl border-2 border-gray-800 group-hover:border-[#f45455] transition-all duration-500 group-hover:scale-105 max-w-[700px] w-full"
              />
            </div>
          </div>
        </div>

        {/* Text Side */}
        <div className="flex-1 animate-slide-in-right">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-white flex items-center gap-3 font-ubuntu">
            <span className="text-3xl">🎯</span>
            Browse and Tackle Issues
          </h2>
          <p className="text-base sm:text-xl mb-6 text-gray-300 leading-relaxed font-ubuntu">
            Check out the available issues on our{" "}
            <a
              href="https://github.com/pushkarscripts/flossum/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#549ff4] hover:text-[#6bb3ff] font-semibold relative inline-flex items-center gap-1 group/link transition-colors duration-200"
            >
              GitHub repository
              <svg
                className="w-4 h-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200"
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
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#549ff4] to-[#6bb3ff] group-hover/link:w-full transition-all duration-300"></span>
            </a>
            . Pick one to work on, or raise your own if you spot something new!
          </p>

          {/* Feature Cards */}
          <div className="space-y-3">
            {[
              {
                icon: "🌱",
                text: "Find beginner-friendly and advanced issues",
              },
              { icon: "💬", text: "Discuss solutions and get feedback" },
              {
                icon: "🐛",
                text: "Help us improve by reporting bugs or suggesting features",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-gray-800 hover:border-[#f45455] transition-all duration-300 hover:shadow-lg hover:shadow-[#f45455]/10 group/item animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="text-2xl flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <p className="text-base sm:text-lg text-gray-300 group-hover/item:text-white transition-colors duration-300 font-ubuntu">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <a
              href="https://github.com/pushkarscripts/flossum/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#f45455] to-[#e63946] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#f45455]/30 transform hover:scale-105 active:scale-95 transition-all duration-300 group/btn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>View GitHub Issues</span>
              <svg
                className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-800 border-2 mt-16 opacity-50" />

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

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out backwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
