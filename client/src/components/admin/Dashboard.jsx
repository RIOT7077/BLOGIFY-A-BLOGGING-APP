import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, token } = useAppContext();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get(`/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-6 md:p-10 text-gray-200">
      {/* Stat cards */}
      <div className="flex flex-wrap gap-6">
        <div
          onClick={() => navigate("/admin/listBlog")}
          className="flex items-center gap-4 bg-gray-900/60 backdrop-blur-md p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-purple-500/30 transition-all"
        >
          <img src={assets.dashboard_icon_1} alt="" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-bold text-purple-400">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 text-sm">Blogs</p>
          </div>
        </div>

        <div
          onClick={() => navigate("/admin/comments")}
          className="flex items-center gap-4 bg-gray-900/60 backdrop-blur-md p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-pink-500/30 transition-all"
        >
          <img src={assets.dashboard_icon_2} alt="" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-bold text-pink-400">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 text-sm">Comments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-900/60 backdrop-blur-md p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 hover:shadow-blue-500/30 transition-all">
          <img src={assets.dashboard_icon_3} alt="" className="w-10 h-10" />
          <div>
            <p className="text-2xl font-bold text-blue-400">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 text-sm">Drafts</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs */}
      <div className="flex items-center gap-3 mt-10 mb-4 text-gray-200">
        <img src={assets.dashboard_icon_4} alt="" className="w-6 h-6" />
        <p className="text-lg font-semibold">Latest Blogs</p>
      </div>

      {/* Table */}
      <div className="relative max-w-5xl overflow-x-auto rounded-lg shadow-lg bg-gray-900/70 backdrop-blur-md">
        <table className="w-full text-sm text-gray-300">
          <thead className="text-xs uppercase bg-gray-800 text-white">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                #
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                Blog Title
              </th>
              <th scope="col" className="px-4 py-3 max-sm:hidden text-left">
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
            {dashboardData.recentBlogs?.map((blog, index) => (
              <BlogTableItem
                key={blog._id}
                blog={blog}
                fetchBlogs={fetchDashboard}
                index={index + 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
