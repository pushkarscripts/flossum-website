"use client";
import React, { useEffect, useRef, useState } from "react";
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

// --- Utility & Animation Logic (Ported for Browser) ---

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ANSI Color Helpers
const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",
  redBright: "\x1b[91m",
};

const rgb = (r: number, g: number, b: number) => `\x1b[38;2;${r};${g};${b}m`;

class FlossumEngine {
  term: Terminal;

  constructor(term: Terminal) {
    this.term = term;
  }

  async typeOut(text: string, speed = 50) {
    for (const char of text) {
      this.term.write(char);
      await sleep(speed);
    }
    this.term.writeln("");
  }

  async spinner(text = "", duration = 2000) {
    const frames = ["|", "/", "-", "\\"];
    const interval = 100;
    const cycles = Math.ceil(duration / interval);

    for (let i = 0; i < cycles; i++) {
      const frame = frames[i % frames.length];
      this.term.write(`\r\x1b[2K${frame} ${text}`);
      await sleep(interval);
    }
    this.term.writeln("");
  }

  async rainbow(text: string, { duration = 2000 } = {}) {
    const frames = 20;
    const colorKeys = ["red", "yellow", "green", "cyan", "blue", "magenta"];

    for (let i = 0; i < frames; i++) {
      const colored = text
        .split("")
        .map((char, idx) => {
            // @ts-ignore
          const colorCode = colors[colorKeys[(i + idx) % colorKeys.length]];
          return `${colorCode}${char}${colors.reset}`;
        })
        .join("");
      this.term.write(`\r\x1b[2K${colored}`);
      await sleep(duration / frames);
    }
    this.term.writeln("");
  }

  async wave(text: string, { duration = 2000 } = {}) {
    const frames = 10;
    const waveHeight = 3;

    for (let i = 0; i < frames; i++) {
      const frame = text
        .split("")
        .map((char, idx) => {
          const offset = Math.sin((i + idx) / 2) * waveHeight;
          const r = Math.max(0, Math.min(255, Math.round(255 - offset * 20)));
          const g = Math.max(0, Math.min(255, Math.round(100 + offset * 30)));
          const b = 255;
          return `${rgb(r, g, b)}${char}${colors.reset}`;
        })
        .join("");

      this.term.write(`\r\x1b[2K${frame}`);
      await sleep(duration / frames);
    }
    this.term.writeln("");
  }

  async glitch(text: string, { duration = 2000, steps = 10 } = {}) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,<.>/";
    const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

    for (let i = 0; i < steps; i++) {
      const glitched = text
        .split("")
        .map((char) =>
          Math.random() < 0.3
            ? `${colors.redBright}${randomChar()}${colors.reset}`
            : char
        )
        .join("");
      this.term.write(`\r\x1b[2K${glitched}`);
      await sleep(duration / steps);
    }
    this.term.write(`\r\x1b[2K${text}\n`);
  }

  async scramble(text: string, { duration = 1000 } = {}) {
    const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const steps = text.length;

    for (let i = 0; i <= steps; i++) {
      const scrambled = text
        .split("")
        .map((char, idx) => {
          if (idx < i) return char;
          return pool[Math.floor(Math.random() * pool.length)];
        })
        .join("");
      this.term.write(`\r\x1b[2K${scrambled}`);
      await sleep(duration / steps);
    }
    this.term.writeln("");
  }
}

// --- Component ---

