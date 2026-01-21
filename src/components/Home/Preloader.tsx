"use client";

import React, { useEffect, useState } from "react";

const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [typingText, setTypingText] = useState("");
  const fullText = "TypeMaster";

  // Typing animation
  useEffect(() => {
    if (typingText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingText(fullText.slice(0, typingText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [typingText]);

  // Progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-pink-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated Logo */}
        <div className="relative">
          {/* Spinning ring */}
          <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin-slow" />
          <div className="absolute inset-1 w-26 h-26 rounded-full border-4 border-transparent border-b-pink-500 border-l-cyan-500 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "6s" }} />

          {/* Center icon */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[3px] animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <svg
                className="w-14 h-14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                {/* Keyboard */}
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <line x1="6" y1="10" x2="6" y2="10" strokeWidth="2" />
                <line x1="10" y1="10" x2="10" y2="10" strokeWidth="2" />
                <line x1="14" y1="10" x2="14" y2="10" strokeWidth="2" />
                <line x1="18" y1="10" x2="18" y2="10" strokeWidth="2" />
                <line x1="8" y1="14" x2="16" y2="14" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-blue-500 animate-float shadow-lg shadow-blue-500/50" style={{ animationDelay: "0s" }} />
          <div className="absolute -bottom-2 -left-4 w-3 h-3 rounded-full bg-purple-500 animate-float shadow-lg shadow-purple-500/50" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-1/2 -right-5 w-2 h-2 rounded-full bg-pink-500 animate-float shadow-lg shadow-pink-500/50" style={{ animationDelay: "1s" }} />
          <div className="absolute -top-1 -left-3 w-2 h-2 rounded-full bg-cyan-500 animate-float shadow-lg shadow-cyan-500/50" style={{ animationDelay: "1.5s" }} />
        </div>

        {/* Brand name with rainbow text */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-5xl font-bold">
            <span className="gradient-text">{typingText}</span>
            <span className="animate-typing-cursor text-blue-500">|</span>
          </h1>
          <p className="text-muted-foreground text-base">
            AI-Powered Typing Speed Test
          </p>
        </div>

        {/* Rainbow progress bar */}
        <div className="w-72 flex flex-col items-center gap-3">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full progress-rainbow rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-blue-500 font-medium">{progress}%</span>
            <span>Loading</span>
            <span className="flex gap-0.5">
              <span className="animate-bounce text-blue-500" style={{ animationDelay: "0ms" }}>.</span>
              <span className="animate-bounce text-purple-500" style={{ animationDelay: "150ms" }}>.</span>
              <span className="animate-bounce text-pink-500" style={{ animationDelay: "300ms" }}>.</span>
            </span>
          </div>
        </div>

        {/* Colorful tips */}
        <div className="mt-2 text-center max-w-sm">
          <p className="text-sm text-muted-foreground">
            <span className="text-blue-500 font-medium">Pro Tip:</span>{" "}
            Press{" "}
            <kbd className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded border border-blue-500/30 text-blue-500">Tab</kbd>{" "}
            to restart anytime
          </p>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          <span className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
            Real-time WPM
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
            120+ Texts
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-pink-500/10 text-pink-500 border border-pink-500/20">
            Progress Tracking
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
