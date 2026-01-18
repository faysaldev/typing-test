"use client";
import { useEffect, useState, useCallback } from "react";

import InputField from "../components/Home/InputField";
import TypeingTest from "../components/Home/TypeingTestTop";
import Modal from "../components/Home/Modal";
import Preloader from "../components/Home/Preloader";
import Footer from "../components/Home/Footer";
import getText from "../lib/data/getText";
import { useRouter } from "next/navigation";

const textData = getText();

const HomePage = () => {
  const router = useRouter();

  const [timer] = useState<number>(60);
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0);
  const [characters, setCharacters] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  const [start, setStart] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disableInput, setDisableInput] = useState<boolean>(false);

  const [input, setInput] = useState<string>("");
  const [preloader, setPreloader] = useState<boolean>(true);

  const resetHandler = () => {
    router.reload();
  };

  // Calculate stats based on input
  useEffect(() => {
    if (!input) {
      setWordsPerMinute(0);
      setCharacters(0);
      setMistakes(0);
      setPercentage(0);
      return;
    }

    // Calculate words per minute (based on 5 characters = 1 word)
    const wordCount = Math.floor(input.length / 5);
    setWordsPerMinute(wordCount);

    // Calculate characters typed
    setCharacters(input.length);

    // Calculate mistakes and accuracy
    let mistakeCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (i < textData.length && input[i] !== textData[i]) {
        mistakeCount++;
      }
    }
    setMistakes(mistakeCount);

    // Calculate accuracy percentage
    const accuracy = input.length > 0 ? ((input.length - mistakeCount) / input.length) * 100 : 0;
    setPercentage(accuracy);

    // Check if test is complete
    if (input.length >= textData.length) {
      setDisableInput(true);
      setShowModal(true);
    }
  }, [input, textData]);

  useEffect(() => {
    setPreloader(false);
  }, []);

  const handleTimeOver = () => {
    setDisableInput(true);
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto px-3 py-4 lg:px-8 lg:py-12">
          <TypeingTest
            timer={timer}
            wpermunites={wordsPerMinute}
            charecter={characters}
            mistakte={mistakes}
            parcentage={percentage}
            start={start}
            setShowModal={setShowModal}
            timeOver={handleTimeOver}
          />

          <InputField
            Resethandler={resetHandler}
            start={start}
            setStart={setStart}
            wpermunites={wordsPerMinute}
            charecter={characters}
            mistakte={mistakes}
            parcentage={percentage}
            setWpermunites={setWordsPerMinute}
            setCharecter={setCharacters}
            setMistakte={setMistakes}
            setParcentage={setPercentage}
            input={input}
            setInput={setInput}
            textData={textData}
            disableInput={disableInput}
          />

          <Footer />
        </div>

        {showModal && (
          <Modal
            wpermunites={wordsPerMinute}
            showModal={showModal}
            setShowModal={setShowModal}
            charecter={characters}
            accuracy={percentage}
          />
        )}

        {preloader && <Preloader preloader={preloader} />}
      </div>
    </div>
  );
};

export default HomePage;
