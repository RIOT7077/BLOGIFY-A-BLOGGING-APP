import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import jwt from "jsonwebtoken";
import Comment from "../models/Comment.js";
import nodemailer from "nodemailer";
export const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Error loggin in",
      });
    }
    const token = jwt.sign({ email }, process.env.SECRET_KEY);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({
      success: true,
      message: "Comment Approved ",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });
    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };
    res.json({
      success: true,
      dashboardData,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      comments,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
