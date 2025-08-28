import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { blogs } = useAppContext();

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200">
      <Navbar />
      <Header />
      <BlogList blogs={blogs} />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
