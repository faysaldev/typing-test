import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import InputField from "../components/Home/InputField";
import TypeingTest from "../components/Home/TypeingTestTop";
import Modal from "../components/Home/Modal";
import Preloader from "../components/Home/Preloader";
import Footer from "../components/Home/Footer";
import getText from "../lib/data/getText";

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

  useEffect(() => {
    if (!input) return;

    const wordCount = input.trim().split(/\s+/).length;
    const characterCount = input.length;

    setWordsPerMinute(wordCount);
    setCharacters(characterCount);

    if (characterCount >= textData.length) {
      setDisableInput(true);
      setShowModal(true);
    }
  }, [input]);

  useEffect(() => {
    setPreloader(false);
  }, []);

  const handleTimeOver = () => {
    setDisableInput(true);
    setShowModal(true);
  };

  return (
    <div className="w-full min-h-screen">
      <div className="customBg w-full min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="max-w-[1270px] mx-auto px-3 py-4 lg:px-8 lg:py-12">
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
          />
        )}

        {preloader && <Preloader preloader={preloader} />}
      </div>
    </div>
  );
};

export default HomePage;
