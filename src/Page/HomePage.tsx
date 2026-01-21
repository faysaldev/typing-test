"use client";

import { useEffect, useState, useCallback } from "react";
import Preloader from "../components/Home/Preloader";
import Footer from "../components/Home/Footer";
import getText from "../lib/data/getText";
import TypingTest from "../components/TypingTest";
import {
  Keyboard,
  Timer,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  RotateCcw,
  Zap,
} from "lucide-react";

type TimeDuration = 15 | 30 | 60 | 120;

// Helper to get initial theme
const getInitialTheme = (): boolean => {
  if (typeof window === "undefined") return false;
  const savedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return savedTheme ? savedTheme === "dark" : systemDark;
};

// Helper to get initial sound preference
const getInitialSound = (): boolean => {
  if (typeof window === "undefined") return false;
  const saved = localStorage.getItem("soundEnabled");
  return saved === "true";
};

const HomePage = () => {
  const [preloader, setPreloader] = useState(true);
  const [text, setText] = useState(getText());
  const [duration, setDuration] = useState<TimeDuration>(60);
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [soundEnabled, setSoundEnabled] = useState(getInitialSound);
  const [testKey, setTestKey] = useState(0);

  // Apply theme class on mount and when isDarkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Preloader: avoid setState in effect warnings
  useEffect(() => {
    const id = requestAnimationFrame(() => setPreloader(false));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleReset = useCallback(() => {
    setText(getText());
    setTestKey((prev) => prev + 1);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    setIsDarkMode(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  const toggleSound = () => {
    const newSound = !soundEnabled;
    setSoundEnabled(newSound);
    localStorage.setItem("soundEnabled", String(newSound));
  };

  const handleDurationChange = (newDuration: TimeDuration) => {
    setDuration(newDuration);
    handleReset();
  };

  const durations: TimeDuration[] = [15, 30, 60, 120];

  return (
    <div className="w-full min-h-screen gradient-bg transition-colors duration-300">
      <div className="w-full min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full border-b border-border/50 glass-strong sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:glow-blue transition-all">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text-static tracking-tight">
                  TypeMaster
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  AI-Powered Typing Speed Test
                </p>
              </div>
            </div>

            {/* Settings */}
            <div className="flex items-center gap-2">
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                title={soundEnabled ? "Mute sounds" : "Enable sounds"}
              >
                {soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-primary" />
                ) : (
                  <VolumeX className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                title={isDarkMode ? "Light mode" : "Dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-5xl w-full mx-auto">
            {/* Controls Bar */}
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 glass rounded-2xl p-4 border border-border/50">
              {/* Duration Selector */}
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground mr-2">
                  Duration:
                </span>
                <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => handleDurationChange(d)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        duration === d
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                      }`}
                    >
                      {d}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 text-primary transition-all text-sm font-medium border border-primary/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Text
                </button>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg border border-border/50">
                  <Zap className="w-3 h-3 text-accent" />
                  <span>
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-primary/20 rounded text-primary border border-primary/30">
                      Tab
                    </kbd>{" "}
                    to restart
                  </span>
                </div>
              </div>
            </div>

            {/* Typing Test Component */}
            <TypingTest
              key={testKey}
              text={text}
              onreset={handleReset}
              duration={duration}
              soundEnabled={soundEnabled}
            />

            {/* Keyboard Shortcuts Info */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg border border-border/30">
                <kbd className="px-1.5 py-0.5 bg-primary/20 rounded text-primary font-mono border border-primary/30">
                  Tab
                </kbd>
                <span>Restart test</span>
              </div>
              <div className="flex items-center gap-2 glass px-3 py-2 rounded-lg border border-border/30">
                <kbd className="px-1.5 py-0.5 bg-secondary/20 rounded text-secondary font-mono border border-secondary/30">
                  Esc
                </kbd>
                <span>End test</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />

        {/* Preloader */}
        {preloader && <Preloader />}
      </div>
    </div>
  );
};

export default HomePage;
