import React from "react";
import { assets } from "../../assets/assets";
import { Outlet, useNavigate } from "react-router";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from "../../context/AppContext";

const Layout = () => {
  const navigate = useNavigate();
  const { setToken } = useAppContext();

  const handleLogout = async () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 sm:px-12 h-[70px] bg-gray-900/70 backdrop-blur-md shadow-lg">
        <img
          src={assets.trueLogo_icon}
          alt="logo"
          className="w-32 sm:w-40 cursor-pointer hover:scale-105 transition"
          onClick={() => navigate("/")}
        />
        <button
          onClick={handleLogout}
          className="text-sm px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow hover:scale-105 transition-all"
        >
          Logout
        </button>
      </div>

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
