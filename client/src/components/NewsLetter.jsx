import { useState } from "react";
import toast from "react-hot-toast";
const NewsLetter = () => {
  const [subsrcibed, setSubscibed] = useState(false);
  const [input, setInput] = useState("");
  const SubsHandler = () => {
    if (subsrcibed === true) {
      toast.success("Subscription Added");
      setSubscibed(false);
      setInput("");
    }
  };
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 my-20 text-gray-200 text-center">
      <h1 className="md:text-4xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Never Miss a Blog
      </h1>
      <p className="md:text-lg text-gray-400 pb-8">
        Subscribe to get the latest blogs, new tech, and exclusive news
      </p>
      <div className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 mx-auto border border-gray-700 rounded-lg overflow-hidden bg-gray-800/40 shadow-md">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="Enter your email id"
          className="h-full w-full px-3 bg-transparent outline-none text-gray-200 placeholder-gray-500"
        />
        <button
          onClick={() => {
            setSubscibed(true);
            SubsHandler();
          }}
          className="md:px-12 px-8 h-full text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:scale-105 transition-all cursor-pointer"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};
export default NewsLetter;
