import React from "react";
import PreloaderImage from "@/src/assets/preload_image.gif";
import Image from "next/image";

const Preloader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
      {/* wrapper */}
      <div className="max-w-md w-full mx-4 bg-secondary/20 border border-primary/30 rounded-xl p-8 shadow-lg flex flex-col items-center">
        {/* content */}
        <div className="w-full flex flex-col items-center">
          <div className="animate-pulse mb-6">
            <Image
              width={200}
              height={200}
              src={PreloaderImage}
              alt="Preloader typing machine"
              className="rounded-lg"
            />
          </div>
          <h2 className="text-2xl font-bold text-primary">Loading Typing Test...</h2>
          <p className="text-muted-foreground mt-2">Preparing your typing challenge</p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
