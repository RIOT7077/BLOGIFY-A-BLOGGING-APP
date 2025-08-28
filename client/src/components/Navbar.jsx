import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useAppContext();

  return (
    <div className="flex items-center justify-between py-5 mx-8 sm:mx-20 xl:mx-32 text-gray-200">
      <img
        src={assets.trueLogo_icon}
        onClick={() => {
          navigate("/");
        }}
        alt="logo"
        className="w-32 sm:w-44 hover:scale-105 transition cursor-pointer"
      />
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-sm px-10 py-2.5 text-white shadow-md hover:scale-105 transition"
      >
        {token ? "Dashboard" : "Login"}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
