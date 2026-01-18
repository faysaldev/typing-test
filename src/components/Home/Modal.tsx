import React from "react";
import { XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

interface Props {
  showModal: any;
  setShowModal: any;
  wpermunites: any;
  charecter: any;
}

const Modal: React.FC<Props> = ({
  showModal,
  setShowModal,
  wpermunites,
  charecter,
}) => {
  const router = useRouter();
  return (
    <div className="w-full backdrop-blur-sm h-full customBgModal flex items-center justify-center">
      {/* wrapper */}
      <div className="max-w-[70%] mx-auto bg-white relative px-4 py-6 rounded-md shadow-md">
        {/* content */}
        <div className="flex space-x-6 pt-6">
          {/* Close icon */}
          <div>
            <XIcon
              onClick={() => setShowModal(false)}
              className="h-5 w-5 transform hover:scale-150 hover:ease-in-out text-black cursor-pointer absolute top-3 right-3"
            />
          </div>
          {/* left */}
          <div className="min-w-[200px] flex-grow">
            <img
              className="w-full object-contain"
              src="https://res.cloudinary.com/dn1j6dpd7/image/upload/v1600425019/typing-speed-test/avatars/turtle.svg"
              alt=""
            />
          </div>
          {/* right */}
          <div className="max-w-[400px]">
            <h2 className="text-3xl pb-1 font-bold font-mono">
              You{"'"}re a Turtle.
            </h2>
            <p className="text-base text-gray-600">
              Well... You type with the speed of{" "}
              <span className="font-bold text-xl text-black">
                {wpermunites} WPM - {charecter} CPM.
              </span>{" "}
              Your accuracy was{" "}
              <span className="font-bold text-xl text-black">
                {(100 * charecter) / 500}%.
              </span>{" "}
              It could be better!
            </p>
          </div>
        </div>

        {/* tray gamin button */}
        <div className="flex items-center justify-center py-5">
          <button
            className="bg-blue-500 px-6 font-semibold shadow py-2 rounded-md text-white"
            onClick={() => router.reload()}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
