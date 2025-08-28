import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-purple-500 shadow-lg"></div>
    </div>
  );
};

export default Loader;
