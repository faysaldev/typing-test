/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface Props {
  timer: number;
  wpermunites: number;
  charecter: number;
  mistakte: number;
  parcentage: number;
  start: boolean;
  setShowModal: any;
  timeOver: any;
}

const TypeingTestTop: React.FC<Props> = ({
  timer,
  wpermunites,
  charecter,
  mistakte,
  parcentage,
  start,
  setShowModal,
  timeOver,
}) => {
  const percentage = parcentage;

  return (
    <div className="pb-12">
      {/* top wrapper */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-gray-400 uppercase font-mono font-normal">
          Typing Speed test
        </p>
        <h1 className="text-5xl text-center lg:text-6xl font-mono font-bold">
          Test your Typing Skills
        </h1>
        {/* frequancy wrapper */}

        <div className="flex items-center space-x-6 pt-6">
          {/* timer wrapper */}
          <div
            style={{ width: 100, height: 100 }}
            className="bg-white rounded-full shadow relative"
          >
            <CountdownCircleTimer
              size={100}
              isPlaying={start}
              strokeWidth={5}
              duration={timer}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              onComplete={timeOver}
            >
              {({ remainingTime }) => (
                <div className="text-center flex flex-col items-center justify-center">
                  <h2 className="text-3xl font-bold text-center">
                    {remainingTime}
                  </h2>
                  <span className="text-sm text-center text-gray-500 font-semibold">
                    seconds
                  </span>
                </div>
              )}
            </CountdownCircleTimer>
          </div>
          {/* word per minites  */}
          {/* <CircleCard number={0} text="w/m" />
          <CircleCard number={0} text="ch/m" />
          <CircleCard number={0} text="Mistake" />
          <CircleCard number={0} text="% acc" /> */}
        </div>
      </div>
    </div>
  );
};

export default TypeingTestTop;
