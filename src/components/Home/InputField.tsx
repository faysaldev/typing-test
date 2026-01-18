/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

interface Props {
  Resethandler: any;
  start: any;
  setStart: any;
  wpermunites: any;
  charecter: any;
  mistakte: any;
  parcentage: any;
  setWpermunites: any;
  setCharecter: any;
  setMistakte: any;
  setParcentage: any;
  input: any;
  setInput: any;
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

  const inputChangeHandler = (e: any) => {
    setInput(e.target.value);
    setStart(true);
    const cAudio = new Audio("/keyboard_press.mp3");
    cAudio.play();
  };

  useEffect(() => {
    setTimeout(() => {
      settextContent(textData);
    }, 1000);
  }, []);

  return (
    <div>
      {/* typing box */}
      <div className=" min-h-[250px] px-6 py-4 bg-white w-full rounded-md flex flex-col">
        <p className="text-content">
          {textArray.map((txt: string, i) => {
            let color, bgColor;
            const correct = txt === input[i];
            if (i < input.length) {
              bgColor = txt === input[i] ? "transparent" : "";
              color = txt === input[i] ? "#0066FF" : "#3cdfbccf";
            }

            return (
              <span
                key={i}
                className={`text-3xl ${
                  i < input.length && !correct
                    ? "line-through text-[#0066FF] bg-black"
                    : "text-black "
                } `}
                style={{
                  color: color,
                  backgroundColor: bgColor,
                  lineHeight: "50px",
                }}
              >
                {txt}
              </span>
            );
          })}
        </p>

        {/* texarea  */}
        <div className="pt-6 rounded-md text-3xl">
          <textarea
            className="outline-none border-gray-600 border-2 resize-none w-full min-h-[350px] rounded-md focus-within:ring-1 focus-within:ring-blue-500 px-4 py-6"
            value={input}
            onChange={(e) => inputChangeHandler(e)}
            autoFocus={true}
            disabled={disableInput}
          ></textarea>
        </div>

        {/* reset button */}
        <div className="self-end py-5 space-x-5">
          {/* Reset button */}
          {start ? (
            <button
              onClick={Resethandler}
              className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-in"
            >
              Reset Now
            </button>
          ) : (
            <button
              onClick={() => setStart(true)}
              className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-all ease-in"
            >
              Start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
