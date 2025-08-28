import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { assets } from "../../assets/assets";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { axios, token, setToken } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        toast.success("Logged in successfully");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-5 sm:mx-20 xl:mx-32 text-gray-200">
        <img
          src={assets.trueLogo_icon}
          onClick={() => {
            navigate("/");
          }}
          alt="logo"
          className="w-32 sm:w-44 hover:scale-105 transition cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-center h-screen rounded-2xl">
        <div
          className="w-full max-w-sm p-6 max-md:m-6 border border-gray-600
          shadow-xl shadow-primary/15 rounded-2xl"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="w-full py-6 text-center">
              <h1 className="text-3xl font-bold">
                Admin{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
                  Login
                </span>
              </h1>
              <p className="font-light text-gray-400">
                Enter your credentials to access the admin panel
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 w-full sm:max-w-md text-gray-600"
            >
              <div className="flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  required
                  placeholder="Your Email id"
                  className="border-b-2 border-gray-300 p-2 text-white outline-none mb-6"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  required
                  placeholder="Your Password "
                  className="border-b-2 border-gray-300 text-white   p-2 outline-none mb-6"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 font-medium bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg text-white rounded cursor-pointer hover:scale-102 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Logging in..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
