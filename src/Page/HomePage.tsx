"use client";

import { useEffect, useMemo, useState } from "react";
import InputField from "../components/Home/InputField";
import TypeingTest from "../components/Home/TypeingTestTop";
import Modal from "../components/Home/Modal";
import Preloader from "../components/Home/Preloader";
import Footer from "../components/Home/Footer";
import getText from "../lib/data/getText";

const textData = getText();
const TIMER_DURATION = 60;

const HomePage = () => {
  const [start, setStart] = useState(false);
  const [input, setInput] = useState("");
  const [preloader, setPreloader] = useState(true);

  // ✅ Preloader: avoid setState in effect warnings
  useEffect(() => {
    const id = requestAnimationFrame(() => setPreloader(false));
    return () => cancelAnimationFrame(id);
  }, []);

  // ✅ Derived typing stats from input
  const { wordsPerMinute, characters, mistakes, percentage, isComplete } =
    useMemo(() => {
      if (!input) {
        return {
          wordsPerMinute: 0,
          characters: 0,
          mistakes: 0,
          percentage: 0,
          isComplete: false,
        };
      }

      const charactersTyped = input.length;
      const words = Math.floor(charactersTyped / 5);

      let mistakeCount = 0;
      for (let i = 0; i < charactersTyped; i++) {
        if (input[i] !== textData[i]) mistakeCount++;
      }

      const accuracy =
        charactersTyped > 0
          ? ((charactersTyped - mistakeCount) / charactersTyped) * 100
          : 0;

      return {
        wordsPerMinute: words,
        characters: charactersTyped,
        mistakes: mistakeCount,
        percentage: accuracy,
        isComplete: charactersTyped >= textData.length,
      };
    }, [input]);

  // ✅ Derived state instead of separate useState
  const disableInput = isComplete;
  const showModal = isComplete;

  const resetHandler = () => {
    window.location.reload();
  };

  const handleTimeOver = () => {
    // This is still fine to manually trigger modal
    // if you want to end test early
    // Derived state will take care of input disable and modal
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto px-3 py-4 lg:px-8 lg:py-12">
          {/* Typing Test Stats */}
          <TypeingTest
            timer={TIMER_DURATION}
            wpermunites={wordsPerMinute}
            charecter={characters}
            mistakte={mistakes}
            parcentage={percentage}
            start={start}
            setShowModal={() => {}}
            timeOver={handleTimeOver}
          />

          {/* Input Field */}
          <InputField
            Resethandler={resetHandler}
            start={start}
            setStart={setStart}
            wpermunites={wordsPerMinute}
            charecter={characters}
            mistakte={mistakes}
            parcentage={percentage}
            input={input}
            setInput={setInput}
            textData={textData}
            disableInput={disableInput}
          />

          <Footer />
        </div>

        {/* Modal */}
        {showModal && (
          <Modal
            wpermunites={wordsPerMinute}
            charecter={characters}
            accuracy={percentage}
            showModal={showModal}
            setShowModal={() => {}}
          />
        )}

        {/* Preloader */}
        {preloader && <Preloader preloader />}
      </div>
    </div>
  );
};

export default HomePage;
