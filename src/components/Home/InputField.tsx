/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";

interface Props {
  Resethandler: () => void;
  start: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  wpermunites: number;
  charecter: number;
  mistakte: number;
  parcentage: number;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  textData: string;
  disableInput: boolean;
}

const InputField: React.FC<Props> = ({
  Resethandler,
  start,
  setStart,
  wpermunites,
  charecter,
  mistakte,
  parcentage,
  setWpermunites,
  setCharecter,
  setMistakte,
  setParcentage,
  input,
  setInput,
  textData,
  disableInput,
}) => {
  const [textContent, settextContent] = useState<string>("");
  const textArray = textData.split("");

  // Sound effects
  const playKeyPressSound = () => {
    const audio = new Audio("/keyboard_press.mp3");
    audio.volume = 0.3; // Reduce volume to make it less intrusive
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const playWrongSound = () => {
    const audio = new Audio("/buzzing_wrong.mp3");
    audio.volume = 0.3; // Reduce volume to make it less intrusive
    audio.play().catch(e => console.log("Audio play failed:", e));
  };

  const inputChangeHandler = (e: any) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    // Play sound based on correctness
    if (inputValue.length > input.length) { // Only when adding characters
      const lastCharIndex = inputValue.length - 1;
      if (lastCharIndex < textData.length) {
        const expectedChar = textData[lastCharIndex];
        const enteredChar = inputValue[lastCharIndex];

        if (expectedChar !== enteredChar) {
          playWrongSound(); // Wrong character
        } else {
          playKeyPressSound(); // Correct character
        }
      } else {
        playKeyPressSound(); // Character beyond text
      }
    }

    if (!start) {
      setStart(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      settextContent(textData);
    }, 1000);
  }, []);

  return (
    <div className="w-full">
      {/* typing box */}
      <div className="min-h-[300px] p-6 bg-secondary/10 border border-primary/30 rounded-xl flex flex-col shadow-sm">
        {/* Display text */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-primary/20 min-h-[120px] overflow-auto">
          <p className="text-2xl md:text-3xl leading-relaxed font-mono">
            {textArray.map((txt: string, i) => {
              let color = "text-foreground";
              let bgColor = "transparent";

              if (i < input.length) {
                const correct = txt === input[i];
                if (correct) {
                  color = "text-green-600"; // Correct character
                  bgColor = "bg-green-100";
                } else {
                  color = "text-red-600"; // Incorrect character
                  bgColor = "bg-red-100";
                }
              }

              return (
                <span
                  key={i}
                  className={`${color} ${bgColor} transition-colors duration-100`}
                >
                  {txt}
                </span>
              );
            })}
          </p>
        </div>

        {/* textarea */}
        <div className="mb-4">
          <textarea
            className="w-full min-h-[150px] p-4 text-2xl font-mono bg-white border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            value={input}
            onChange={inputChangeHandler}
            autoFocus={true}
            disabled={disableInput}
            placeholder="Start typing here..."
          />
        </div>

        {/* buttons */}
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={Resethandler}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Reset
          </Button>
          {!start && (
            <Button
              onClick={() => setStart(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start Test
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
