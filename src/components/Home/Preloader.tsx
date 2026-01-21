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
      }, 100);
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
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated Keyboard Icon */}
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px] animate-pulse-glow">
            <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Keyboard base */}
                <rect x="2" y="6" width="20" height="12" rx="2" />
                {/* Top row keys */}
                <rect x="4" y="8" width="2" height="1.5" rx="0.25" className="fill-primary/30" />
                <rect x="7" y="8" width="2" height="1.5" rx="0.25" className="fill-primary/30" />
                <rect x="10" y="8" width="2" height="1.5" rx="0.25" className="fill-primary/30" />
                <rect x="13" y="8" width="2" height="1.5" rx="0.25" className="fill-primary/30" />
                <rect x="16" y="8" width="2" height="1.5" rx="0.25" className="fill-primary/30" />
                <rect x="19" y="8" width="1" height="1.5" rx="0.25" className="fill-primary/30" />
                {/* Middle row keys */}
                <rect x="4" y="10.5" width="2" height="1.5" rx="0.25" className="fill-secondary/30" />
                <rect x="7" y="10.5" width="2" height="1.5" rx="0.25" className="fill-secondary/30" />
                <rect x="10" y="10.5" width="2" height="1.5" rx="0.25" className="fill-secondary/30" />
                <rect x="13" y="10.5" width="2" height="1.5" rx="0.25" className="fill-secondary/30" />
                <rect x="16" y="10.5" width="4" height="1.5" rx="0.25" className="fill-secondary/30" />
                {/* Bottom row - spacebar */}
                <rect x="6" y="13" width="12" height="2" rx="0.5" className="fill-accent/30" />
                {/* Animated pressing key */}
                <rect
                  x="10"
                  y="10.5"
                  width="2"
                  height="1.5"
                  rx="0.25"
                  className="fill-primary animate-bounce-subtle"
                  style={{ animationDuration: "0.5s" }}
                />
              </svg>
            </div>
          </div>

          {/* Floating particles */}
          <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-primary/50 animate-float" style={{ animationDelay: "0s" }} />
          <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-secondary/50 animate-float" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-1/2 -right-4 w-2 h-2 rounded-full bg-accent/50 animate-float" style={{ animationDelay: "1s" }} />
        </div>

        {/* Brand name with typing effect */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">{typingText}</span>
            <span className="animate-typing-cursor text-primary">|</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Test & improve your typing speed
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 flex flex-col items-center gap-2">
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Loading</span>
            <span className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
            </span>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 text-center max-w-xs">
          <p className="text-xs text-muted-foreground/70">
            <span className="text-primary">Tip:</span> Press{" "}
            <kbd className="px-1.5 py-0.5 text-[10px] bg-muted rounded border border-border">Tab</kbd>{" "}
            to restart the test anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
