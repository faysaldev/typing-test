"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ShareIcon, CopyIcon, TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

interface TypingTestProps {
  text: string;
}

// Define the type for stored results
interface StoredResult {
  wpm: number;
  accuracy: number;
  time: number;
  correctChars: number;
  incorrectChars: number;
  date: string;
}

const TypingTest: React.FC<TypingTestProps> = ({ text }) => {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [previousResult, setPreviousResult] = useState<StoredResult | null>(null);
  const [comparison, setComparison] = useState<{
    wpmDiff: number;
    accuracyDiff: number;
  } | null>(null);
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    time: 0,
    correctChars: 0,
    incorrectChars: 0,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load previous results from localStorage on component mount
  useEffect(() => {
    const savedResults = localStorage.getItem('typingTestResults');
    if (savedResults) {
      const results: StoredResult[] = JSON.parse(savedResults);
      if (results.length > 0) {
        setPreviousResult(results[0]); // Get the only stored result
      }
    }
  }, []);

  // Function to save results to localStorage
  const saveResultsToStorage = (result: typeof stats) => {
    const currentDate = new Date().toISOString();
    const newResult: StoredResult = {
      wpm: result.wpm,
      accuracy: result.accuracy,
      time: result.time,
      correctChars: result.correctChars,
      incorrectChars: result.incorrectChars,
      date: currentDate
    };

    // Store only the most recent result
    localStorage.setItem('typingTestResults', JSON.stringify([newResult]));

    // Update the previous result state
    setPreviousResult(newResult);
  };

  // Function to calculate comparison with previous result
  const calculateComparison = (current: typeof stats, previous: StoredResult | null) => {
    if (!previous) return null;

    return {
      wpmDiff: current.wpm - previous.wpm,
      accuracyDiff: current.accuracy - previous.accuracy
    };
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval as NodeJS.Timeout);
            endTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      endTest();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (timeLeft > 0) {
      setInputValue(value);

      const newIndex = Math.min(value.length, text.length);
      setCurrentIndex(newIndex);

      if (!startTime) {
        setStartTime(Date.now());
        setIsActive(true);
      }
    }
  };

  // End the typing test
  const endTest = () => {
    setIsActive(false);

    // Calculate stats based on 60 seconds (1 minute)
    const correctChars = inputValue
      .split("")
      .filter((char, i) => char === text[i]).length;
    const totalChars = inputValue.length;
    const incorrectChars = totalChars - correctChars;

    // Calculate WPM based on correctly typed characters in 1 minute (5 chars = 1 word)
    const wpm = Math.round(correctChars / 5);
    const accuracy =
      totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

    const newStats = {
      wpm,
      accuracy,
      time: 1,
      correctChars,
      incorrectChars,
    };

    setStats(newStats);

    // Save results to localStorage
    saveResultsToStorage(newStats);

    // Calculate comparison with previous result
    const comparisonResult = calculateComparison(newStats, previousResult);
    setComparison(comparisonResult);

    setResultsOpen(true);
  };

  // Reset the test
  const resetTest = () => {
    setInputValue("");
    setCurrentIndex(0);
    setStartTime(null);
    setTimeLeft(60);
    setIsActive(false);
    setResultsOpen(false);
    setStats({
      wpm: 0,
      accuracy: 0,
      time: 0,
      correctChars: 0,
      incorrectChars: 0,
    });

    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Focus the textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const renderText = () => {
    return text.split("").map((char, index) => {
      let className = "text-lg ";

      if (index < inputValue.length) {
        // Character has been typed
        if (inputValue[index] === char) {
          // Correct character
          className += "text-green-500";
        } else {
          // Incorrect character
          className += "text-red-500 bg-red-100 dark:bg-red-900/50";
        }
      } else if (index === currentIndex) {
        // Current character to type
        className += "text-white bg-primary animate-pulse";
      } else {
        // Untyped character
        className += "text-gray-500 dark:text-gray-400";
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
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-secondary/20 border border-primary/30 rounded-xl p-6 shadow-lg">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            Typing Test
          </h2>

          {/* Text to type */}
          <div
            ref={(el) => {
              if (el && currentIndex > 0) {
                // Scroll the container to keep the current position visible
                const currentCharElement = document.getElementById(
                  `char-${currentIndex}`,
                );
                if (currentCharElement) {
                  const containerRect = el.getBoundingClientRect();
                  const charRect = currentCharElement.getBoundingClientRect();

                  // Calculate if the current character is out of view
                  if (
                    charRect.left < containerRect.left ||
                    charRect.right > containerRect.right
                  ) {
                    // Center the current character in the view
                    const scrollLeft =
                      currentCharElement.offsetLeft -
                      containerRect.width / 2 +
                      charRect.width / 2;
                    el.scrollTo({ left: scrollLeft, behavior: "smooth" });
                  }
                }
              }
            }}
            className="text-container bg-white dark:bg-gray-800 p-6 rounded-lg border border-primary/20 mb-6 min-h-[150px] overflow-x-auto max-w-full"
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "monospace",
            }}
          >
            {renderText()}
          </div>

          {/* Input area */}
          <Textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onPaste={(e) => e.preventDefault()} // Disable pasting
            placeholder="Start typing here..."
            className="w-full min-h-[120px] text-lg p-4 font-mono focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
            disabled={currentIndex >= text.length}
            autoFocus
          />

          {/* Stats bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">WPM</p>
              <p className="text-2xl font-bold text-primary">{stats.wpm}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">Accuracy</p>
              <p className="text-2xl font-bold text-primary">
                {stats.accuracy}%
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">Time Left</p>
              <p
                className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500 animate-pulse" : "text-primary"}`}
              >
                {timeLeft}s
              </p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">Progress</p>
              <p className="text-2xl font-bold text-primary">
                {currentIndex}/{text.length}
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={resetTest}
              variant="outline"
              className="border-primary text-primary hover:text-gray-700 cursor-pointer hover:bg-primary/10 flex-1"
            >
              Restart Test
            </Button>
            <Button
              onClick={endTest}
              className="bg-secondary text-primary hover:bg-secondary/90 flex-1"
            >
              Finish Test
            </Button>
          </div>
        </div>
      </div>

      {/* Results Dialog */}
      <Dialog open={resultsOpen} onOpenChange={setResultsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary text-center">
              Test Results
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">Words Per Minute</p>
              <p className="text-3xl font-bold text-primary">{stats.wpm} WPM</p>
              {comparison && (
                <div className="flex items-center justify-center mt-1">
                  {comparison.wpmDiff > 0 ? (
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : comparison.wpmDiff < 0 ? (
                    <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span className={`text-sm ${comparison.wpmDiff > 0 ? 'text-green-500' : comparison.wpmDiff < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    {comparison.wpmDiff > 0 ? '+' : ''}{comparison.wpmDiff}
                  </span>
                </div>
              )}
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">Accuracy</p>
              <p className="text-3xl font-bold text-primary">
                {stats.accuracy}%
              </p>
              {comparison && (
                <div className="flex items-center justify-center mt-1">
                  {comparison.accuracyDiff > 0 ? (
                    <TrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : comparison.accuracyDiff < 0 ? (
                    <TrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <MinusIcon className="w-4 h-4 text-gray-500 mr-1" />
                  )}
                  <span className={`text-sm ${comparison.accuracyDiff > 0 ? 'text-green-500' : comparison.accuracyDiff < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    {comparison.accuracyDiff > 0 ? '+' : ''}{comparison.accuracyDiff}%
                  </span>
                </div>
              )}
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">Time</p>
              <p className="text-2xl font-bold text-primary">60s</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg text-center">
              <p className="text-sm text-primary/70">Characters</p>
              <p className="text-2xl font-bold text-primary">
                {stats.correctChars}/{stats.correctChars + stats.incorrectChars}
              </p>
            </div>
          </div>

          {/* Show comparison if there's a previous result, otherwise just show current result */}
          {previousResult ? (
            <div className="py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <h3 className="text-lg font-semibold text-center text-primary mb-3">Comparison with Previous</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-primary/70">Previous WPM</p>
                  <p className="text-2xl font-bold text-primary">{previousResult.wpm}</p>
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center">
                  <p className="text-sm text-primary/70">Previous Accuracy</p>
                  <p className="text-2xl font-bold text-primary">{previousResult.accuracy}%</p>
                </div>
              </div>
              <p className="text-center text-sm text-primary/70 mt-3">
                {comparison?.wpmDiff !== undefined && comparison?.accuracyDiff !== undefined ? (
                  <>
                    {comparison.wpmDiff > 0 ? (
                      <span className="text-green-500">WPM improved by {comparison.wpmDiff} </span>
                    ) : comparison.wpmDiff < 0 ? (
                      <span className="text-red-500">WPM decreased by {Math.abs(comparison.wpmDiff)} </span>
                    ) : (
                      <span className="text-gray-500">WPM unchanged </span>
                    )}
                    {comparison.accuracyDiff > 0 ? (
                      <span className="text-green-500">| Accuracy improved by {comparison.accuracyDiff}%</span>
                    ) : comparison.accuracyDiff < 0 ? (
                      <span className="text-red-500">| Accuracy decreased by {Math.abs(comparison.accuracyDiff)}%</span>
                    ) : (
                      <span className="text-gray-500">| Accuracy unchanged</span>
                    )}
                  </>
                ) : (
                  "No comparison available"
                )}
              </p>
            </div>
          ) : (
            <div className="py-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <h3 className="text-lg font-semibold text-center text-primary mb-3">First Test</h3>
              <p className="text-center text-sm text-primary/70">
                Complete another test to see your improvement!
              </p>
            </div>
          )}

          <div className="py-2">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{
                  width: `${(stats.correctChars / (stats.correctChars + stats.incorrectChars)) * 100 || 0}%`,
                }}
              ></div>
            </div>
            <p className="text-center text-sm text-primary/70 mt-2">
              {stats.correctChars} correct / {stats.incorrectChars} incorrect
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Button
              onClick={() => {
                resetTest();
                setResultsOpen(false);
              }}
              className="flex-1 bg-primary cursor-pointer hover:bg-primary/90"
            >
              Try Again
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  // Copy to clipboard
                  const shareText = `Just scored ${stats.wpm} WPM with ${stats.accuracy}% accuracy! Can you beat my typing speed? ${window.location.href}`;
                  navigator.clipboard.writeText(shareText);
                }}
                variant="outline"
                className="border-primary text-primary hover:text-gray-700 cursor-pointer hover:bg-primary/10"
              >
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button
                onClick={() => {
                  // Share to Twitter
                  const shareText = `Just scored ${stats.wpm} WPM with ${stats.accuracy}% accuracy! Can you beat my typing speed?`;
                  const url = encodeURIComponent(window.location.href);
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${url}`,
                    "_blank",
                  );
                }}
                variant="outline"
                className="border-primary text-primary hover:text-gray-700 cursor-pointer hover:bg-primary/10"
              >
                <ShareIcon className="w-4 h-4 mr-2" />
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
