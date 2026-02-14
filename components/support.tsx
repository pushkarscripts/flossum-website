"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Star, Coffee, Heart } from "lucide-react";

interface Contributor {
  login: string;
  avatar_url: string;
  html_url: string;
}

export default function Support() {
  const [starCount, setStarCount] = useState(0);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    // Fetch star count
    fetch("https://api.github.com/repos/pushkarscripts/flossum")
      .then((res) => res.json())
      .then((data) => setStarCount(data.stargazers_count || 0))
      .catch(() => setStarCount(0));

    // Fetch contributors
    const fetchContributors = async () => {
      try {
        const [flossumRes, devtoolsRes, websiteRes] = await Promise.all([
          fetch(
            "https://api.github.com/repos/pushkarscripts/flossum/contributors"
          ),
          fetch(
            "https://api.github.com/repos/pushkarscripts/flossum-devtools/contributors"
          ),
          fetch(
            "https://api.github.com/repos/pushkarscripts/flossum-website/contributors"
          ),
        ]);
        const flossumData = await flossumRes.json();
        const devtoolsData = await devtoolsRes.json();
        const websiteData = await websiteRes.json();
        const allContributors = new Map();
        [...flossumData, ...devtoolsData, ...websiteData].forEach((contrib) => {
          if (contrib.login) {
            allContributors.set(contrib.login, contrib);
          }
        });
        setContributors(Array.from(allContributors.values()));
      } catch {
        setContributors([]);
      }
    };
    fetchContributors();
  }, []);

  return (
    <section
      className="mt-0 ml-[3vw] p-4 sm:p-8 md:p-10 pb-0 flex flex-col relative overflow-hidden"
      id="support"
    >
      {/* Subtle background gradient decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl -z-10" />

      {/* 🏷️ Title Section */}
      <div className="flex flex-col gap-3 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent font-ubuntu">
          Support Us
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed font-ubuntu">
          If you find{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            Flossum
          </span>{" "}
          useful, consider supporting us to keep the project alive{" "}
          <span className="inline-block animate-pulse">💫</span>
        </p>
      </div>

      {/* 💖 Support Cards */}
      <div className="flex flex-wrap gap-6 mb-16 items-center">
        {/* GitHub Star */}
        <div
          onClick={() =>
            window.open(
              "https://github.com/pushkarscripts/flossum",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="group relative hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-left-8 delay-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 dark:from-yellow-300/10 dark:to-orange-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          <div className="relative bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl overflow-hidden border border-gray-800 group-hover:border-[#f45455] transition-all duration-300 hover:shadow-lg hover:shadow-[#f45455]/10 flex items-center justify-center px-6 py-3">
            <div className="flex items-center gap-3">
              <Star className="w-10 h-10 text-yellow-500" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">
                  Star on Github
                </span>
                <span className="text-base text-gray-300">
                  {starCount} stars
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buy Me a Coffee */}
        <a
          href="https://buymeacoffee.com/pushkarscripts"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-left-8 delay-200"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 dark:from-yellow-400/10 dark:to-amber-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          <div className="relative bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl overflow-hidden border border-gray-800 group-hover:border-[#f45455] transition-all duration-300 hover:shadow-lg hover:shadow-[#f45455]/10 flex items-center justify-center px-6 py-3">
            <div className="flex items-center gap-3">
              <Coffee className="w-10 h-10 text-amber-600" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Buy Me</span>
                <span className="text-base text-gray-300">a Coffee</span>
              </div>
            </div>
          </div>
        </a>

        {/* GitHub Sponsor */}
        <div
          onClick={() =>
            window.open(
              "https://github.com/sponsors/pushkarscripts",
              "_blank",
              "noopener,noreferrer"
            )
          }
          className="group relative hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-left-8 delay-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20 dark:from-pink-400/10 dark:to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
          <div className="relative bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl overflow-hidden border border-gray-800 group-hover:border-[#f45455] transition-all duration-300 hover:shadow-lg hover:shadow-[#f45455]/10 flex items-center justify-center px-6 py-3">
            <div className="flex items-center gap-3">
              <Heart className="w-10 h-10 text-pink-500" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">Sponsor</span>
                <span className="text-base text-gray-300">on GitHub</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🙏 Contributors Section */}
      <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent font-ubuntu">
          Thanks to our Contributors 💕
        </h2>
        <div className="flex flex-wrap gap-8 items-center">
          {contributors.map((contributor, index) => (
            <div
              key={index}
              onClick={() =>
                window.open(
                  contributor.html_url,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="group flex flex-col items-center cursor-pointer animate-in fade-in zoom-in-95 duration-500"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 dark:from-purple-400/20 dark:to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />

                {/* Avatar ring */}
                <div className="relative p-1 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full group-hover:from-purple-400 group-hover:to-blue-500 dark:group-hover:from-purple-400 dark:group-hover:to-blue-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <div className="bg-white dark:bg-gray-800 rounded-full p-0.5">
                    <Image
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      width={80}
                      height={80}
                      className="rounded-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Tooltip */}
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  @{contributor.login}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
