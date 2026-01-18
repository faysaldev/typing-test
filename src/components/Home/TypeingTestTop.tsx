/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Card, CardContent } from "@/src/components/ui/card";

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
    <div className="pb-12 w-full">
      {/* top wrapper */}
      <div className="flex flex-col items-center justify-center space-y-6">
        <p className="text-2xl text-primary uppercase font-mono font-normal tracking-wider">
          Typing Speed Test
        </p>
        <h1 className="text-4xl md:text-5xl text-center font-mono font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Test Your Typing Skills
        </h1>

        {/* stats wrapper */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mt-8">
          <Card className="bg-secondary/20 border-primary/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-primary">{wpermunites}</span>
              <span className="text-sm text-muted-foreground">WPM</span>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20 border-primary/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-primary">{charecter}</span>
              <span className="text-sm text-muted-foreground">Characters</span>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20 border-primary/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-primary">{mistakte}</span>
              <span className="text-sm text-muted-foreground">Mistakes</span>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20 border-primary/30">
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-primary">{Math.round(parcentage)}%</span>
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </CardContent>
          </Card>
        </div>

        {/* timer wrapper */}
        <div className="flex justify-center mt-8">
          <div
            style={{ width: 120, height: 120 }}
            className="bg-secondary/20 rounded-full shadow-lg relative border border-primary/30 flex items-center justify-center"
          >
            <CountdownCircleTimer
              size={120}
              isPlaying={start}
              strokeWidth={8}
              duration={timer}
              colors={["#A8BBA3", "#BDE8F5", "#ECECEC", "#A8BBA3"]}
              colorsTime={[timer * 0.75, timer * 0.5, timer * 0.25, 0]}
              onComplete={timeOver}
            >
              {({ remainingTime }) => (
                <div className="text-center flex flex-col items-center justify-center">
                  <h2 className="text-3xl font-bold text-primary">
                    {remainingTime}
                  </h2>
                  <span className="text-xs text-muted-foreground font-semibold">
                    seconds
                  </span>
                </div>
              )}
            </CountdownCircleTimer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeingTestTop;
