"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import DocCard from "../../components/doc-card";

const animations = [
  {
    id: "typewriter",
    name: "Typewriter",
    description: "Types text character by character.",
    cliUsage: 'flossum typeout "Hello World" -s 80',
    jsUsage: 'await flossum.typeOut("Hello World", 80);',
    previewMethod: "typeOut" as const,
    previewArgs: ["Hello World", 80]
  },
  {
    id: "reverse",
    name: "Reverse Type",
    description: "Reveals text starting from the end.",
    cliUsage: 'flossum reverse "Goodbye" -s 60',
    jsUsage: 'await flossum.reverseType("Goodbye", 60);',
    previewMethod: "reverseType" as const,
    previewArgs: ["Goodbye", 60]
  },
  {
    id: "wave",
    name: "Wave",
    description: "Animated wave effect with RGB colors.",
    cliUsage: 'flossum wave "Surfing" -d 3000',
    jsUsage: 'await flossum.wave("Surfing", { duration: 3000 });',
    previewMethod: "wave" as const,
    previewArgs: ["Surfing", { duration: 3000 }]
  },
  {
    id: "glitch",
    name: "Glitch",
    description: "Digital distortion/glitch animation.",
    cliUsage: 'flossum glitch "System Failure" -d 2000 -s 15',
    jsUsage: 'await flossum.glitch("System Failure", { duration: 2000, steps: 15 });',
    previewMethod: "glitch" as const,
    previewArgs: ["System Failure", { duration: 2000, steps: 15 }]
  },
  {
    id: "scramble",
    name: "Scramble",
    description: "Decodes text from random characters.",
    cliUsage: 'flossum scramble "Decrypted" -d 2000',
    jsUsage: 'await flossum.scramble("Decrypted", { duration: 2000 });',
    previewMethod: "scramble" as const,
    previewArgs: ["Decrypted", { duration: 2000 }]
  },
  {
    id: "rainbow",
    name: "Rainbow",
    description: "Cycles text through the color spectrum.",
    cliUsage: 'flossum rainbow "Colors!" -d 3000',
    jsUsage: 'await flossum.rainbow("Colors!", { duration: 3000 });',
    previewMethod: "rainbow" as const,
    previewArgs: ["Colors!", { duration: 3000 }]
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Color pulsing effect (Blue/Cyan).",
    cliUsage: 'flossum pulse "Energy" -d 2500',
    jsUsage: 'await flossum.colorPulse("Energy", 2500);',
    previewMethod: "pulse" as const,
    previewArgs: ["Energy", 2500]
  },
  {
    id: "spinner",
    name: "Spinner",
    description: "Classic loading spinner.",
    cliUsage: 'flossum spinner "Loading..." -d 3000',
    jsUsage: 'await flossum.spinner("Loading...", 3000);',
    previewMethod: "spinner" as const,
    previewArgs: ["Loading...", 3000]
  },
  {
    id: "progress",
    name: "Progress Bar",
    description: "Animated ASCII progress bar.",
    cliUsage: 'flossum progress -w 30 -d 2000',
    jsUsage: 'await flossum.progressBar({ width: 30, duration: 2000 });',
    previewMethod: "progressBar" as const,
    previewArgs: [{ width: 30, duration: 2000 }]
  },
  {
    id: "dots",
    name: "Dots",
    description: "Loading animation with cycling dots.",
    cliUsage: 'flossum dots "Thinking" -c 5',
    jsUsage: 'await flossum.dots("Thinking", { cycles: 5 });',
    previewMethod: "dots" as const,
    previewArgs: ["Thinking", { cycles: 5 }]
  },
  {
    id: "flash",
    name: "Flash",
    description: "Blinks text on and off.",
    cliUsage: 'flossum flash "Alert!" -f 6',
    jsUsage: 'await flossum.flash("Alert!", { flashes: 6 });',
    previewMethod: "flash" as const,
    previewArgs: ["Alert!", { flashes: 6 }]
  },
  {
    id: "type-delete",
    name: "Type-Delete",
    description: "Types text then deletes it.",
    cliUsage: 'flossum typeDelete "Typing..." -d 50',
    jsUsage: 'await flossum.typeDelete("Typing...", { delay: 50 });',
    previewMethod: "typeDelete" as const,
    previewArgs: ["Typing...", { delay: 50, repeat: false }]
  },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const animationIds = animations.map(a => a.id);
      const sections = [
        "introduction",
        "installation",
        "devtools",
        ...animationIds,
        "contributing",
      ];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold for when a section is considered active
          if (rect.top >= -50 && rect.top < 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#12121c] min-h-screen flex flex-col font-ubuntu text-gray-300 overflow-x-hidden">
      <Navbar />

      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-56 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-800 pt-4">
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold mb-3 uppercase tracking-widest text-xs opacity-50">
                  General
                </h3>
                <ul className="space-y-2 border-l border-gray-800 ml-1">
                  <li><button onClick={() => scrollTo("introduction")} className={`pl-4 text-sm hover:text-[#f45455] transition-colors text-left block w-full ${activeSection === "introduction" ? "text-[#f45455] border-l-2 border-[#f45455] -ml-[1px]" : ""}`}>Intro</button></li>
                  <li><button onClick={() => scrollTo("installation")} className={`pl-4 text-sm hover:text-[#f45455] transition-colors text-left block w-full ${activeSection === "installation" ? "text-[#f45455] border-l-2 border-[#f45455] -ml-[1px]" : ""}`}>Install</button></li>
                  <li><button onClick={() => scrollTo("devtools")} className={`pl-4 text-sm hover:text-[#f45455] transition-colors text-left block w-full ${activeSection === "devtools" ? "text-[#f45455] border-l-2 border-[#f45455] -ml-[1px]" : ""}`}>DevTools</button></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-bold mb-3 uppercase tracking-widest text-xs opacity-50">
                  Animations
                </h3>
                <ul className="space-y-2 border-l border-gray-800 ml-1">
                  {animations.map(anim => (
                    <li key={anim.id}>
                      <button
                        onClick={() => scrollTo(anim.id)}
                        className={`pl-4 text-sm hover:text-[#f45455] transition-colors text-left block w-full ${
                          activeSection === anim.id ? "text-[#f45455] border-l-2 border-[#f45455] -ml-[1px]" : ""
                        }`}
                      >
                        {anim.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
               <div>
                <ul className="space-y-2 border-l border-gray-800 ml-1 mt-4">
                  <li><button onClick={() => scrollTo("contributing")} className={`pl-4 text-sm hover:text-[#f45455] transition-colors uppercase tracking-widest text-xs opacity-50 font-bold text-left block w-full ${activeSection === "contributing" ? "text-[#f45455] border-l-2 border-[#f45455] -ml-[1px]" : ""}`}>Contributing</button></li>
                </ul>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-16 lg:pr-12">
          
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-32">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Docs
            </h1>
            <p className="text-xl leading-relaxed text-gray-400 mb-6">
              Beautiful and minimal terminal animations for your CLI projects.
            </p>
            <div className="bg-[#1e1e2e] p-6 rounded-xl border border-gray-800">
              <p className="font-mono text-[#f45455]">
                Note: Flossum is designed for Node.js environments.
              </p>
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              Installation
            </h2>
            <div className="space-y-4">
                <div className="bg-[#0d0d15] p-4 rounded-lg border border-gray-800 font-mono text-gray-300">
                  <span className="text-[#f45455] mr-2">$</span> npm install flossum
                </div>
                <div className="bg-[#0d0d15] p-4 rounded-lg border border-gray-800 font-mono text-gray-300">
                  <span className="text-[#f45455] mr-2">$</span> npm install -g flossum
                </div>
            </div>
          </section>

          {/* DevTools Extension */}
          <section id="devtools" className="scroll-mt-32">
            <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-2">
                <h2 className="text-3xl font-bold text-white">
                VS Code Extension
                </h2>
                <span className="bg-[#f45455] text-white text-xs font-bold px-2 py-1 rounded">RECOMMENDED</span>
            </div>
            
            <p className="text-lg text-gray-400 mb-6">
              Accelerate your development workflow with the official <strong>Flossum DevTools</strong> extension for Visual Studio Code.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#1e1e2e] p-5 rounded-xl border border-gray-800">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Snippets
                    </h3>
                    <p className="text-sm text-gray-400">
                        Type <code className="text-[#f45455] bg-black/30 px-1 rounded">ftype</code>, <code className="text-[#f45455] bg-black/30 px-1 rounded">fspin</code>, or <code className="text-[#f45455] bg-black/30 px-1 rounded">fwave</code> to instantly generate boilerplate code.
                    </p>
                </div>
                <div className="bg-[#1e1e2e] p-5 rounded-xl border border-gray-800">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Hover Docs
                    </h3>
                    <p className="text-sm text-gray-400">
                        Hover over any <code className="text-white bg-black/30 px-1 rounded">flossum</code> function to see parameter details, types, and usage examples directly in your editor.
                    </p>
                </div>
            </div>

            <a 
                href="https://marketplace.visualstudio.com/items?itemName=pushkarscripts.flossum-devtools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#007acc] hover:bg-[#0063a5] text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587l-9.86-2.587-13.29 12.001 13.29 11.999 9.86-2.589v-18.824zm-9.86 16.626l-7.77-6.526 7.77-7.662v14.188zm1.613-15.656l6.637 1.833v13.334l-6.637 1.733v-16.9z"/></svg>
                Install from VS Marketplace
            </a>
          </section>

          {/* Animations List */}
          <section id="animations" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-800 pb-2">
              Animations
            </h2>

            <div className="flex flex-col gap-12">
              {animations.map((anim, index) => (
                <div key={index} id={anim.id} className="scroll-mt-32">
                  <DocCard {...anim} />
                </div>
              ))}
            </div>
          </section>

          {/* Contributing */}
          <section id="contributing" className="scroll-mt-32">
            <h2 className="text-3xl font-bold text-white mb-6 border-b border-gray-800 pb-2">
              Contributing
            </h2>
            <div className="bg-[#1e1e2e] p-6 rounded-xl border border-gray-800 text-sm">
                <ul className="space-y-2 list-decimal pl-5">
                    <li>Fork the repo.</li>
                    <li>Create a branch: <code className="text-[#f45455]">git checkout -b feature/name</code></li>
                    <li>Add your animation in <code className="text-gray-400">flossum/lib/</code></li>
                    <li>Submit a Pull Request!</li>
                </ul>
            </div>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
