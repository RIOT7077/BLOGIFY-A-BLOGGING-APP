import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import Typewriter from "typewriter-effect";
const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };
  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative text-gray-200 my-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 py-1.5 w-fit px-5 mb-4 border border-purple-400/50 bg-purple-600/10 rounded-full text-sm animate-pulse mx-auto md:mx-0">
            <p>New: AI Feature Integrated</p>
            <img src={assets.star_icon} alt="" className="w-2.5" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold sm:leading-[1.2] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(" Write. Share. Inspire.")
                  .callFunction(() => {
                    console.log("String typed out!");
                  })
                  .pauseFor(2500)
                  .deleteAll()
                  .callFunction(() => {
                    console.log("All strings were deleted");
                  })
                  .start();
              }}
              options={{
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="my-6 sm:my-8 max-w-xl text-gray-400">
            This is your space to think out loud, to share what matters, and to
            write without filters.
          </p>
        </div>

        <div className="flex-1 flex justify-center md:justify-end w-full">
          <form
            onSubmit={submitHandler}
            className="flex w-full max-w-lg border border-gray-700 bg-gray-800/40 rounded-lg overflow-hidden shadow-md"
          >
            <input
              ref={inputRef}
              className="w-full pl-4 bg-transparent text-gray-200 placeholder-gray-500 outline-none"
              type="text"
              placeholder="Search for blogs"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer"
            >
              Search
            </button>
          </form>
          {input && (
            <button
              onClick={onClear}
              className="border border-gray-600 text-xs py-1 px-3 rounded-sm hover:bg-gray-700 transition"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-10 opacity-20"
      />
    </div>
  );
};

export default Header;
