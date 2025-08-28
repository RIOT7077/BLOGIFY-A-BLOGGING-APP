import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 my-16 text-gray-400">
      <div
        className="flex flex-col md:flex-row items-start justify-between gap-10
        py-10 border-t border-gray-700/40"
      >
        <div>
          <img
            src={assets.trueLogo_icon}
            alt="logo"
            className="w-32 sm:w-44 hover:scale-105 transition cursor-pointer"
          />
          <p className="max-w-[410px] mt-6 text-sm text-gray-400 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            nobis dolores quisquam ab explicabo ducimus.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        © 2025 Blogify — All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
