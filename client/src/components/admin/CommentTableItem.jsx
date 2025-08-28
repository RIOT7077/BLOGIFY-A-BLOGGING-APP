import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);
  const { axios, token } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post(
        `/api/admin/approve-comment`,
        { id: _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (!confirm) return;

      const { data } = await axios.post(
        `/api/admin/delete-comment`,
        {
          id: _id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b border-gray-800">
      {/* Blog & Comment */}
      <td className="px-6 py-4 text-sm leading-6 text-gray-300">
        <span className="font-medium text-gray-200">Blog</span>: {blog.title}
        <br />
        <span className="font-medium text-gray-200">Name</span>: {comment.name}
        <br />
        <span className="font-medium text-gray-200">Comment</span>:{" "}
        {comment.content}
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-sm text-gray-400 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-3">
          {!comment.isApproved ? (
            <button
              onClick={approveComment}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full 
                         text-xs font-medium bg-green-700 text-white 
                         hover:bg-green-600 transition-colors"
            >
              <img src={assets.tick_icon} alt="approve" className="w-4 h-4" />
              Approve
            </button>
          ) : (
            <span
              className="px-3 py-1.5 text-xs font-medium rounded-full 
                             bg-green-800 text-green-200"
            >
              Approved
            </span>
          )}

          <button
            onClick={deleteComment}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full 
                       text-xs font-medium bg-red-400 text-white "
          >
            <img src={assets.bin_icon} alt="delete" className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
