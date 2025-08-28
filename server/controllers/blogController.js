import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    //check kro if all fields are present
    if (!title || !description || !category || !imageFile) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }
    const fileBuffer = fs.readFileSync(imageFile.path);

    //upload on imagekit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
    });
    //optimize kro image ko mkc using imagekit url transfo
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });
    const image = optimizedImageUrl;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });
    res.json({
      success: true,
      message: "Blog created",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error creating Blog",
    });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    ///blog ke comments delete crow
    await Comment.deleteMany({ blog: id });

    res.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);
    blog.isPublished = !blog.isPublished;
    await blog.save();
    res.json({
      success: true,
      message: "Blog status Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({
      success: true,
      message: "Comment added to review",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const getBlogComments = async (req, res) => {
  try {
    const { blogid } = req.params;
    const comments = await Comment.find({
      blog: blogid,
      isApproved: true,
    }).sort({
      createdAt: -1,
    });
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
export const getBlogById = async (req, res) => {
  try {
    const { blogid } = req.params;
    const blog = await Blog.findById(blogid);
    if (!blog) {
      res.json({
        success: false,
        message: "Blog not found",
      });
    }
    res.json({
      success: true,
      blog,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate a blog content for this topic in simple text format"
    );
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
