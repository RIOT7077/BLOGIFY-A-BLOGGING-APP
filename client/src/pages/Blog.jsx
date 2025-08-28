import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { assets } from "../assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Blog = () => {
  const { axios } = useAppContext();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchCommentsData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}/comments`);
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/blog/add-comment`, {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
        fetchCommentsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchCommentsData();
  }, []);

  return data ? (
    <div className="relative min-h-screen bg-gray-950 text-gray-200">
      {/* Background */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute inset-0 -z-10 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <Navbar />

      {/* Blog Header */}
      <div className="text-center mt-20">
        <p className="text-sm text-gray-400">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold max-w-3xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mt-4">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-2xl truncate mx-auto text-gray-400 italic">
          {data.subTitle}
        </h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border border-purple-500/40 bg-purple-500/10 text-sm font-medium text-purple-300">
          Karan Kale
        </p>
      </div>

      {/* Blog Content */}
      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6 text-white">
        <img
          src={data.image}
          alt=""
          className="rounded-3xl mb-8 shadow-lg shadow-black/40"
        />
        <div
          className="max-w-3xl mx-auto leading-7 text-white"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments */}
        <div className="mt-16 mb-10 max-w-3xl mx-auto">
          <p className="text-xl font-semibold mb-6">
            Comments ({comments.length})
          </p>
          <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="relative bg-gray-800/60 border border-gray-700 max-w-xl p-4 rounded-xl text-gray-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{comment.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{comment.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-500">
                  {Moment(comment.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="max-w-3xl mx-auto">
          <p className="text-xl font-semibold mb-4">Add your comment</p>
          <form
            className="flex flex-col items-start gap-4 max-w-lg"
            onSubmit={addComment}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <textarea
              placeholder="Write your comment..."
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg py-2 px-6 hover:scale-105 transition-transform"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Social Share */}
        <div className="my-24 max-w-3xl mx-auto">
          <p className="text-xl font-semibold mb-4">
            Share this article on Social Media
          </p>
          <div className="flex gap-6">
            <img src={assets.facebook_icon} width={40} alt="facebook" />
            <img src={assets.twitter_icon} width={40} alt="twitter" />
            <img src={assets.googleplus_icon} width={40} alt="google" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;
