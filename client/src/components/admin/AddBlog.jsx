import React, { useEffect, useRef, useState } from "react";
import { assets, blogCategories } from "../../assets/assets";
import Quill from "quill";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { parse } from "marked";

const AddBlog = () => {
  const editorRef = useRef();
  const quillRef = useRef();
  const { axios, token } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async (e) => {
    if (!title) return toast.error("Please Enter the Title");
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.post(
        "/api/blog/generate",
        { prompt: title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const OnSubmitHandler = async (e) => {
    try {
      if (image === false) {
        toast.error("Please provide an image before submitting!");
        return;
      }
      e.preventDefault();
      setIsAdding(true);
      const blog = {
        title,
        subTitle,
        description: quillRef.current.root.innerHTML,
        category,
        isPublished,
      };
      const formdata = new FormData();
      formdata.append("blog", JSON.stringify(blog));
      formdata.append("image", image);
      const { data } = await axios.post(`/api/blog/add`, formdata, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        toast.success(data.message);
        setCategory("Startup");
        setImage(false);
        setTitle("");
        setSubtitle("");
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <>
      <h1 className="text-4xl px-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 ">
        Add a Blog..
      </h1>
      <form
        onSubmit={OnSubmitHandler}
        className="flex-1 min-h-screen bg-transparent text-gray-200 px-6 sm:px-12 py-10 overflow-y-auto"
      >
        <div className="w-full max-w-4xl bg-gray-900/60 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg">
          <label htmlFor="image" className="block text-sm font-medium mb-2">
            Upload Thumbnail
            <div className="flex items-center gap-4">
              <img
                src={!image ? assets.upload_area : URL.createObjectURL(image)}
                alt="upload"
                className="mt-2 h-20 w-32 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
              />
              <input
                onChange={(e) => setImage(e.target.files[0])}
                required
                type="file"
                id="image"
                hidden
              />
            </div>
          </label>

          {/* Title */}
          <label className="block mt-6 text-sm font-medium">Blog Title</label>
          <input
            type="text"
            placeholder="Type here..."
            required
            className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-800 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

          {/* Subtitle */}
          <label className="block mt-6 text-sm font-medium">Sub Title</label>
          <input
            type="text"
            placeholder="Type here..."
            required
            className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-800 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            onChange={(e) => setSubtitle(e.target.value)}
            value={subTitle}
          />

          {/* Description */}
          <label className="block mt-6 text-sm font-medium">
            Blog Description
          </label>
          <div className="relative text-white mt-2 min-h-[200px] rounded-lg bg-gray-800 p-2">
            <div ref={editorRef} className="h-64 overflow-y-auto"></div>

            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10 rounded-lg">
                <p className="text-sm font-medium text-gray-200 font-mono flex items-center">
                  Generating response
                  <span className="ml-1 animate-bounce">.</span>
                  <span className="ml-1 animate-bounce [animation-delay:0.2s]">
                    .
                  </span>
                  <span className="ml-1 animate-bounce [animation-delay:0.4s]">
                    .
                  </span>
                </p>
              </div>
            )}

            <button
              disabled={loading}
              type="button"
              onClick={generateContent}
              className="absolute bottom-2 right-2 text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-1.5 rounded hover:scale-105 transition"
            >
              <div className="flex items-center gap-2">
                <p>Generate with AI</p>
                <img src={assets.star_icon} alt="" className="w-2.5" />
              </div>
            </button>
          </div>

          {/* Category */}
          <label className="block mt-6 text-sm font-medium">
            Blog Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="mt-2 w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={category}
          >
            <option value="">Select Category</option>
            {blogCategories.map((item, key) => (
              <option value={item} key={key + 1} className="bg-gray-900">
                {item}
              </option>
            ))}
          </select>

          {/* Publish toggle */}
          <div className="flex items-center gap-3 mt-6">
            <label className="text-sm">Publish Now</label>
            <input
              type="checkbox"
              checked={isPublished}
              className="scale-125 cursor-pointer accent-purple-600"
              onChange={(e) => setIsPublished(e.target.checked)}
            />
          </div>

          {/* Submit */}
          <button
            disabled={isAdding}
            type="submit"
            className="mt-8 w-40 h-11 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow hover:scale-105 transition disabled:opacity-50"
          >
            {isAdding ? "Adding..." : "Add Blog"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddBlog;
