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
    <div className="w-full min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 transition-colors duration-300">
      <div className="w-full min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full border-b border-primary/10 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary tracking-tight">
                  TypeMaster
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Test & improve your typing speed
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
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/10 rounded-2xl p-4 border border-primary/10">
              {/* Duration Selector */}
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground mr-2">
                  Duration:
                </span>
                <div className="flex gap-1 bg-background rounded-lg p-1">
                  {durations.map((d) => (
                    <button
                      key={d}
                      onClick={() => handleDurationChange(d)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                        duration === d
                          ? "bg-primary text-white shadow-md"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Text
                </button>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-background/50 px-3 py-2 rounded-lg">
                  <Zap className="w-3 h-3" />
                  <span>
                    Press{" "}
                    <kbd className="px-1 py-0.5 bg-primary/10 rounded text-primary">
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
              <div className="flex items-center gap-2 bg-secondary/10 px-3 py-2 rounded-lg">
                <kbd className="px-1.5 py-0.5 bg-primary/10 rounded text-primary font-mono">
                  Tab
                </kbd>
                <span>Restart test</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/10 px-3 py-2 rounded-lg">
                <kbd className="px-1.5 py-0.5 bg-primary/10 rounded text-primary font-mono">
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
