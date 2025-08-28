import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");
  const [token, setToken] = useState(null);
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
        console.log("Blogs in context", data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = token;
    }
  }, []);

  const value = {
    axios,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