export default function Playground() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const engineRef = useRef<FlossumEngine | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Command History
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef(-1);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // Initialize xterm.js
    const term = new Terminal({
      cursorBlink: true,
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: 16,
      theme: {
        background: "#1e1e2e",
        foreground: "#cdd6f4",
        cursor: "#ffffff",
        selectionBackground: "rgba(244, 84, 85, 0.3)",
      },
      rows: 15,
      allowProposedApi: true,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    xtermRef.current = term;
    fitAddonRef.current = fitAddon;
    engineRef.current = new FlossumEngine(term);

    // Initial greeting
    term.writeln("\x1b[38;2;244;84;85mFlossum Interactive Shell v1.1.2\x1b[0m");
    term.writeln("Type \x1b[36mhelp\x1b[0m to see available commands.\n");
    prompt();

    // Input Handling
    let currentLine = "";

    term.onKey(({ key, domEvent }) => {
      // Prevent input if an animation is running
      if (engineRef.current && (engineRef.current as any).processing) return;

      const ev = domEvent;
      const printable = !ev.altKey && !ev.ctrlKey && !ev.metaKey;

      if (ev.keyCode === 13) {
        // Enter
        term.write("\r\n");
        handleCommand(currentLine.trim());
        currentLine = "";
        historyIndex.current = -1;
      } else if (ev.keyCode === 8) {
        // Backspace
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write("\b \b");
        }
      } else if (ev.keyCode === 38) {
        // Up Arrow (History)
        if (historyIndex.current < commandHistory.current.length - 1) {
            historyIndex.current++;
            const cmd = commandHistory.current[commandHistory.current.length - 1 - historyIndex.current];
            // Clear current line
            while(currentLine.length > 0) {
                term.write("\b \b");
                currentLine = currentLine.slice(0, -1);
            }
            term.write(cmd);
            currentLine = cmd;
        }
      } else if (printable) {
        currentLine += key;
        term.write(key);
      }
    });

    // Resize listener
    const handleResize = () => fitAddon.fit();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
      xtermRef.current = null;
    };
  }, []);

  const prompt = () => {
    xtermRef.current?.write("\r\n\x1b[32muser@flossum\x1b[0m:\x1b[34m~\x1b[0m$ ");
  };

  const handleCommand = async (input: string) => {
    if (!input) {
      prompt();
      return;
    }

    if (!xtermRef.current || !engineRef.current) return;
    const term = xtermRef.current;
    const engine = engineRef.current;

    // Add to history
    if (input.trim() !== "") {
        commandHistory.current.push(input);
    }

    // Mark processing to lock input
    (engine as any).processing = true;
    setIsProcessing(true);

    const fullArgs = input.match(/(?:[^\s"]+|"[^"]*")+/g)?.map(arg => arg.replace(/^"|"$/g, '')) || [];
    
    // Check if it starts with 'flossum'
    let cmd = fullArgs[0]?.toLowerCase();
    let args = fullArgs.slice(1);

    if (cmd === "flossum") {
      cmd = fullArgs[1]?.toLowerCase();
      args = fullArgs.slice(2);
    }

    try {
      if (cmd === "help") {
        term.writeln("\r\nAvailable Commands:");
        term.writeln("  Usage: \x1b[33mflossum <command> [text]\x1b[0m");
        term.writeln("");
        term.writeln("  \x1b[36mtypeout\x1b[0m    - Typewriter effect");
        term.writeln("  \x1b[36mspinner\x1b[0m    - Loading spinner");
        term.writeln("  \x1b[36mwave\x1b[0m       - Color wave effect");
        term.writeln("  \x1b[36mglitch\x1b[0m     - Text glitch effect");
        term.writeln("  \x1b[36mrainbow\x1b[0m    - Rainbow color cycle");
        term.writeln("  \x1b[36mscramble\x1b[0m   - Text scramble reveal");
        term.writeln("  \x1b[36mclear\x1b[0m      - Clear terminal");
      } else if (cmd === "clear") {
        term.clear();
      } else if (cmd === "typeout") {
        const text = args.join(" ") || "Hello World";
        await engine.typeOut(text);
      } else if (cmd === "spinner") {
        const text = args.join(" ") || "Loading...";
        await engine.spinner(text);
      } else if (cmd === "wave") {
        const text = args.join(" ") || "Flossum Wave";
        await engine.wave(text);
      } else if (cmd === "glitch") {
        const text = args.join(" ") || "System Failure";
        await engine.glitch(text);
      } else if (cmd === "rainbow") {
        const text = args.join(" ") || "Taste the Rainbow";
        await engine.rainbow(text);
      } else if (cmd === "scramble") {
        const text = args.join(" ") || "Decryption Complete";
        await engine.scramble(text);
      } else {
        if (fullArgs[0]?.toLowerCase() === "flossum" && !fullArgs[1]) {
            term.writeln("\r\nUsage: flossum <command> [text]");
        } else {
            term.writeln(`\r\nCommand not found: ${cmd || fullArgs[0]}`);
        }
      }
    } catch (e) {
      term.writeln(`\r\nError: ${e}`);
    }

    (engine as any).processing = false;
    setIsProcessing(false);
    prompt();
  };

  return (
    <div className="mt-16 pb-0" id="playground">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-ubuntu text-white tracking-tight">
            Live Playground
          </h1>
          <p className="ml-0 m-1 text-lg sm:text-xl md:text-2xl font-ubuntu text-gray-400">
            Try Flossum in Action. Right here. Right now. Straight from your
            browser.
          </p>
        </div>
      </div>

      <div
        className="w-full bg-[#1e1e2e] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 relative group"
      >
         {/* Terminal Title Bar */}
         <div className="bg-[#181825] px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                flossum-shell — 80x15
            </div>
            <div className="w-12" /> {/* Spacer */}
         </div>

         {/* Terminal Container */}
         <div ref={terminalRef} className="w-full h-[400px] p-4 pt-2" />

         {/* Processing Indicator */}
         {isProcessing && (
            <div className="absolute bottom-4 right-6 flex items-center gap-2 bg-[#f45455] text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                RUNNING
            </div>
         )}
         
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-700 pointer-events-none uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            Terminal Emulator
         </div>
      </div>
    </div>
  );
}
