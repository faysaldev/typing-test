"use client";

import { useEffect, useState } from "react";
import Preloader from "../components/Home/Preloader";
import Footer from "../components/Home/Footer";
import getText from "../lib/data/getText";
import TypingTest from "../components/TypingTest";

const textData = getText();

const HomePage = () => {
  const [preloader, setPreloader] = useState(true);

  // ✅ Preloader: avoid setState in effect warnings
  useEffect(() => {
    const id = requestAnimationFrame(() => setPreloader(false));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-secondary/10">
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto px-3 py-4 lg:px-8 lg:py-12">
          {/* Typing Test Component */}
          <TypingTest text={textData} />

          {/* Footer */}
          <Footer />
        </div>
        {/* Preloader */}
        {preloader && <Preloader preloader />}
      </div>
    </div>
  );
};

export default HomePage;
