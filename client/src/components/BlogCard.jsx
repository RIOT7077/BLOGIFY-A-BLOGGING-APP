import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className="w-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-900 to-gray-800 hover:scale-[1.02] hover:shadow-purple-500/30 duration-300 cursor-pointer transform transition-all"
    >
      <img
        src={image}
        alt=""
        className="aspect-video object-cover opacity-90 hover:opacity-100 transition"
      />
      <span className="ml-5 mt-4 px-3 py-1 inline-block bg-purple-600/30 rounded-full text-purple-400 text-xs">
        {category}
      </span>
      <div className="p-5">
        <h5 className="mb-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          {title}
        </h5>
        <p
          className="mb-3 text-xs text-gray-400"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
        ></p>
      </div>
    </div>
  );
};

export default BlogCard;
