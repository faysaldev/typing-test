import React from "react";
import PreloaderImage from "@/src/assets/preload_image.gif";
import Image from "next/image";
interface Props {
  preloader: boolean;
}

const Preloader: React.FC<Props> = ({ preloader }) => {
  return (
    <div className="fixed top-0 left-0 w-full backdrop-blur-sm h-full bg-white flex items-center justify-center">
      {/* wrapper */}
      <div className="max-w-[70%] mx-auto bg-white relative px-4 py-6 rounded-md shadow-md">
        {/* content */}
        <div className="w-full">
          <Image
            width={400}
            height={400}
            src={PreloaderImage}
            alt="Preloader typing machine"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
