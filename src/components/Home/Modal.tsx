import React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";

interface Props {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  wpermunites: number;
  charecter: number;
  accuracy: number;
}

const Modal: React.FC<Props> = ({
  showModal,
  setShowModal,
  wpermunites,
  charecter,
  accuracy,
}) => {
  const router = useRouter();


  // Determine typing level based on WPM
  const getTypingLevel = (wpm: number) => {
    if (wpm >= 60) return { level: "Expert", emoji: "🚀", color: "text-green-600" };
    if (wpm >= 40) return { level: "Advanced", emoji: "⚡", color: "text-blue-600" };
    if (wpm >= 25) return { level: "Intermediate", emoji: "👍", color: "text-yellow-600" };
    return { level: "Beginner", emoji: "🐢", color: "text-orange-600" };
  };

  const levelInfo = getTypingLevel(wpermunites);

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-md bg-white border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            <span className={`text-3xl mr-2 ${levelInfo.color}`}>{levelInfo.emoji}</span>
            Your Typing Result
          </DialogTitle>
          <DialogDescription className="text-center">
            Here's how you performed in the typing test
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-muted-foreground">Words Per Minute:</span>
            <span className="font-bold text-primary">{wpermunites} WPM</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-muted-foreground">Characters Typed:</span>
            <span className="font-bold text-primary">{charecter}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-muted-foreground">Accuracy:</span>
            <span className="font-bold text-primary">{Math.round(accuracy)}%</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-muted-foreground">Level:</span>
            <span className={`font-bold ${levelInfo.color}`}>{levelInfo.level}</span>
          </div>
        </div>

        <div className="flex flex-col items-center py-2">
          <p className="text-center mb-4">
            Great job completing the typing test! Keep practicing to improve your speed and accuracy.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
