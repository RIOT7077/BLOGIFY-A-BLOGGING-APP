import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Missing bearer token" });
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = payload;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;
