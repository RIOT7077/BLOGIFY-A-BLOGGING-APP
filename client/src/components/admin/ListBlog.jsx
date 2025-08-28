import React, { useEffect, useState } from "react";
import BlogTableItem from "../../components/admin/BlogTableItem";
import toast from "react-hot-toast";
import { useAppContext } from "../../context/AppContext";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const { axios, token } = useAppContext();

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/admin/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 text-gray-200">
      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        All Blogs
      </h1>

      {/* Table */}
      <div className="relative h-4/5 max-w-5xl mt-6 overflow-x-auto rounded-lg shadow-lg bg-gray-900/70 backdrop-blur-md scrollbar-hide">
        <table className="w-full text-sm text-gray-300">
          <thead className="text-xs uppercase bg-gray-800 text-gray-300">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                #
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Blog Title
              </th>
              <th scope="col" className="px-4 py-3 text-left max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {blogs.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchBlogs}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
