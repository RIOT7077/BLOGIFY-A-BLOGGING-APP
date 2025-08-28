import React, { useEffect, useState } from "react";
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("Not Approved");
  const { axios, token } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/admin/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 text-gray-200">
      {/* Header + Filter */}
      <div className="flex justify-between items-center max-w-4xl">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Comments
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter("Approved")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === "Approved"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter("Not Approved")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === "Not Approved"
                ? "bg-red-600 text-white shadow-md"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative h-4/5 max-w-5xl overflow-auto mt-6 rounded-lg shadow-lg bg-gray-900/70 backdrop-blur-md scrollbar-hide">
        <table className="w-full text-sm text-gray-300">
          <thead className="text-xs uppercase bg-gray-800 text-gray-300">
            <tr>
              <th className="px-6 py-3 text-left" scope="col">
                Blog Title & Comment
              </th>
              <th className="px-6 py-3 max-sm:hidden text-left" scope="col">
                Date
              </th>
              <th className="px-6 py-3 max-sm:hidden text-left" scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody >
            {comments
              .filter((comment) =>
                filter === "Approved"
                  ? comment.isApproved === true
                  : comment.isApproved === false
              )
              .map((comment, index) => (
                <CommentTableItem
                  key={comment._id}
                  comment={comment}
                  index={index + 1}
                  fetchComments={fetchComments}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
