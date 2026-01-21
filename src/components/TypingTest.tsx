"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  ShareIcon,
  CopyIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  Zap,
  Target,
  Clock,
  Type,
  Award,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

interface TypingTestProps {
  text: string;
  onreset?: () => void;
  duration?: number;
  soundEnabled?: boolean;
}

interface StoredResult {
  wpm: number;
  accuracy: number;
  time: number;
  correctChars: number;
  incorrectChars: number;
  date: string;
  rawWpm: number;
  cpm: number;
}

const TypingTest: React.FC<TypingTestProps> = ({
  text,
  onreset,
  duration = 60,
  soundEnabled = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isActive, setIsActive] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [previousResult, setPreviousResult] = useState<StoredResult | null>(
    null
  );
  const [comparison, setComparison] = useState<{
    wpmDiff: number;
    accuracyDiff: number;
  } | null>(null);
  const [stats, setStats] = useState({
    wpm: 0,
    rawWpm: 0,
    cpm: 0,
    accuracy: 0,
    time: 0,
    correctChars: 0,
    incorrectChars: 0,
  });
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(100);
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Reset duration when prop changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Load previous results from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem("typingTestResults");
    if (savedResults) {
      const results: StoredResult[] = JSON.parse(savedResults);
      if (results.length > 0) {
        setPreviousResult(results[0]);
      }
    }
  }, []);

  // Play sound effect
  const playKeySound = useCallback(() => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.value = 0.1;

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.05
    );
    oscillator.stop(audioContext.currentTime + 0.05);
  }, [soundEnabled]);

  // Function to save results to localStorage
  const saveResultsToStorage = useCallback((result: typeof stats) => {
    const currentDate = new Date().toISOString();
    const newResult: StoredResult = {
      wpm: result.wpm,
      rawWpm: result.rawWpm,
      cpm: result.cpm,
      accuracy: result.accuracy,
      time: result.time,
      correctChars: result.correctChars,
      incorrectChars: result.incorrectChars,
      date: currentDate,
    };

    localStorage.setItem("typingTestResults", JSON.stringify([newResult]));
    setPreviousResult(newResult);
  }, []);

  // Function to calculate comparison with previous result
  const calculateComparison = useCallback(
    (current: typeof stats, previous: StoredResult | null) => {
      if (!previous) return null;

      return {
        wpmDiff: current.wpm - previous.wpm,
        accuracyDiff: current.accuracy - previous.accuracy,
      };
    },
    []
  );

  // End the typing test - defined with useCallback for proper hoisting
  const endTest = useCallback(() => {
    setIsActive(false);

    setStats(() => {
      // Calculate final stats
      const currentInputValue = inputValue;
      const currentStartTime = startTime;
      const currentTimeLeft = timeLeft;

      const elapsedTime = currentStartTime
        ? (Date.now() - currentStartTime) / 1000 / 60
        : 1;
      const correctChars = currentInputValue
        .split("")
        .filter((char, i) => char === text[i]).length;
      const totalChars = currentInputValue.length;
      const incorrectChars = totalChars - correctChars;

      const rawWpm =
        elapsedTime > 0 ? Math.round(totalChars / 5 / elapsedTime) : 0;
      const wpm =
        elapsedTime > 0 ? Math.round(correctChars / 5 / elapsedTime) : 0;
      const cpm = elapsedTime > 0 ? Math.round(correctChars / elapsedTime) : 0;
      const accuracy =
        totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

      const newStats = {
        wpm,
        rawWpm,
        cpm,
        accuracy,
        time: duration - currentTimeLeft,
        correctChars,
        incorrectChars,
      };

      // Save and calculate comparison
      saveResultsToStorage(newStats);
      const comparisonResult = calculateComparison(newStats, previousResult);
      setComparison(comparisonResult);
      setResultsOpen(true);

      return newStats;
    });
  }, [
    inputValue,
    startTime,
    timeLeft,
    text,
    duration,
    previousResult,
    saveResultsToStorage,
    calculateComparison,
  ]);

  // Reset the test - defined with useCallback for proper hoisting
  const resetTest = useCallback(() => {
    setInputValue("");
    setCurrentIndex(0);
    setStartTime(null);
    setTimeLeft(duration);
    setIsActive(false);
    setResultsOpen(false);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setStats({
      wpm: 0,
      rawWpm: 0,
      cpm: 0,
      accuracy: 0,
      time: 0,
      correctChars: 0,
      incorrectChars: 0,
    });

    if (textareaRef.current) {
      textareaRef.current.focus();
    }

    if (onreset) {
      onreset();
    }
  }, [duration, onreset]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        resetTest();
      }
      if (e.key === "Escape" && isActive) {
        e.preventDefault();
        endTest();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, resetTest, endTest]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Handle timer reaching zero
  useEffect(() => {
    if (timeLeft === 0 && isActive) {
      endTest();
    }
  }, [timeLeft, isActive, endTest]);

  // Calculate live stats
  useEffect(() => {
    if (isActive && startTime && inputValue.length > 0) {
      const elapsedTime = (Date.now() - startTime) / 1000 / 60;
      const correctChars = inputValue
        .split("")
        .filter((char, i) => char === text[i]).length;
      const totalChars = inputValue.length;

      const netWpm = Math.round(correctChars / 5 / elapsedTime) || 0;
      const accuracy =
        totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

      setLiveWpm(Math.min(netWpm, 999));
      setLiveAccuracy(accuracy);
    }
  }, [inputValue, isActive, startTime, text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (timeLeft > 0) {
      setInputValue(value);
      playKeySound();

      const newIndex = Math.min(value.length, text.length);
      setCurrentIndex(newIndex);

      if (!startTime) {
        setStartTime(Date.now());
        setIsActive(true);
      }

      if (value.length === text.length) {
        setTimeout(() => {
          endTest();
        }, 0);
      }
    }
  };

  // Focus the textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Auto-scroll text container
  useEffect(() => {
    if (textContainerRef.current && currentIndex > 0) {
      const currentCharElement = document.getElementById(`char-${currentIndex}`);
      if (currentCharElement) {
        const container = textContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const charRect = currentCharElement.getBoundingClientRect();

        if (
          charRect.top < containerRect.top ||
          charRect.bottom > containerRect.bottom
        ) {
          currentCharElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }
  }, [currentIndex]);

  const renderText = () => {
    return text.split("").map((char, index) => {
      let className =
        "text-lg sm:text-xl inline-block transition-all duration-75 ";

      if (index < inputValue.length) {
        if (inputValue[index] === char) {
          className += "text-green-500";
        } else {
          className +=
            "text-red-500 bg-red-100 dark:bg-red-900/50 rounded-sm";
        }
      } else if (index === currentIndex) {
        className +=
          "text-primary bg-primary/20 rounded-sm animate-pulse border-l-2 border-primary";
      } else {
        className += "text-gray-400 dark:text-gray-500";
      }

      return (
        <span
          key={index}
          id={`char-${index}`}
          className={className}
          style={{ fontFamily: "monospace" }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Card */}
      <div className="bg-background border border-primary/20 rounded-2xl shadow-xl overflow-hidden">
        {/* Live Stats Bar */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-primary/10 px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Live WPM */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  WPM
                </p>
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {isActive ? liveWpm : stats.wpm}
                </p>
              </div>
            </div>

            {/* Accuracy */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Accuracy
                </p>
                <p className="text-2xl font-bold text-secondary tabular-nums">
                  {isActive ? liveAccuracy : stats.accuracy}%
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  timeLeft <= 10 && isActive
                    ? "bg-gradient-to-br from-red-500 to-red-600 animate-pulse"
                    : "bg-gradient-to-br from-gray-400 to-gray-500"
                }`}
              >
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Time
                </p>
                <p
                  className={`text-2xl font-bold tabular-nums ${
                    timeLeft <= 10 && isActive ? "text-red-500" : "text-foreground"
                  }`}
                >
                  {timeLeft}s
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Type className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Chars
                </p>
                <p className="text-2xl font-bold text-green-600 tabular-nums">
                  {currentIndex}
                  <span className="text-sm text-muted-foreground">
                    /{text.length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-primary transition-all duration-300 ease-out"
              style={{ width: `${(currentIndex / text.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Text Display Area */}
        <div className="p-6">
          <div
            ref={textContainerRef}
            className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-primary/10 mb-6 min-h-[180px] max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              lineHeight: "2",
            }}
          >
            {renderText()}
          </div>

          {/* Input Area */}
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onPaste={(e) => e.preventDefault()}
              placeholder={
                isActive
                  ? "Keep typing..."
                  : "Click here and start typing to begin the test..."
              }
              className={`w-full min-h-[120px] text-lg p-4 font-mono resize-none transition-all duration-200 ${
                isActive
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-primary/30 hover:border-primary/50"
              } focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary`}
              disabled={currentIndex >= text.length || timeLeft === 0}
              autoFocus
            />

            {/* Status Indicator */}
            {isActive && (
              <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Test in progress
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={resetTest}
              variant="outline"
              className="border-primary text-primary hover:text-white cursor-pointer hover:bg-primary flex-1 gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Restart Test
            </Button>
            <Button
              onClick={endTest}
              disabled={!isActive}
              className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 flex-1 gap-2 disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              Finish Test
            </Button>
          </div>
        </div>
      </div>

      {/* Results Dialog */}
      <Dialog
        open={resultsOpen}
        onOpenChange={(open) => {
          if (!open) {
            resetTest();
          } else {
            setResultsOpen(open);
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
              {currentIndex === text.length && timeLeft > 0 ? (
                <>
                  <Award className="w-6 h-6 text-yellow-500" />
                  <span className="text-primary">Excellent Work!</span>
                </>
              ) : (
                <span className="text-primary">Test Results</span>
              )}
            </DialogTitle>
          </DialogHeader>

          {/* Main Stats */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl text-center border border-primary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-primary" />
                <p className="text-sm text-muted-foreground">Net WPM</p>
              </div>
              <p className="text-4xl font-bold text-primary">{stats.wpm}</p>
              {comparison && (
                <div className="flex items-center justify-center mt-2">
                  {comparison.wpmDiff > 0 ? (
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : comparison.wpmDiff < 0 ? (
                    <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      comparison.wpmDiff > 0
                        ? "text-green-500"
                        : comparison.wpmDiff < 0
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {comparison.wpmDiff > 0 ? "+" : ""}
                    {comparison.wpmDiff}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-4 rounded-xl text-center border border-secondary/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-4 h-4 text-secondary" />
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
              <p className="text-4xl font-bold text-secondary">
                {stats.accuracy}%
              </p>
              {comparison && (
                <div className="flex items-center justify-center mt-2">
                  {comparison.accuracyDiff > 0 ? (
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : comparison.accuracyDiff < 0 ? (
                    <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      comparison.accuracyDiff > 0
                        ? "text-green-500"
                        : comparison.accuracyDiff < 0
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {comparison.accuracyDiff > 0 ? "+" : ""}
                    {comparison.accuracyDiff}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">Raw WPM</p>
              <p className="text-lg font-bold text-foreground">{stats.rawWpm}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground">CPM</p>
              <p className="text-lg font-bold text-foreground">{stats.cpm}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                Correct
              </p>
              <p className="text-lg font-bold text-green-600">
                {stats.correctChars}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <XCircle className="w-3 h-3 text-red-500" />
                Errors
              </p>
              <p className="text-lg font-bold text-red-500">
                {stats.incorrectChars}
              </p>
            </div>
          </div>

          {/* Accuracy Bar */}
          <div className="py-3">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                style={{
                  width: `${(stats.correctChars / (stats.correctChars + stats.incorrectChars)) * 100 || 0}%`,
                }}
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              {stats.correctChars} correct • {stats.incorrectChars} incorrect
            </p>
          </div>

          {/* Previous Result Comparison */}
          {previousResult && comparison ? (
            <div className="py-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-muted-foreground">
                {comparison.wpmDiff > 0 ? (
                  <span className="text-green-500">
                    Great job! WPM improved by {comparison.wpmDiff}
                  </span>
                ) : comparison.wpmDiff < 0 ? (
                  <span className="text-red-500">
                    WPM decreased by {Math.abs(comparison.wpmDiff)} - keep
                    practicing!
                  </span>
                ) : (
                  <span className="text-gray-500">WPM unchanged</span>
                )}
              </p>
            </div>
          ) : (
            <div className="py-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-sm text-muted-foreground">
                First test completed! Take another to track your progress.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={() => {
                resetTest();
                setResultsOpen(false);
              }}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const shareText = `I just scored ${stats.wpm} WPM with ${stats.accuracy}% accuracy on TypeMaster! Can you beat my typing speed? ${window.location.href}`;
                  navigator.clipboard.writeText(shareText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 gap-2"
              >
                <CopyIcon className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                onClick={() => {
                  const shareText = `I just scored ${stats.wpm} WPM with ${stats.accuracy}% accuracy on TypeMaster! Can you beat my typing speed?`;
                  const url = encodeURIComponent(window.location.href);
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${url}`,
                    "_blank"
                  );
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 gap-2"
              >
                <ShareIcon className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TypingTest;
