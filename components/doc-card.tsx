"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FlossumEngine, ITerminal } from "../utils/engine";

interface DocCardProps {
  name: string;
  description: string;
  cliUsage: string;
  jsUsage: string;
  previewMethod: keyof FlossumEngine;
  previewArgs: unknown[];
}

// Simple ANSI to HTML parser for the preview
const ansiToHtml = (text: string) => {
  let html = text
    .replace(/\r\x1b\[2K/g, "") // Remove clear line codes as we handle full replacement
    .replace(/\x1b\[0m/g, "</span>")
    .replace(/\x1b\[31m/g, '<span style="color: #ef4444">') // red
    .replace(/\x1b\[32m/g, '<span style="color: #22c55e">') // green
    .replace(/\x1b\[33m/g, '<span style="color: #eab308">') // yellow
    .replace(/\x1b\[34m/g, '<span style="color: #3b82f6">') // blue
    .replace(/\x1b\[35m/g, '<span style="color: #d946ef">') // magenta
    .replace(/\x1b\[36m/g, '<span style="color: #06b6d4">') // cyan
    .replace(/\x1b\[37m/g, '<span style="color: #f3f4f6">') // white
    .replace(/\x1b\[91m/g, '<span style="color: #f87171">'); // redBright

  // Handle RGB: \x1b[38;2;R;G;Bm
  html = html.replace(/\x1b\[38;2;(\d+);(\d+);(\d+)m/g, (_, r, g, b) => {
    return `<span style="color: rgb(${r}, ${g}, ${b})">`;
  });

  return html;
};

export default function DocCard({
  name,
  description,
  cliUsage,
  jsUsage,
  previewMethod,
  previewArgs,
}: DocCardProps) {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const engineRef = useRef<FlossumEngine | null>(null);

  // Virtual Terminal Implementation
  const terminal: ITerminal = {
    write: (text: string) => {
      if (text.startsWith("\r\x1b[2K")) {
        setOutput(ansiToHtml(text));
      } else {
        setOutput((prev) => prev + ansiToHtml(text));
      }
    },
    writeln: (text: string) => {
      setOutput((prev) => prev + ansiToHtml(text) + "<br/>");
    },
  };

  useEffect(() => {
    engineRef.current = new FlossumEngine(terminal);
  }, [terminal]);

  const runPreview = async () => {
    if (isRunning || !engineRef.current) return;
    setIsRunning(true);
    setOutput(""); // Clear previous output
    
    const engine = engineRef.current;
    
    // Explicitly check and cast to animation method type
    const method = engine[previewMethod] as unknown as (...args: unknown[]) => Promise<void>;
    
    if (typeof method === "function") {
        await method.apply(engine, previewArgs);
    }
    
    setIsRunning(false);
  };

  const [copied, setCopied] = useState<string | null>(null);
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-[#1e1e2e]/50 border border-gray-800 rounded-2xl p-6 hover:border-[#f45455]/30 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
        <div>
          <h3 className="text-2xl font-bold text-white font-ubuntu flex items-center gap-3">
            {name}
          </h3>
          <p className="text-gray-400 mt-1">{description}</p>
        </div>
        <button
          onClick={runPreview}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${ 
            isRunning
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-[#f45455] text-white hover:bg-[#ff6b6b] shadow-lg shadow-[#f45455]/20 hover:scale-105"
          }`}
        >
          {isRunning ? (
             <>
               <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               Running...
             </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Run Preview
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Usage Column */}
        <div className="space-y-4">
          
          {/* CLI Usage */}
          <div className="group relative">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Terminal Usage</label>
            <div className="bg-[#0d0d15] p-3 rounded-lg border border-gray-800 font-mono text-sm text-gray-300 flex justify-between items-center group-hover:border-gray-700 transition-colors">
              <code className="truncate mr-2">{cliUsage}</code>
              <button onClick={() => copyToClipboard(cliUsage, 'cli')} className="text-gray-500 hover:text-white transition-colors">
                {copied === 'cli' ? <span className="text-green-400 text-xs">Copied</span> : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                )}
              </button>
            </div>
          </div>

          {/* JS Usage */}
          <div className="group relative">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">JS/TS Usage</label>
            <div className="bg-[#0d0d15] p-3 rounded-lg border border-gray-800 font-mono text-sm text-gray-300 flex justify-between items-center group-hover:border-gray-700 transition-colors">
              <code className="truncate mr-2 text-blue-300">{jsUsage}</code>
              <button onClick={() => copyToClipboard(jsUsage, 'js')} className="text-gray-500 hover:text-white transition-colors">
                {copied === 'js' ? <span className="text-green-400 text-xs">Copied</span> : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* Preview Column */}
        <div className="flex flex-col">
           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Live Preview</label>
           <div className="flex-grow bg-black rounded-lg border border-gray-800 p-4 font-mono text-sm min-h-[100px] flex items-center justify-center relative overflow-hidden">
              {/* Output Display */}
              <div 
                className="w-full text-center"
                dangerouslySetInnerHTML={{ __html: output || '<span class="text-gray-700">Click "Run Preview" to start</span>' }}
              />
           </div>
        </div>
      </div>
    </div>
  );
}
